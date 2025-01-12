import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { useQuery } from "@apollo/client";
import { SKILLS } from "@/graphql/queries";
import ApexChart from '../apexcharts'; // Import the ApexChart component

const SkillsBarChart = () => {
    const { data, loading, error } = useQuery(SKILLS);
    const skillSummary: { [key: string]: number } = {};

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

    const totalAmount = Object.values(skillSummary).reduce((acc, value) => acc + value, 0);

    const barChartData = Object.entries(skillSummary)
        .filter(([skill]) => skill && skill.trim() !== "")
        .map(([skill, amount]) => ({
            browser: skill.replace(/^skill_/, "").replace(/_/g, " "),
            skills: ((amount / totalAmount) * 100).toFixed(2),
            fill: "#8884d8",
        }));

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    const chartConfig: { [key: string]: { label: string } } = {
      skills: {
        label: "Percentage (%)",
      },
      // Define additional skills and colors here if needed
    };

    return (
        <Card className="w-[500px] h-full">
            <CardHeader>
                <CardTitle>Skills Bar Chart - Mixed</CardTitle>
                <CardDescription>Overview of skills used</CardDescription>
            </CardHeader>
            <CardContent>
            <ChartContainer config={chartConfig}>
                <>
                    <ApexChart barChartData={barChartData} /> {/* Pass data to ApexChart */}
                </>
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