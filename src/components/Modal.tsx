import { X } from "lucide-react";
import { Button } from "./ui/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  variant?: "success" | "info";
}

export const Modal = ({ isOpen, onClose, title, message, variant = "success" }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-card rounded-xl shadow-strong max-w-md w-full mx-4 animate-in zoom-in-95">
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-2xl font-bold text-foreground">{title}</h3>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-smooth"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-muted-foreground text-base leading-relaxed">{message}</p>
          <Button
            onClick={onClose}
            variant={variant === "success" ? "hero" : "default"}
            size="lg"
            className="w-full"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};
