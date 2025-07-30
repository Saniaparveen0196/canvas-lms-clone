import React, { createContext, useState, useContext } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [desktopOpen, setDesktopOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ desktopOpen, setDesktopOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);