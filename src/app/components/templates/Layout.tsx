import React, { useState } from 'react';
import Sidebar from '../molecules/Sidebar';

export function Layout({ children }: { children: React.ReactNode }) {
  const [sideNavExpanded, setSideNavExpanded] = useState(false);
  const openSideNav = () => {
    setSideNavExpanded(true);
  };
  const closeSideNav = () => {
    setSideNavExpanded(false);
  };
  const RightSide = (
    <div
      className={`${
        sideNavExpanded ? 'w-[calc(100%-13rem)]' : 'w-[calc(100%-72px)]'
      }`}
    >
      {children}
    </div>
  );

  const LeftSideNav = (
    <div
      data-testId="sidebar-nav"
      onClick={openSideNav}
      className={`max-md:hidden ${sideNavExpanded ? 'w-52' : 'w-[72px]'}`}
    >
      <Sidebar sideNavExpanded={sideNavExpanded} closeSideNav={closeSideNav} />
    </div>
  );

  return (
    <div className="flex gap-4 max-w-full min-h-screen">
      {LeftSideNav}
      {RightSide}
    </div>
  );
}
