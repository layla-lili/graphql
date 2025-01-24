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
  const [timeFrame, setTimeFrame] = useState('3 months'); // Default time frame

  // Fetching data
  const { data, loading, error } = useQuery(PROGRESS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Transform the data into chart-friendly format
  const chartData = data.transaction.map((item: { createdAt: string | number | Date; amount: any; object: { name: string; }; }) => ({
    createdAt: new Date(item.createdAt),
    progress_count: item.amount,
    object_name: item.object.name, // Include object name
  }));


  // Sort the data by date
  chartData.sort((a: { createdAt: { getTime: () => number; }; }, b: { createdAt: { getTime: () => number; }; }) => a.createdAt.getTime() - b.createdAt.getTime());

  // Function to get last n months
  const getLastNMonths = (n: number) => {
    const now = new Date();
    const months = [];
    for (let i = 0; i < n; i++) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push(month.toLocaleString("default", { month: "short" }));
    }
    return months.reverse(); // To get from oldest to newest
  };

  // Function to filter data based on the selected time frame
  const filterDataByTimeFrame = (timeFrame: string) => {
    const now = new Date();
    let startDate = new Date();

    switch (timeFrame) {
      case '1 week':
        startDate.setDate(now.getDate() - 7);
        break;
      case '1 month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case '3 months':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case '6 months':
        startDate.setMonth(now.getMonth() - 6);
        break;
      default:
        startDate = new Date();
        break;
    }

    return chartData.filter((item: { createdAt: Date; }) => item.createdAt.getTime() >= startDate.getTime());
  };

  // Filter data based on the selected time frame
  const filteredData = filterDataByTimeFrame(timeFrame);
  const lastNMonths = timeFrame === '1 week' ? 1 : (timeFrame === '1 month' ? 1 : (timeFrame === '3 months' ? 3 : 6));
  const displayMonths = getLastNMonths(lastNMonths);

  // Prepare data for display on the chart
   // Prepare data for display on the chart
   const displayData = displayMonths.map(month => {
    const monthData = filteredData.filter((item: { createdAt: { toLocaleString: (arg0: string, arg1: { month: string; }) => string; }; }) => 
      item.createdAt.toLocaleString("default", { month: "short" }) === month
    );
    const progressCount = monthData.reduce((acc: any, item: { progress_count: any; }) => acc + item.progress_count, 0);
    const objectNames = monthData.map((item: { object_name: any; }) => item.object_name).join(", "); // Join object names for tooltip
    return {
      month,
      progress_count: progressCount,
      object_names: objectNames || "No Object", // Fallback if no objects
    };
  });

  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress in Last {timeFrame}</CardTitle>
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
          </select>
        </div>
        <ChartContainer config={{ /* Add your ChartConfig properties here */ }}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={displayData} margin={{ top: 24, left: 24, right: 24 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" />
              <YAxis />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="custom-tooltip">
                        <p>{`${payload[0].payload.object_names}`}</p>
                        <p>{`xp: ${payload[0].payload.progress_count}`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                dataKey="progress_count"
                stroke="#4CAF50"
                strokeWidth={2}
                dot={({ payload, cx, cy }) => (
                  payload.progress_count > 0 ? (
                    <Dot key={payload.month} r={5} cx={cx} cy={cy} fill="#4CAF50" />
                  ) : <Dot key={payload.month} r={0} cx={cx} cy={cy} fill="transparent" />
                )}
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