// SidebarLayout.js

import React, { useState } from 'react';
import Navbar from './SideNavBars/Navbar';
import Sidebar from './SideNavBars/Sidebar';
import { Outlet } from "react-router-dom";

const SideNavBarsLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div>
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <Outlet />
        </div>
    )
}

export default SideNavBarsLayout;
