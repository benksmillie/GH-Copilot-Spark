import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import UsageChart from "./UsageChart";
import PredictionChart from "./PredictionChart";
import MetricCard from "./MetricCard";
import { RocketLaunch, Gauge, Clock, Warning } from "@phosphor-icons/react";
import { getDoraMetricsData } from "@/lib/data";

export default function DoraMetricsView() {
  const { 
    deploymentFrequencyData, 
    leadTimeData, 
    mttrData, 
    changeFailureData,
    metrics
  } = getDoraMetricsData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">DORA Metrics</h2>
        <p className="text-muted-foreground">
          DevOps Research and Assessment metrics comparing teams with and without Copilot
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Deployment Frequency" 
          value={metrics.deploymentFrequency}
          change={{ value: 28.4, positive: true }}
          icon={<RocketLaunch size={20} />}
          subtext="Teams using Copilot vs teams without"
        />
        <MetricCard 
          title="Lead Time for Changes" 
          value={metrics.leadTime}
          change={{ value: 32.7, positive: true }}
          icon={<Clock size={20} />}
          subtext="Average time reduction"
        />
        <MetricCard 
          title="Mean Time to Restore" 
          value={metrics.mttr}
          change={{ value: 24.1, positive: true }}
          icon={<Gauge size={20} />}
          subtext="Faster service restoration"
        />
        <MetricCard 
          title="Change Failure Rate" 
          value={metrics.changeFailureRate}
          change={{ value: 15.8, positive: true }}
          icon={<Warning size={20} />}
          subtext="Reduction in failed deployments"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Analysis by Metric</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="deployment">
            <TabsList className="mb-4">
              <TabsTrigger value="deployment">Deployment Frequency</TabsTrigger>
              <TabsTrigger value="leadtime">Lead Time</TabsTrigger>
              <TabsTrigger value="mttr">MTTR</TabsTrigger>
              <TabsTrigger value="failure">Change Failure Rate</TabsTrigger>
            </TabsList>
            
            <TabsContent value="deployment">
              <div className="grid grid-cols-1 gap-4">
                <UsageChart 
                  title="Deployments Per Week"
                  data={deploymentFrequencyData}
                  lines={[
                    { dataKey: "withCopilot", name: "With Copilot", color: "var(--primary)" },
                    { dataKey: "withoutCopilot", name: "Without Copilot", color: "var(--muted-foreground)" }
                  ]}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="leadtime">
              <div className="grid grid-cols-1 gap-4">
                <UsageChart 
                  title="Lead Time for Changes (Hours)"
                  description="Time from code committed to code deployed to production"
                  data={leadTimeData}
                  lines={[
                    { dataKey: "withCopilot", name: "With Copilot", color: "var(--primary)" },
                    { dataKey: "withoutCopilot", name: "Without Copilot", color: "var(--muted-foreground)" }
                  ]}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="mttr">
              <div className="grid grid-cols-1 gap-4">
                <UsageChart 
                  title="Mean Time to Restore (Hours)"
                  description="Time to restore service after an incident"
                  data={mttrData}
                  lines={[
                    { dataKey: "withCopilot", name: "With Copilot", color: "var(--primary)" },
                    { dataKey: "withoutCopilot", name: "Without Copilot", color: "var(--muted-foreground)" }
                  ]}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="failure">
              <div className="grid grid-cols-1 gap-4">
                <UsageChart 
                  title="Change Failure Rate (%)"
                  description="Percentage of deployments causing a failure in production"
                  data={changeFailureData}
                  lines={[
                    { dataKey: "withCopilot", name: "With Copilot", color: "var(--primary)" },
                    { dataKey: "withoutCopilot", name: "Without Copilot", color: "var(--muted-foreground)" }
                  ]}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Deployment Quality Correlation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">67.3%</div>
                  <div className="text-sm text-muted-foreground">Less bugs in code written with Copilot</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">83.2%</div>
                  <div className="text-sm text-muted-foreground">Higher test coverage</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">42.1%</div>
                  <div className="text-sm text-muted-foreground">Lower error reoccurrence</div>
                </div>
              </div>
              
              <div className="h-[1px] w-full bg-border my-4" />
              
              <p className="text-sm text-muted-foreground">
                Organizations with high Copilot adoption show significant improvements in deployment 
                quality metrics. Teams using Copilot consistently show fewer bugs, higher test coverage, 
                and better handling of errors compared to teams with low or no Copilot usage.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <PredictionChart
          title="Projected Deployment Frequency"
          description="ML prediction of deployment frequency with increasing Copilot usage"
          data={getDoraMetricsData().projectedDeploymentFrequency}
          predictionStartIndex={12}
          confidence={{ upper: "upperBound", lower: "lowerBound" }}
          dataKey="frequency"
          yAxisLabel="Deployments per week"
        />
      </div>
    </div>
  );
}