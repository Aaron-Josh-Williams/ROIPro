import React from 'react';
import Image from 'next/image';
import roiProImage from '/ROIPRO_logo.jpg'; // Make sure the path is correct
import { SignIn } from '@clerk/nextjs'; // Assuming you're using a Clerk-provided SignIn component
import Head from 'next/head';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Head>
                {/* Favicon */}
                <link rel="icon" href="/app/favicon.ico" />
                {/* Google Fonts */}
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap" rel="stylesheet" />
                {/* Add custom styles or link to your stylesheet */}
                <style>{`
                    body {
                        font-family: 'Open Sans', sans-serif;
                    }
                    .auth-container {
                        border: 1px solid #e2e8f0;
                        border-radius: 8px;
                        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                        background: #fff; /* Ensure text container background is white */
                    }
                `}</style>
            </Head>
            <div 
                style={{
                    backgroundImage: `url(https://cdn.hero.page/wallpapers/950a7800-fdbe-456a-bdd0-f2a8491fb944-charcoal-cityscape-sketched-reality-wallpaper-1.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    minHeight: '100vh',
                }}
                className="flex flex-col justify-center items-center min-h-screen"
            >
                <div className="auth-container flex flex-col items-center p-6 rounded-lg">
                    <div className="mb-8">
                        {/* Use Next.js Image component for optimized image loading */}
                        <Image 
                            src={roiProImage} 
                            alt="ROIPro Logo" 
                            width={250} // Slightly wider
                            height={150} // Adjust height accordingly
                            className="rounded-bottom" // Rounded corners
                        />
                    </div>
                    <div className="w-96 mr-10"> {/* Adjust the width if necessary */}
                        {/* SignIn component and children will inherit the styles */}
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
