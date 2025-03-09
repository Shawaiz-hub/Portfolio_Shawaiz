
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Services = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        <section className="container py-12 md:py-20">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Services</h1>
          <p className="text-muted-foreground text-lg mb-12 max-w-2xl">
            Professional services I offer to clients, including web development,
            application design, and consulting.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* This is a placeholder for services content */}
            <div className="h-64 bg-accent rounded-lg flex items-center justify-center">
              Services content coming soon
            </div>
            <div className="h-64 bg-accent rounded-lg flex items-center justify-center">
              Services content coming soon
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
