
import About from "@/components/About";
import Contact from "@/components/Contact";
import Events from "@/components/Events";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Members from "@/components/Members";
import Navbar from "@/components/Navbar";



export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Events />
      <Members />
      <Contact />
      <Footer />
    </>
  );
}
