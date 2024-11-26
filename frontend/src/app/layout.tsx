import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import "../styles/globals.css";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Country Info App",
  description: "This app displays every country on earth and its details.",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
