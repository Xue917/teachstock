import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BeginnerGuide from './components/BeginnerGuide';
import MarketClassroom from './components/MarketClassroom';
import CompanyResearch from './components/CompanyResearch';
import AdvancedTechnical from './components/AdvancedTechnical';
import StockEvaluator from './components/StockEvaluator';
import MasterLibrary from './components/MasterLibrary';
import Toolbox from './components/Toolbox';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('guide');

  // Scroll to top when changing tab
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-rose-500 selection:text-white">
      {/* Top Header Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {activeTab === 'guide' && (
          <BeginnerGuide
            onJumpToToolbox={() => setActiveTab('toolbox')}
            onJumpToMarket={() => setActiveTab('market')}
          />
        )}
        {activeTab === 'market' && <MarketClassroom />}
        {activeTab === 'research' && <CompanyResearch />}
        {activeTab === 'advanced' && <AdvancedTechnical />}
        {activeTab === 'evaluator' && <StockEvaluator />}
        {activeTab === 'masters' && <MasterLibrary />}
        {activeTab === 'toolbox' && <Toolbox />}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
