import React, { useRef, useState, useEffect } from 'react';
import { 
  Compass, LineChart, Target, BookOpen, Calculator,
  Search, Zap, Building2, Flame, ChevronLeft, ChevronRight
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
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
      {/* Draggable Top Bar with Clickable Left & Right Navigation Arrows */}
      <div className="relative bg-slate-900/80">
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
          <div
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
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                    isActive
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30 scale-[1.02]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono shrink-0 ${
                      isActive
                        ? 'bg-rose-700/80 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

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

        {/* Right Edge Fade Mask */}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10" />
        )}
      </div>
    </header>
  );
}
