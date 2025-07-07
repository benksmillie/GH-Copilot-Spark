import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

interface PredictionChartProps {
  title: string;
  description?: string;
  data: any[];
  className?: string;
  action?: ReactNode;
  predictionStartIndex: number;
  confidence?: {
    upper: string;
    lower: string;
  };
  dataKey: string;
  yAxisLabel?: string;
}

export default function PredictionChart({
  title,
  description,
  data,
  className,
  action,
  predictionStartIndex,
  confidence,
  dataKey,
  yAxisLabel
}: PredictionChartProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {action && <div>{action}</div>}
      </CardHeader>
      <CardContent className="pt-0 pb-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--muted-foreground)" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
              />
              <YAxis 
                stroke="var(--muted-foreground)" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                label={yAxisLabel ? { 
                  value: yAxisLabel, 
                  angle: -90, 
                  position: 'left',
                  style: {
                    textAnchor: 'middle',
                    fill: 'var(--muted-foreground)',
                    fontSize: 12
                  } 
                } : undefined}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "var(--card)",
                  borderColor: "var(--border)",
                  borderRadius: "var(--radius)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                }}
                labelStyle={{ fontWeight: "bold" }}
                formatter={(value: number, name: string) => {
                  return [`${value}`, name === dataKey ? "Actual/Predicted" : name];
                }}
              />
              
              {/* Divider between actual and predicted data */}
              <ReferenceLine 
                x={data[predictionStartIndex]?.name} 
                stroke="var(--accent)" 
                strokeDasharray="3 3" 
                label={{ 
                  value: "Prediction starts", 
                  position: "top",
                  fill: "var(--accent)",
                  fontSize: 12
                }} 
              />

              {/* Confidence interval */}
              {confidence && (
                <>
                  <Line 
                    type="monotone" 
                    dataKey={confidence.upper}
                    stroke="var(--muted-foreground)"
                    strokeDasharray="3 3"
                    dot={false}
                    activeDot={false}
                    name="Upper confidence"
                  />
                  <Line 
                    type="monotone" 
                    dataKey={confidence.lower}
                    stroke="var(--muted-foreground)"
                    strokeDasharray="3 3"
                    dot={false}
                    activeDot={false}
                    name="Lower confidence"
                  />
                </>
              )}

              {/* Main data line */}
              <Line 
                type="monotone" 
                dataKey={dataKey} 
                stroke="var(--primary)" 
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 2, fill: "white" }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}