import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WeatherWidget from "@/components/WeatherWidget";
import CitiesSection from "@/components/CitiesSection";
import CityExplorer from "@/components/CityExplorer";
import CurrencyConverter from "@/components/CurrencyConverter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <WeatherWidget />
        <CityExplorer />
        <CitiesSection />
        <CurrencyConverter />
      </main>
      <Footer />
    </>
  );
}
