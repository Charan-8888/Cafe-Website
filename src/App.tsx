// CO5: SPA routing fundamentals; lazy loading; rendering boundaries
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ReservationProvider } from './context/ReservationContext';
import { OrderProvider } from './context/OrderContext';

// Performance Tuning: Lazy loading routes (CO5)
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const MenuPage = lazy(() => import('./pages/MenuPage').then(m => ({ default: m.MenuPage })));
const ReservationPage = lazy(() => import('./pages/ReservationPage').then(m => ({ default: m.ReservationPage })));
const isGitHubPages = typeof window !== 'undefined' && window.location.hostname.includes('github.io');

const App: React.FC = () => {
    return (
        <OrderProvider>
        <ReservationProvider>
            <BrowserRouter basename={isGitHubPages ? "/Cafe-Website" : ""}>
                <Suspense fallback={
                    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#110e0c', color: '#c68e17', fontFamily: 'Playfair Display, serif', fontSize: '1.5rem' }}>
                        Loading Aura...
                    </div>
                }>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="menu" element={<MenuPage />} />
                            <Route path="book" element={<ReservationPage />} />
                        </Route>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </ReservationProvider>
        </OrderProvider>
    );
};

export default App;
