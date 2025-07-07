import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import UsageChart from "./UsageChart";
import { 
  Smiley, 
  ChartLine, 
  ChatDots, 
  UsersThree, 
  Lightning 
} from "@phosphor-icons/react";
import { Progress } from "@/components/ui/progress";
import { getSpaceFrameworkData } from "@/lib/data";

export default function SpaceFrameworkView() {
  const { 
    satisfactionData,
    performanceData,
    activityData,
    communicationData,
    efficiencyData,
    categoryScores
  } = getSpaceFrameworkData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Space Framework Analysis</h2>
        <p className="text-muted-foreground">
          Measures of developer experience and productivity using the SPACE framework
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <SpaceMetricCard 
          title="Satisfaction" 
          score={categoryScores.satisfaction}
          icon={<Smiley size={20} />}
          description="Developer happiness and well-being"
        />
        <SpaceMetricCard 
          title="Performance" 
          score={categoryScores.performance}
          icon={<ChartLine size={20} />}
          description="Quality and impact of work"
        />
        <SpaceMetricCard 
          title="Activity" 
          score={categoryScores.activity}
          icon={<Lightning size={20} />}
          description="Actions and output volume"
        />
        <SpaceMetricCard 
          title="Communication" 
          score={categoryScores.communication}
          icon={<ChatDots size={20} />}
          description="Collaboration effectiveness"
        />
        <SpaceMetricCard 
          title="Efficiency" 
          score={categoryScores.efficiency}
          icon={<UsersThree size={20} />}
          description="Work processes and flow"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>SPACE Metrics Over Time</CardTitle>
          <CardDescription>
            Comparing metrics before and after Copilot adoption
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="satisfaction">
            <TabsList className="mb-4">
              <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="communication">Communication</TabsTrigger>
              <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
            </TabsList>
            
            <TabsContent value="satisfaction">
              <div className="grid grid-cols-1 gap-4">
                <UsageChart 
                  title="Developer Satisfaction"
                  description="Survey results and sentiment analysis"
                  data={satisfactionData}
                  lines={[
                    { dataKey: "withCopilot", name: "With Copilot", color: "var(--primary)" },
                    { dataKey: "withoutCopilot", name: "Without Copilot", color: "var(--muted-foreground)" }
                  ]}
                />
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Key Insights: Satisfaction</h4>
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>Developers report 37% higher job satisfaction when using Copilot regularly</li>
                    <li>78% of developers report reduced frustration with repetitive tasks</li>
                    <li>92% feel more creative and able to focus on challenging problems</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="performance">
              <div className="grid grid-cols-1 gap-4">
                <UsageChart 
                  title="Performance Metrics"
                  description="Code quality and impact measures"
                  data={performanceData}
                  lines={[
                    { dataKey: "withCopilot", name: "With Copilot", color: "var(--primary)" },
                    { dataKey: "withoutCopilot", name: "Without Copilot", color: "var(--muted-foreground)" }
                  ]}
                />
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Key Insights: Performance</h4>
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>43% improvement in code review pass rates for teams using Copilot</li>
                    <li>29% reduction in bugs per feature compared to pre-Copilot metrics</li>
                    <li>Teams with high Copilot usage complete 31% more high-value features</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="activity">
              <div className="grid grid-cols-1 gap-4">
                <UsageChart 
                  title="Development Activity"
                  description="Output and contribution volume"
                  data={activityData}
                  lines={[
                    { dataKey: "withCopilot", name: "With Copilot", color: "var(--primary)" },
                    { dataKey: "withoutCopilot", name: "Without Copilot", color: "var(--muted-foreground)" }
                  ]}
                />
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Key Insights: Activity</h4>
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>56% increase in average commit frequency with Copilot</li>
                    <li>Developers spend 61% less time on boilerplate code</li>
                    <li>22% more pull requests completed per sprint after Copilot adoption</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="communication">
              <div className="grid grid-cols-1 gap-4">
                <UsageChart 
                  title="Communication Effectiveness"
                  description="Collaboration and knowledge sharing"
                  data={communicationData}
                  lines={[
                    { dataKey: "withCopilot", name: "With Copilot", color: "var(--primary)" },
                    { dataKey: "withoutCopilot", name: "Without Copilot", color: "var(--muted-foreground)" }
                  ]}
                />
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Key Insights: Communication</h4>
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>34% reduction in clarification questions in code reviews</li>
                    <li>More thorough documentation noted in 68% of Copilot-assisted projects</li>
                    <li>27% faster onboarding time for new team members with access to Copilot</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="efficiency">
              <div className="grid grid-cols-1 gap-4">
                <UsageChart 
                  title="Work Efficiency"
                  description="Process and flow improvements"
                  data={efficiencyData}
                  lines={[
                    { dataKey: "withCopilot", name: "With Copilot", color: "var(--primary)" },
                    { dataKey: "withoutCopilot", name: "Without Copilot", color: "var(--muted-foreground)" }
                  ]}
                />
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Key Insights: Efficiency</h4>
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>42% reduction in time spent on common programming tasks</li>
                    <li>Developers report 53% fewer context switches when using Copilot</li>
                    <li>85% of teams report improved flow state durations for developers</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Developer Experience Impact</CardTitle>
            <CardDescription>Survey results from 1,000+ developers using Copilot</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">More enjoyable work</span>
                  <span className="text-sm text-muted-foreground">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Reduced repetitive tasks</span>
                  <span className="text-sm text-muted-foreground">88%</span>
                </div>
                <Progress value={88} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Better focus on complex problems</span>
                  <span className="text-sm text-muted-foreground">84%</span>
                </div>
                <Progress value={84} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Learning new frameworks faster</span>
                  <span className="text-sm text-muted-foreground">79%</span>
                </div>
                <Progress value={79} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">More creative solutions</span>
                  <span className="text-sm text-muted-foreground">73%</span>
                </div>
                <Progress value={73} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Improved code quality</span>
                  <span className="text-sm text-muted-foreground">68%</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Reported Time Savings</CardTitle>
            <CardDescription>Average time saved per activity using Copilot</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Boilerplate code</span>
                  <span className="text-sm text-muted-foreground">73% faster</span>
                </div>
                <Progress value={73} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">API integration</span>
                  <span className="text-sm text-muted-foreground">62% faster</span>
                </div>
                <Progress value={62} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Test writing</span>
                  <span className="text-sm text-muted-foreground">57% faster</span>
                </div>
                <Progress value={57} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Documentation</span>
                  <span className="text-sm text-muted-foreground">54% faster</span>
                </div>
                <Progress value={54} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Learning new languages</span>
                  <span className="text-sm text-muted-foreground">48% faster</span>
                </div>
                <Progress value={48} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Bug fixing</span>
                  <span className="text-sm text-muted-foreground">41% faster</span>
                </div>
                <Progress value={41} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SpaceMetricCard({ title, score, icon, description }: { title: string; score: number; icon: React.ReactNode; description: string }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-1">
          <div className="text-sm font-medium">{title}</div>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
        
        <div className="flex items-end gap-2 mb-3">
          <div className="text-3xl font-bold">{score}</div>
          <div className="text-sm text-muted-foreground mb-1">/100</div>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2 mb-3">
          <div 
            className="bg-primary h-2 rounded-full" 
            style={{ width: `${score}%` }}
          ></div>
        </div>
        
        <div className="text-xs text-muted-foreground">
          {description}
        </div>
      </CardContent>
    </Card>
  );
}