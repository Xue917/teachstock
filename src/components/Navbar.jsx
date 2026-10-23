import React from 'react';
import { Compass, LineChart, Target, BookOpen, Calculator, TrendingUp, AlertTriangle, Search, Zap } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'guide', label: '新手 0 到 100 實戰', icon: Compass, badge: '新手入門' },
    { id: 'market', label: '看盤圖解教室', icon: LineChart, badge: '五檔 & K線' },
    { id: 'research', label: '研究與最新熱潮', icon: Search, badge: '開源必讀' },
    { id: 'advanced', label: '高階技術與當沖', icon: Zap, badge: '破百萬實戰' },
    { id: 'evaluator', label: '這檔股票能不能買？', icon: Target, badge: '四維體檢' },
    { id: 'masters', label: '大師精華庫', icon: BookOpen, badge: '長影片提煉' },
    { id: 'toolbox', label: '實戰算力工具箱', icon: Calculator, badge: '成本與估值' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
      {/* Top Banner: Taiwan color rule & Market Ticker */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 py-1.5 px-4 text-xs border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-3 text-slate-300">
          <span className="flex items-center text-amber-400 font-medium">
            <AlertTriangle className="w-3.5 h-3.5 mr-1" />
            台股核心色彩約定：
          </span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 font-semibold">
            🔴 紅色 = 上漲 (買盤強)
          </span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
            🟢 綠色 = 下跌 (賣壓重)
          </span>
          <span className="text-slate-400 hidden sm:inline text-[11px]">
            ※ 與美股相反，新手切勿搞混！
          </span>
        </div>

        <div className="flex items-center space-x-4 text-slate-300 font-mono text-[11px] overflow-x-auto">
          <span className="flex items-center">
            加權指數: <strong className="text-rose-400 ml-1 font-semibold">23,542.80 ▲ +168.35 (+0.72%)</strong>
          </span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:flex items-center">
            櫃買 OTC: <strong className="text-rose-400 ml-1 font-semibold">271.85 ▲ +1.15 (+0.42%)</strong>
          </span>
          <span className="hidden lg:inline text-slate-500">|</span>
          <span className="hidden lg:flex items-center">
            三大法人合計: <strong className="text-rose-400 ml-1 font-semibold">+182.4 億</strong>
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('guide')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 via-amber-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-rose-500/20">
              <TrendingUp className="w-6 h-6 text-slate-950 font-black stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-black tracking-wide bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  台股智勝寶典
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Taiwan Stock Pro
                </span>
              </div>
              <p className="text-xs text-slate-400">
                新手 0 到 100 實戰・專業看盤・股票能不能買四維評估
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25 ring-1 ring-rose-400'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive
                          ? 'bg-rose-950/60 text-rose-200'
                          : 'bg-slate-800 text-slate-400'
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

        {/* Mobile Navigation Tabs */}
        <div className="flex md:hidden overflow-x-auto py-2.5 space-x-2 border-t border-slate-800 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 ${
                  isActive
                    ? 'bg-rose-500 text-white font-semibold'
                    : 'text-slate-300 bg-slate-800/70 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
