// @/app/page.tsx
"use client" // Bu satırın olduğundan emin olun

import SideNavbar from "@/components/SideNavbar";
import TransitionWrapper from "@/components/TransitionWrapper";

import HomePage from "@/pages/HomePage/HomePage";
import AboutPage from "@/pages/AboutPage/AboutPage";
import ContactPage from "@/pages/ContactPage/ContactPage";
import PortfolioPage from "@/pages/PortfolioPage/PortfolioPage";

import { useState } from "react";
import React from 'react';

export default function App() {
  const [currentPage, setPage] = useState("#home");

  const renderCurrentPage = (): React.ReactElement => {

    return (
      <div className="page-content-wrapper">
        {(() => {
          switch (currentPage) {
            case "#home":
              return <HomePage />;
            case "#about":
              return <AboutPage />;
            case "#portfolio":
              return <PortfolioPage />;
            case "#contact":
              return <ContactPage />;
            default:
              return <HomePage />;
          }
        })()}
      </div>
    );
  };

  return (
    <>
      <TransitionWrapper pageKey={currentPage} classNames="curtain-transition">
        <SideNavbar currentPage={currentPage} setPage={setPage} />
        {renderCurrentPage()}
      </TransitionWrapper>
    </>
  );
}