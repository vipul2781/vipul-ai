import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Hub from './hub/Hub';
import AppSwitcher from './components/AppSwitcher';

// Code-split each sub-application for optimal load performance
const DiscussHubApp = lazy(() => import('./apps/discusshub/DiscussHubApp'));
const NovaStoreApp = lazy(() => import('./apps/nova-store/NovaStoreApp'));
const ShadowCaseApp = lazy(() => import('./apps/shadow-case/ShadowCaseApp'));
const SkillHubApp = lazy(() => import('./apps/skillhub/SkillHubApp'));
const RoommateFinderApp = lazy(() => import('./apps/roommate-finder/RoommateFinderApp'));

function AppLoadingFallback({ appName }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0f',
        color: '#f0f0f5',
        fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          border: '3px solid rgba(168, 85, 247, 0.2)',
          borderTopColor: '#a855f7',
          animation: 'vipulSpin 0.75s linear infinite',
        }}
      />
      <p style={{ marginTop: '16px', fontSize: '0.95rem', color: '#9ca3af', letterSpacing: '0.2px' }}>
        Loading {appName}...
      </p>
      <style>{`@keyframes vipulSpin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // 1. DiscussHub sub-application
  if (pathname.startsWith('/discusshub')) {
    return (
      <BrowserRouter basename="/discusshub">
        <AppSwitcher currentAppId="discusshub" />
        <Suspense fallback={<AppLoadingFallback appName="DiscussHub" />}>
          <DiscussHubApp />
        </Suspense>
      </BrowserRouter>
    );
  }

  // 2. Nova Store sub-application
  if (pathname.startsWith('/nova-store')) {
    return (
      <BrowserRouter basename="/nova-store">
        <AppSwitcher currentAppId="nova-store" />
        <Suspense fallback={<AppLoadingFallback appName="Nova Store" />}>
          <NovaStoreApp />
        </Suspense>
      </BrowserRouter>
    );
  }

  // 3. ShadowCase sub-application
  if (pathname.startsWith('/shadow-case')) {
    return (
      <BrowserRouter basename="/shadow-case">
        <AppSwitcher currentAppId="shadow-case" />
        <Suspense fallback={<AppLoadingFallback appName="ShadowCase" />}>
          <ShadowCaseApp />
        </Suspense>
      </BrowserRouter>
    );
  }

  // 4. SkillHub sub-application
  if (pathname.startsWith('/skillhub')) {
    return (
      <BrowserRouter basename="/skillhub">
        <AppSwitcher currentAppId="skillhub" />
        <Suspense fallback={<AppLoadingFallback appName="SkillHub" />}>
          <SkillHubApp />
        </Suspense>
      </BrowserRouter>
    );
  }

  // 5. Roommate Finder sub-application
  if (pathname.startsWith('/roommate-finder')) {
    return (
      <BrowserRouter basename="/roommate-finder">
        <AppSwitcher currentAppId="roommate-finder" />
        <Suspense fallback={<AppLoadingFallback appName="Roommate Finder" />}>
          <RoommateFinderApp />
        </Suspense>
      </BrowserRouter>
    );
  }

  // Default: Unified Central Project Hub
  return (
    <BrowserRouter basename="/">
      <Hub />
    </BrowserRouter>
  );
}
