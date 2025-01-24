import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@apollo/client";
import { SKILLS } from "@/graphql/queries";

// Define the type for the transaction data
interface Transaction {
  type: string;
  amount: number;
}

const SkillsPieChart: React.FC = () => {
  const { data, loading, error } = useQuery<{ transaction: Transaction[] }>(SKILLS);
  const [activeSkill, setActiveSkill] = React.useState<string>("");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const skillSummary: { [key: string]: number } = {};
  const colors = [
    "#2662d9", "#e23670", "#e88c30", "#af57db", "#2eb88a",
  ];

  // Process data to find the maximum amount for each skill
  if (data?.transaction) {
    data.transaction.forEach((transaction) => {
      const skillType = transaction.type;
      const amount = transaction.amount;

      if (!skillSummary[skillType] || skillSummary[skillType] < amount) {
        skillSummary[skillType] = amount; // Store the maximum amount
      }
    });
  }

  // Prepare top skills based on maximum amounts
  const topSkills = Object.entries(skillSummary)
    .filter(([skill, amount]) => skill && skill.trim() !== "" && amount > 0)
    .map(([skill, amount]) => ({
      skillName: skill.replace(/^skill_/, "").replace(/_/g, " "),
      skillRatio: amount,
    }))
    .sort((a, b) => b.skillRatio - a.skillRatio)
    .slice(0, 5); // Get only the top 5 skills

  // Assign colors dynamically while avoiding adjacent colors
  const coloredTopSkills = topSkills.map((entry, index) => {
    const colorIndex = (index === 0) ? 0 : (index % colors.length);
    return {
      ...entry,
      fill: colors[colorIndex],
    };
  });

  const activeSkillData = coloredTopSkills.find(
    (entry) => entry.skillName === activeSkill
  );

  const chartConfig: { [key: string]: { label: string } } = {
    skills: { label: "Percentage (%)" },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Skills Pie Chart</CardTitle>
        <CardDescription>Overview of top skills used</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <div className="mb-4">
          <Select value={activeSkill} onValueChange={setActiveSkill}>
            <SelectTrigger className="ml-auto h-7 w-[130px] rounded-lg pl-2.5" aria-label="Select a skill">
              <SelectValue placeholder="Select skill" />
            </SelectTrigger>
            <SelectContent align="end" className="rounded-xl">
              {coloredTopSkills.map((skill) => (
                <SelectItem key={skill.skillName} value={skill.skillName} className="rounded-lg">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="flex h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: skill.fill }} />
                    {skill.skillName}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <ChartContainer config={chartConfig}>
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={coloredTopSkills}
              dataKey="skillRatio"
              nameKey="skillName"
              innerRadius={50}
              outerRadius={100}
              fill="#8884d8"
              labelLine={false}
              activeIndex={coloredTopSkills.findIndex(skill => skill.skillName === activeSkill)}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector {...props} outerRadius={outerRadius + 25} innerRadius={outerRadius + 12} />
                </g>
              )}
            >
              {coloredTopSkills.map((entry, index) => (
                <Sector key={`sector-${index}`} {...entry} fill={entry.fill} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {activeSkillData?.skillRatio}%
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          {activeSkillData?.skillName}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SkillsPieChart;