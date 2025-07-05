import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar/>
      <HeroSection/>
      <Footer/>
    </>

    // <div className="flex flex-col min-h-screen  dark:bg-black-900">
    //   <main className="flex  gap-[32px]  items-center justify-center sm:items-start">
    //     <HeroSection/>
    //   </main>
    //   <footer>
    //     <Footer/>
    //   </footer>
    //   {/* <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
    //   </footer> */}
    // </div>
  );
}
