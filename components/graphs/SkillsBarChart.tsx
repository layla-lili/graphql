"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis, Cell, Tooltip, CartesianGrid } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@apollo/client";
import { SKILLS } from "@/graphql/queries";

// Define types for transactions and query response
interface Transaction {
  type: string; // Transaction type
  amount: number; // Transaction amount (percentage)
}

interface SkillsData {
  transaction: Transaction[]; // Array of transactions
}

// Define the props for the custom tooltip
interface CustomTooltipProps {
  active?: boolean; // Optional, as it may not always be active
  payload?: { payload: { skillName: string; skillRatio: number } }[]; // Optional, as it may be undefined
}

const SkillsBarChart: React.FC = () => {
  const { data, loading, error } = useQuery<SkillsData>(SKILLS);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const colors = [
    "#2662d9", // --chart-1
    "#e23670", // --chart-2
    "#e88c30", // --chart-3
    "#af57db", // --chart-4
    "#2eb88a", // --chart-5
  ];

  // Initialize an object to track the maximum amount for each skill
  const skillSummary: { [key: string]: number } = {};

  // Iterate through the transactions to find the maximum amount for each skill
  data?.transaction.forEach((transaction) => {
    const skillType = transaction.type;
    const amount = transaction.amount;

    if (amount > 0) { // Only consider positive amounts
      if (!skillSummary[skillType] || skillSummary[skillType] < amount) {
        skillSummary[skillType] = amount; // Store the maximum amount
      }
    }
  });

  // Map the skill summary to the format required for the bar chart
  const barChartData = Object.entries(skillSummary)
    .map(([skillType, amount]) => ({
      skillName: skillType.replace(/^skill_/, "").replace(/_/g, " "), // Clean up the skill name
      skillRatio: amount, // Use the maximum amount directly
    }))
    .sort((a, b) => b.skillRatio - a.skillRatio); // Sort by skill ratio

  // Assign colors dynamically without repeating adjacent colors
  const coloredChartData = barChartData.map((entry, index) => {
    const colorIndex = index % colors.length; // Cycle through colors
    return {
      ...entry,
      fill: colors[colorIndex],
    };
  });

  const chartConfig: { [key: string]: { label: string } } = {
    skills: {
      label: "Percentage (%)",
    },
  };

  // Custom tooltip component
  const CustomTooltip: React.FC<CustomTooltipProps> = (props) => {
    const { active, payload } = props;

    if (active && payload && payload.length) {
      const {  skillRatio } = payload[0].payload;
      
      return (
        <div className=" border border-gray-300 rounded p-2" style={{ backgroundColor: "hsl(var(--card))"}}>
          <p>{`skillRatio: ${skillRatio}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card style={{ height: '100%', width: '100%' }}  > 
      <CardHeader>
        <CardTitle>Skills Bar Chart - Mixed</CardTitle>
        <CardDescription>Overview of skills used</CardDescription>
      </CardHeader>
      <CardContent >
        <ChartContainer config={chartConfig}   > 
          <BarChart
            data={coloredChartData}
            layout="vertical"
           margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
            // margin={{ top: 20, right: 30, bottom: -40, left: 30 }} 
          

          >
            <YAxis
              dataKey="skillName"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              interval={0}
              padding={{ top: 10, bottom: 10 }}
              
            />
              {/* <CartesianGrid vertical={true} /> */}
            <XAxis dataKey="skillRatio" type="number" hide />

            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="skillRatio"
              radius={5}
              barSize={20}
              isAnimationActive={true}
              className="mb-2"
              
            >
              {coloredChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Showing percentage of skills used <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground"></div>
      </CardFooter>
    </Card>
  );
};

export default SkillsBarChart;