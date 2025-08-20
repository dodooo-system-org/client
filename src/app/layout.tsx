import { Footer } from '@/components/global/footer';
import { Header } from '@/components/global/header';
import { RecommendMessage } from '@/components/global/recommend-message';
import { Provider } from '@/components/providers/providers';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: process.env.NEXT_PUBLIC_WEBSITE_NAME,
    description: process.env.NEXT_PUBLIC_WEBSITE_DESCRIPTION,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ToastContainer
                    stacked
                    position="bottom-right"
                    className="text-sm"
                />
                <Provider>
                    <RecommendMessage />
                    <Header />
                    <main>{children}</main>
                    <Footer />
                </Provider>
            </body>
        </html>
    );
}
