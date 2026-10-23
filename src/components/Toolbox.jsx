import React, { useState } from 'react';
import { Calculator, DollarSign, Scale, TrendingUp, Sparkles, Check, ArrowRight, AlertCircle } from 'lucide-react';

export default function Toolbox() {
  const [activeTool, setActiveTool] = useState('fee');

  // Tool 1: Fee & Breakeven Calculator State
  const [buyPrice, setBuyPrice] = useState(100);
  const [sellPrice, setSellPrice] = useState(105);
  const [shares, setShares] = useState(1000); // 1000 股 = 1 張
  const [feeDiscount, setFeeDiscount] = useState(0.6); // 6 折
  const [tradeType, setTradeType] = useState('stock'); // stock (0.3%), etf (0.1%), dayTrade (0.15%)

  // Calculation for fees
  const taxRate = tradeType === 'stock' ? 0.003 : tradeType === 'etf' ? 0.001 : 0.0015;
  const buyCost = buyPrice * shares;
  const sellValue = sellPrice * shares;
  
  // Commission with minimum fee of 20 NTD
  const buyFee = Math.max(20, Math.floor(buyCost * 0.001425 * feeDiscount));
  const sellFee = Math.max(20, Math.floor(sellValue * 0.001425 * feeDiscount));
  const tax = Math.floor(sellValue * taxRate);
  const totalCost = buyFee + sellFee + tax;
  const netProfit = sellValue - buyCost - totalCost;
  const roi = buyCost > 0 ? ((netProfit / (buyCost + buyFee)) * 100).toFixed(2) : 0;

  // Breakeven price calculation
  // sellValue - buyCost - buyFee - (sellValue * 0.001425 * discount) - (sellValue * taxRate) = 0
  // sellValue * (1 - 0.001425*discount - taxRate) = buyCost + buyFee
  const breakevenValue = (buyCost + buyFee) / (1 - 0.001425 * feeDiscount - taxRate);
  const breakevenPrice = (breakevenValue / shares).toFixed(2);
  const breakevenGap = (breakevenPrice - buyPrice).toFixed(2);

  // Tool 2: Valuation Calculator State
  const [valMethod, setValMethod] = useState('pe'); // pe, dividend, peg
  const [eps, setEps] = useState(10);
  const [lowPe, setLowPe] = useState(12);
  const [avgPe, setAvgPe] = useState(16);
  const [highPe, setHighPe] = useState(20);
  
  const [avgDividend, setAvgDividend] = useState(5);
  const [growthRate, setGrowthRate] = useState(15); // 15%

  // Tool 3: Compound Interest Calculator State
  const [monthlyAmount, setMonthlyAmount] = useState(10000);
  const [annualReturn, setAnnualReturn] = useState(9); // 台股長期約 9%
  const [years, setYears] = useState(20);

  // Compound interest calculation
  const monthlyRate = annualReturn / 100 / 12;
  const totalMonths = years * 12;
  const totalInvested = monthlyAmount * totalMonths;
  // FV = P * [ ( (1 + r)^n - 1 ) / r ] * (1 + r)
  const futureValue = monthlyRate > 0 
    ? Math.round(monthlyAmount * (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate)))
    : totalInvested;
  const compoundInterestEarned = futureValue - totalInvested;

  // Timeline points for compound chart
  const timelineMilestones = [5, 10, 15, 20, 25, 30].filter(y => y <= years || y === years);

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
              Toolbox & Calculators
            </span>
            <span className="text-slate-400 text-xs">精準數據量化</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            台股實戰算力工具箱
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            手續費損益平衡點、合理股價估值試算、以及定期定額複利滾雪球模型。
          </p>
        </div>

        {/* Tab switchers for tools */}
        <div className="flex items-center space-x-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTool('fee')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTool === 'fee' ? 'bg-rose-500 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            手續費與保本點
          </button>
          <button
            onClick={() => setActiveTool('valuation')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTool === 'valuation' ? 'bg-rose-500 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            合理股價估值法
          </button>
          <button
            onClick={() => setActiveTool('compound')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTool === 'compound' ? 'bg-rose-500 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            定期定額複利雪球
          </button>
        </div>
      </div>

      {/* TOOL 1: Fee & Breakeven Calculator */}
      {activeTool === 'fee' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls */}
          <div className="lg:col-span-5 bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center">
              <DollarSign className="w-5 h-5 text-rose-400 mr-2" />
              輸入買賣條件參數
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">買進價格 (元)：</label>
                <input
                  type="number"
                  step="0.1"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono text-sm focus:ring-1 focus:ring-rose-500 outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">預計賣出價格 (元)：</label>
                <input
                  type="number"
                  step="0.1"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono text-sm focus:ring-1 focus:ring-rose-500 outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">股數 (1000 股 = 1 張)：</label>
                <input
                  type="number"
                  step="100"
                  value={shares}
                  onChange={(e) => setShares(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono text-sm focus:ring-1 focus:ring-rose-500 outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">券商電子下單手續費折扣：</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: '2.8 折', val: 0.28 },
                    { label: '6 折 (一般)', val: 0.6 },
                    { label: '無折扣 (1折)', val: 1.0 }
                  ].map((d) => (
                    <button
                      key={d.val}
                      onClick={() => setFeeDiscount(d.val)}
                      className={`py-1.5 rounded-lg border text-xs font-semibold ${
                        feeDiscount === d.val
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">交易標的與稅率類型：</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'stock', label: '一般個股 (0.3%)' },
                    { id: 'etf', label: 'ETF (0.1%)' },
                    { id: 'dayTrade', label: '現股當沖 (0.15%)' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTradeType(t.id)}
                      className={`py-1.5 rounded-lg border text-xs font-semibold ${
                        tradeType === t.id
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-5 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-white mb-4">交易損益與摩擦成本明細</h3>

              {/* Profit summary card */}
              <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase text-slate-400">淨獲利 / 虧損</span>
                  <span className={`text-2xl sm:text-3xl font-black font-mono ${
                    netProfit >= 0 ? 'text-rose-400' : 'text-emerald-400'
                  }`}>
                    {netProfit >= 0 ? '+' : ''}${netProfit.toLocaleString()} 元
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <span>淨投資報酬率 (ROI)</span>
                  <span className={`font-bold font-mono text-sm ${netProfit >= 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {roi}%
                  </span>
                </div>
              </div>

              {/* Breakeven highlight */}
              <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 space-y-1">
                <div className="flex items-center space-x-1.5 font-bold text-sm">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>保本損益平衡點 (Breakeven Price)：</span>
                </div>
                <p className="text-xs text-slate-300">
                  你買在 <strong className="text-white">${buyPrice}</strong> 元，至少需賣在{' '}
                  <strong className="text-amber-300 font-mono text-sm">${breakevenPrice}</strong> 元 (需上漲{' '}
                  <span className="text-amber-400 font-mono">+{breakevenGap}</span> 元)，扣除所有券商手續費與證交稅後才能完全回本！
                </p>
              </div>

              {/* Detailed Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs font-mono">
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">買進金額</span>
                  <span className="text-white font-bold">${buyCost.toLocaleString()}</span>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">買進手續費</span>
                  <span className="text-slate-300">${buyFee}</span>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">賣出手續費</span>
                  <span className="text-slate-300">${sellFee}</span>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">證券交易稅</span>
                  <span className="text-rose-400">${tax.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 pt-3 border-t border-slate-800">
              ※ 券商法定手續費率為 0.1425%，不足 20 元通常以 20 元低消計算 (部分券商低消 1 元)。
            </div>
          </div>
        </div>
      )}

      {/* TOOL 2: Valuation Calculator */}
      {activeTool === 'valuation' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center">
              <Scale className="w-5 h-5 text-amber-400 mr-2" />
              三大合理股價估值模型
            </h3>

            {/* Sub methods */}
            <div className="flex space-x-2">
              <button
                onClick={() => setValMethod('pe')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${
                  valMethod === 'pe' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                本益比法
              </button>
              <button
                onClick={() => setValMethod('dividend')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${
                  valMethod === 'dividend' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                殖利率還原法
              </button>
              <button
                onClick={() => setValMethod('peg')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${
                  valMethod === 'peg' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                彼得林區 PEG 法
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {valMethod === 'pe' && (
                <>
                  <div>
                    <label className="text-slate-400 block mb-1">近四季累積 EPS (元)：</label>
                    <input
                      type="number"
                      step="0.5"
                      value={eps}
                      onChange={(e) => setEps(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-slate-400 block mb-1 text-[11px]">歷史低本益比：</label>
                      <input
                        type="number"
                        value={lowPe}
                        onChange={(e) => setLowPe(parseFloat(e.target.value) || 0)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1 text-[11px]">歷史平均 PE：</label>
                      <input
                        type="number"
                        value={avgPe}
                        onChange={(e) => setAvgPe(parseFloat(e.target.value) || 0)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1 text-[11px]">歷史高本益比：</label>
                      <input
                        type="number"
                        value={highPe}
                        onChange={(e) => setHighPe(parseFloat(e.target.value) || 0)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-white font-mono"
                      />
                    </div>
                  </div>
                </>
              )}

              {valMethod === 'dividend' && (
                <div>
                  <label className="text-slate-400 block mb-1">近五年平均現金股利 (元)：</label>
                  <input
                    type="number"
                    step="0.5"
                    value={avgDividend}
                    onChange={(e) => setAvgDividend(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono text-sm"
                  />
                  <p className="text-[11px] text-slate-400 mt-2">
                    適用於營運極度穩健的傳產與金控股 (如兆豐金、中華電)。以 6.25% 殖利率為便宜價，5% 為合理價，3.125% 為昂貴價。
                  </p>
                </div>
              )}

              {valMethod === 'peg' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-slate-400 block mb-1">近四季 EPS (元)：</label>
                    <input
                      type="number"
                      step="0.5"
                      value={eps}
                      onChange={(e) => setEps(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">預估未來獲利年成長率 (%)：</label>
                    <input
                      type="number"
                      step="1"
                      value={growthRate}
                      onChange={(e) => setGrowthRate(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Valuation Output */}
          <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
            <h3 className="text-base font-bold text-white">估值計算成果與三道防守線</h3>

            {valMethod === 'pe' && (
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-emerald-400 font-bold block">🟢 便宜價 (安全邊際厚)</span>
                    <span className="text-xs text-slate-400">EPS × 歷史低 PE ({lowPe}倍)</span>
                  </div>
                  <span className="text-2xl font-black font-mono text-emerald-400">
                    ${(eps * lowPe).toFixed(1)} 元
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/30 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-sky-400 font-bold block">🔵 合理價 (市場合理均衡)</span>
                    <span className="text-xs text-slate-400">EPS × 歷史平均 PE ({avgPe}倍)</span>
                  </div>
                  <span className="text-2xl font-black font-mono text-sky-400">
                    ${(eps * avgPe).toFixed(1)} 元
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-rose-400 font-bold block">🔴 昂貴價 (逢高宜調節)</span>
                    <span className="text-xs text-slate-400">EPS × 歷史高 PE ({highPe}倍)</span>
                  </div>
                  <span className="text-2xl font-black font-mono text-rose-400">
                    ${(eps * highPe).toFixed(1)} 元
                  </span>
                </div>
              </div>
            )}

            {valMethod === 'dividend' && (
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-emerald-400 font-bold block">🟢 便宜價 (殖利率 6.25% 買點)</span>
                    <span className="text-xs text-slate-400">平均股利 × 16</span>
                  </div>
                  <span className="text-2xl font-black font-mono text-emerald-400">
                    ${(avgDividend * 16).toFixed(1)} 元
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/30 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-sky-400 font-bold block">🔵 合理價 (殖利率 5.0% 買點)</span>
                    <span className="text-xs text-slate-400">平均股利 × 20</span>
                  </div>
                  <span className="text-2xl font-black font-mono text-sky-400">
                    ${(avgDividend * 20).toFixed(1)} 元
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-rose-400 font-bold block">🔴 昂貴價 (殖利率低於 3.12%)</span>
                    <span className="text-xs text-slate-400">平均股利 × 32</span>
                  </div>
                  <span className="text-2xl font-black font-mono text-rose-400">
                    ${(avgDividend * 32).toFixed(1)} 元
                  </span>
                </div>
              </div>
            )}

            {valMethod === 'peg' && (
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-purple-400 font-bold block">彼得林區公允目標價 (PEG = 1.0)</span>
                    <span className="text-xs text-slate-400">預估成長率 ({growthRate}%) × EPS</span>
                  </div>
                  <span className="text-2xl font-black font-mono text-purple-300">
                    ${(growthRate * eps).toFixed(1)} 元
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-emerald-400 font-bold block">安全邊際打八折建議買進價</span>
                    <span className="text-xs text-slate-400">目標價 × 0.8 (留 20% 安全餘裕)</span>
                  </div>
                  <span className="text-2xl font-black font-mono text-emerald-400">
                    ${(growthRate * eps * 0.8).toFixed(1)} 元
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TOOL 3: Compound Interest Snowball */}
      {activeTool === 'compound' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center">
              <TrendingUp className="w-5 h-5 text-indigo-400 mr-2" />
              定期定額滾雪球參數
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">每月投資金額 (元)：</label>
                <input
                  type="number"
                  step="1000"
                  value={monthlyAmount}
                  onChange={(e) => setMonthlyAmount(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">預估年化報酬率 (%)：</label>
                <input
                  type="number"
                  step="0.5"
                  value={annualReturn}
                  onChange={(e) => setAnnualReturn(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono text-sm"
                />
                <span className="text-[11px] text-slate-400 block mt-1">
                  ※ 台股加權報酬指數 (0050) 過去 20 年長期年化報酬率約 8%~10%。
                </span>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">堅持投資年限 (年)：{years} 年</label>
                <input
                  type="range"
                  min="3"
                  max="35"
                  value={years}
                  onChange={(e) => setYears(parseInt(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>3 年</span>
                  <span>10 年</span>
                  <span>20 年</span>
                  <span>35 年</span>
                </div>
              </div>
            </div>
          </div>

          {/* Compound Result */}
          <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-5">
            <h3 className="text-base font-bold text-white">滾雪球驚人成果</h3>

            <div className="p-5 rounded-2xl bg-gradient-to-tr from-slate-950 to-indigo-950/40 border border-slate-800 space-y-3">
              <span className="text-xs text-slate-400 block uppercase">累積總資產 (期末淨值)</span>
              <span className="text-3xl sm:text-4xl font-black font-mono text-emerald-400">
                ${futureValue.toLocaleString()} 元
              </span>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 block">投入總本金</span>
                  <span className="text-white font-bold font-mono text-sm">
                    ${totalInvested.toLocaleString()} 元
                  </span>
                </div>
                <div>
                  <span className="text-indigo-400 block">複利孳生利息 (純賺)</span>
                  <span className="text-indigo-300 font-bold font-mono text-sm">
                    +${compoundInterestEarned.toLocaleString()} 元
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Milestones */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 block">資產增長里程碑 (時間 × 複利)：</span>
              <div className="space-y-1.5 font-mono text-xs">
                {timelineMilestones.map((yr) => {
                  const m = yr * 12;
                  const inv = monthlyAmount * m;
                  const fv = Math.round(monthlyAmount * (((Math.pow(1 + monthlyRate, m) - 1) / monthlyRate) * (1 + monthlyRate)));
                  const pct = Math.min(100, Math.round((fv / futureValue) * 100));

                  return (
                    <div key={yr} className="space-y-1">
                      <div className="flex justify-between text-slate-300">
                        <span>第 {yr} 年</span>
                        <span className="text-emerald-400 font-bold">${fv.toLocaleString()} 元</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full transition-all duration-300"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
