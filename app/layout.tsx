import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';
import './styles/tailwind.css';


const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Client Link Login",
  description: "Client Link Login page",
};

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap" />
          <link rel="icon" href="/favicon.ico" sizes="32x32" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#a6dede" />
          <meta name="theme-color" content="#ffffff" />
        </head>
        <body className={`${inter.className} font-nunito`}>{children}</body>
      </html>
    </StoreProvider>
  );
}
