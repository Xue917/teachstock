import React from 'react';
import { ShieldCheck, AlertTriangle, TrendingUp } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="mt-16 bg-slate-950 border-t border-slate-850 py-10 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-slate-950 font-bold" />
            </div>
            <div>
              <span className="text-white font-bold text-sm block">台股智勝寶典 (Taiwan Stock Pro)</span>
              <span className="text-[11px] text-slate-400">完全新手 0 到 100 實戰・專業看盤與四維體檢評估系統</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-slate-300">
            <button onClick={() => setActiveTab('guide')} className="hover:text-white transition">新手通關指南</button>
            <button onClick={() => setActiveTab('market')} className="hover:text-white transition">看盤教室</button>
            <button onClick={() => setActiveTab('research')} className="hover:text-white transition">研究與最新熱潮</button>
            <button onClick={() => setActiveTab('advanced')} className="hover:text-white transition">高階技術與當沖</button>
            <button onClick={() => setActiveTab('evaluator')} className="hover:text-white transition">股票能不能買</button>
            <button onClick={() => setActiveTab('masters')} className="hover:text-white transition">大師精華庫</button>
            <button onClick={() => setActiveTab('toolbox')} className="hover:text-white transition">實戰工具箱</button>
          </div>
        </div>

        {/* Legal & Educational Disclaimer */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 leading-relaxed space-y-1">
          <div className="flex items-center text-amber-400 font-semibold mb-1">
            <AlertTriangle className="w-3.5 h-3.5 mr-1" />
            法定教育免責聲明 (Educational Disclaimer)
          </div>
          <p>
            1. 本系統所載之所有教學內容、K線圖解、財報指標、估值模型與四維評分機制，均依據公開財報與經典金融投資理論進行學術探討與程式化量化分析，僅供學習研究之用。
          </p>
          <p>
            2. 本網站並非證券投資顧問事業 (SICE)，絕不提供任何特定個股之推薦、跟單或保證獲利承諾。金融市場具有高度風險，股票價格受景氣、政策與市場情緒多重影響，投資人做任何決策前應審慎評估，並自負投資損益風險。
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 pt-4 border-t border-slate-850 gap-2">
          <span>© 2026 台股智勝寶典. Designed for Taiwan Stock Investors. 繁體中文專業版.</span>
          <span>恪守風險第一・堅持價值投資・拒絕短線賭博</span>
        </div>
      </div>
    </footer>
  );
}
