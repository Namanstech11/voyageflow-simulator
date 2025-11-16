import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import santoriniImg from "@/assets/santorini.jpg";
import parisImg from "@/assets/paris.jpg";
import tokyoImg from "@/assets/tokyo.jpg";
import romeImg from "@/assets/rome.jpg";
import baliImg from "@/assets/bali.jpg";

interface TravelBlogProps {
  onNext: () => void;
}

const destinations = [
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    image: santoriniImg,
    description: "Experience the magic of Santorini with its iconic white-washed buildings and stunning sunsets over the Aegean Sea. This Greek paradise offers breathtaking views, romantic atmosphere, and world-class cuisine.",
    highlights: ["Blue-domed churches", "Volcanic beaches", "Sunset in Oia", "Wine tasting"],
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    image: parisImg,
    description: "Fall in love with the City of Light. Paris enchants visitors with its timeless elegance, from the iconic Eiffel Tower to charming cobblestone streets. Indulge in world-class art, exquisite cuisine, and romantic ambiance.",
    highlights: ["Eiffel Tower", "Louvre Museum", "Seine River cruise", "Croissants & cafés"],
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    image: tokyoImg,
    description: "Discover where ancient traditions meet futuristic innovation. Tokyo offers a unique blend of serene temples, neon-lit streets, cutting-edge technology, and unforgettable culinary experiences.",
    highlights: ["Mount Fuji views", "Cherry blossoms", "Shibuya crossing", "Authentic sushi"],
  },
  {
    id: "rome",
    name: "Rome",
    country: "Italy",
    image: romeImg,
    description: "Step back in time in the Eternal City. Rome captivates with its ancient ruins, magnificent art, and mouthwatering Italian cuisine. Every corner tells a story thousands of years old.",
    highlights: ["Colosseum", "Vatican City", "Trevi Fountain", "Authentic pasta"],
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    image: baliImg,
    description: "Find your paradise in the Island of Gods. Bali offers pristine beaches, lush rice terraces, spiritual temples, and warm hospitality. Perfect for adventure seekers and those seeking tranquility.",
    highlights: ["Rice terraces", "Beach clubs", "Ancient temples", "Spa retreats"],
  },
];

export const TravelBlog = ({ onNext }: TravelBlogProps) => {
  const [activeSection, setActiveSection] = useState("santorini");

  useEffect(() => {
    const handleScroll = () => {
      const sections = destinations.map((dest) => {
        const element = document.getElementById(dest.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return { id: dest.id, top: Math.abs(rect.top) };
        }
        return null;
      }).filter(Boolean);

      const closest = sections.reduce((prev, curr) => 
        curr && (!prev || curr.top < prev.top) ? curr : prev
      );

      if (closest) {
        setActiveSection(closest.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-border shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold bg-gradient-ocean bg-clip-text text-transparent">
              VoyageFlow
            </h2>
            <div className="hidden md:flex gap-4">
              {destinations.map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => scrollToSection(dest.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                    activeSection === dest.id
                      ? "bg-gradient-ocean text-primary-foreground shadow-soft"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {dest.name}
                </button>
              ))}
            </div>
          </div>
          <div className="md:hidden flex gap-2 mt-3 overflow-x-auto pb-2">
            {destinations.map((dest) => (
              <button
                key={dest.id}
                onClick={() => scrollToSection(dest.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-smooth ${
                  activeSection === dest.id
                    ? "bg-gradient-ocean text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:text-foreground bg-muted"
                }`}
              >
                {dest.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Destinations */}
      <div className="container mx-auto px-4 py-12 space-y-20">
        {destinations.map((dest, index) => (
          <section
            key={dest.id}
            id={dest.id}
            className="scroll-mt-28 animate-in slide-in-from-bottom-8"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className={index % 2 === 1 ? "md:order-2" : ""}>
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="rounded-2xl shadow-strong w-full h-[400px] object-cover hover:scale-105 transition-smooth"
                />
              </div>
              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-4xl font-bold text-foreground mb-2">{dest.name}</h3>
                    <p className="text-xl text-accent">{dest.country}</p>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">{dest.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Highlights:</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {dest.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-center text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-gradient-sunset mr-2" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Next Button */}
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-gradient-hero rounded-2xl p-12 shadow-strong">
          <h3 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Plan Your Trip?
          </h3>
          <p className="text-primary-foreground/90 mb-8 text-lg">
            Let's customize your perfect travel package
          </p>
          <Button onClick={onNext} variant="travel" size="lg">
            Build Your Itinerary <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};
