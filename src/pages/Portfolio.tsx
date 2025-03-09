
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Portfolio = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        <section className="container py-12 md:py-20">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Portfolio</h1>
          <p className="text-muted-foreground text-lg mb-12 max-w-2xl">
            Explore my collection of projects showcasing my skills and experience
            as a full-stack developer.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* This is a placeholder for portfolio content */}
            <div className="h-64 bg-accent rounded-lg flex items-center justify-center">
              Portfolio content coming soon
            </div>
            <div className="h-64 bg-accent rounded-lg flex items-center justify-center">
              Portfolio content coming soon
            </div>
            <div className="h-64 bg-accent rounded-lg flex items-center justify-center">
              Portfolio content coming soon
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
