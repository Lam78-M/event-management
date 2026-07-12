import CommunityStats from "@/components/CommunityStats";
import EventsStats from "@/components/EventsStats";
import Hero from "@/components/Hero";
import SuccessStories from "@/components/SuccessStories";
import WhyChooseDevEvents from "@/components/WhyChooseDevEvents";


export default function Home() {
  return (
  <div>
  <Hero/>
  <EventsStats/>
  <WhyChooseDevEvents/>
  <SuccessStories/>
  <CommunityStats/>
  </div>
  );
}
