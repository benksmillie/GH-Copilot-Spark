import { Button } from "@/components/ui/button";
import MetricCard from "./MetricCard";
import UsageChart from "./UsageChart";
import { 
  Code, 
  Users, 
  FileCode, 
  Check, 
  ArrowsClockwise,
  Download
} from "@phosphor-icons/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getOverviewData, getDemoUsageData } from "@/lib/data";

export default function OverviewView() {
  const { metrics, usageData, completionData } = getOverviewData();
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Active Copilot Users" 
          value={metrics.activeUsers}
          change={{ value: 12.5, positive: true }}
          icon={<Users size={20} />}
        />
        <MetricCard 
          title="Accepted Completions" 
          value={metrics.acceptedCompletions}
          change={{ value: 8.3, positive: true }}
          icon={<Check size={20} />}
        />
        <MetricCard 
          title="Lines Generated" 
          value={metrics.linesGenerated}
          change={{ value: 15.2, positive: true }}
          icon={<FileCode size={20} />}
        />
        <MetricCard 
          title="Dev Time Saved" 
          value={metrics.timeSaved}
          change={{ value: 10.7, positive: true }}
          icon={<ArrowsClockwise size={20} />}
          subtext="Based on average developer salary"
        />
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Usage Trends</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by team" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teams</SelectItem>
              <SelectItem value="frontend">Frontend</SelectItem>
              <SelectItem value="backend">Backend</SelectItem>
              <SelectItem value="data">Data Science</SelectItem>
              <SelectItem value="devops">DevOps</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download size={16} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UsageChart 
          title="Daily Active Users"
          description="Number of developers using Copilot daily"
          data={usageData}
          lines={[
            { dataKey: "activeUsers", name: "Active Users", color: "var(--primary)" },
            { dataKey: "newUsers", name: "New Users", color: "var(--accent)" }
          ]}
        />

        <UsageChart 
          title="Completion Acceptance"
          description="Rate and count of accepted completions"
          data={completionData}
          lines={[
            { dataKey: "acceptanceRate", name: "Acceptance Rate (%)", color: "var(--primary)" },
            { dataKey: "completionCount", name: "Completion Count", color: "var(--secondary)" }
          ]}
        />
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Language Distribution</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {getDemoUsageData().languageStats.map((lang) => (
            <div key={lang.name} className="bg-card rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{lang.name}</span>
                <Code size={16} className="text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold mb-1">{lang.percentage}%</div>
              <div className="w-full bg-muted rounded-full h-2 mb-1">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${lang.percentage}%` }}
                ></div>
              </div>
              <div className="text-xs text-muted-foreground">
                {lang.lineCount.toLocaleString()} lines generated
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}