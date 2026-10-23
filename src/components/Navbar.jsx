import React from 'react';
import { 
  Compass, LineChart, Target, BookOpen, Calculator, TrendingUp, AlertTriangle, 
  Search, Zap, Building2, Flame, Code2
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'guide', label: '新手 0 到 100 實戰', icon: Compass, badge: '入門' },
    { id: 'market', label: '看盤圖解教室', icon: LineChart, badge: '五檔&K線' },
    { id: 'surge', label: '股票會不會漲圖鑑', icon: Flame, badge: '起漲形態' },
    { id: 'industry', label: '全台產業與心態圖鑑', icon: Building2, badge: '產業地圖' },
    { id: 'research', label: '研究與最新熱潮', icon: Search, badge: '開源必讀' },
    { id: 'advanced', label: '高階技術與當沖', icon: Zap, badge: '百萬實戰' },
    { id: 'evaluator', label: '這檔股票能不能買？', icon: Target, badge: '四維體檢' },
    { id: 'masters', label: '大師精華庫', icon: BookOpen, badge: '影片提煉' },
    { id: 'toolbox', label: '實戰算力工具箱', icon: Calculator, badge: '成本估值' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/98 backdrop-blur-md border-b border-slate-800 shadow-xl">
      {/* Top Banner: Taiwan color rule & Market Ticker */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 py-1.5 px-4 text-xs border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2 text-slate-300 text-[11px] sm:text-xs">
          <span className="flex items-center text-amber-400 font-medium">
            <AlertTriangle className="w-3.5 h-3.5 mr-1" />
            台股約定：
          </span>
          <span className="inline-flex items-center px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 font-semibold">
            🔴 紅漲 (買盤強)
          </span>
          <span className="inline-flex items-center px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
            🟢 綠跌 (賣壓重)
          </span>
          <span className="text-slate-400 hidden sm:inline text-[10px]">
            ※ 與美股相反
          </span>
        </div>

        <div className="flex items-center space-x-3 text-slate-300 font-mono text-[10px] sm:text-[11px] overflow-x-auto scrollbar-none">
          <span className="flex items-center whitespace-nowrap">
            加權: <strong className="text-rose-400 ml-1 font-semibold">23,542.80 ▲ +168.35 (+0.72%)</strong>
          </span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:flex items-center whitespace-nowrap">
            櫃買 OTC: <strong className="text-rose-400 ml-1 font-semibold">271.85 ▲ +1.15</strong>
          </span>
          <span className="hidden lg:inline text-slate-600">|</span>
          <span className="hidden lg:flex items-center whitespace-nowrap">
            三大法人: <strong className="text-rose-400 ml-1 font-semibold">+182.4 億</strong>
          </span>
        </div>
      </div>

      {/* Brand Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('guide')}>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-rose-500 via-amber-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-rose-500/20 shrink-0">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950 font-black stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-base sm:text-xl font-black tracking-wide bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                台股智勝寶典
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                PRO 旗艦版
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              新手 0 到 100 實戰・專業看盤・起漲訊號形態・股票能不能買四維評估
            </p>
          </div>
        </div>

        {/* GitHub & Quick Action */}
        <a
          href="https://github.com/Xue917/teachstock"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition"
        >
          <Code2 className="w-4 h-4 text-white" />
          <span className="hidden sm:inline">開源專案</span>
          <span className="text-[10px] bg-slate-700 px-1.5 py-0.2 rounded text-slate-300">Xue917</span>
        </a>
      </div>

      {/* Spacious, Never-Crowded Navigation Tab Bar */}
      <div className="border-t border-slate-800/80 bg-slate-900/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 py-2 overflow-x-auto scrollbar-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-all duration-200 min-h-[38px] touch-manipulation ${
                    isActive
                      ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 ring-1 ring-rose-400'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="whitespace-nowrap">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold shrink-0 ${
                        isActive
                          ? 'bg-rose-950/70 text-rose-200'
                          : 'bg-slate-800 text-slate-400 border border-slate-700/50'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
