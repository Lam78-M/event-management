import CommunityStats from "@/components/CommunityStats";
import Hero from "@/components/Hero";
import SuccessStories from "@/components/SuccessStories";
import WhyChooseDevEvents from "@/components/WhyChooseDevEvents";


export default function Home() {
  return (
  <div>
  <Hero/>
  <WhyChooseDevEvents/>
  <SuccessStories/>
  <CommunityStats/>
  </div>
  );
}
