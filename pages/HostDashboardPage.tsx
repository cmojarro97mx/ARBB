
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import OnboardingStepper from '../components/OnboardingStepper';
import MainDashboard from '../components/MainDashboard';
import SideMenu from '../components/SideMenu';
import SettingsView from '../components/SettingsView';

export type ViewType = 'dashboard' | 'configuracion';

const HostDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [contentView, setContentView] = useState<ViewType>('dashboard');
  const [animationClass, setAnimationClass] = useState('animate-fade-in');
  const [isContractPending, setIsContractPending] = useState(false);
  const transitionTimeoutRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (user) {
        if (sessionStorage.getItem(`contract_status_${user.id}`) === 'pending') {
            setIsContractPending(true);
        }
    }
  }, [user]);

  useEffect(() => {
    // Cleanup timeout on component unmount
    return () => {
        if (transitionTimeoutRef.current) {
            clearTimeout(transitionTimeoutRef.current);
        }
    };
  }, []);

  const handleNavigate = (view: ViewType) => {
    if (view === activeView) {
        return;
    }

    if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
    }
    
    setAnimationClass('animate-fade-out');
    
    transitionTimeoutRef.current = window.setTimeout(() => {
        setActiveView(view);
        setContentView(view);
        setAnimationClass('animate-fade-in');
        transitionTimeoutRef.current = null;
    }, 200); // This duration must match the fade-out animation duration
  };

  if (!user) return null;

  // Onboarding flow has its own layout without the side menu
  if (!user.onboardingComplete) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          <OnboardingStepper />
        </main>
      </div>
    );
  }

  const renderContent = () => {
    switch (contentView) {
      case 'dashboard':
        return <MainDashboard isContractPending={isContractPending} onNavigate={handleNavigate} />;
      case 'configuracion':
        return <SettingsView />;
      default:
        return <MainDashboard isContractPending={isContractPending} onNavigate={handleNavigate} />;
    }
  };

  // Dashboard flow has the new layout with a persistent side menu
  return (
    <div className="bg-alasla-gray-light">
        <SideMenu activeView={activeView} onNavigate={handleNavigate} />
        <div className="ml-20">
            <main className="p-4 sm:p-6 lg:p-8 min-h-screen">
                <div className={animationClass}>
                    {renderContent()}
                </div>
            </main>
        </div>
    </div>
  );
};

export default HostDashboardPage;
