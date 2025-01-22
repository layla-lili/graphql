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

  console.log("data from SkillsPieChart", data);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const skillSummary: { [key: string]: number } = {};
  const colors = [
    "#2662d9", "#e23670", "#e88c30", "#af57db", "#2eb88a",
  ];

  // Process data to accumulate skill amounts
  if (data?.transaction) {
    data.transaction.forEach((transaction) => {
      const skillType = transaction.type;
      const amount = transaction.amount;

      skillSummary[skillType] = (skillSummary[skillType] || 0) + amount;
    });
  }

  const totalAmount = Object.values(skillSummary).reduce(
    (acc, value) => acc + value,
    0
  );

  const topSkills = Object.entries(skillSummary)
    .filter(([skill, amount]) => skill && skill.trim() !== "" && amount > 0)
    .map(([skill, amount], index) => ({
      skillName: skill.replace(/^skill_/, "").replace(/_/g, " "),
      skillRatio: Math.round((amount / totalAmount) * 100),
      fill: colors[index % colors.length],
    }))
    .sort((a, b) => b.skillRatio - a.skillRatio)
    .slice(0, 5);

  const activeSkillData = topSkills.find(
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
      <CardContent>
        <div className="mb-4">
          <Select value={activeSkill} onValueChange={setActiveSkill}>
            <SelectTrigger className="ml-auto h-7 w-[130px] rounded-lg pl-2.5" aria-label="Select a skill">
              <SelectValue placeholder="Select skill" />
            </SelectTrigger>
            <SelectContent align="end" className="rounded-xl">
              {topSkills.map((skill) => (
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
              data={topSkills}
              dataKey="skillRatio"
              nameKey="skillName"
              innerRadius={50}
              outerRadius={100}
              fill="#8884d8"
              labelLine={false}
              activeIndex={topSkills.findIndex(skill => skill.skillName === activeSkill)}
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
              {topSkills.map((entry, index) => (
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