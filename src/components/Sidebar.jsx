import React from 'react';
import { 
  Compass, LineChart, Flame, Building2, Search, Zap, Target, BookOpen, Calculator,
  ChevronLeft, ChevronRight, TrendingUp, Sparkles, LayoutDashboard
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }) {
  const navItems = [
    { id: 'guide', label: '新手 0 到 100 實戰', icon: Compass, badge: '新手入門', desc: '開戶/交割T+2/零股/防違約' },
    { id: 'market', label: '看盤圖解教室', icon: LineChart, badge: '五檔&K線', desc: '紅漲綠跌/五檔報價/內外盤' },
    { id: 'surge', label: '股票會不會漲圖鑑', icon: Flame, badge: '起漲形態', desc: '三線合一/W底/破底翻/量價' },
    { id: 'industry', label: '全台產業與心態圖鑑', icon: Building2, badge: '產業地圖', desc: '8大族群/散戶12盲點/24H SOP' },
    { id: 'research', label: '研究與最新熱潮', icon: Search, badge: '開源必讀', desc: '買股5步驟/體質7步法/6照妖鏡' },
    { id: 'advanced', label: '高階技術與當沖', icon: Zap, badge: '百萬實戰', desc: '均線扣抵/開盤三法/期望值模型' },
    { id: 'evaluator', label: '這檔股票能不能買？', icon: Target, badge: '四維體檢', desc: '基本/估值/籌碼/技術100分雷達' },
    { id: 'masters', label: '大師精華庫', icon: BookOpen, badge: '影片提煉', desc: '巴菲特/彼得林區/怪老子精華' },
    { id: 'toolbox', label: '實戰算力工具箱', icon: Calculator, badge: '成本估值', desc: '保本損益點/三大估值/複利雪球' }
  ];

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-40 bg-slate-900/98 backdrop-blur-xl border-r border-slate-800 transition-all duration-300 ease-in-out flex flex-col justify-between select-none ${
        isOpen ? 'w-64 sm:w-72 shadow-2xl' : 'w-16 sm:w-20'
      }`}
    >
      {/* Sidebar Header */}
      <div>
        <div className="h-16 flex items-center justify-between px-3.5 border-b border-slate-800/80">
          <div 
            className="flex items-center space-x-2.5 cursor-pointer overflow-hidden"
            onClick={() => setActiveTab('guide')}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 via-amber-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-rose-500/20 shrink-0">
              <TrendingUp className="w-5 h-5 text-slate-950 font-black stroke-[2.5]" />
            </div>
            {isOpen && (
              <div className="whitespace-nowrap overflow-hidden transition-opacity duration-200">
                <span className="text-sm font-extrabold text-white block truncate tracking-wide">
                  台股智勝寶典
                </span>
                <span className="text-[10px] text-rose-400 font-bold block font-mono">
                  TAIWAN STOCK PRO
                </span>
              </div>
            )}
          </div>

          {/* Toggle Sidebar Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition shrink-0"
            title={isOpen ? '收合側邊欄 (Collapse)' : '展開側邊欄 (Expand)'}
          >
            {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items List */}
        <div className="p-2 space-y-1 overflow-y-auto max-h-[calc(100vh-8rem)] scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center rounded-xl transition-all duration-150 touch-manipulation group ${
                  isOpen ? 'px-3 py-2.5 space-x-3 text-left' : 'p-3 justify-center'
                } ${
                  isActive
                    ? 'bg-rose-500 text-white font-bold shadow-lg shadow-rose-500/25 ring-1 ring-rose-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
                title={item.label}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white scale-110' : 'text-slate-400 group-hover:text-white'} transition-transform`} />
                
                {isOpen && (
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-semibold truncate block">
                        {item.label}
                      </span>
                      {item.badge && (
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold shrink-0 ml-1 ${
                            isActive
                              ? 'bg-rose-950/70 text-rose-200'
                              : 'bg-slate-800 text-slate-400 border border-slate-700/60'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 block truncate font-normal mt-0.5">
                      {item.desc}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/40">
        {isOpen ? (
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span>開源旗艦版</span>
            </span>
            <span className="font-mono text-[10px] text-slate-500">v2.5 PRO</span>
          </div>
        ) : (
          <div className="flex justify-center text-[10px] text-slate-500 font-mono">
            PRO
          </div>
        )}
      </div>
    </aside>
  );
}
