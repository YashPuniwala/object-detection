import React from "react";
import { useState } from "react";
import { HomePage } from "./components/homePage";
import { DetectionPage } from "./components/detectionPage";
import { AboutPage } from "./components/aboutPage";
import { AnalyticsPage } from './components/analyticsPage';
import { Navigation } from "./components/navigation";

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage setActiveTab={setActiveTab} />;
      case 'detection':
        return <DetectionPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="  ">
      <Navigation
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      {renderContent()}
    </div>
  );
}

export default App;