import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "@phosphor-icons/react";
import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string;
  change?: {
    value: number;
    positive?: boolean;
  };
  icon?: ReactNode;
  className?: string;
  subtext?: string;
}

export default function MetricCard({
  title,
  value,
  change,
  icon,
  className,
  subtext
}: MetricCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="text-sm font-medium text-muted-foreground">{title}</div>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>

        <div className="text-3xl font-bold mb-1">{value}</div>
        
        {change && (
          <div className="flex items-center gap-2">
            <span 
              className={cn(
                "text-sm font-medium inline-flex items-center gap-1",
                change.positive ? "text-green-600" : "text-red-600"
              )}
            >
              {change.positive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
              {Math.abs(change.value)}%
            </span>
            <span className="text-xs text-muted-foreground">vs. previous period</span>
          </div>
        )}
        
        {subtext && (
          <p className="text-xs text-muted-foreground mt-2">{subtext}</p>
        )}
      </CardContent>
    </Card>
  );
}