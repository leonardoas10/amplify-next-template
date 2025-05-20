'use client';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './app.css';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const inter = Inter({ subsets: ['latin'] });

// Metadata can't be exported from a client component in Next.js App Router
// Moving this to a separate file or using other methods for metadata

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Authenticator>{children}</Authenticator>
            </body>
        </html>
    );
}
