import React, { useState } from 'react';
import { 
  Building2, Brain, Clock, BarChart3, Search, ChevronRight, 
  AlertTriangle, CheckCircle2, ShieldAlert, Sparkles, Filter, ExternalLink
} from 'lucide-react';
import { 
  TAIWAN_INDUSTRY_SECTORS, 
  TWELVE_PSYCHOLOGICAL_TRAPS, 
  DAILY_ROUTINE_TIMELINE, 
  FINANCIAL_METRICS_ENCYCLOPEDIA 
} from '../data/taiwanIndustryData';

export default function IndustryEncyclopedia() {
  const [activeTab, setActiveTab] = useState('sectors'); // 'sectors', 'psychology', 'routine', 'financial-metrics'
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['全部', '半導體', '電子代工', '零組件', '網通光電', '傳產/綠能', '金融', '傳產運輸'];

  const filteredSectors = TAIWAN_INDUSTRY_SECTORS.filter((s) => {
    const matchCat = selectedCategory === '全部' || s.category === selectedCategory;
    const matchSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        s.drivers.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        s.leaders.some(l => l.name.includes(searchTerm) || l.code.includes(searchTerm));
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] sm:text-xs font-bold text-emerald-400 uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
              Taiwan Sector Atlas & Trader Mindset
            </span>
            <span className="text-slate-400 text-xs">大百科知識庫</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-white mt-1">
            全台產業族群圖鑑・散戶心態避坑・24H 操盤流程
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5 sm:mt-1">
            掌握台股 8 大關鍵產業龍頭版圖、散戶 12 大賠錢心理盲點、操盤手盤前盤後標準戰鬥排程與財報指標。
          </p>
        </div>

        {/* Sub-tab navigation buttons */}
        <div className="flex overflow-x-auto items-center gap-1.5 bg-slate-900 p-1 sm:p-1.5 rounded-xl border border-slate-800 scrollbar-none">
          {[
            { id: 'sectors', label: '🏭 產業族群圖鑑', short: '產業圖鑑' },
            { id: 'psychology', label: '🧠 散戶 12 心理盲點', short: '心理盲點' },
            { id: 'routine', label: '⏰ 24H 操盤流程表', short: '操盤流程' },
            { id: 'financial-metrics', label: '📊 財報指標手冊', short: '財報指標' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-3 py-2 sm:py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition touch-manipulation min-h-[38px] ${
                activeTab === t.id
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span className="hidden sm:inline">{t.label}</span>
              <span className="sm:hidden">{t.short}</span>
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 1: Industry Sectors Atlas */}
      {activeTab === 'sectors' && (
        <div className="space-y-4 sm:space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 p-3 sm:p-4 rounded-xl border border-slate-800">
            <div className="flex overflow-x-auto space-x-1.5 pb-1 sm:pb-0 scrollbar-none">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition touch-manipulation ${
                    selectedCategory === c
                      ? 'bg-rose-500 text-white shadow'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="搜尋代號、龍頭股或產業..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
            </div>
          </div>

          {/* Sectors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {filteredSectors.map((sector) => (
              <div
                key={sector.id}
                className="bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-6 space-y-4 hover:border-slate-700 transition shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-base sm:text-lg font-bold text-white">{sector.name}</h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-300 border border-slate-700">
                          {sector.category}
                        </span>
                      </div>
                      <span className="text-xs text-rose-400 font-medium block mt-0.5">{sector.importance}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                    <p>🔥 <strong>核心驅動催化劑：</strong>{sector.drivers}</p>
                    <p>📈 <strong>關鍵營運風向標：</strong>{sector.catalysts}</p>
                  </div>

                  {/* Leader Stocks List */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs font-bold text-slate-400 block">🏭 核心領頭羊與代表股：</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {sector.leaders.map((lead) => (
                        <div key={lead.code} className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-white">{lead.name}</span>
                            <span className="font-mono font-bold text-rose-400 text-xs">({lead.code})</span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-tight">{lead.role}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] sm:text-xs text-amber-300/90 flex items-start space-x-2 mt-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed"><strong>風險警戒提示：</strong>{sector.riskTip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: 12 Psychological Traps */}
      {activeTab === 'psychology' && (
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm">
              <Brain className="w-5 h-5" />
              <span>行為金融學：散戶在台股慘遭割韭菜的 12 大心理盲點</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              頂尖操盤手與普通散戶的差距，90% 不在於智商，而在於「能否克服人性弱點」。認清以下 12 大陷阱並服用解毒劑，你就能超越市場上 80% 的投資人：
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {TWELVE_PSYCHOLOGICAL_TRAPS.map((trap) => (
              <div
                key={trap.num}
                className="bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-slate-700 transition shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold font-mono text-xs flex items-center justify-center shrink-0">
                      #{trap.num}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white">{trap.title}</h3>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-rose-300/90 leading-relaxed">
                    <span className="font-bold block text-rose-400 mb-0.5">⚠️ 散戶常見症狀：</span>
                    {trap.symptom}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 leading-relaxed">
                  <span className="font-bold block text-emerald-400 mb-0.5">💊 操盤手解毒劑 (Antidote)：</span>
                  {trap.antidote}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: 24H Daily Routine SOP */}
      {activeTab === 'routine' && (
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-sky-400 font-bold text-sm">
              <Clock className="w-5 h-5" />
              <span>職業操盤手 24 小時戰鬥時間表 (全天候作戰 SOP)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              成功的交易不是開盤隨性按按鈕，而是像軍隊一樣嚴格按表操課。從盤前情資蒐集、盤中進出、到盤後籌碼覆盤，每一步都有標準作業流程：
            </p>
          </div>

          <div className="space-y-4">
            {DAILY_ROUTINE_TIMELINE.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition shadow-lg space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-800">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs sm:text-sm font-mono font-bold px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-500/30">
                      {item.time}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white">{item.phase}</h3>
                  </div>
                  <span className="text-xs text-amber-400 font-medium">
                    核心聚焦：{item.focus}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
                  {item.actionItems.map((act, i) => (
                    <div key={i} className="flex items-start space-x-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: Financial Metrics Playbook */}
      {activeTab === 'financial-metrics' && (
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold text-sm">
              <BarChart3 className="w-5 h-5" />
              <span>財報三表核心數據白話字典 (選股排雷照妖鏡)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              不要被會計師的幾百頁財報嚇退。真正決定一家公司股價漲跌與生死存亡的，只有這 6 個核心指標：
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FINANCIAL_METRICS_ENCYCLOPEDIA.map((metric, i) => (
              <div
                key={i}
                className="bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-slate-700 transition shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-base font-bold text-white">{metric.name}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700">
                      {metric.statement}
                    </span>
                  </div>

                  <div className="p-2 rounded bg-slate-950/80 border border-slate-800 text-xs font-mono text-amber-300">
                    公式：{metric.formula}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {metric.importance}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-200 leading-relaxed">
                  💡 <strong>操盤手實戰秘笈：</strong>{metric.proTip}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
