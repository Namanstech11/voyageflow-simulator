import { useState } from "react";
import { RegistrationForm } from "@/components/RegistrationForm";
import { TravelBlog } from "@/components/TravelBlog";
import { PriceCalculator } from "@/components/PriceCalculator";
import { ConfirmationPage } from "@/components/ConfirmationPage";

type PageView = "registration" | "blog" | "calculator" | "confirmation";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<PageView>("registration");

  const handlePageChange = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {currentPage === "registration" && (
          <RegistrationForm onSuccess={() => handlePageChange("blog")} />
        )}
        {currentPage === "blog" && (
          <TravelBlog onNext={() => handlePageChange("calculator")} />
        )}
        {currentPage === "calculator" && (
          <PriceCalculator onConfirm={() => handlePageChange("confirmation")} />
        )}
        {currentPage === "confirmation" && (
          <ConfirmationPage onStartOver={() => handlePageChange("registration")} />
        )}
      </main>
      
      <footer className="bg-muted/30 border-t border-border py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground mb-4">Created By</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="text-sm">
                <p className="font-medium text-foreground">Naman Sharma</p>
                <p className="text-muted-foreground">E23CSEU1424</p>
              </div>
              <div className="text-sm">
                <p className="font-medium text-foreground">Mukul Mangal</p>
                <p className="text-muted-foreground">E23CSEU1420</p>
              </div>
              <div className="text-sm">
                <p className="font-medium text-foreground">Harsh Khandelwal</p>
                <p className="text-muted-foreground">E23CSEU1340</p>
              </div>
              <div className="text-sm">
                <p className="font-medium text-foreground">Raghav Bhradwaj</p>
                <p className="text-muted-foreground">E23CSEU1406</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
