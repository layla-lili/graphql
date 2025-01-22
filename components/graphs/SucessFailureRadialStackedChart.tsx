"use client";

import { useQuery } from "@apollo/client";
import { USER_PASSFAILCOUNT } from "@/graphql/queries";
import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";


const chartConfig = {
  pass: {
    label: "Pass",
    color: "hsl(var(--chart-1))",
  },
  fail: {
    label: "Fail",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function SucessFailureRadialStackedChart({ auditorId }: { auditorId: string }) {
  // const token = Cookies.get('JWT'); // Get token from cookies
  // const decodedToken = token ? decodeJwt(token) : null;
  // const auditorId = decodedToken ? decodedToken["sub"] : null;
  

  // Skip the query if auditorId is not available
  const { data, loading, error } = useQuery(USER_PASSFAILCOUNT, {
    variables: { auditorId },
    skip: !auditorId, // Skip query if auditorId is null
    fetchPolicy: "no-cache",  // Disable cache temporarily for testing
  });

  console.log("data from SucessFailureRadialStackedChart", data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Ensure data is defined and handle default counts
  const passCount = data?.passCount?.aggregate?.count || 0;
  const failCount = data?.failCount?.aggregate?.count || 0;

  const totalVisitors = passCount + failCount;

  const chartData = [{ pass: passCount, fail: failCount }];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pass/Fail Radial Chart</CardTitle>
        <CardDescription>Real-time Data Visualization</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Point
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="pass"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-pass)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="fail"
              fill="var(--color-fail)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Your Pass and Fail <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing user pass and fail point
        </div>
      </CardFooter>
    </Card>
  );
}

export default SucessFailureRadialStackedChart;