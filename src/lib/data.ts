// Mock data utilities for the dashboard
// In a real application, this would fetch data from GitHub APIs

// Helper to generate consistent date ranges
const generateDateRange = (days: number) => {
  const dates = [];
  const today = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};

// Helper to generate smooth data with some variance
const generateSmoothData = (
  length: number, 
  min: number, 
  max: number, 
  volatility = 0.1,
  trend: 'up' | 'down' | 'stable' = 'up'
) => {
  const data = [];
  let value = min + Math.random() * (max - min) * 0.5;
  
  for (let i = 0; i < length; i++) {
    // Apply trend
    const trendFactor = trend === 'up' 
      ? 1 + (i / length) * 0.5 
      : trend === 'down' 
        ? 1 - (i / length) * 0.3 
        : 1;
    
    // Add some randomness
    const change = (Math.random() - 0.5) * volatility * (max - min);
    value = Math.max(min, Math.min(max, value + change));
    
    // Apply trend factor
    value = value * trendFactor;
    
    data.push(value);
  }
  
  return data;
};

// Generate predicted data with confidence intervals
const generatePredictionData = (
  historicalLength: number,
  predictionLength: number,
  historicalMin: number,
  historicalMax: number,
  predictionMin: number,
  predictionMax: number,
  confidenceInterval = 0.2
) => {
  const dates = generateDateRange(historicalLength + predictionLength);
  
  // Generate historical data
  const historicalData = generateSmoothData(historicalLength, historicalMin, historicalMax);
  
  // Generate prediction data with a slight trend
  const predictionData = generateSmoothData(
    predictionLength, 
    predictionMin, 
    predictionMax,
    0.15,
    'up'
  );
  
  // Combine the data
  const combined = [
    ...historicalData,
    ...predictionData
  ];
  
  // Calculate confidence intervals for predictions
  const result = dates.map((name, i) => {
    const value = combined[i];
    
    // Only add confidence intervals for predictions
    if (i >= historicalLength) {
      const confidence = value * confidenceInterval;
      return {
        name,
        value: Math.round(value * 100) / 100,
        upperBound: Math.round((value + confidence) * 100) / 100,
        lowerBound: Math.round((value - confidence) * 100) / 100
      };
    }
    
    return {
      name,
      value: Math.round(value * 100) / 100
    };
  });
  
  return {
    data: result,
    predictionStartIndex: historicalLength
  };
};

// Get overview metrics data
export function getOverviewData() {
  const dates = generateDateRange(30);
  
  // Active users data
  const activeUsersData = generateSmoothData(31, 100, 500, 0.1, 'up');
  const newUsersData = generateSmoothData(31, 5, 30, 0.2, 'up');
  
  // Completion data
  const acceptanceRateData = generateSmoothData(31, 50, 80, 0.05, 'up');
  const completionCountData = generateSmoothData(31, 1000, 5000, 0.1, 'up');
  
  const usageData = dates.map((date, i) => ({
    name: date,
    activeUsers: Math.round(activeUsersData[i]),
    newUsers: Math.round(newUsersData[i])
  }));
  
  const completionData = dates.map((date, i) => ({
    name: date,
    acceptanceRate: Math.round(acceptanceRateData[i]),
    completionCount: Math.round(completionCountData[i] / 100) * 100
  }));
  
  return {
    metrics: {
      activeUsers: "487",
      acceptedCompletions: "218.5K",
      linesGenerated: "1.2M",
      timeSaved: "342 hrs"
    },
    usageData,
    completionData
  };
}

// Get demo usage data
export function getDemoUsageData() {
  return {
    languageStats: [
      { name: "TypeScript", percentage: 38, lineCount: 458000 },
      { name: "Python", percentage: 24, lineCount: 288000 },
      { name: "JavaScript", percentage: 18, lineCount: 216000 },
      { name: "Java", percentage: 12, lineCount: 144000 }
    ]
  };
}

// Get DORA metrics data
export function getDoraMetricsData() {
  const dates = generateDateRange(30);
  
  // Generate data for teams with and without Copilot
  const withCopilotDeployment = generateSmoothData(31, 3.5, 6.5, 0.1, 'up');
  const withoutCopilotDeployment = generateSmoothData(31, 2.0, 3.5, 0.08, 'stable');
  
  const withCopilotLeadTime = generateSmoothData(31, 8, 12, 0.1, 'down');
  const withoutCopilotLeadTime = generateSmoothData(31, 14, 20, 0.1, 'stable');
  
  const withCopilotMTTR = generateSmoothData(31, 2, 4, 0.15, 'down');
  const withoutCopilotMTTR = generateSmoothData(31, 4, 8, 0.12, 'stable');
  
  const withCopilotFailure = generateSmoothData(31, 8, 12, 0.2, 'down');
  const withoutCopilotFailure = generateSmoothData(31, 14, 18, 0.15, 'stable');
  
  // Format the data for charts
  const deploymentFrequencyData = dates.map((date, i) => ({
    name: date,
    withCopilot: Math.round(withCopilotDeployment[i] * 10) / 10,
    withoutCopilot: Math.round(withoutCopilotDeployment[i] * 10) / 10
  }));
  
  const leadTimeData = dates.map((date, i) => ({
    name: date,
    withCopilot: Math.round(withCopilotLeadTime[i]),
    withoutCopilot: Math.round(withoutCopilotLeadTime[i])
  }));
  
  const mttrData = dates.map((date, i) => ({
    name: date,
    withCopilot: Math.round(withCopilotMTTR[i] * 10) / 10,
    withoutCopilot: Math.round(withoutCopilotMTTR[i] * 10) / 10
  }));
  
  const changeFailureData = dates.map((date, i) => ({
    name: date,
    withCopilot: Math.round(withCopilotFailure[i]),
    withoutCopilot: Math.round(withoutCopilotFailure[i])
  }));
  
  // Generate projected deployment frequency
  const projected = generatePredictionData(
    12,  // 12 months of historical data
    12,  // 12 months of predictions
    3.5, // Historical min
    6.5, // Historical max
    6.0, // Prediction min
    9.0, // Prediction max
    0.15 // Confidence interval (15%)
  );
  
  const projectedDeploymentFrequency = projected.data.map(item => ({
    name: item.name,
    frequency: item.value,
    upperBound: item.upperBound,
    lowerBound: item.lowerBound
  }));
  
  return {
    metrics: {
      deploymentFrequency: "5.8× weekly",
      leadTime: "9.2 hours",
      mttr: "2.7 hours",
      changeFailureRate: "8.4%"
    },
    deploymentFrequencyData,
    leadTimeData,
    mttrData,
    changeFailureData,
    projectedDeploymentFrequency
  };
}

// Get SPACE framework data
export function getSpaceFrameworkData() {
  const dates = generateDateRange(30);
  
  // Generate data for teams with and without Copilot for each SPACE dimension
  const withCopilotSatisfaction = generateSmoothData(31, 70, 90, 0.05, 'up');
  const withoutCopilotSatisfaction = generateSmoothData(31, 55, 70, 0.05, 'stable');
  
  const withCopilotPerformance = generateSmoothData(31, 65, 85, 0.08, 'up');
  const withoutCopilotPerformance = generateSmoothData(31, 50, 65, 0.08, 'stable');
  
  const withCopilotActivity = generateSmoothData(31, 60, 80, 0.1, 'up');
  const withoutCopilotActivity = generateSmoothData(31, 45, 60, 0.1, 'stable');
  
  const withCopilotCommunication = generateSmoothData(31, 55, 75, 0.12, 'up');
  const withoutCopilotCommunication = generateSmoothData(31, 45, 60, 0.1, 'stable');
  
  const withCopilotEfficiency = generateSmoothData(31, 65, 85, 0.08, 'up');
  const withoutCopilotEfficiency = generateSmoothData(31, 50, 65, 0.08, 'stable');
  
  // Format the data for charts
  const satisfactionData = dates.map((date, i) => ({
    name: date,
    withCopilot: Math.round(withCopilotSatisfaction[i]),
    withoutCopilot: Math.round(withoutCopilotSatisfaction[i])
  }));
  
  const performanceData = dates.map((date, i) => ({
    name: date,
    withCopilot: Math.round(withCopilotPerformance[i]),
    withoutCopilot: Math.round(withoutCopilotPerformance[i])
  }));
  
  const activityData = dates.map((date, i) => ({
    name: date,
    withCopilot: Math.round(withCopilotActivity[i]),
    withoutCopilot: Math.round(withoutCopilotActivity[i])
  }));
  
  const communicationData = dates.map((date, i) => ({
    name: date,
    withCopilot: Math.round(withCopilotCommunication[i]),
    withoutCopilot: Math.round(withoutCopilotCommunication[i])
  }));
  
  const efficiencyData = dates.map((date, i) => ({
    name: date,
    withCopilot: Math.round(withCopilotEfficiency[i]),
    withoutCopilot: Math.round(withoutCopilotEfficiency[i])
  }));
  
  return {
    categoryScores: {
      satisfaction: 87,
      performance: 83,
      activity: 76,
      communication: 72,
      efficiency: 81
    },
    satisfactionData,
    performanceData,
    activityData,
    communicationData,
    efficiencyData
  };
}

// Get prediction data
export function getPredictionData() {
  // Generate adoption prediction data
  const adoptionPrediction = generatePredictionData(
    12, // 12 months of historical data
    12, // 12 months of predictions
    20, // Historical min
    60, // Historical max
    55, // Prediction min
    85, // Prediction max
    0.15 // Confidence interval
  );
  
  // Generate productivity prediction data
  const productivityPrediction = generatePredictionData(
    12, // 12 months of historical data
    12, // 12 months of predictions
    40, // Historical min
    70, // Historical max
    65, // Prediction min
    90, // Prediction max
    0.2 // Confidence interval
  );
  
  // ROI data
  const roiData = {
    hoursSaved: "342 hrs/month",
    timeToMarket: "32% faster",
    codeQuality: "28% better",
    investment: 120000,
    return: 452000,
    netValue: 332000
  };
  
  // Timeline data
  const timelineData = {
    currentMilestone: 2,
    milestones: [
      {
        title: "Initial Adoption",
        date: "Jan 2023",
        description: "30% of developers using Copilot at least weekly"
      },
      {
        title: "Team Expansion",
        date: "Apr 2023",
        description: "Copilot expanded to all engineering teams"
      },
      {
        title: "Advanced Usage",
        date: "Jul 2023",
        description: "50% acceptance rate achieved across organization"
      },
      {
        title: "Productivity Milestone",
        date: "Oct 2023",
        description: "25% productivity improvement measured in DORA metrics"
      },
      {
        title: "Full Integration",
        date: "Jan 2024 (Projected)",
        description: "75% of developers using Copilot daily"
      },
      {
        title: "Enterprise Mastery",
        date: "Jul 2024 (Projected)",
        description: "90% of applicable code tasks assisted by AI"
      }
    ]
  };
  
  return {
    adoptionPrediction,
    productivityPrediction,
    roiData,
    timelineData
  };
}