import { Fugaz_One, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: "400" });

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "Broodl",
  description: "Track your daily mood every day of the year",
};

export default function RootLayout({ children }) {
  const header = (
    <header className="p-4 sm:p-8 flex item-center justify-between gap-4">
      <h1 className={"text-base sm:text-lg textGradient " + fugaz.className}>
        Broodl
      </h1>
    </header>
  );

  const footer = <footer className="p-4 sm:p-8">footer</footer>;

  return (
    <html lang="en">
      <body
        className={
          "w-full max-width-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col "
        }
      >
        {header}
        {children}
        {footer}
      </body>
    </html>
  );
}
