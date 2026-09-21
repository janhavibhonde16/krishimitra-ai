export type Language = 'en' | 'hi' | 'mr';

export type Theme = 'light' | 'dark';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  language?: Language;
  suggestions?: string[];
}

export interface DiseaseDetectionResult {
  cropName: string;
  diseaseName: string;
  confidence: number;
  severity: 'Low' | 'Moderate' | 'High' | 'Severe' | 'Uncertain';
  symptoms: string[];
  possibleCauses: string[];
  prevention: string[];
  organicManagement: string[];
  chemicalManagement: string[];
  recommendedNextSteps: string[];
  isHealthy?: boolean;
  isUncertain?: boolean;
  disclaimer: string;
  provider?: string;
}

export interface CropRecommendationInput {
  state: string;
  district: string;
  village?: string;
  soilType: string;
  landArea?: number;
  landAreaAcres?: number;
  landUnit?: 'Acre' | 'Hectare' | 'Bigha' | 'Guntha' | string;
  waterAvailability: string;
  waterSource?: string;
  season: string;
  previousCrop?: string;
  irrigationType?: string;
  farmingObjective?: string;
  farmingGoal?: string;
  budget?: number | string;
  budgetPerAcre?: string;
  weatherContext?: Partial<WeatherData> | null;
}

export interface CropRecommendationItem {
  cropName: string;
  hindiName?: string;
  marathiName?: string;
  suitabilityScore: number;
  isPrimary?: boolean;
  waterRequirement: string;
  growingPeriodDays?: string;
  cropDurationDays?: string;
  expectedYieldRange?: string;
  expectedYieldPerAcre?: string;
  estimatedInvestmentPerAcre?: string;
  estimatedProfitPerAcre?: string;
  estimatedNetProfitPerAcre?: string;
  profitMarginPercent?: string;
  suitableSowingWindow?: string;
  sowingWindow?: string;
  fertilizerGuidance?: string[] | string;
  fertilizerPlan?: string;
  riskFactors?: string[] | string;
  riskAndMitigation?: string;
  whyRecommended?: string;
  precautions?: string[];
  intercroppingOption?: string;
  weatherAlignmentNote?: string;
}

export interface WeatherData {
  city: string;
  district: string;
  state: string;
  temperature: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  rainProbability: number;
  rainfallMm: number;
  windSpeedKmh: number;
  windDirection: string;
  uvIndex: number;
  weatherCondition: string;
  weatherDescription: string;
  iconCode: string;
  sunrise: string;
  sunset: string;
  visibilityKm: number;
  pressureHpa: number;
  lastUpdated: string;
  isLiveApi: boolean;
  forecast: DayForecast[];
  agriAdvisories: AgriWeatherAdvisory[];
}

export interface DayForecast {
  date: string;
  dayName: string;
  tempMin: number;
  tempMax: number;
  condition: string;
  weatherIcon: string;
  rainProbability: number;
  rainfallEstimateMm: number;
  windSpeedKmh: number;
}

export interface AgriWeatherAdvisory {
  category: 'Sowing' | 'Irrigation' | 'Spraying' | 'Fertilizer' | 'Harvesting' | 'Heat/Frost' | 'General';
  status: 'Safe' | 'Caution' | 'Avoid' | 'Recommended';
  title: string;
  description: string;
}

export interface MandiItem {
  id: string;
  cropName: string;
  hindiName: string;
  marathiName: string;
  category: 'Cereals' | 'Pulses' | 'Oilseeds' | 'Cash Crops' | 'Vegetables' | 'Fruits' | 'Spices';
  marketName: string;
  district: string;
  state: string;
  modalPrice: number;
  minPrice: number;
  maxPrice: number;
  unit: string;
  previousPrice: number;
  priceChange: number;
  priceChangePercent: number;
  trend: 'up' | 'down' | 'stable';
  arrivalQuantity: string;
  date: string;
}

export interface GovernmentScheme {
  id: string;
  name: string;
  hindiName: string;
  marathiName: string;
  category: 'Direct Benefit' | 'Crop Insurance' | 'Irrigation & Water' | 'Credit & Loan' | 'Solar & Green Energy' | 'Machinery & Tools';
  tagline: string;
  benefits: string[];
  eligibility: string[];
  requiredDocuments: string[];
  officialPortalUrl: string;
  department: string;
  applicationMode: 'Online' | 'Offline / CSC' | 'Both';
}

export interface LearningArticle {
  id: string;
  title: string;
  hindiTitle: string;
  marathiTitle: string;
  category: 'Organic Farming' | 'Smart Irrigation' | 'Modern Farming' | 'Fertilizer Guide' | 'Pest Control' | 'Soil Management' | 'Water Conservation' | 'Sustainable Agriculture' | 'Success Stories';
  readTime: string;
  summary: string;
  content: string[];
  keyTakeaways: string[];
  imageUrl: string;
}

export interface SoilInfo {
  id: string;
  name: string;
  hindiName: string;
  marathiName: string;
  regions: string[];
  characteristics: string[];
  typicalPh: string;
  nutrientProfile: {
    nitrogen: 'Low' | 'Medium' | 'High';
    phosphorus: 'Low' | 'Medium' | 'High';
    potassium: 'Low' | 'Medium' | 'High';
    organicCarbon: 'Low' | 'Medium' | 'High';
  };
  suitableCrops: string[];
  managementTips: string[];
}

export interface FarmingStage {
  cropName: string;
  season: string;
  stages: {
    stageName: string;
    dayRange: string;
    description: string;
    irrigationNote: string;
    fertilizerAction: string;
    pestMonitoring: string;
  }[];
}

export interface ExpenseCalculation {
  id?: string;
  date: string;
  cropName: string;
  landAreaAcre: number;
  seedCost: number;
  fertilizerCost: number;
  pesticideCost: number;
  labourCost: number;
  irrigationCost: number;
  machineryCost: number;
  transportCost: number;
  otherExpenses: number;
  expectedYieldQuintal: number;
  expectedPricePerQuintal: number;
  // Computed
  totalCost: number;
  expectedIncome: number;
  netProfit: number;
  profitMarginPercent: number;
  costPerAcre: number;
  incomePerAcre: number;
  profitPerAcre: number;
}

export interface AgriServiceItem {
  id: string;
  name: string;
  category: 'Krishi Seva Kendra' | 'Seed & Fertilizer Store' | 'Soil Testing Lab' | 'APMC Mandi' | 'Veterinary Clinic' | 'Agriculture Office';
  district: string;
  state: string;
  address: string;
  phone: string;
  operatingHours: string;
  distanceKm?: number;
  rating?: number;
  servicesOffered: string[];
}

export interface EmergencyContact {
  id: string;
  title: string;
  hindiTitle: string;
  marathiTitle: string;
  category: 'Kisan Helpline' | 'Crop Insurance' | 'Veterinary Emergency' | 'Disaster Relief' | 'Pest Alert';
  phone: string;
  tollFree: boolean;
  hours: string;
  description: string;
  website?: string;
}
