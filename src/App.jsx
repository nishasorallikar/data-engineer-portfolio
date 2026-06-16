import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Lazy load ALL page components for code splitting
const Home = lazy(() => import('./pages/Home'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const SQLDataWarehouseProject = lazy(() => import('./pages/SQLDataWarehouseProject'));

const PageLoader = () => (
    <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
);

const S = ({ children }) => <Suspense fallback={<PageLoader />}>{children}</Suspense>;

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout><S><Home /></S></MainLayout>} />
            <Route path="/blog" element={<MainLayout><S><Blog /></S></MainLayout>} />
            <Route path="/blog/:id" element={<MainLayout><S><BlogPost /></S></MainLayout>} />
            <Route path="/project/sql-data-warehouse" element={<S><SQLDataWarehouseProject /></S>} />
        </Routes>
    );
}

export default App;
