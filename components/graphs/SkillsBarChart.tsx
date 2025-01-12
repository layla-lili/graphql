"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis, LabelList, Cell } from "recharts";
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


const SkillsBarChart = () => {
  const { data, loading, error } = useQuery(SKILLS);
  const skillSummary: { [key: string]: number } = {};

  // const colors = [
  //   "var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)",
  //   "var(--chart-6)", "var(--chart-7)", "var(--chart-8)", "var(--chart-9)", "var(--chart-10)",
  //   "var(--chart-11)", "var(--chart-12)", "var(--chart-13)", "var(--chart-14)", "var(--chart-15)",
  // ];
  const colors = [
    "#2662d9", // --chart-1
    "#e23670", // --chart-2
    "#e88c30", // --chart-3
    "#af57db", // --chart-4
    "#2eb88a", // --chart-5
  ];

  if (data?.transaction) {
    data.transaction.forEach((transaction: { type: any; amount: any }) => {
      const skillType = transaction.type;
      const amount = transaction.amount;

      if (skillSummary[skillType]) {
        skillSummary[skillType] += amount;
      } else {
        skillSummary[skillType] = amount;
      }
    });
  }

  const totalAmount = Object.values(skillSummary).reduce(
    (acc, value) => acc + value,
    0
  );

  const barChartData = Object.entries(skillSummary)
  .filter(([skill, amount]) => skill && skill.trim() !== "" && amount > 0)
  .map(([skill, amount], index) => ({
    skillName: skill.replace(/^skill_/, "").replace(/_/g, " "),
    skillRatio: Math.round((amount / totalAmount) * 100),
    fill: colors[index % colors.length], // Assign color dynamically
  }))
  .sort((a, b) => b.skillRatio - a.skillRatio) // Take the top 5 skills

  const chartConfig: { [key: string]: { label: string } } = {
    skills: {
      label: "Percentage (%)",
    },
    // Define additional skills and colors here if needed
  };

  return (
    <Card >
      {" "}
      {/* Full width */}
      <CardHeader>
        <CardTitle>Skills Bar Chart - Mixed</CardTitle>
        <CardDescription>Overview of skills used</CardDescription>
      </CardHeader>
      <CardContent>
        {" "}
        {/* Full width */}
        <ChartContainer config={chartConfig}>
          {/* <BarChart data={barChartData} layout="vertical" margin={{ left: 0 }}> */}
          {/* <BarChart data={barChartData} layout="vertical" margin={{ top: 20, right: 120, bottom: 20, left: 30 }}> */}
          <BarChart
            data={barChartData}
            layout="vertical"
            margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
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
            <XAxis dataKey="skillRatio" type="number" hide />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {/* <Bar dataKey="skillRatio" layout="vertical" radius={5}> */}
            {/* <Bar dataKey="skillRatio" layout="vertical" radius={5} barSize={25}>  */}
            {/* Adjusted bar size for spacing */}
            {/* <LabelList dataKey="skillRatio" position="right" /> */}
            {/* </Bar> */}
            {/* <Bar dataKey="skillRatio" radius={5} barSize={25} /> */}
            <Bar
    dataKey="skillRatio"
    radius={5}
    barSize={20}
    isAnimationActive={true}
  >
    {barChartData.map((entry, index) => (
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
