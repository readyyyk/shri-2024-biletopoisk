import type { ReactNode } from 'react';

import '@fontsource/roboto';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import { UserContextProvider } from '@/app/userContext.tsx';
import Header from '@/components/Header';
import LoginModal from '@/components/LoginModal/LoginModal.tsx';
import { LoginContextProvider } from '@/components/LoginModal/login-modal-context.tsx';
import '@/index.css';

const roboto = Roboto({
    preload: true,
    weight: ['400', '700'],
    subsets: ['cyrillic', 'latin'],
});

export const metadata: Metadata = {
    title: 'Bileto-Poisk',
    description: 'My App is a...',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="ru" className={roboto.className}>
            <body>
                <div
                    id="root"
                    className="min-h-screen bg-[#ededed] flex flex-col"
                >
                    <LoginContextProvider>
                        <UserContextProvider>
                            <Header />
                            <div className="px-8 py-5 flex flex-1">
                                {children}
                            </div>
                            <LoginModal />
                        </UserContextProvider>
                    </LoginContextProvider>
                </div>
            </body>
        </html>
    );
}
