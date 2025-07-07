import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ArrowsClockwise, Rocket, HandsClapping, Scales } from "@phosphor-icons/react";
import PredictionChart from "./PredictionChart";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getPredictionData } from "@/lib/data";

export default function PredictionsView() {
  const { 
    adoptionPrediction, 
    productivityPrediction, 
    roiData, 
    timelineData 
  } = getPredictionData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold">ML Predictions</h2>
          <p className="text-muted-foreground">
            Forward-looking analysis using machine learning
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowsClockwise size={14} />
            <span>Retrain Model</span>
          </Button>
          <Button variant="outline" size="icon">
            <Download size={16} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PredictionChart
          title="Projected Copilot Adoption"
          description="ML-based forecast of Copilot usage in your organization"
          data={adoptionPrediction.data}
          predictionStartIndex={adoptionPrediction.predictionStartIndex}
          confidence={{ upper: "upperBound", lower: "lowerBound" }}
          dataKey="adoption"
          yAxisLabel="% of developers"
        />
        
        <PredictionChart
          title="Projected Productivity Gain"
          description="Expected productivity improvement with increased adoption"
          data={productivityPrediction.data}
          predictionStartIndex={productivityPrediction.predictionStartIndex}
          confidence={{ upper: "upperBound", lower: "lowerBound" }}
          dataKey="productivity"
          yAxisLabel="Productivity Score"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Return on Investment Analysis</CardTitle>
            <CardDescription>
              Projected financial impact of Copilot adoption
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-3 gap-4">
                <RoiMetricCard
                  title="Dev Hours Saved"
                  value={roiData.hoursSaved}
                  icon={<ArrowsClockwise size={18} />}
                  trend="+12.4%"
                />
                <RoiMetricCard
                  title="Time to Market"
                  value={roiData.timeToMarket}
                  icon={<Rocket size={18} />}
                  trend="-18.7%"
                />
                <RoiMetricCard
                  title="Code Quality"
                  value={roiData.codeQuality}
                  icon={<HandsClapping size={18} />}
                  trend="+24.3%"
                />
              </div>
              
              <div className="mt-4">
                <div className="mb-6">
                  <h4 className="text-lg font-medium mb-2">Annual ROI Projection</h4>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 p-4 bg-muted/50 rounded-lg">
                    <div>
                      <div className="text-sm text-muted-foreground">Investment</div>
                      <div className="text-2xl font-bold">${roiData.investment.toLocaleString()}</div>
                    </div>
                    <div className="hidden sm:block text-2xl">→</div>
                    <div>
                      <div className="text-sm text-muted-foreground">Return</div>
                      <div className="text-2xl font-bold text-green-600">${roiData.return.toLocaleString()}</div>
                    </div>
                    <div className="hidden sm:block text-2xl">=</div>
                    <div>
                      <div className="text-sm text-muted-foreground">Net Value</div>
                      <div className="text-2xl font-bold text-accent">${roiData.netValue.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Scales size={14} />
                    <span>ROI Calculation Methodology</span>
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Based on average developer salary, time saved per developer, productivity gains, 
                    and reduction in technical debt. Model trained on data from 150+ organizations 
                    of similar size and industry.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Adoption Timeline</CardTitle>
            <CardDescription>
              Projected milestones based on current trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="timeline">
              <TabsList className="mb-4">
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="timeline">
                <div className="space-y-4">
                  {timelineData.milestones.map((milestone, index) => (
                    <div 
                      key={index} 
                      className={`flex gap-4 ${index !== timelineData.milestones.length - 1 ? "pb-4 border-l-2 border-border ml-2.5" : ""}`}
                    >
                      <div 
                        className={`w-5 h-5 rounded-full flex-shrink-0 ${index <= timelineData.currentMilestone ? "bg-primary" : "bg-muted-foreground"}`}
                      ></div>
                      <div className="flex-1 -mt-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{milestone.title}</h4>
                          <span className="text-sm text-muted-foreground">{milestone.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="recommendations">
                <div className="space-y-4">
                  <div className="p-4 border border-border rounded-lg">
                    <h4 className="font-medium mb-2">Target High-Impact Teams</h4>
                    <p className="text-sm text-muted-foreground">
                      Focus initial adoption on backend and data teams which show the highest 
                      productivity gains (47% vs 32% avg). Consider specialized training for these teams.
                    </p>
                  </div>
                  
                  <div className="p-4 border border-border rounded-lg">
                    <h4 className="font-medium mb-2">Increase Acceptance Rate</h4>
                    <p className="text-sm text-muted-foreground">
                      Current acceptance rate (57%) is below benchmark (68%). Implement Copilot 
                      workshops focusing on prompt engineering and customization to increase 
                      effectiveness.
                    </p>
                  </div>
                  
                  <div className="p-4 border border-border rounded-lg">
                    <h4 className="font-medium mb-2">Expand Language Coverage</h4>
                    <p className="text-sm text-muted-foreground">
                      Based on your codebase analysis, expanding Copilot usage in Python and 
                      TypeScript projects will yield the highest ROI. Prioritize teams working 
                      with these languages.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Sensitivity Analysis</CardTitle>
            <CardDescription>
              How different factors affect prediction accuracy
            </CardDescription>
          </div>
          <Select defaultValue="accuracy">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select factor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="accuracy">Prediction Accuracy</SelectItem>
              <SelectItem value="adoption">Adoption Rate</SelectItem>
              <SelectItem value="productivity">Productivity Impact</SelectItem>
              <SelectItem value="roi">ROI Calculation</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">High Impact Factors</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Team size</span>
                      <span className="text-sm text-muted-foreground">87%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "87%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Technical complexity</span>
                      <span className="text-sm text-muted-foreground">74%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "74%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Developer experience</span>
                      <span className="text-sm text-muted-foreground">68%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "68%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Low Impact Factors</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Industry type</span>
                      <span className="text-sm text-muted-foreground">23%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-muted-foreground h-2 rounded-full" style={{ width: "23%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Geographic location</span>
                      <span className="text-sm text-muted-foreground">18%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-muted-foreground h-2 rounded-full" style={{ width: "18%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Company age</span>
                      <span className="text-sm text-muted-foreground">12%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-muted-foreground h-2 rounded-full" style={{ width: "12%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg text-sm">
              <p className="mb-2">
                <span className="font-medium">Confidence Score: 83%</span> - This model has been trained on data from 
                organizations similar to yours and validated against actual outcomes.
              </p>
              <p>
                Prediction accuracy improves with increased data volume. Consider enabling enhanced 
                data collection in Settings to improve future predictions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function RoiMetricCard({ title, value, icon, trend }: { title: string; value: string; icon: React.ReactNode; trend: string }) {
  return (
    <div className="bg-card rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <div className="bg-primary/10 p-2 rounded-full">
          {icon}
        </div>
        <span className="text-xs text-muted-foreground">{title}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <div className="text-2xl font-bold">{value}</div>
        <div className={`text-xs ${trend.startsWith("+") ? "text-green-600" : "text-accent"}`}>
          {trend}
        </div>
      </div>
    </div>
  );
}