"use client";


import SkillsInfo from "@/components/SkillsInfo";
import UserInfo from "@/components/UserInfo";
import SparklesText from "@/components/ui/sparkles-text";
import { MarqueeDemo } from "@/components/ui/Footer";
import Navbar from "@/components/Navbar";

import RechartProgressLineChart from "@/components/graphs/RechartProgressLineChart";
import SucessFailureRadialStackedChart from "@/components/graphs/SucessFailureRadialStackedChart";
import SkillsPieChart from "@/components/graphs/SkillsPieChart";
import LevelGrandBarChart from "@/components/graphs/LevelGrandBarChart";
import { useQuery } from "@apollo/client"; // Or your data-fetching method
import { ALL_USERS_LEVEL_COUNT, XP_RANGE_DATA } from "@/graphql/queries"; // Adjust the path as necessary

export default function Home() {
 // Example query hooks
const levelQuery = useQuery(ALL_USERS_LEVEL_COUNT);
const xpQuery = useQuery(XP_RANGE_DATA);

console.log("levelQuery.data ", levelQuery.data);
console.log("xpQuery.data ",xpQuery.data);

if (levelQuery.loading || xpQuery.loading) return <div>Loading...</div>;
if (levelQuery.error || xpQuery.error) return <div>Error loading data</div>;

  return (
    <>

     <main className="grid grid-cols-1 gap-4 p-4 items-center justify-items-center w-full ">
      <Navbar />
  
        <div className="px-4 py-8">
          <SparklesText text="😎Welcome, Visionary" />
          <SparklesText text="Full-Stack Engineer!😎" />
        
        </div>
        <div>
        <div >
          <UserInfo />
        </div>
        {/* graphs section */}
        <div className="container grid grid-cols-1 gap-10">
         <SkillsInfo />
         <RechartProgressLineChart />
         <SucessFailureRadialStackedChart />
         <SkillsPieChart />
         {/* <LevelGrandBarChart/> */}
       
        </div>
        </div>
      </main>
      <div className="w-full overflow-hidden">
        <MarqueeDemo />
      </div>
    </>
  );
}
