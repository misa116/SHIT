/* import React, { useState } from "react";
import Header from "../header/Header";
import Sidebar from "../header/Sidebar";

const Layout = ({ children }) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  
  const openSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  
  return (
    <div className="grid-container">
      <Header openSidebar={openSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        openSidebar={openSidebar}
      />
      <main className="main-container">{children}</main>
    </div>
  );
};

export default Layout;

/*/

import React, { useState } from "react";
import Header from "../header/Header";
import Sidebar from "../header/Sidebar";

const Layout = ({ children }) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const toggleSidebar = () => setOpenSidebarToggle(!openSidebarToggle);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        openSidebar={toggleSidebar}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header openSidebar={toggleSidebar} />

        <main className="flex-1 overflow-auto p-6 bg-gray-800">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
