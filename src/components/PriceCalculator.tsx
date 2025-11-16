import { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Modal } from "./Modal";
import { Plane, Utensils, Activity, DollarSign } from "lucide-react";

interface PriceCalculatorProps {
  onConfirm: () => void;
}

interface Option {
  id: string;
  name: string;
  description: string;
  price: number;
}

const travelOptions: Option[] = [
  { id: "economy", name: "Economy Flight", description: "Comfortable travel experience", price: 500 },
  { id: "business", name: "Business Class", description: "Premium comfort and service", price: 1200 },
  { id: "first", name: "First Class", description: "Ultimate luxury travel", price: 2500 },
  { id: "private", name: "Private Jet", description: "Exclusive private travel", price: 8000 },
];

const foodOptions: Option[] = [
  { id: "local", name: "Local Food Tour", description: "Authentic street food experience", price: 50 },
  { id: "fine", name: "Fine Dining Package", description: "Michelin-star restaurants", price: 300 },
  { id: "cooking", name: "Cooking Classes", description: "Learn traditional recipes", price: 150 },
  { id: "all-inclusive", name: "All-Inclusive Meals", description: "Breakfast, lunch & dinner daily", price: 400 },
];

const activityOptions: Option[] = [
  { id: "city-tour", name: "City Tours", description: "Guided walking tours", price: 80 },
  { id: "adventure", name: "Adventure Package", description: "Hiking, diving, and more", price: 350 },
  { id: "cultural", name: "Cultural Experiences", description: "Museums and monuments", price: 120 },
  { id: "spa", name: "Spa & Wellness", description: "Relaxation and rejuvenation", price: 250 },
  { id: "nightlife", name: "Nightlife Pass", description: "Clubs and entertainment", price: 180 },
];

export const PriceCalculator = ({ onConfirm }: PriceCalculatorProps) => {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  const [showModal, setShowModal] = useState(false);

  const handleToggle = (id: string) => {
    setSelectedOptions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const calculateTotal = () => {
    let total = 0;
    [...travelOptions, ...foodOptions, ...activityOptions].forEach((option) => {
      if (selectedOptions.has(option.id)) {
        total += option.price;
      }
    });
    return total;
  };

  const handleConfirm = () => {
    if (selectedOptions.size === 0) {
      return;
    }
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setTimeout(onConfirm, 300);
  };

  const renderSection = (title: string, icon: React.ReactNode, options: Option[]) => (
    <div className="bg-card rounded-xl p-6 shadow-medium border border-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-ocean flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
      </div>
      <div className="space-y-4">
        {options.map((option) => (
          <div
            key={option.id}
            className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/50 transition-smooth cursor-pointer"
            onClick={() => handleToggle(option.id)}
          >
            <Checkbox
              id={option.id}
              checked={selectedOptions.has(option.id)}
              onCheckedChange={() => handleToggle(option.id)}
            />
            <div className="flex-1">
              <Label htmlFor={option.id} className="font-medium cursor-pointer">
                {option.name}
              </Label>
              <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
            </div>
            <span className="font-bold text-primary">${option.price}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const total = calculateTotal();

  return (
    <>
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Build Your Perfect Trip</h1>
            <p className="text-xl text-muted-foreground">
              Select your travel options and watch your dream vacation come together
            </p>
          </div>

          <div className="space-y-8 mb-8">
            {renderSection(
              "Travel Options",
              <Plane className="w-5 h-5 text-primary-foreground" />,
              travelOptions
            )}
            {renderSection(
              "Food Packages",
              <Utensils className="w-5 h-5 text-primary-foreground" />,
              foodOptions
            )}
            {renderSection(
              "Activities & Experiences",
              <Activity className="w-5 h-5 text-primary-foreground" />,
              activityOptions
            )}
          </div>

          {/* Total Price Display */}
          <div className="sticky bottom-0 left-0 right-0 bg-gradient-hero rounded-xl p-6 shadow-strong border-2 border-primary/20">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-primary-foreground/80 text-sm">Total Package Price</p>
                  <p className="text-3xl font-bold text-primary-foreground">${total.toLocaleString()}</p>
                </div>
              </div>
              <Button
                onClick={handleConfirm}
                disabled={selectedOptions.size === 0}
                variant="travel"
                size="lg"
              >
                Confirm & Continue
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={handleModalClose}
        title="Itinerary Confirmed!"
        message={`Your dream vacation package totaling $${total.toLocaleString()} has been customized. Let's finalize your booking!`}
        variant="success"
      />
    </>
  );
};
