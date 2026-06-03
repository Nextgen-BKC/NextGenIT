
import type { Metadata } from "next";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Events from "@/components/Events";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Members from "@/components/Members";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Itclub Butwal Kalika Campus - Learn IT, Programming & Web Development",
  description: "Join Itclub Butwal Kalika Campus community. Learn programming, web development, and advance your IT skills with experienced mentors and hands-on projects.",
  keywords: "IT club, programming, web development, Butwal, Kalika campus, coding",
  openGraph: {
    title: "Itclub Butwal Kalika Campus",
    description: "Learn IT, programming, and web development with our active community",
    type: "website",
    url: "https://itclub-butwal.com",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Itclub Butwal Kalika Campus Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Itclub Butwal Kalika Campus",
    description: "Learn IT, programming, and web development with our community",
    images: ["/logo.png"],
  },
};

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
