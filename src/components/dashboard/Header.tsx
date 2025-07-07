import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChartBar, 
  RocketLaunch, 
  Brain, 
  Users, 
  Gear 
} from "@phosphor-icons/react";
import { Card } from "@/components/ui/card";

interface HeaderProps {
  selectedView: string;
  onSelectView: (view: string) => void;
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
}

export default function Header({
  selectedView,
  onSelectView,
  timeRange,
  onTimeRangeChange
}: HeaderProps) {
  return (
    <div className="bg-background/95 backdrop-blur sticky top-0 z-10 pb-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">GitHub Copilot Analytics</h1>
          <p className="text-muted-foreground">Interactive metrics and ML predictions for your organization</p>
        </div>
        
        <Card className="w-full md:w-auto p-1">
          <Tabs defaultValue={timeRange} onValueChange={onTimeRangeChange}>
            <TabsList>
              <TabsTrigger value="7d">7 Days</TabsTrigger>
              <TabsTrigger value="30d">30 Days</TabsTrigger>
              <TabsTrigger value="90d">90 Days</TabsTrigger>
              <TabsTrigger value="1y">1 Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </Card>
      </div>

      <div className="mb-2">
        <Tabs defaultValue={selectedView} onValueChange={onSelectView}>
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <ChartBar size={16} />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="dora" className="flex items-center gap-2">
              <RocketLaunch size={16} />
              <span className="hidden sm:inline">DORA Metrics</span>
            </TabsTrigger>
            <TabsTrigger value="space" className="flex items-center gap-2">
              <Users size={16} />
              <span className="hidden sm:inline">Space Framework</span>
            </TabsTrigger>
            <TabsTrigger value="predictions" className="flex items-center gap-2">
              <Brain size={16} />
              <span className="hidden sm:inline">ML Predictions</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Gear size={16} />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}