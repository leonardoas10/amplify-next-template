'use client';

import { Inter } from 'next/font/google';
import './app.css';
// import { Authenticator, View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';

// Configure Amplify on the client side
Amplify.configure(outputs, { ssr: true });

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {/* <Authenticator loginMechanisms={['email']} hideSignUp={false}> */}
                {children}
                {/* </Authenticator> */}
            </body>
        </html>
    );
}
