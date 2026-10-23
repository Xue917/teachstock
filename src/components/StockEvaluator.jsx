import React, { useState } from 'react';
import { 
  Target, ShieldCheck, Scale, Users, TrendingUp, AlertTriangle, 
  CheckCircle2, XCircle, ArrowRight, RefreshCw, HelpCircle, Sparkles, Check
} from 'lucide-react';
import { PRESET_STOCKS, FOUR_DIMENSION_EXPLANATION } from '../data/stockData';

export default function StockEvaluator() {
  const [selectedStockId, setSelectedStockId] = useState('2330');
  const [isCustomMode, setIsCustomMode] = useState(false);

  // Custom evaluation state
  const [customData, setCustomData] = useState({
    name: '自選潛力股',
    code: 'XXXX',
    currentPrice: 150,
    // Dimension 1: Fundamental (max 40)
    epsPositive: true,       // 10 pts
    roeAbove15: true,        // 10 pts
    marginStable: true,      // 10 pts
    freeCashFlowPositive: true, // 10 pts
    // Dimension 2: Valuation (max 20)
    peLevel: 'fair',         // cheap: 10, fair: 7, expensive: 2
    pegUnderOne: true,       // 5 pts
    dividendAndFill: true,   // 5 pts
    // Dimension 3: Chips (max 20)
    institutionalBuy: true,  // 8 pts
    majorShareholderUp: true,// 6 pts
    marginSafe: true,        // 6 pts
    // Dimension 4: Technical (max 20)
    above60MA: true,         // 8 pts
    bullishMA: true,         // 6 pts
    kdNotOverbought: true    // 6 pts
  });

  // Calculate scores for custom stock
  const calculateCustomScores = () => {
    let f = 0;
    if (customData.epsPositive) f += 10;
    if (customData.roeAbove15) f += 10;
    if (customData.marginStable) f += 10;
    if (customData.freeCashFlowPositive) f += 10;

    let v = 0;
    if (customData.peLevel === 'cheap') v += 10;
    else if (customData.peLevel === 'fair') v += 7;
    else v += 2;
    if (customData.pegUnderOne) v += 5;
    if (customData.dividendAndFill) v += 5;

    let c = 0;
    if (customData.institutionalBuy) c += 8;
    if (customData.majorShareholderUp) c += 6;
    if (customData.marginSafe) c += 6;

    let t = 0;
    if (customData.above60MA) t += 8;
    if (customData.bullishMA) t += 6;
    if (customData.kdNotOverbought) t += 6;

    const total = f + v + c + t;
    let grade = 'D';
    let verdict = '絕對地雷！嚴禁買進！';
    let color = 'rose';

    if (total >= 85) {
      grade = 'S';
      verdict = '極品績優股：基本面卓越，具備安全邊際，可積極分批買進！';
      color = 'emerald';
    } else if (total >= 70) {
      grade = 'A';
      verdict = '優質標的：體質健全，拉回均線支撐時為逢低佈局良機！';
      color = 'sky';
    } else if (total >= 55) {
      grade = 'B';
      verdict = '中性觀望：部分面向有隱憂 (如估值偏貴或籌碼鬆動)，先放入自選股等待買訊。';
      color = 'amber';
    } else if (total >= 40) {
      grade = 'C';
      verdict = '高風險投機：基本面或技術面轉弱，新手嚴禁接刀，已有者宜停損。';
      color = 'orange';
    }

    return {
      scores: { fundamental: f, valuation: v, chips: c, technical: t, total },
      grade,
      canBuyVerdict: verdict,
      verdictColor: color
    };
  };

  const presetStock = PRESET_STOCKS.find((s) => s.id === selectedStockId) || PRESET_STOCKS[0];
  const customEvaluation = calculateCustomScores();

  const currentDisplay = isCustomMode ? {
    id: 'custom',
    name: customData.name,
    code: customData.code,
    category: '使用者自訂自選股',
    currentPrice: customData.currentPrice,
    scores: customEvaluation.scores,
    grade: customEvaluation.grade,
    canBuyVerdict: customEvaluation.canBuyVerdict,
    verdictColor: customEvaluation.verdictColor,
    analysisSummary: `綜合評估總得分為 ${customEvaluation.scores.total} 分。基本面得分 ${customEvaluation.scores.fundamental}/40，估值面得分 ${customEvaluation.scores.valuation}/20，籌碼面得分 ${customEvaluation.scores.chips}/20，技術面得分 ${customEvaluation.scores.technical}/20。`,
    buyStrategy: customEvaluation.scores.total >= 70 ? '建議以 20MA (月線) 為進場防守線，採分批 3~4 次定期定額或拉回進場。' : '此標的目前尚未出現清晰的價值低估或多頭訊號，建議先觀望。',
    stopLossPrice: Math.round(customData.currentPrice * 0.92)
  } : presetStock;

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
              Decision Scoring Engine
            </span>
            <span className="text-slate-400 text-xs">四維雷達評估</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            這檔股票能不能買？【四維體檢雷達】
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            依據公開財報、巴菲特價值投資與台股籌碼法人鐵律，建立 100 分制量化診斷系統。
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center space-x-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setIsCustomMode(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              !isCustomMode ? 'bg-rose-500 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            真實台股案例體檢
          </button>
          <button
            onClick={() => setIsCustomMode(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center space-x-1 ${
              isCustomMode ? 'bg-rose-500 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>自訂股票體檢模式</span>
          </button>
        </div>
      </div>

      {/* Preset Stock Selection Buttons */}
      {!isCustomMode && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PRESET_STOCKS.map((s) => {
            const isSelected = selectedStockId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedStockId(s.id)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-rose-500/10 border-rose-500 text-white shadow-lg ring-1 ring-rose-500/50'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-sm">{s.name} ({s.code})</span>
                  <span className={`text-xs font-mono font-bold px-1.5 py-0.2 rounded ${
                    s.grade === 'S' ? 'bg-emerald-500/20 text-emerald-400' :
                    s.grade === 'A' ? 'bg-sky-500/20 text-sky-400' :
                    s.grade === 'C' ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400'
                  }`}>
                    {s.grade}級
                  </span>
                </div>
                <div className="text-xs text-slate-400 truncate">{s.tag}</div>
              </button>
            );
          })}
        </div>
      )}

      {/* Custom Mode Input Box */}
      {isCustomMode && (
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center">
              <Sparkles className="w-4 h-4 text-rose-400 mr-2" />
              輸入或勾選你想體檢的股票指標條件：
            </h3>
            <div className="flex items-center space-x-3 text-xs">
              <input
                type="text"
                placeholder="股票名稱"
                value={customData.name}
                onChange={(e) => setCustomData({ ...customData, name: e.target.value })}
                className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-white w-28 text-xs focus:ring-1 focus:ring-rose-500 outline-none"
              />
              <input
                type="text"
                placeholder="代號"
                value={customData.code}
                onChange={(e) => setCustomData({ ...customData, code: e.target.value })}
                className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-white w-20 text-xs focus:ring-1 focus:ring-rose-500 outline-none"
              />
              <input
                type="number"
                placeholder="現價"
                value={customData.currentPrice}
                onChange={(e) => setCustomData({ ...customData, currentPrice: parseFloat(e.target.value) || 0 })}
                className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-white w-24 text-xs focus:ring-1 focus:ring-rose-500 outline-none"
              />
            </div>
          </div>

          {/* Interactive Checkbox Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* Fundamental */}
            <div className="bg-slate-800/40 p-3.5 rounded-xl border border-slate-800 space-y-2.5">
              <span className="font-bold text-blue-400 flex items-center">
                <ShieldCheck className="w-4 h-4 mr-1" /> 基本面 (滿分 40)
              </span>
              <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={customData.epsPositive}
                  onChange={(e) => setCustomData({ ...customData, epsPositive: e.target.checked })}
                  className="rounded text-rose-500 focus:ring-0"
                />
                <span>近四季 EPS 穩定且大於 0 (+10)</span>
              </label>
              <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={customData.roeAbove15}
                  onChange={(e) => setCustomData({ ...customData, roeAbove15: e.target.checked })}
                  className="rounded text-rose-500 focus:ring-0"
                />
                <span>ROE &gt; 15% (獲利效率高) (+10)</span>
              </label>
              <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={customData.marginStable}
                  onChange={(e) => setCustomData({ ...customData, marginStable: e.target.checked })}
                  className="rounded text-rose-500 focus:ring-0"
                />
                <span>毛利率與營益率穩定未衰退 (+10)</span>
              </label>
              <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={customData.freeCashFlowPositive}
                  onChange={(e) => setCustomData({ ...customData, freeCashFlowPositive: e.target.checked })}
                  className="rounded text-rose-500 focus:ring-0"
                />
                <span>自由現金流大於 0 (真賺錢) (+10)</span>
              </label>
            </div>

            {/* Valuation */}
            <div className="bg-slate-800/40 p-3.5 rounded-xl border border-slate-800 space-y-2.5">
              <span className="font-bold text-amber-400 flex items-center">
                <Scale className="w-4 h-4 mr-1" /> 估值面 (滿分 20)
              </span>
              <div className="space-y-1">
                <span className="text-slate-400 block text-[11px]">本益比河流圖位階：</span>
                <select
                  value={customData.peLevel}
                  onChange={(e) => setCustomData({ ...customData, peLevel: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-1 text-slate-200 text-xs"
                >
                  <option value="cheap">偏低/便宜價位 (10分)</option>
                  <option value="fair">合理中間價位 (7分)</option>
                  <option value="expensive">偏高或嚴重泡沫 (2分)</option>
                </select>
              </div>
              <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={customData.pegUnderOne}
                  onChange={(e) => setCustomData({ ...customData, pegUnderOne: e.target.checked })}
                  className="rounded text-rose-500 focus:ring-0"
                />
                <span>PEG (本益成長比) &lt; 1.2 (+5)</span>
              </label>
              <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={customData.dividendAndFill}
                  onChange={(e) => setCustomData({ ...customData, dividendAndFill: e.target.checked })}
                  className="rounded text-rose-500 focus:ring-0"
                />
                <span>現金殖利率 &gt; 4% 且歷年多填息 (+5)</span>
              </label>
            </div>

            {/* Chips */}
            <div className="bg-slate-800/40 p-3.5 rounded-xl border border-slate-800 space-y-2.5">
              <span className="font-bold text-rose-400 flex items-center">
                <Users className="w-4 h-4 mr-1" /> 籌碼面 (滿分 20)
              </span>
              <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={customData.institutionalBuy}
                  onChange={(e) => setCustomData({ ...customData, institutionalBuy: e.target.checked })}
                  className="rounded text-rose-500 focus:ring-0"
                />
                <span>外資或投信近 5 日買超加碼 (+8)</span>
              </label>
              <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={customData.majorShareholderUp}
                  onChange={(e) => setCustomData({ ...customData, majorShareholderUp: e.target.checked })}
                  className="rounded text-rose-500 focus:ring-0"
                />
                <span>千張大戶持股比增加 (主力吃貨) (+6)</span>
              </label>
              <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={customData.marginSafe}
                  onChange={(e) => setCustomData({ ...customData, marginSafe: e.target.checked })}
                  className="rounded text-rose-500 focus:ring-0"
                />
                <span>融資餘額下降 / 維持率 &gt; 160% (+6)</span>
              </label>
            </div>

            {/* Technical */}
            <div className="bg-slate-800/40 p-3.5 rounded-xl border border-slate-800 space-y-2.5">
              <span className="font-bold text-cyan-400 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" /> 技術面 (滿分 20)
              </span>
              <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={customData.above60MA}
                  onChange={(e) => setCustomData({ ...customData, above60MA: e.target.checked })}
                  className="rounded text-rose-500 focus:ring-0"
                />
                <span>股價站上 60MA 季線生命線 (+8)</span>
              </label>
              <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={customData.bullishMA}
                  onChange={(e) => setCustomData({ ...customData, bullishMA: e.target.checked })}
                  className="rounded text-rose-500 focus:ring-0"
                />
                <span>短中長均線多頭排列 (+6)</span>
              </label>
              <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={customData.kdNotOverbought}
                  onChange={(e) => setCustomData({ ...customData, kdNotOverbought: e.target.checked })}
                  className="rounded text-rose-500 focus:ring-0"
                />
                <span>KD 未處於 80 以上嚴重超買背離 (+6)</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* SECTION: Scoring Result Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left score circle */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-950/80 rounded-2xl border border-slate-800/80">
            <span className="text-xs uppercase font-mono text-slate-400 tracking-wider">
              綜合體檢評級
            </span>
            <div className="flex items-baseline space-x-2 my-2">
              <span className={`text-6xl font-black ${
                currentDisplay.grade === 'S' ? 'text-emerald-400' :
                currentDisplay.grade === 'A' ? 'text-sky-400' :
                currentDisplay.grade === 'B' ? 'text-amber-400' :
                currentDisplay.grade === 'C' ? 'text-orange-400' : 'text-rose-500'
              }`}>
                {currentDisplay.grade}
              </span>
              <span className="text-2xl font-bold text-slate-400">/ 100分</span>
            </div>

            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden mt-1">
              <div
                className={`h-full transition-all duration-500 ${
                  currentDisplay.scores.total >= 85 ? 'bg-emerald-500' :
                  currentDisplay.scores.total >= 70 ? 'bg-sky-500' :
                  currentDisplay.scores.total >= 55 ? 'bg-amber-500' : 'bg-rose-500'
                }`}
                style={{ width: `${currentDisplay.scores.total}%` }}
              />
            </div>

            <span className="mt-2 text-xs font-mono font-bold text-slate-300">
              總得分：{currentDisplay.scores.total} 分
            </span>
          </div>

          {/* Right verdict card */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                currentDisplay.scores.total >= 70 ? 'bg-emerald-500 animate-pulse' :
                currentDisplay.scores.total >= 55 ? 'bg-amber-500' : 'bg-rose-500 animate-ping'
              }`} />
              <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
                判定結果：「這檔股票能不能買？」
              </span>
            </div>

            <h2 className={`text-xl sm:text-2xl font-black ${
              currentDisplay.scores.total >= 70 ? 'text-emerald-400' :
              currentDisplay.scores.total >= 55 ? 'text-amber-300' : 'text-rose-400'
            }`}>
              {currentDisplay.canBuyVerdict}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
              {currentDisplay.analysisSummary}
            </p>

            {/* Tactical Guidelines */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-xs text-emerald-400 font-bold block mb-1">
                  🎯 建議進場策略：
                </span>
                <span className="text-xs text-slate-300 leading-normal">
                  {currentDisplay.buyStrategy}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-xs text-rose-400 font-bold block mb-1">
                  🛑 絕對停損防守價位：
                </span>
                <span className="text-xs font-mono text-white font-bold">
                  {currentDisplay.stopLossPrice > 0 ? `$${currentDisplay.stopLossPrice} 元 (跌破無條件停損離場)` : '無支撐位！請勿抄底！'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Dimension Breakdown Cards */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center">
          <Target className="w-5 h-5 text-indigo-400 mr-2" />
          四維詳細得分拆解
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {FOUR_DIMENSION_EXPLANATION.map((dim) => {
            let score = 0;
            let maxScore = 20;
            if (dim.id === 'fundamental') {
              score = currentDisplay.scores.fundamental;
              maxScore = 40;
            } else if (dim.id === 'valuation') {
              score = currentDisplay.scores.valuation;
            } else if (dim.id === 'chips') {
              score = currentDisplay.scores.chips;
            } else if (dim.id === 'technical') {
              score = currentDisplay.scores.technical;
            }

            const pct = Math.round((score / maxScore) * 100);

            return (
              <div key={dim.id} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400">{dim.title.split('：')[0]}</span>
                    <span className="text-xs font-mono font-bold text-white bg-slate-800 px-2 py-0.5 rounded">
                      {score} / {maxScore} 分
                    </span>
                  </div>

                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        pct >= 80 ? 'bg-emerald-500' : pct >= 60 ? 'bg-sky-500' : pct >= 40 ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {dim.description}
                  </p>

                  <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs">
                    {dim.checklist.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-1.5 text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-tight">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
