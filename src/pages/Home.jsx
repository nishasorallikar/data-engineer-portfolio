import React, { lazy, Suspense } from 'react';
import Hero from '../components/Hero';
import Work from '../components/Work';
import { About, Contact } from '../components/Contact';

// Stack is 43 kB — lazy load so it doesn't bloat the Home chunk
const Stack = lazy(() => import('../components/Stack'));

const Home = () => {
    return (
        <>
            <Hero />
            <Work />
            <Suspense fallback={<div className="py-24" />}>
                <Stack />
            </Suspense>
            <About />
            <Contact />
        </>
    );
};

export default Home;
