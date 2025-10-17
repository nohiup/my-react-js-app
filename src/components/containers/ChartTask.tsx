import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';
import { Stack } from '../ui/stack';
import { Card, CardContent, CardFooter, CardTitle } from '../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '../ui/chart';
import type { JSX } from 'react';
import { H1 } from '../ui/headings';
import classes from '@/lib/classes';


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig


const pieChartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

const lineChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

// --- Data ---
const kpiData = [
  {
    title: 'Progress',
    value: '45%',
    subValue: '+5% this week',
    icon: 'progress',
  },
  {
    title: 'Timeline',
    value: '12w',
    subValue: '6w remaining',
    icon: 'timeline',
  },
  { title: 'Team', value: '8', subValue: '2 external', icon: 'team' },
  { title: 'Tasks', value: '27', subValue: '12 completed', icon: 'tasks' },
];

const sprintBurndownData = [
  { name: 'Mon', actual: 100, planned: 98 },
  { name: 'Tue', actual: 90, planned: 86 },
  { name: 'Wed', actual: 80, planned: 74 },
  { name: 'Thu', actual: 65, planned: 62 },
  { name: 'Fri', actual: 48, planned: 50 },
  { name: 'Sat', actual: 35, planned: 38 },
  { name: 'Sun', actual: 30, planned: 26 },
];

const taskStatusData = [
  { name: 'Completed', value: 12, color: '#10b981' }, // green-500
  { name: 'In Progress', value: 8, color: '#3b82f6' }, // blue-500
  { name: 'Todo', value: 5, color: '#14b8a6' }, // teal-500
  { name: 'Blocked', value: 2, color: '#ef4444' }, // red-500
];

const teamWorkloadData = [
  { name: 'John', tasks: 8 },
  { name: 'Sarah', tasks: 6 },
  { name: 'Mike', tasks: 7 },
  { name: 'Jane', tasks: 5 },
  { name: 'John', tasks: 8 },
  { name: 'Sarah', tasks: 6 },
  { name: 'Mike', tasks: 7 },
  { name: 'Jane', tasks: 5 },
  { name: 'John', tasks: 8 },
  { name: 'Sarah', tasks: 6 },
  { name: 'Mike', tasks: 7 },
  { name: 'Jane', tasks: 5 },
];

const recentActivityData = [
  {
    icon: 'completed',
    color: 'text-green-500',
    text: 'John Doe completed task PAY-234: OAuth implementation',
    time: '2 hours ago'
  },
  {
    icon: 'blocked',
    color: 'text-orange-500',
    text: 'Sarah Johnson marked PAY-245: API rate limiting as blocked',
    time: '4 hours ago'
  },
  {
    icon: 'started',
    color: 'text-blue-500',
    text: 'Mike Wilson started working on PAY-256: Performance optimization',
    time: 'Yesterday at 3:45 PM'
  }
];

// --- Components ---

// Generic Icon Component
const Icon = ({ name, className = 'w-6 h-6' }: { name: string, className?: string }) => {
  const icons: { [key: string]: JSX.Element } = {
    progress: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />,
    timeline: <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18M-7.5 12h18" />,
    team: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.53-2.499M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-4.663M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Z" />,
    tasks: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
    completed: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
    blocked: <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />,
    started: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
  };
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} aria-hidden="true">{icons[name]}</svg>;

};

// Specific Chart and List Components
const KpiCard = ({ item }: { item: typeof kpiData[0] }) => (
  <Card>
    <Stack row align="center" className="text-normal font-sans">
      <Icon name={item.icon} className="w-5 h-5 mr-1" />
      <span className="text-sm font-medium font-sans">{item.title}</span>
    </Stack>
    <H1>{item.value}</H1>
    <p className="text-sm text-normal font-sans">{item.subValue}</p>
  </Card>
);

const SprintBurndownChart = () => (
  <Card className={classes.cardFullHeight}>
    <CardTitle>Sprint Burndown</CardTitle>
    <CardContent>
      <ChartContainer config={chartConfig}>
        <LineChart accessibilityLayer data={sprintBurndownData} margin={{ top: 5, right: 20, left: -10 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="name" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} className="pt-2" />
          <YAxis tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />}></ChartTooltip>
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
          <Line type="monotone" name="Actual" dataKey="actual" stroke="#f97316" strokeWidth={2} dot={{ r: 4, fill: '#f97316' }} />
          <Line type="monotone" name="Planned" dataKey="planned" stroke="var(--color-primary)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
        </LineChart>
      </ChartContainer>
    </CardContent>
  </Card>
);

const TaskStatusChart = () => (
  <Card className={classes.cardFullHeight}>
    <CardTitle>Task Status</CardTitle>
    <CardContent>
      <ChartContainer config={pieChartConfig} className="mx-auto">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />}>
          </ChartTooltip>
          <Pie
            data={taskStatusData}
            cx="50%"
            cy="50%"
            innerRadius="40%"
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
            labelLine={false}>
            {taskStatusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
    </CardContent >
    <CardFooter className="mt-4">
      <Stack row gap="gap-x-4 gap-y-2" justify="justify-center" className="flex-wrap text-sm font-sans">
        {taskStatusData.map((item) => (
          <Stack row align="center" key={item.name}>
            <span className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: item.color }} aria-hidden="true"></span>
            <span className="text-title font-sans">{item.name}: {item.value}</span>
          </Stack>
        ))}
      </Stack>
    </CardFooter>

  </Card >
);

const TeamWorkloadChart = () => (
  <Card>
    <CardTitle>
      Team Workload
    </CardTitle>
    <CardContent>
      <div className="w-full" style={{ height: 320 }}>
        <ChartContainer config={lineChartConfig} className="w-full h-full">
          <BarChart data={teamWorkloadData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel={false} />}
            />
            <Bar dataKey="tasks" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </div>
    </CardContent>
  </Card>
);

const RecentActivity = () => (
  <Card>
    <CardTitle>
      Recent Activity
    </CardTitle>
    <CardContent>
      <div className="space-y-4 font-sans">
        {recentActivityData.map((activity, index) => (
          <Stack row align="start" key={index}>
            <div className={`mt-1 mr-3 ${activity.color}`}>
              <Icon name={activity.icon} className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-title font-sans">{activity.text}</p>
              <p className="text-xs text-normal font-sans">{activity.time}</p>
            </div>
          </Stack>
        ))}
      </div>
    </CardContent>
  </Card>
);


// --- Main App Component ---
const ChartTask = () => {
  return (
    <div className="min-h-screen app-background text-title font-sans">
      <header className="app-background">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Stack row align="center" justify="justify-between">
            <div>
              <H1>Payment Gateway Integration</H1>
              <p className="text-normal mt-1 font-sans text-lg">
                Modernizing payment processing infrastructure for improved reliability and performance
              </p>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium background-primary text-contrast">
              Active
            </span>
          </Stack>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" aria-label="Project KPIs">
          {kpiData.map(item => <KpiCard key={item.title} item={item} />)}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mt-6 auto-rows-fr">
          <section className="lg:col-span-3 h-full" aria-labelledby="sprint-burndown-title">
            <SprintBurndownChart />
          </section>
          <section className="lg:col-span-2 h-full" aria-labelledby="task-status-title">
            <TaskStatusChart />
          </section>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-6">
          <section aria-labelledby="team-workload-title">
            <TeamWorkloadChart />
          </section>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-6">
          <section aria-labelledby="recent-activity-title">
            <RecentActivity />
          </section>
        </div>
      </main>
    </div>
  );
};

export default ChartTask;
