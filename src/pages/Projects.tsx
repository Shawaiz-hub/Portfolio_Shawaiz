
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Projects = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        <section className="container py-12 md:py-20">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Projects</h1>
          <p className="text-muted-foreground text-lg mb-12 max-w-2xl">
            Detailed view of my projects with in-depth descriptions and technical specifications.
          </p>
          
          <div className="grid grid-cols-1 gap-8">
            {/* This is a placeholder for projects content */}
            <div className="h-64 bg-accent rounded-lg flex items-center justify-center">
              Projects content coming soon
            </div>
            <div className="h-64 bg-accent rounded-lg flex items-center justify-center">
              Projects content coming soon
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
