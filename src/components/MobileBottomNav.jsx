import React from 'react';
import { Compass, LineChart, Building2, Zap, Target, MoreHorizontal } from 'lucide-react';

export default function MobileBottomNav({ activeTab, setActiveTab, onOpenMenu }) {
  const items = [
    { id: 'guide', label: '新手', icon: Compass },
    { id: 'market', label: '看盤', icon: LineChart },
    { id: 'industry', label: '產業', icon: Building2 },
    { id: 'advanced', label: '當沖', icon: Zap },
    { id: 'evaluator', label: '體檢', icon: Target },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 pb-safe">
      <div className="grid grid-cols-6 h-14 items-center">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center h-full space-y-0.5 transition touch-manipulation ${
                isActive ? 'text-rose-500 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
              <span className="text-[10px] leading-none">{item.label}</span>
            </button>
          );
        })}

        {/* More button to toggle drawer or switch to research/masters/toolbox */}
        <button
          onClick={onOpenMenu}
          className={`flex flex-col items-center justify-center h-full space-y-0.5 transition touch-manipulation ${
            ['research', 'masters', 'toolbox'].includes(activeTab) ? 'text-rose-500 font-bold' : 'text-slate-400'
          }`}
        >
          <MoreHorizontal className="w-5 h-5" />
          <span className="text-[10px] leading-none">更多</span>
        </button>
      </div>
    </div>
  );
}
