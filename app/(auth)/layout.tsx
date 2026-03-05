import AuthContext from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import "@/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rashed's Academy",
  description: "Quality education for a brighter tomorrow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" cz-shortcut-listen="true">
        <ThemeProvider>
          <LanguageProvider>
            <AuthContext>
              {children}
            </AuthContext>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
