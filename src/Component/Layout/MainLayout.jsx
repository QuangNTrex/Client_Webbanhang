// src/layouts/MainLayout.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <Header />
      <main style={{ padding: '20px', minHeight: '70vh' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
