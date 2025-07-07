import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useKV } from "@github/spark/hooks";

export default function SettingsView() {
  const [gitHubToken, setGitHubToken] = useKV("github-token", "");
  const [dataCollection, setDataCollection] = useKV("data-collection-settings", {
    anonymizeData: true,
    collectUsageMetrics: true,
    enhancedPredictions: false,
    shareWithGitHub: false
  });
  
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSaveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 800);
  };
  
  const handleDataCollectionChange = (key: keyof typeof dataCollection) => {
    setDataCollection(current => ({
      ...current,
      [key]: !current[key]
    }));
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Dashboard Settings</h2>
        <p className="text-muted-foreground">
          Configure your GitHub Copilot Analytics preferences
        </p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="github">GitHub Integration</TabsTrigger>
          <TabsTrigger value="data">Data & Privacy</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard Preferences</CardTitle>
              <CardDescription>
                Customize how the dashboard displays information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="default-view">Default View</Label>
                <Select defaultValue="overview">
                  <SelectTrigger id="default-view">
                    <SelectValue placeholder="Select default view" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="overview">Overview</SelectItem>
                    <SelectItem value="dora">DORA Metrics</SelectItem>
                    <SelectItem value="space">SPACE Framework</SelectItem>
                    <SelectItem value="predictions">ML Predictions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="default-time-range">Default Time Range</Label>
                <Select defaultValue="30d">
                  <SelectTrigger id="default-time-range">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">7 Days</SelectItem>
                    <SelectItem value="30d">30 Days</SelectItem>
                    <SelectItem value="90d">90 Days</SelectItem>
                    <SelectItem value="1y">1 Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-refresh" className="block mb-1">Auto-refresh data</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically refresh dashboard data every hour
                  </p>
                </div>
                <Switch id="auto-refresh" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="show-predictions" className="block mb-1">Show ML predictions</Label>
                  <p className="text-sm text-muted-foreground">
                    Display machine learning predictions in all views
                  </p>
                </div>
                <Switch id="show-predictions" defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveSettings}>
                {isSaving ? "Saving..." : "Save preferences"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="github">
          <Card>
            <CardHeader>
              <CardTitle>GitHub Integration</CardTitle>
              <CardDescription>
                Connect with GitHub to fetch real-time Copilot usage data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="github-token">GitHub Personal Access Token</Label>
                <div className="flex gap-2">
                  <Input 
                    id="github-token" 
                    type="password" 
                    value={gitHubToken} 
                    onChange={(e) => setGitHubToken(e.target.value)}
                    placeholder="ghp_..."
                  />
                  <Button variant="secondary" size="sm">Verify</Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Token requires read:org, repo, and user scopes
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="organization">GitHub Organization</Label>
                <Select defaultValue="">
                  <SelectTrigger id="organization">
                    <SelectValue placeholder="Select organization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Select an organization</SelectItem>
                    <SelectItem value="org1">acme-corp</SelectItem>
                    <SelectItem value="org2">example-org</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="repositories">Include Repositories</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="repositories">
                    <SelectValue placeholder="Select repositories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All repositories</SelectItem>
                    <SelectItem value="selected">Selected repositories</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="refresh-interval">Data Refresh Interval</Label>
                <Select defaultValue="daily">
                  <SelectTrigger id="refresh-interval">
                    <SelectValue placeholder="Select refresh interval" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Disconnect</Button>
              <Button onClick={handleSaveSettings}>
                {isSaving ? "Saving..." : "Save settings"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle>Data Collection & Privacy</CardTitle>
              <CardDescription>
                Control how data is collected and used
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="anonymize-data" className="block mb-1">Anonymize user data</Label>
                  <p className="text-sm text-muted-foreground">
                    Replace usernames with anonymous identifiers
                  </p>
                </div>
                <Switch 
                  id="anonymize-data" 
                  checked={dataCollection.anonymizeData} 
                  onCheckedChange={() => handleDataCollectionChange('anonymizeData')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="collect-usage" className="block mb-1">Collect usage metrics</Label>
                  <p className="text-sm text-muted-foreground">
                    Track Copilot usage patterns for analysis
                  </p>
                </div>
                <Switch 
                  id="collect-usage" 
                  checked={dataCollection.collectUsageMetrics} 
                  onCheckedChange={() => handleDataCollectionChange('collectUsageMetrics')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enhanced-predictions" className="block mb-1">Enhanced prediction data</Label>
                  <p className="text-sm text-muted-foreground">
                    Use additional data for more accurate predictions
                  </p>
                </div>
                <Switch 
                  id="enhanced-predictions" 
                  checked={dataCollection.enhancedPredictions} 
                  onCheckedChange={() => handleDataCollectionChange('enhancedPredictions')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="share-data" className="block mb-1">Share data with GitHub</Label>
                  <p className="text-sm text-muted-foreground">
                    Share anonymized data to help improve Copilot
                  </p>
                </div>
                <Switch 
                  id="share-data" 
                  checked={dataCollection.shareWithGitHub} 
                  onCheckedChange={() => handleDataCollectionChange('shareWithGitHub')}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="data-retention">Data Retention Period</Label>
                <Select defaultValue="1y">
                  <SelectTrigger id="data-retention">
                    <SelectValue placeholder="Select retention period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3m">3 Months</SelectItem>
                    <SelectItem value="6m">6 Months</SelectItem>
                    <SelectItem value="1y">1 Year</SelectItem>
                    <SelectItem value="forever">Indefinitely</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveSettings}>
                {isSaving ? "Saving..." : "Save privacy settings"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configure alerts and reports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weekly-report" className="block mb-1">Weekly usage report</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive a weekly summary of Copilot usage
                  </p>
                </div>
                <Switch id="weekly-report" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="adoption-alerts" className="block mb-1">Adoption alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about significant changes in adoption
                  </p>
                </div>
                <Switch id="adoption-alerts" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="ml-updates" className="block mb-1">ML prediction updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when predictions are updated
                  </p>
                </div>
                <Switch id="ml-updates" defaultChecked={false} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notification-email">Email for notifications</Label>
                <Input 
                  id="notification-email" 
                  type="email" 
                  placeholder="email@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notification-frequency">Notification Frequency</Label>
                <Select defaultValue="weekly">
                  <SelectTrigger id="notification-frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveSettings}>
                {isSaving ? "Saving..." : "Save notification settings"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}