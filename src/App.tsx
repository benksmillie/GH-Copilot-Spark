import { useState } from "react";
import { Toaster } from "sonner";
import Header from "./components/dashboard/Header";
import OverviewView from "./components/dashboard/OverviewView";
import DoraMetricsView from "./components/dashboard/DoraMetricsView";
import SpaceFrameworkView from "./components/dashboard/SpaceFrameworkView";
import PredictionsView from "./components/dashboard/PredictionsView";
import SettingsView from "./components/dashboard/SettingsView";
import { useKV } from "@github/spark/hooks";

function App() {
  // Use persistent storage for dashboard preferences
  const [selectedView, setSelectedView] = useKV("dashboard-selected-view", "overview");
  const [timeRange, setTimeRange] = useKV("dashboard-time-range", "30d");

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-6 mx-auto max-w-7xl">
        <Header
          selectedView={selectedView}
          onSelectView={setSelectedView}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
        />

        <div className="mt-6">
          {selectedView === "overview" && <OverviewView />}
          {selectedView === "dora" && <DoraMetricsView />}
          {selectedView === "space" && <SpaceFrameworkView />}
          {selectedView === "predictions" && <PredictionsView />}
          {selectedView === "settings" && <SettingsView />}
        </div>

        <footer className="mt-16 py-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              GitHub Copilot Analytics Dashboard • Data refreshed daily
            </div>
            <div className="text-sm text-muted-foreground">
              Powered by ML predictions and DORA metrics
            </div>
          </div>
        </footer>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;