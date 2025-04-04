import Footer from '@/components/footer';
import { NavGuest } from '@/components/nav-guest';
import React from 'react';

export default function GuestLayout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <NavGuest />

            {children}

            <Footer />
        </main>
    );
}
