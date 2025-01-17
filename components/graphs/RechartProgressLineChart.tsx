import { useState } from "react";
import { useQuery } from "@apollo/client";
import { PROGRESS } from "@/graphql/queries"; // Replace with your actual query
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Dot, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

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
  ChartTooltipContent,
} from "@/components/ui/chart";

export function RechartProgressLineChart() {
  const [timeFrame, setTimeFrame] = useState('1 month'); // Default time frame

  // Fetching data
  const { data, loading, error } = useQuery(PROGRESS);


  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error fetching data</div>;
  }

  // Transform the data into chart-friendly format
  const chartData = data.transaction.map((item: { createdAt: string; amount: number }) => ({
    createdAt: new Date(item.createdAt), // Convert to Date object
    progress_count: item.amount, // The value of progress
    fill: "var(--chart-1)", // Assign a color dynamically if needed
  }));

  // Sort the data by date
  chartData.sort((a: { createdAt: number; }, b: { createdAt: number; }) => a.createdAt - b.createdAt);

  // Format the createdAt field to Month-Year format (e.g., "Jan 2024")
  const formattedChartData = chartData.map((item: { createdAt: { 
    toLocaleString: (arg0: string, arg1: { month: string; year: string; }) => string; }; }) => ({
    ...item,
    month: item.createdAt.toLocaleString("default", { month: "short", year: "numeric" }), // "Jan 2024"
  }));

  // Function to filter the data based on the selected time frame
  const filterDataByTimeFrame = (timeFrame: string) => {
    const now = new Date();
    let startDate;

    switch (timeFrame) {
      case '1 week':
        startDate = new Date();
        startDate.setDate(now.getDate() - 7);
        break;
      case '1 month':
        startDate = new Date();
        startDate.setMonth(now.getMonth() - 1);
        break;
      case '3 months':
        startDate = new Date();
        startDate.setMonth(now.getMonth() - 3);
        break;
      case '6 months':
        startDate = new Date();
        startDate.setMonth(now.getMonth() - 6);
        break;
      case '1 year':
        startDate = new Date();
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate = new Date();
        break;
    }

    return formattedChartData.filter((item: { createdAt: Date; }) => item.createdAt.getTime() >= startDate.getTime());
  };

  // Filter data based on the selected time frame
  const filteredData = filterDataByTimeFrame(timeFrame);

  // Generate random color (avoid black and white)
  const generateRandomColor = () => {
    const randomColor = () => Math.floor(Math.random() * 256); // Random RGB values
    let r, g, b;

    do {
      r = randomColor();
      g = randomColor();
      b = randomColor();
    } while (
      (r === 0 && g === 0 && b === 0) ||  // Avoid black
      (r === 255 && g === 255 && b === 255) // Avoid white
    );

    return `rgb(${r},${g},${b})`;
  };

  const chartConfig = {
    progress_count: {
      label: "Progress Count",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  // Determine the chart title dynamically based on the time frame
  const getTitle = () => {
    switch (timeFrame) {
      case '1 week':
        return "Progress in Last 1 Week";
      case '1 month':
        return "Progress in Last 1 Month";
      case '3 months':
        return "Progress in Last 3 Months";
      case '6 months':
        return "Progress in Last 6 Months";
      case '1 year':
        return "Progress in Last 1 Year";
      default:
        return "Progress Chart";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{getTitle()}</CardTitle>
        <CardDescription>Progress over the selected time frame</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <label htmlFor="timeFrame" className="mr-2">Select Time Frame:</label>
          <select
            id="timeFrame"
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="1 week">1 Week</option>
            <option value="1 month">1 Month</option>
            <option value="3 months">3 Months</option>
            <option value="6 months">6 Months</option>
            <option value="1 year">1 Year</option>
          </select>
        </div>

        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={filteredData}
              margin={{
                top: 24,
                left: 24,
                right: 24,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month" // Use the formatted month field as X-axis labels
                tick={{ fontSize: 12 }}
                angle={-45} // Rotate labels if necessary
                textAnchor="end" // Align the labels
              />
              <YAxis />
              <Tooltip
                content={<ChartTooltipContent indicator="line" nameKey="month" hideLabel={false} />}
              />
              <Line
                dataKey="progress_count"
                type="natural"
                stroke="#4CAF50" // Line color
                strokeWidth={2}
                dot={({ payload, cx, cy }) => {
                  const fill = payload.fill || generateRandomColor(); // Apply the random color

                  return (
                    <Dot
                      key={payload.createdAt} // Ensure unique key
                      r={5}
                      cx={cx}
                      cy={cy}
                      fill={fill}  // Apply fill here
                      stroke={"#4CAF50"} // Ensure stroke is the same color as fill
                    />
                  );
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Progress count last months <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing progress count for the last {timeFrame}
        </div>
      </CardFooter>
    </Card>
  );
}

export default RechartProgressLineChart;
