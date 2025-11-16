import { Button } from "./ui/button";
import { CheckCircle2, Mail, Phone, MapPin, RefreshCw } from "lucide-react";

interface ConfirmationPageProps {
  onStartOver: () => void;
}

export const ConfirmationPage = ({ onStartOver }: ConfirmationPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-card rounded-2xl shadow-strong p-8 md:p-12 animate-in zoom-in-95">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-sunset mb-6">
              <CheckCircle2 className="w-12 h-12 text-secondary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Booking Simulation Complete!
            </h1>
            <p className="text-xl text-muted-foreground">
              Thank you for exploring VoyageFlow
            </p>
          </div>

          <div className="bg-muted rounded-xl p-6 mb-8 space-y-4">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Your Journey Summary
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              You've successfully completed the VoyageFlow experience! Your personalized travel
              itinerary has been crafted with care. In a real-world scenario, you would now receive:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Confirmation email with complete booking details</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>24/7 customer support contact information</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Detailed itinerary with day-by-day activities</span>
              </li>
            </ul>
          </div>

          <div className="border-t border-border pt-6 mb-8">
            <h3 className="font-semibold text-foreground mb-3">What's Next?</h3>
            <p className="text-muted-foreground mb-4">
              This is a demonstration project showcasing interactive web development with HTML, CSS,
              and JavaScript. No actual bookings have been made, and no data has been stored.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={onStartOver} variant="hero" size="lg" className="flex-1">
              <RefreshCw className="w-5 h-5 mr-2" />
              Start New Journey
            </Button>
            <Button variant="outline" size="lg" className="flex-1" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                View Project Code
              </a>
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Built with ❤️ using HTML, CSS, and JavaScript
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              © 2025 VoyageFlow. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
