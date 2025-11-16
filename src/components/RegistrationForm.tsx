import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Modal } from "./Modal";
import { UserPlus } from "lucide-react";

interface RegistrationFormProps {
  onSuccess: () => void;
}

export const RegistrationForm = ({ onSuccess }: RegistrationFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pinCode: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showModal, setShowModal] = useState(false);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "phone":
        if (!/^\d{10}$/.test(value)) {
          return "Phone number must be exactly 10 digits";
        }
        break;
      case "pinCode":
        if (!/^\d{6}$/.test(value)) {
          return "PIN code must be exactly 6 digits";
        }
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Please enter a valid email address";
        }
        break;
      case "name":
        if (value.trim().length < 2) {
          return "Name must be at least 2 characters";
        }
        break;
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Real-time validation
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setTimeout(onSuccess, 300);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-ocean py-12 px-4">
        <div className="bg-card rounded-2xl shadow-strong max-w-lg w-full p-8 animate-in slide-in-from-bottom-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-sunset mb-4">
              <UserPlus className="w-8 h-8 text-secondary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Join VoyageFlow</h1>
            <p className="text-muted-foreground">Start your journey to amazing destinations</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "border-destructive" : ""}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "border-destructive" : ""}
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (10 digits)</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? "border-destructive" : ""}
                placeholder="9876543210"
                maxLength={10}
              />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pinCode">PIN Code (6 digits)</Label>
              <Input
                id="pinCode"
                name="pinCode"
                type="text"
                value={formData.pinCode}
                onChange={handleChange}
                className={errors.pinCode ? "border-destructive" : ""}
                placeholder="560001"
                maxLength={6}
              />
              {errors.pinCode && <p className="text-sm text-destructive">{errors.pinCode}</p>}
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full">
              Begin Your Journey
            </Button>
          </form>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={handleModalClose}
        title="Registration Successful!"
        message="Welcome to VoyageFlow! Get ready to explore amazing destinations around the world."
        variant="success"
      />
    </>
  );
};
