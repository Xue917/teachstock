import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import BeginnerGuide from './components/BeginnerGuide';
import MarketClassroom from './components/MarketClassroom';
import SurgePredictor from './components/SurgePredictor';
import IndustryEncyclopedia from './components/IndustryEncyclopedia';
import CompanyResearch from './components/CompanyResearch';
import AdvancedTechnical from './components/AdvancedTechnical';
import StockEvaluator from './components/StockEvaluator';
import MasterLibrary from './components/MasterLibrary';
import Toolbox from './components/Toolbox';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import { 
  X, Compass, LineChart, Building2, Search, Zap, Target, BookOpen, Calculator, Sparkles, Flame 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('guide');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Collapsed by default for max screen space, easily toggleable
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll to top when changing tab
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const allModules = [
    { id: 'guide', label: '🧭 新手 0 到 100 實戰', desc: '開戶、交割T+2、零股、防違約地雷' },
    { id: 'market', label: '📊 看盤圖解教室', desc: '紅漲綠跌K線、五檔委託、內外盤模擬' },
    { id: 'surge', label: '📈 股票會不會漲圖鑑', desc: '三線合一、W底、破底翻、量價配合起漲訊號' },
    { id: 'industry', label: '🏭 全台產業族群圖鑑', desc: '8大產業版圖、散戶12大盲點、24H操盤SOP' },
    { id: 'research', label: '🔍 深度研究與熱潮雷達', desc: '買股5步驟、公司體質7步法、6大照妖鏡' },
    { id: 'advanced', label: '⚡ 高階技術與當沖絕技', desc: '均線扣抵、開盤三法、百萬藍圖、期望值' },
    { id: 'evaluator', label: '🎯 這檔股票能不能買？', desc: '基本/估值/籌碼/技術 100分四維體檢雷達' },
    { id: 'masters', label: '🧠 大師精華與影音庫', desc: '巴菲特、彼得林區、怪老子、柴鼠長影片提煉' },
    { id: 'toolbox', label: '🧮 實戰算力工具箱', desc: '手續費保本點、三大估值法、複利滾雪球' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-rose-500 selection:text-white">
      {/* Left Collapsible Sidebar (Desktop & Tablet) */}
      <div className="hidden md:block">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
      </div>

      {/* Main App Container (adjusts left padding when sidebar is open) */}
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'md:pl-64 sm:md:pl-72' : 'md:pl-16 sm:md:pl-20'
        }`}
      >
        {/* Top Header Navbar with Drag-to-Scroll + Left/Right Arrow Buttons + Sidebar Toggle */}
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full pb-16 md:pb-0">
          {activeTab === 'guide' && (
            <BeginnerGuide
              onJumpToToolbox={() => setActiveTab('toolbox')}
              onJumpToMarket={() => setActiveTab('market')}
            />
          )}
          {activeTab === 'market' && <MarketClassroom />}
          {activeTab === 'surge' && <SurgePredictor />}
          {activeTab === 'industry' && <IndustryEncyclopedia />}
          {activeTab === 'research' && <CompanyResearch />}
          {activeTab === 'advanced' && <AdvancedTechnical />}
          {activeTab === 'evaluator' && <StockEvaluator />}
          {activeTab === 'masters' && <MasterLibrary />}
          {activeTab === 'toolbox' && <Toolbox />}
        </main>

        {/* Footer */}
        <Footer setActiveTab={setActiveTab} />
      </div>

      {/* Mobile Bottom Navigation Bar (Visible only on mobile screen < 768px) */}
      <MobileBottomNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenMenu={() => setIsMobileMenuOpen(true)}
      />

      {/* Mobile Full Menu Drawer Modal */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col justify-end">
          <div className="bg-slate-900 border-t border-slate-800 rounded-t-3xl p-5 max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-rose-500" />
                <span className="font-bold text-base text-white">台股智勝寶典 · 完整模組目錄</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-full bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {allModules.map((mod) => (
                <button
                  key={mod.id}
                  onClick={() => {
                    setActiveTab(mod.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`p-3 rounded-xl text-left border transition flex flex-col space-y-0.5 ${
                    activeTab === mod.id
                      ? 'bg-rose-500/20 border-rose-500 text-white'
                      : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="font-bold text-sm text-white">{mod.label}</span>
                  <span className="text-[11px] text-slate-400">{mod.desc}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-3 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold"
            >
              關閉目錄
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
