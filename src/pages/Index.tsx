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
    <>
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
    </>
  );
};

export default Index;
