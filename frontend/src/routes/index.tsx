import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@clerk/clerk-react";
import Banner from "../components/Banner/banner";
import ReviewsCarousel from "../components/ReviewsCarousel/reviewsCarousel";
import FootersHomePage from "../components/FootersHomePage/footersHomePage";
import Stores from "../components/Stores/stores";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  if (isSignedIn) {
    navigate({ to: `/dashboard` });
  }

 
  return (
    <div className="w-full h-screen">
      <Banner />
      <ReviewsCarousel />
      <Stores />
      <FootersHomePage />
    </div>
  );
}
