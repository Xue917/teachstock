import React, { useRef, useState, useEffect } from 'react';
import { 
  Compass, LineChart, Target, BookOpen, Calculator, TrendingUp, AlertTriangle, 
  Search, Zap, Building2, Flame, Code2, ChevronLeft, ChevronRight, Menu, PanelLeftClose, PanelLeftOpen
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

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

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const handleResize = () => checkScroll();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab]);

  const scrollByAmount = (amount) => {
    scrollRef.current?.scrollBy({ left: amount, behavior: 'smooth' });
    setTimeout(checkScroll, 300);
  };

  const handleMouseDown = (e) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftStart.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftStart.current - walk;
    checkScroll();
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  const handleWheel = (e) => {
    if (!scrollRef.current) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      scrollRef.current.scrollLeft += e.deltaY;
      checkScroll();
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-900/98 backdrop-blur-md border-b border-slate-800 shadow-xl select-none">
      {/* Top Banner: Taiwan color rule & Market Ticker */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 py-1 px-3 sm:px-4 text-xs border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2 text-slate-300 text-[10px] sm:text-xs">
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
            櫃買: <strong className="text-rose-400 ml-1 font-semibold">271.85 ▲ +1.15</strong>
          </span>
          <span className="hidden lg:inline text-slate-600">|</span>
          <span className="hidden lg:flex items-center whitespace-nowrap">
            三大法人: <strong className="text-rose-400 ml-1 font-semibold">+182.4 億</strong>
          </span>
        </div>
      </div>

      {/* Brand Header Row with Sidebar Toggle */}
      <div className="px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between border-b border-slate-800/60">
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          {/* Toggle Left Sidebar Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition"
            title={isSidebarOpen ? '收合左側欄' : '展開左側欄'}
          >
            {isSidebarOpen ? <PanelLeftClose className="w-4 h-4 text-rose-400" /> : <PanelLeftOpen className="w-4 h-4 text-emerald-400" />}
            <span className="hidden sm:inline">{isSidebarOpen ? '收合側欄' : '展開側欄'}</span>
          </button>

          {/* Logo */}
          <div 
            className="flex items-center space-x-2.5 cursor-pointer"
            onClick={() => setActiveTab('guide')}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-rose-500 via-amber-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-rose-500/20 shrink-0">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950 font-black stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm sm:text-lg font-black tracking-wide bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  台股智勝寶典
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  PRO
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* GitHub Link & Drag hint */}
        <div className="flex items-center space-x-3">
          <span className="hidden xl:inline text-[11px] text-slate-400 font-mono">
            💡 提示：下方選單支援「滑鼠點擊拖曳」與「滾輪左右滾動」
          </span>

          <a
            href="https://github.com/Xue917/teachstock"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition"
          >
            <Code2 className="w-4 h-4 text-white" />
            <span className="hidden sm:inline">開源倉庫</span>
          </a>
        </div>
      </div>

      {/* Draggable Top Bar with Clickable Left & Right Navigation Arrows */}
      <div className="relative border-t border-slate-800/80 bg-slate-900/80">
        {/* Left Scroll Button */}
        {canScrollLeft && (
          <button
            onClick={() => scrollByAmount(-240)}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-800/90 hover:bg-rose-600 text-white shadow-lg border border-slate-700 flex items-center justify-center transition"
            title="向左滑動"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        {/* Left Edge Fade Mask */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-10" />
        )}

        {/* The Draggable Container */}
        <div className="px-3 sm:px-6">
          <nav
            ref={scrollRef}
            onScroll={checkScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onWheel={handleWheel}
            className="flex items-center space-x-2 py-2 overflow-x-auto scrollbar-none cursor-grab active:cursor-grabbing select-none"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center space-x-1.5 px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-all duration-200 min-h-[36px] sm:min-h-[38px] touch-manipulation ${
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

        {/* Right Edge Fade Mask */}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10" />
        )}

        {/* Right Scroll Button */}
        {canScrollRight && (
          <button
            onClick={() => scrollByAmount(240)}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-800/90 hover:bg-rose-600 text-white shadow-lg border border-slate-700 flex items-center justify-center transition"
            title="向右滑動"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  );
}
