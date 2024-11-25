import { Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import Conversation from './conversation/Conversation';
import About from './About';
import PageNotFound from './PageNotFound';
import { useMediaQuery } from './hooks';
import { useState, useEffect } from 'react';
import Setting from './settings';
import './locale/i18n';
import { Outlet } from 'react-router-dom';
import { SharedConversation } from './conversation/SharedConversation';
import { useDarkTheme } from './hooks';

function MainLayout() {
  const { isMobile } = useMediaQuery();
  const [navOpen, setNavOpen] = useState(!isMobile);

  return (
    <div className="dark:bg-raisin-black relative h-screen overflow-auto">
      <Navigation navOpen={navOpen} setNavOpen={setNavOpen} />
      <div
        className={`h-[calc(100dvh-64px)] md:h-screen ${
          !isMobile
            ? `ml-0 ${!navOpen ? 'md:mx-auto lg:mx-auto' : 'md:ml-72'}`
            : 'ml-0 md:ml-16'
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    document.title = 'Trendhubs 🦖';
  }, []);

  const [, , componentMounted] = useDarkTheme();
  if (!componentMounted) {
    return <div />;
  }
  return (
    <div className="h-full relative overflow-auto">
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Conversation />} />
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<Setting />} />
        </Route>
        <Route path="/share/:identifier" element={<SharedConversation />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
