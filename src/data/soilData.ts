import { SoilInfo } from '../types';

export const soilHealthData: SoilInfo[] = [
  {
    id: 'black-soil',
    name: 'Black Soil (Regur / Vertisols)',
    hindiName: 'काली मिट्टी (रेगुर)',
    marathiName: 'काळी कसदार जमीन (रेगूर)',
    regions: ['Maharashtra', 'Madhya Pradesh', 'Gujarat', 'Karnataka', 'Andhra Pradesh', 'Telangana'],
    typicalPh: '7.2 – 8.5 (Neutral to Mild Alkaline)',
    characteristics: [
      'High clay content (>45%) with montmorillonite mineral structure',
      'Exceptional water and nutrient retention capacity; swells when wet and develops deep fissures when dry',
      'Rich in Calcium, Magnesium, Carbonates, and Potash; naturally deficient in Nitrogen and Phosphorus',
    ],
    nutrientProfile: {
      nitrogen: 'Low',
      phosphorus: 'Low',
      potassium: 'High',
      organicCarbon: 'Medium',
    },
    suitableCrops: ['Cotton (कापूस)', 'Soybean', 'Sugarcane', 'Pigeon Pea (Tur)', 'Wheat (Rabi)', 'Gram (Chana)', 'Sunflower', 'Jowar'],
    managementTips: [
      'Avoid tillage when soil is excessively wet to prevent clod formation and heavy soil compaction.',
      'Adopt Broad Bed Furrow (BBF) or ridge-and-furrow planting to prevent water stagnation in the root zone during peak monsoon.',
      'Incorporate green manure (Dhaincha) and Single Super Phosphate (SSP) to balance phosphorus and sulphur levels.',
    ],
  },
  {
    id: 'red-soil',
    name: 'Red & Yellow Soil (Alfisols)',
    hindiName: 'लाल एवं पीली मिट्टी',
    marathiName: 'तांबडी व पिवळसर जमीन',
    regions: ['Tamil Nadu', 'Karnataka', 'Andhra Pradesh', 'Odisha', 'Chhattisgarh', 'Jharkhand'],
    typicalPh: '5.5 – 6.8 (Mild Acidic to Neutral)',
    characteristics: [
      'Formed from crystalline granite and metamorphic rocks rich in ferric oxides (giving the red hue)',
      'Coarse, porous texture with high permeability and low water retention capacity',
      'Deficient in Nitrogen, Phosphorus, Potassium, Humus, and Lime',
    ],
    nutrientProfile: {
      nitrogen: 'Low',
      phosphorus: 'Low',
      potassium: 'Medium',
      organicCarbon: 'Low',
    },
    suitableCrops: ['Groundnut (मूंगफली)', 'Ragi (Finger Millet)', 'Maize', 'Tobacco', 'Pulses', 'Oilseeds', 'Potato', 'Mango & Guava Orchards'],
    managementTips: [
      'Apply heavy doses of Farmyard Manure (FYM) or Vermicompost (3–5 tonnes/acre) to build water holding capacity.',
      'Use Drip Irrigation with frequent light waterings rather than flood irrigation to prevent fast deep leaching of nutrients.',
      'Apply Agricultural Lime if soil pH drops below 5.8 to prevent phosphorus fixation.',
    ],
  },
  {
    id: 'alluvial-soil',
    name: 'Alluvial Soil (Indo-Gangetic & Coastal Plains)',
    hindiName: 'जलोढ़ मिट्टी (दोमट)',
    marathiName: 'गाळाची जमीन / चिकणमाती',
    regions: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Bihar', 'West Bengal', 'Assam', 'Coastal Deltaic Belts'],
    typicalPh: '6.5 – 7.8 (Neutral)',
    characteristics: [
      'Deposited by major Himalayan rivers; rich in silt and organic loamy fraction',
      'Light, porous, easily tilled with balanced water retention and drainage capacity',
      'Highly fertile with adequate Potash and Lime, but moderate in Nitrogen and Organic Carbon',
    ],
    nutrientProfile: {
      nitrogen: 'Medium',
      phosphorus: 'Medium',
      potassium: 'High',
      organicCarbon: 'Medium',
    },
    suitableCrops: ['Rice / Paddy (धान)', 'Wheat', 'Sugarcane', 'Mustard', 'Jute', 'Vegetables', 'Pulses', 'Maize'],
    managementTips: [
      'Apply balanced NPK in split doses to sustain intensive double and triple cropping cycles.',
      'Practice crop rotation with legumes (Moong, Urad, Dhaincha) between Rice-Wheat cycles to break pest cycles and replenish nitrogen.',
      'Monitor Zinc levels periodically; apply Zinc Sulphate 21% @ 10kg/acre during basal land prep.',
    ],
  },
  {
    id: 'laterite-soil',
    name: 'Laterite Soil (High Rainfall & Coastal Belts)',
    hindiName: 'लेटराइट मिट्टी',
    marathiName: 'जांभी जमीन (कोकण व सह्याद्री पट्टा)',
    regions: ['Western Ghats (Konkan, Goa, Coastal Karnataka)', 'Kerala', 'Eastern Ghats', 'Meghalaya'],
    typicalPh: '4.5 – 5.8 (Strongly Acidic)',
    characteristics: [
      'Formed under high temperatures and intense monsoon rainfall causing extreme leaching of silica and bases',
      'Rich in Iron and Aluminium oxides; low in plant-available Nitrogen, Phosphorus, Potassium, Calcium, and Magnesium',
      'Porous, well-drained, but prone to rapid erosion on slopes',
    ],
    nutrientProfile: {
      nitrogen: 'Low',
      phosphorus: 'Low',
      potassium: 'Low',
      organicCarbon: 'Medium',
    },
    suitableCrops: ['Cashew (काजू)', 'Alphonso Mango (हापूस आंबा)', 'Coconut & Arecanut', 'Tea & Coffee', 'Rubber', 'Black Pepper', 'Spices'],
    managementTips: [
      'Apply Agricultural Lime or Dolomite (300–500 kg/acre) every 2 years to correct soil acidity.',
      'Use Rock Phosphate instead of water-soluble phosphates, as it dissolves gradually and resists acid fixation.',
      'Practice terracing, contour bunding, and cover cropping with Stylosanthes to curb monsoon topsoil erosion.',
    ],
  },
];
