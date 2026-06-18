import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategorySelection from "@/components/CategorySelection";

export const metadata = {
  title: "OpportunityHub | Find Scholarships, Internships & Careers",
  description: "A one-stop platform for students to discover scholarships, government schemes, educational loans, internships, hackathons, and career guidance.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen bg-slate-50 flex flex-col">
        <AppProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <CategorySelection />
        </AppProvider>
      </body>
    </html>
  );
}
