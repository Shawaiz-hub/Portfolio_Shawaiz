
import { useEffect, useState } from "react";
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/context/ThemeContext";

// Mock data
const visitData = [
  { name: "Mon", visits: 245 },
  { name: "Tue", visits: 388 },
  { name: "Wed", visits: 356 },
  { name: "Thu", visits: 410 },
  { name: "Fri", visits: 325 },
  { name: "Sat", visits: 250 },
  { name: "Sun", visits: 275 },
];

const monthlyVisitData = [
  { name: "Jan", visits: 4000 },
  { name: "Feb", visits: 4500 },
  { name: "Mar", visits: 5100 },
  { name: "Apr", visits: 4800 },
  { name: "May", visits: 5500 },
  { name: "Jun", visits: 6200 },
  { name: "Jul", visits: 6800 },
  { name: "Aug", visits: 7400 },
  { name: "Sep", visits: 7900 },
  { name: "Oct", visits: 8500 },
  { name: "Nov", visits: 9200 },
  { name: "Dec", visits: 9800 },
];

const downloadData = [
  { name: "E-commerce Platform", downloads: 245, color: "#3b82f6" },
  { name: "Portfolio Dashboard", downloads: 155, color: "#10b981" },
  { name: "Social Media App", downloads: 190, color: "#6366f1" },
  { name: "Weather App", downloads: 95, color: "#f59e0b" },
  { name: "Task Manager", downloads: 130, color: "#ec4899" },
];

const COLORS = ["#3b82f6", "#10b981", "#6366f1", "#f59e0b", "#ec4899"];

const engagementData = [
  { name: "Homepage", views: 1200, bounceRate: 35 },
  { name: "Portfolio", views: 800, bounceRate: 40 },
  { name: "Projects", views: 620, bounceRate: 30 },
  { name: "About", views: 400, bounceRate: 25 },
  { name: "Contact", views: 300, bounceRate: 20 },
];

export default function Analytics() {
  const { theme } = useTheme();
  const [chartColors, setChartColors] = useState({
    primary: "#3b82f6",
    background: "#ffffff",
    text: "#1e293b",
    grid: "#e2e8f0",
  });

  useEffect(() => {
    // Update chart colors based on theme
    if (theme === "dark") {
      setChartColors({
        primary: "#3b82f6",
        background: "#1e293b",
        text: "#f8fafc",
        grid: "#334155",
      });
    } else {
      setChartColors({
        primary: "#3b82f6",
        background: "#ffffff",
        text: "#1e293b",
        grid: "#e2e8f0",
      });
    }
  }, [theme]);

  const totalVisits = visitData.reduce((sum, day) => sum + day.visits, 0);
  const totalDownloads = downloadData.reduce((sum, item) => sum + item.downloads, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Visits</CardTitle>
            <CardDescription>This week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalVisits.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              +12.5% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Downloads</CardTitle>
            <CardDescription>All projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalDownloads.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              +5.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Avg. Engagement</CardTitle>
            <CardDescription>Time spent on site</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2m 45s</div>
            <p className="text-xs text-muted-foreground mt-1">
              +0.8% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="daily" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Website Traffic</h3>
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="daily" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={visitData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartColors.primary} stopOpacity={0.8} />
                      <stop offset="95%" stopColor={chartColors.primary} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: chartColors.text }} 
                    tickLine={{ stroke: chartColors.grid }}
                  />
                  <YAxis 
                    tick={{ fill: chartColors.text }} 
                    tickLine={{ stroke: chartColors.grid }}
                  />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: chartColors.background,
                      color: chartColors.text,
                      border: `1px solid ${chartColors.grid}` 
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="visits" 
                    stroke={chartColors.primary} 
                    fillOpacity={1} 
                    fill="url(#colorVisits)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="monthly" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={monthlyVisitData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorVisitsMonthly" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartColors.primary} stopOpacity={0.8} />
                      <stop offset="95%" stopColor={chartColors.primary} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: chartColors.text }} 
                    tickLine={{ stroke: chartColors.grid }}
                  />
                  <YAxis 
                    tick={{ fill: chartColors.text }} 
                    tickLine={{ stroke: chartColors.grid }}
                  />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: chartColors.background,
                      color: chartColors.text,
                      border: `1px solid ${chartColors.grid}` 
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="visits" 
                    stroke={chartColors.primary} 
                    fillOpacity={1} 
                    fill="url(#colorVisitsMonthly)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Downloads</CardTitle>
            <CardDescription>
              Downloads per project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={downloadData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="downloads"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {downloadData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value} downloads`, "Downloads"]}
                    contentStyle={{ 
                      backgroundColor: chartColors.background,
                      color: chartColors.text,
                      border: `1px solid ${chartColors.grid}` 
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Page Engagement</CardTitle>
            <CardDescription>
              Views per page
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={engagementData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: chartColors.text }} 
                    tickLine={{ stroke: chartColors.grid }}
                  />
                  <YAxis 
                    tick={{ fill: chartColors.text }} 
                    tickLine={{ stroke: chartColors.grid }}
                  />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: chartColors.background,
                      color: chartColors.text,
                      border: `1px solid ${chartColors.grid}` 
                    }}
                  />
                  <Bar dataKey="views" fill={chartColors.primary} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
