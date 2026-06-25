/* ═══════════════════════════════════════════════════════════════════════
   FloorVision Pro — BLENDS DATA (Real Onfigr CDN — EXACT RATIOS)
   Source: https://staging.cdn-onfigr.com/sika/flooring/visualizer/latest.json
   990 blends | 196 flake colors | exact part ratios + size codes from master config
   
   Part structure: [flakeId, ratio, sizeCode]
     sizeCode: 'vs'=0.5, 's'=1, 'm'=2  (matches FLAKE_SIZE_MOD system)
     chipCount = round(2/sizeNum)^2
     G-prefix flake IDs → 1.75x brightness boost
═══════════════════════════════════════════════════════════════════════ */

export interface BlendPart {
  flakeId:   string   // e.g. 'F1410'
  color:     string   // '#RRGGBB' from flake hex map
  ratio:     number   // normalized 0-1 (sum of all parts = 1.0)
  sizeCode:  string   // 'vs'|'s'|'m'
  rangeMin:  number   // cumulative ratio start (for seed-based color selection)
  rangeMax:  number   // cumulative ratio end
  isGlitter: boolean  // true if flakeId starts with 'G'
}

export interface Blend {
  id:         string
  name:       string
  type:       string
  collection: string
  img_url:    string
  tags:       string[]
  hex_colors: string[]   // quick access hex array (ordered by parts)
  parts:      BlendPart[]
}

const CDN = 'https://staging.cdn-onfigr.com/shared_assets/floor_visualizer/core/latest/'

export const ALL_BLENDS: Blend[] = [
  {
    id: 'FB-127', name: 'Coulee', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-127.webp`,
    tags: ["Black", "Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#B8B7AF", "#CDC1AC", "#F0EFE8", "#3C3C3C"],
    parts: [
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.3, sizeCode:'s', rangeMin:0.0, rangeMax:0.3, isGlitter:false },
      { flakeId:'F1780', color:'#CDC1AC', ratio:0.3, sizeCode:'s', rangeMin:0.3, rangeMax:0.6, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.3, sizeCode:'s', rangeMin:0.6, rangeMax:0.9, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-310', name: 'Starlight', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-310.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#A3ADB2", "#496A9A", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.25, sizeCode:'s', rangeMin:0.0, rangeMax:0.25, isGlitter:false },
      { flakeId:'F1480', color:'#A3ADB2', ratio:0.25, sizeCode:'s', rangeMin:0.25, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1790', color:'#496A9A', ratio:0.25, sizeCode:'s', rangeMin:0.5, rangeMax:0.75, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.25, sizeCode:'s', rangeMin:0.75, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-411', name: 'Dalmatian', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-411.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#B8B7AF", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.333, sizeCode:'s', rangeMin:0.0, rangeMax:0.333, isGlitter:false },
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.334, sizeCode:'s', rangeMin:0.333, rangeMax:0.667, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.333, sizeCode:'s', rangeMin:0.667, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-414', name: 'Shale', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-414.webp`,
    tags: ["Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#B8B7AF", "#707677", "#CAC9C5", "#F0EFE8"],
    parts: [
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.25, sizeCode:'s', rangeMin:0.0, rangeMax:0.25, isGlitter:false },
      { flakeId:'F1415', color:'#707677', ratio:0.25, sizeCode:'s', rangeMin:0.25, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1800', color:'#CAC9C5', ratio:0.25, sizeCode:'s', rangeMin:0.5, rangeMax:0.75, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.25, sizeCode:'s', rangeMin:0.75, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-421', name: 'Lakeshore', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-421.webp`,
    tags: ["Black", "Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#A98D6F", "#3C3C3C", "#ECE2CE", "#CDC1AC"],
    parts: [
      { flakeId:'F1040', color:'#A98D6F', ratio:0.11, sizeCode:'s', rangeMin:0.0, rangeMax:0.11, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.06, sizeCode:'s', rangeMin:0.11, rangeMax:0.17, isGlitter:false },
      { flakeId:'F1425', color:'#ECE2CE', ratio:0.33, sizeCode:'s', rangeMin:0.17, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1780', color:'#CDC1AC', ratio:0.5, sizeCode:'s', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-517', name: 'Wilderness', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-517.webp`,
    tags: ["Black", "Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#A98D6F", "#3C3C3C", "#6F5E56", "#BF9678", "#D9C4A3", "#F0EFE8"],
    parts: [
      { flakeId:'F1040', color:'#A98D6F', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.2, rangeMax:0.3, isGlitter:false },
      { flakeId:'F1060', color:'#6F5E56', ratio:0.1, sizeCode:'s', rangeMin:0.3, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1770', color:'#BF9678', ratio:0.15, sizeCode:'s', rangeMin:0.4, rangeMax:0.55, isGlitter:false },
      { flakeId:'F1785', color:'#D9C4A3', ratio:0.35, sizeCode:'s', rangeMin:0.55, rangeMax:0.9, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-616', name: 'Victoria', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-616.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#898A86", "#CAC9C5", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.15, sizeCode:'s', rangeMin:0.0, rangeMax:0.15, isGlitter:false },
      { flakeId:'F1090', color:'#898A86', ratio:0.55, sizeCode:'s', rangeMin:0.15, rangeMax:0.7, isGlitter:false },
      { flakeId:'F1800', color:'#CAC9C5', ratio:0.15, sizeCode:'s', rangeMin:0.7, rangeMax:0.85, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.15, sizeCode:'s', rangeMin:0.85, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-715', name: 'Midnight', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-715.webp`,
    tags: ["Black", "Dark", "Grey", "Neutral"],
    hex_colors: ["#898A86", "#3C3C3C", "#52565B", "#A5A59F", "#717373", "#767577", "#9F9C95"],
    parts: [
      { flakeId:'F1090', color:'#898A86', ratio:0.4, sizeCode:'s', rangeMin:0.0, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.4, rangeMax:0.5, isGlitter:false },
      { flakeId:'F5920', color:'#52565B', ratio:0.1, sizeCode:'s', rangeMin:0.5, rangeMax:0.6, isGlitter:false },
      { flakeId:'F6606', color:'#A5A59F', ratio:0.1, sizeCode:'s', rangeMin:0.6, rangeMax:0.7, isGlitter:false },
      { flakeId:'F9904', color:'#717373', ratio:0.1, sizeCode:'s', rangeMin:0.7, rangeMax:0.8, isGlitter:false },
      { flakeId:'F9955', color:'#767577', ratio:0.1, sizeCode:'s', rangeMin:0.8, rangeMax:0.9, isGlitter:false },
      { flakeId:'F9961', color:'#9F9C95', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-716', name: 'Streambed', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-716.webp`,
    tags: ["Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#928672", "#58504C", "#95805E", "#ADA08E", "#7C766D", "#A4A296", "#D8D4CB", "#745748", "#ABA49A"],
    parts: [
      { flakeId:'F1000', color:'#928672', ratio:0.03, sizeCode:'s', rangeMin:0.0, rangeMax:0.03, isGlitter:false },
      { flakeId:'F1100', color:'#58504C', ratio:0.03, sizeCode:'s', rangeMin:0.03, rangeMax:0.06, isGlitter:false },
      { flakeId:'F5115', color:'#95805E', ratio:0.03, sizeCode:'s', rangeMin:0.06, rangeMax:0.09, isGlitter:false },
      { flakeId:'F5116', color:'#ADA08E', ratio:0.25, sizeCode:'s', rangeMin:0.09, rangeMax:0.34, isGlitter:false },
      { flakeId:'F5306', color:'#7C766D', ratio:0.03, sizeCode:'s', rangeMin:0.34, rangeMax:0.37, isGlitter:false },
      { flakeId:'F5305', color:'#A4A296', ratio:0.1, sizeCode:'s', rangeMin:0.37, rangeMax:0.47, isGlitter:false },
      { flakeId:'F9959', color:'#D8D4CB', ratio:0.25, sizeCode:'s', rangeMin:0.47, rangeMax:0.72, isGlitter:false },
      { flakeId:'F9982', color:'#745748', ratio:0.03, sizeCode:'s', rangeMin:0.72, rangeMax:0.75, isGlitter:false },
      { flakeId:'F9987', color:'#ABA49A', ratio:0.25, sizeCode:'s', rangeMin:0.75, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-427', name: 'Graystoke', type: 'flake-blend', collection: 'garage',
    img_url: `${CDN}assets/images/blends/FB-427.webp`,
    tags: ["Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#898A86", "#B8B7AF", "#707677", "#CAC9C5", "#F0EFE8"],
    parts: [
      { flakeId:'F1090', color:'#898A86', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.2, sizeCode:'s', rangeMin:0.2, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1415', color:'#707677', ratio:0.2, sizeCode:'s', rangeMin:0.4, rangeMax:0.6, isGlitter:false },
      { flakeId:'F1800', color:'#CAC9C5', ratio:0.2, sizeCode:'s', rangeMin:0.6, rangeMax:0.8, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.8, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-711', name: 'Zodiac', type: 'flake-blend', collection: 'garage',
    img_url: `${CDN}assets/images/blends/FB-711.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#F0EFE8", "#4870A9", "#A5A59F", "#8B98A2", "#CBC8C2"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.1, rangeMax:0.3, isGlitter:false },
      { flakeId:'F6604', color:'#4870A9', ratio:0.1, sizeCode:'s', rangeMin:0.3, rangeMax:0.4, isGlitter:false },
      { flakeId:'F6606', color:'#A5A59F', ratio:0.2, sizeCode:'s', rangeMin:0.4, rangeMax:0.6, isGlitter:false },
      { flakeId:'F6621', color:'#8B98A2', ratio:0.2, sizeCode:'s', rangeMin:0.6, rangeMax:0.8, isGlitter:false },
      { flakeId:'F9958', color:'#CBC8C2', ratio:0.2, sizeCode:'s', rangeMin:0.8, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-423', name: 'Horizon', type: 'flake-blend', collection: 'archive',
    img_url: `${CDN}assets/images/blends/FB-423.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#B8B7AF", "#A3ADB2", "#496A9A", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.2, sizeCode:'s', rangeMin:0.2, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1480', color:'#A3ADB2', ratio:0.2, sizeCode:'s', rangeMin:0.4, rangeMax:0.6, isGlitter:false },
      { flakeId:'F1790', color:'#496A9A', ratio:0.2, sizeCode:'s', rangeMin:0.6, rangeMax:0.8, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.8, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-706', name: 'Pebble', type: 'flake-blend', collection: 'contemporary',
    img_url: `${CDN}assets/images/blends/FB-706.webp`,
    tags: ["Brown", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#ADA08E", "#817D76", "#BCB4A7", "#CBC8C2"],
    parts: [
      { flakeId:'F5116', color:'#ADA08E', ratio:0.4, sizeCode:'s', rangeMin:0.0, rangeMax:0.4, isGlitter:false },
      { flakeId:'F9801', color:'#817D76', ratio:0.3, sizeCode:'s', rangeMin:0.4, rangeMax:0.7, isGlitter:false },
      { flakeId:'F9957', color:'#BCB4A7', ratio:0.15, sizeCode:'s', rangeMin:0.7, rangeMax:0.85, isGlitter:false },
      { flakeId:'F9958', color:'#CBC8C2', ratio:0.15, sizeCode:'s', rangeMin:0.85, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-708', name: 'Matrix', type: 'flake-blend', collection: 'accents',
    img_url: `${CDN}assets/images/blends/FB-708.webp`,
    tags: ["Blue", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3F5069", "#8B98A2", "#D8D4CB", "#62757E", "#ABA49A"],
    parts: [
      { flakeId:'F1130', color:'#3F5069', ratio:0.05, sizeCode:'s', rangeMin:0.0, rangeMax:0.05, isGlitter:false },
      { flakeId:'F6621', color:'#8B98A2', ratio:0.1, sizeCode:'s', rangeMin:0.05, rangeMax:0.15, isGlitter:false },
      { flakeId:'F9959', color:'#D8D4CB', ratio:0.25, sizeCode:'s', rangeMin:0.15, rangeMax:0.4, isGlitter:false },
      { flakeId:'F9972', color:'#62757E', ratio:0.1, sizeCode:'s', rangeMin:0.4, rangeMax:0.5, isGlitter:false },
      { flakeId:'F9987', color:'#ABA49A', ratio:0.5, sizeCode:'s', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-807', name: 'Pumicite', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-807.webp`,
    tags: ["Blue", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#F0EFE8", "#8B98A2", "#B8B9B5", "#CBC8C2", "#D8D4CB", "#62757E"],
    parts: [
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F6621', color:'#8B98A2', ratio:0.1, sizeCode:'s', rangeMin:0.2, rangeMax:0.3, isGlitter:false },
      { flakeId:'F9903', color:'#B8B9B5', ratio:0.2, sizeCode:'s', rangeMin:0.3, rangeMax:0.5, isGlitter:false },
      { flakeId:'F9958', color:'#CBC8C2', ratio:0.2, sizeCode:'s', rangeMin:0.5, rangeMax:0.7, isGlitter:false },
      { flakeId:'F9959', color:'#D8D4CB', ratio:0.2, sizeCode:'s', rangeMin:0.7, rangeMax:0.9, isGlitter:false },
      { flakeId:'F9972', color:'#62757E', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-960', name: 'Chestnut', type: 'flake-blend', collection: 'garage',
    img_url: `${CDN}assets/images/blends/FB-960.webp`,
    tags: ["Black", "Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#6F5E56", "#B79878", "#E6DFCC", "#F0EFE8", "#A28568", "#3C3C3C"],
    parts: [
      { flakeId:'F1060', color:'#6F5E56', ratio:0.1, sizeCode:'s', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'F1320', color:'#B79878', ratio:0.2, sizeCode:'s', rangeMin:0.1, rangeMax:0.3, isGlitter:false },
      { flakeId:'F9986', color:'#E6DFCC', ratio:0.2, sizeCode:'s', rangeMin:0.3, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.5, rangeMax:0.7, isGlitter:false },
      { flakeId:'F6607', color:'#A28568', ratio:0.2, sizeCode:'s', rangeMin:0.7, rangeMax:0.9, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB032-25A', name: 'Ledgestone testy', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB032-25A.webp`,
    tags: [],
    hex_colors: ["#333132", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.1, sizeCode:'l', rangeMin:0.1, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.8, sizeCode:'l', rangeMin:0.2, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB033-25A', name: 'Prairie testydf', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB033-25A.webp`,
    tags: [],
    hex_colors: ["#333132", "#9C8C91", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1810', color:'#9C8C91', ratio:0.3, sizeCode:'l', rangeMin:0.1, rangeMax:0.4, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.6, sizeCode:'l', rangeMin:0.4, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB038-40S', name: 'Bedrock', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB038-40S.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#C2C4C6", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1330', color:'#C2C4C6', ratio:0.5, sizeCode:'l', rangeMin:0.1, rangeMax:0.6, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.4, sizeCode:'l', rangeMin:0.6, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB042-40S', name: 'Conifer', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB042-40S.webp`,
    tags: ["Black", "Bright", "Dark", "Green", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#C2C4C6", "#409542", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.090909, sizeCode:'l', rangeMin:0.0, rangeMax:0.090909, isGlitter:false },
      { flakeId:'Q1330', color:'#C2C4C6', ratio:0.363636, sizeCode:'l', rangeMin:0.090909, rangeMax:0.454545, isGlitter:false },
      { flakeId:'Q1420', color:'#409542', ratio:0.363636, sizeCode:'l', rangeMin:0.454545, rangeMax:0.818182, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.181818, sizeCode:'l', rangeMin:0.818182, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB034-40S', name: 'Gneiss', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB034-40S.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.2, sizeCode:'l', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.4, sizeCode:'l', rangeMin:0.2, rangeMax:0.6, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.4, sizeCode:'l', rangeMin:0.6, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB041-25A', name: 'Bluestone', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB041-25A.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#005DAC", "#C2C4C6", "#F8F8F9", "#333132"],
    parts: [
      { flakeId:'Q1110', color:'#005DAC', ratio:0.363726, sizeCode:'l', rangeMin:0.0, rangeMax:0.363726, isGlitter:false },
      { flakeId:'Q1330', color:'#C2C4C6', ratio:0.212091, sizeCode:'l', rangeMin:0.363726, rangeMax:0.575818, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.353816, sizeCode:'l', rangeMin:0.575818, rangeMax:0.929633, isGlitter:false },
      { flakeId:'Q1020', color:'#333132', ratio:0.070367, sizeCode:'l', rangeMin:0.929633, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB035-40S', name: 'Jasper', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB035-40S.webp`,
    tags: ["Blue", "Bright", "Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#005DAC", "#5D463A", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1110', color:'#005DAC', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1270', color:'#5D463A', ratio:0.2, sizeCode:'l', rangeMin:0.1, rangeMax:0.3, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.2, sizeCode:'l', rangeMin:0.3, rangeMax:0.5, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.5, sizeCode:'l', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB037-40S', name: 'Dune', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB037-40S.webp`,
    tags: ["Brown", "Light", "Neutral", "Pink", "White"],
    hex_colors: ["#D9C499", "#EFE6E3", "#F8F8F9"],
    parts: [
      { flakeId:'Q1240', color:'#D9C499', ratio:0.2, sizeCode:'l', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1630', color:'#EFE6E3', ratio:0.2, sizeCode:'l', rangeMin:0.2, rangeMax:0.4, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.6, sizeCode:'l', rangeMin:0.4, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB036-40S', name: 'India Red', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB036-40S.webp`,
    tags: ["Brown", "Dark", "Light", "Neutral", "Red", "White"],
    hex_colors: ["#D9C499", "#942D1B", "#F8F8F9"],
    parts: [
      { flakeId:'Q1240', color:'#D9C499', ratio:0.25, sizeCode:'l', rangeMin:0.0, rangeMax:0.25, isGlitter:false },
      { flakeId:'Q1620', color:'#942D1B', ratio:0.25, sizeCode:'l', rangeMin:0.25, rangeMax:0.5, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.5, sizeCode:'l', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB039-40S', name: 'Dacite', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB039-40S.webp`,
    tags: ["Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#5D463A", "#F8F8F9"],
    parts: [
      { flakeId:'Q1270', color:'#5D463A', ratio:0.2, sizeCode:'l', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.8, sizeCode:'l', rangeMin:0.2, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB043-40S', name: 'Russet', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB043-40S.webp`,
    tags: ["Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#5D463A", "#D9C499", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1270', color:'#5D463A', ratio:0.278, sizeCode:'l', rangeMin:0.0, rangeMax:0.278, isGlitter:false },
      { flakeId:'Q1240', color:'#D9C499', ratio:0.278, sizeCode:'l', rangeMin:0.278, rangeMax:0.556, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.166, sizeCode:'l', rangeMin:0.556, rangeMax:0.722, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.278, sizeCode:'l', rangeMin:0.722, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB040-40S', name: 'Ares New stuff', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB040-40S.webp`,
    tags: [],
    hex_colors: ["#942D1B", "#D1D3D4"],
    parts: [
      { flakeId:'Q1620', color:'#942D1B', ratio:0.3, sizeCode:'l', rangeMin:0.0, rangeMax:0.3, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.7, sizeCode:'l', rangeMin:0.3, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1010', name: 'Pearly whtes', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1010.webp`,
    tags: [],
    hex_colors: ["#BDC5C9"],
    parts: [
      { flakeId:'P1010', color:'#BDC5C9', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1020', name: 'Dolphin', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1020.webp`,
    tags: ["Grey", "Neutral"],
    hex_colors: ["#9EA3A6"],
    parts: [
      { flakeId:'P1020', color:'#9EA3A6', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1030', name: 'Manatee', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1030.webp`,
    tags: ["Dark", "Grey"],
    hex_colors: ["#8A8D90"],
    parts: [
      { flakeId:'P1030', color:'#8A8D90', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1040', name: 'Whale', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1040.webp`,
    tags: ["Dark", "Grey"],
    hex_colors: ["#626568"],
    parts: [
      { flakeId:'P1040', color:'#626568', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1050', name: 'Caviar', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1050.webp`,
    tags: ["Black", "Dark", "Grey"],
    hex_colors: ["#444342"],
    parts: [
      { flakeId:'P1050', color:'#444342', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1105', name: 'Guava', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1105.webp`,
    tags: ["Brown", "Grey", "Neutral"],
    hex_colors: ["#B0A89D"],
    parts: [
      { flakeId:'P1105', color:'#B0A89D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1110', name: 'Overcast', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1110.webp`,
    tags: ["Brown", "Grey", "Neutral"],
    hex_colors: ["#9B9588"],
    parts: [
      { flakeId:'P1110', color:'#9B9588', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1115', name: 'Sandbar', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1115.webp`,
    tags: ["Brown", "Light", "Neutral", "Yellow"],
    hex_colors: ["#B1A68C"],
    parts: [
      { flakeId:'P1115', color:'#B1A68C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1120', name: 'Palapa', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1120.webp`,
    tags: ["Brown", "Light", "Neutral", "Yellow"],
    hex_colors: ["#B2A789"],
    parts: [
      { flakeId:'P1120', color:'#B2A789', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1125', name: 'Bamboo', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1125.webp`,
    tags: ["Brown", "Dark", "Green"],
    hex_colors: ["#867959"],
    parts: [
      { flakeId:'P1125', color:'#867959', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1130', name: 'Lager', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1130.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#B99062"],
    parts: [
      { flakeId:'P1130', color:'#B99062', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1135', name: 'Driftwood', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1135.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#997B5B"],
    parts: [
      { flakeId:'P1135', color:'#997B5B', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1140', name: 'Hammock', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1140.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#A4825A"],
    parts: [
      { flakeId:'P1140', color:'#A4825A', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1145', name: 'Rum', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1145.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#9A7961"],
    parts: [
      { flakeId:'P1145', color:'#9A7961', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1150', name: 'Shipwreck', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1150.webp`,
    tags: ["Brown", "Dark", "Neutral"],
    hex_colors: ["#8D7357"],
    parts: [
      { flakeId:'P1150', color:'#8D7357', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1155', name: 'Tiki', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1155.webp`,
    tags: ["Brown", "Neutral"],
    hex_colors: ["#A5865D"],
    parts: [
      { flakeId:'P1155', color:'#A5865D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1160', name: 'Cabana', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1160.webp`,
    tags: ["Brown", "Neutral", "Orange", "Red"],
    hex_colors: ["#926B57"],
    parts: [
      { flakeId:'P1160', color:'#926B57', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1165', name: 'Cannon', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1165.webp`,
    tags: ["Brown", "Dark"],
    hex_colors: ["#7C7466"],
    parts: [
      { flakeId:'P1165', color:'#7C7466', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1170', name: 'Sandal', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1170.webp`,
    tags: ["Brown", "Dark"],
    hex_colors: ["#7C6B5B"],
    parts: [
      { flakeId:'P1170', color:'#7C6B5B', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1210', name: 'Parrot', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1210.webp`,
    tags: ["Brown", "Dark"],
    hex_colors: ["#6882AE"],
    parts: [
      { flakeId:'P1210', color:'#6882AE', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1220', name: 'Bikini', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1220.webp`,
    tags: ["Bright", "Pink"],
    hex_colors: ["#A65C80"],
    parts: [
      { flakeId:'P1220', color:'#A65C80', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1230', name: 'Starfish', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1230.webp`,
    tags: ["Bold", "Orange", "Red"],
    hex_colors: ["#AF6B5D"],
    parts: [
      { flakeId:'P1230', color:'#AF6B5D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1240', name: 'Americana', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1240.webp`,
    tags: ["Bright", "Red"],
    hex_colors: ["#A25859"],
    parts: [
      { flakeId:'P1240', color:'#A25859', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1250', name: 'Sangria', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1250.webp`,
    tags: ["Dark", "Purple", "Red"],
    hex_colors: ["#85686C"],
    parts: [
      { flakeId:'P1250', color:'#85686C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1310', name: 'Mandarin', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1310.webp`,
    tags: ["Bright", "Orange", "Yellow"],
    hex_colors: ["#BE8E5B"],
    parts: [
      { flakeId:'P1310', color:'#BE8E5B', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1320', name: 'Mango', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1320.webp`,
    tags: ["Bright", "Orange", "Red"],
    hex_colors: ["#B36855"],
    parts: [
      { flakeId:'P1320', color:'#B36855', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1330', name: 'Coral', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1330.webp`,
    tags: ["Bright", "Orange"],
    hex_colors: ["#B98762"],
    parts: [
      { flakeId:'P1330', color:'#B98762', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1340', name: 'Ginger', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1340.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#976B57"],
    parts: [
      { flakeId:'P1340', color:'#976B57', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1410', name: 'Banana', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1410.webp`,
    tags: ["Bold", "Bright", "Yellow"],
    hex_colors: ["#C6B357"],
    parts: [
      { flakeId:'P1410', color:'#C6B357', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1420', name: 'Papaya', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1420.webp`,
    tags: ["Bright", "Yellow"],
    hex_colors: ["#C4AF6C"],
    parts: [
      { flakeId:'P1420', color:'#C4AF6C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1430', name: 'Daydream', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1430.webp`,
    tags: ["Green", "Grey", "Neutral", "Yellow"],
    hex_colors: ["#9D9070"],
    parts: [
      { flakeId:'P1430', color:'#9D9070', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1440', name: 'Sunset', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1440.webp`,
    tags: ["Green", "Grey", "Neutral"],
    hex_colors: ["#A29C84"],
    parts: [
      { flakeId:'P1440', color:'#A29C84', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1510', name: 'Margarita', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1510.webp`,
    tags: ["Bold", "Bright", "Green"],
    hex_colors: ["#759B7E"],
    parts: [
      { flakeId:'P1510', color:'#759B7E', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1520', name: 'Avocado', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1520.webp`,
    tags: ["Bold", "Bright", "Green"],
    hex_colors: ["#7DA57A"],
    parts: [
      { flakeId:'P1520', color:'#7DA57A', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1530', name: 'Seaweed', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1530.webp`,
    tags: ["Bold", "Green"],
    hex_colors: ["#657867"],
    parts: [
      { flakeId:'P1530', color:'#657867', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1540', name: 'Palm', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1540.webp`,
    tags: ["Brown", "Green", "Grey", "Neutral"],
    hex_colors: ["#798067"],
    parts: [
      { flakeId:'P1540', color:'#798067', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1550', name: 'Pier', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1550.webp`,
    tags: ["Brown", "Green", "Grey", "Neutral"],
    hex_colors: ["#7C7E65"],
    parts: [
      { flakeId:'P1550', color:'#7C7E65', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1560', name: 'Kona', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1560.webp`,
    tags: ["Dark", "Green"],
    hex_colors: ["#545F53"],
    parts: [
      { flakeId:'P1560', color:'#545F53', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1610', name: 'Caribbean', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1610.webp`,
    tags: ["Blue", "Light"],
    hex_colors: ["#7DB2CA"],
    parts: [
      { flakeId:'P1610', color:'#7DB2CA', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1620', name: 'Maui', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1620.webp`,
    tags: ["Blue", "Bright"],
    hex_colors: ["#2087BA"],
    parts: [
      { flakeId:'P1620', color:'#2087BA', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1630', name: 'Curacao', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1630.webp`,
    tags: ["Blue", "Grey", "Neutral"],
    hex_colors: ["#757B7C"],
    parts: [
      { flakeId:'P1630', color:'#757B7C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1640', name: 'Azure', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1640.webp`,
    tags: ["Blue", "Grey", "Neutral"],
    hex_colors: ["#6D7B82"],
    parts: [
      { flakeId:'P1640', color:'#6D7B82', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1650', name: 'Ocean', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1650.webp`,
    tags: ["Blue", "Dark"],
    hex_colors: ["#42596D"],
    parts: [
      { flakeId:'P1650', color:'#42596D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'SB-7001', name: 'Silver Gray testy', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7001.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7035', name: 'Light Gray', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7035.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7040', name: 'Window Gray', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7040.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7042', name: 'Traffic Gray', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7042.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1019', name: 'Gray Beige', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1019.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1017', name: 'Signal Yellow', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1017.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9005', name: 'Jet Black', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9005.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1001', name: 'Beige', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1001.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7012', name: 'Basalt Gray', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7012.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-5017', name: 'Traffic Blue', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-5017.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-6021', name: 'Pale Green', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-6021.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3009', name: 'Oxide Red', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3009.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3020', name: 'Traffic Red', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3020.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9003', name: 'Signal White', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9003.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7001-t', name: 'Silver Gray (Textured)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7001-t.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7035-t', name: 'Light Gray (Textured)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7035-t.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7040-t', name: 'Window Gray (Textured)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7040-t.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7042-t', name: 'Traffic Gray (Textured)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7042-t.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1019-t', name: 'Gray Beige (Textured)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1019-t.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1017-t', name: 'Signal Yellow (Textured)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1017-t.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9005-t', name: 'Jet Black (Textured)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9005-t.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1001-t', name: 'Beige (Textured)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1001-t.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7012-t', name: 'Basalt Gray (Textured)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7012-t.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-5017-t', name: 'Traffic Blue (Textured)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-5017-t.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-6021-t', name: 'Pale Green (Textured)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-6021-t.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3009-t', name: 'Oxide Red (Textured)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3009-t.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3020-t', name: 'Traffic Red (Textured)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3020-t.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9003-t', name: 'Signal White (Textured)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9003-t.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'FB-127-0LG', name: 'Coulee (Light Gray)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-127-0LG.webp`,
    tags: ["Black", "Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#B8B7AF", "#CDC1AC", "#F0EFE8", "#3C3C3C"],
    parts: [
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.3, sizeCode:'s', rangeMin:0.0, rangeMax:0.3, isGlitter:false },
      { flakeId:'F1780', color:'#CDC1AC', ratio:0.3, sizeCode:'s', rangeMin:0.3, rangeMax:0.6, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.3, sizeCode:'s', rangeMin:0.6, rangeMax:0.9, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-127-1DG', name: 'Coulee (Dolphin Gray)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-127-1DG.webp`,
    tags: ["Black", "Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#B8B7AF", "#CDC1AC", "#F0EFE8", "#3C3C3C"],
    parts: [
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.3, sizeCode:'s', rangeMin:0.0, rangeMax:0.3, isGlitter:false },
      { flakeId:'F1780', color:'#CDC1AC', ratio:0.3, sizeCode:'s', rangeMin:0.3, rangeMax:0.6, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.3, sizeCode:'s', rangeMin:0.6, rangeMax:0.9, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-127-2BL', name: 'Coulee (Black)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-127-2BL.webp`,
    tags: ["Black", "Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#B8B7AF", "#CDC1AC", "#F0EFE8", "#3C3C3C"],
    parts: [
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.3, sizeCode:'s', rangeMin:0.0, rangeMax:0.3, isGlitter:false },
      { flakeId:'F1780', color:'#CDC1AC', ratio:0.3, sizeCode:'s', rangeMin:0.3, rangeMax:0.6, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.3, sizeCode:'s', rangeMin:0.6, rangeMax:0.9, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-127-3SE', name: 'Coulee (Smokey Evening)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-127-3SE.webp`,
    tags: ["Black", "Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#B8B7AF", "#CDC1AC", "#F0EFE8", "#3C3C3C"],
    parts: [
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.3, sizeCode:'s', rangeMin:0.0, rangeMax:0.3, isGlitter:false },
      { flakeId:'F1780', color:'#CDC1AC', ratio:0.3, sizeCode:'s', rangeMin:0.3, rangeMax:0.6, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.3, sizeCode:'s', rangeMin:0.6, rangeMax:0.9, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-127-4OS', name: 'Coulee (Oyster Secret)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-127-4OS.webp`,
    tags: ["Black", "Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#B8B7AF", "#CDC1AC", "#F0EFE8", "#3C3C3C"],
    parts: [
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.3, sizeCode:'s', rangeMin:0.0, rangeMax:0.3, isGlitter:false },
      { flakeId:'F1780', color:'#CDC1AC', ratio:0.3, sizeCode:'s', rangeMin:0.3, rangeMax:0.6, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.3, sizeCode:'s', rangeMin:0.6, rangeMax:0.9, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-127-5LM', name: 'Coulee (Latte Macchiato)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-127-5LM.webp`,
    tags: ["Black", "Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#B8B7AF", "#CDC1AC", "#F0EFE8", "#3C3C3C"],
    parts: [
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.3, sizeCode:'s', rangeMin:0.0, rangeMax:0.3, isGlitter:false },
      { flakeId:'F1780', color:'#CDC1AC', ratio:0.3, sizeCode:'s', rangeMin:0.3, rangeMax:0.6, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.3, sizeCode:'s', rangeMin:0.6, rangeMax:0.9, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-127-6BB', name: 'Coulee (Brown Beige)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-127-6BB.webp`,
    tags: ["Black", "Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#B8B7AF", "#CDC1AC", "#F0EFE8", "#3C3C3C"],
    parts: [
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.3, sizeCode:'s', rangeMin:0.0, rangeMax:0.3, isGlitter:false },
      { flakeId:'F1780', color:'#CDC1AC', ratio:0.3, sizeCode:'s', rangeMin:0.3, rangeMax:0.6, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.3, sizeCode:'s', rangeMin:0.6, rangeMax:0.9, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-127-7LGR', name: 'Coulee (Lime Green)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-127-7LGR.webp`,
    tags: ["Black", "Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#B8B7AF", "#CDC1AC", "#F0EFE8", "#3C3C3C"],
    parts: [
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.3, sizeCode:'s', rangeMin:0.0, rangeMax:0.3, isGlitter:false },
      { flakeId:'F1780', color:'#CDC1AC', ratio:0.3, sizeCode:'s', rangeMin:0.3, rangeMax:0.6, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.3, sizeCode:'s', rangeMin:0.6, rangeMax:0.9, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-127-8BW', name: 'Coulee (Bordeaux Wine)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-127-8BW.webp`,
    tags: ["Black", "Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#B8B7AF", "#CDC1AC", "#F0EFE8", "#3C3C3C"],
    parts: [
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.3, sizeCode:'s', rangeMin:0.0, rangeMax:0.3, isGlitter:false },
      { flakeId:'F1780', color:'#CDC1AC', ratio:0.3, sizeCode:'s', rangeMin:0.3, rangeMax:0.6, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.3, sizeCode:'s', rangeMin:0.6, rangeMax:0.9, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-310-0LG', name: 'Starlight (Light Gray)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-310-0LG.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#A3ADB2", "#496A9A", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.25, sizeCode:'s', rangeMin:0.0, rangeMax:0.25, isGlitter:false },
      { flakeId:'F1480', color:'#A3ADB2', ratio:0.25, sizeCode:'s', rangeMin:0.25, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1790', color:'#496A9A', ratio:0.25, sizeCode:'s', rangeMin:0.5, rangeMax:0.75, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.25, sizeCode:'s', rangeMin:0.75, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-310-1DG', name: 'Starlight (Dolphin Gray)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-310-1DG.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#A3ADB2", "#496A9A", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.25, sizeCode:'s', rangeMin:0.0, rangeMax:0.25, isGlitter:false },
      { flakeId:'F1480', color:'#A3ADB2', ratio:0.25, sizeCode:'s', rangeMin:0.25, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1790', color:'#496A9A', ratio:0.25, sizeCode:'s', rangeMin:0.5, rangeMax:0.75, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.25, sizeCode:'s', rangeMin:0.75, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-310-2BL', name: 'Starlight (Black)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-310-2BL.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#A3ADB2", "#496A9A", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.25, sizeCode:'s', rangeMin:0.0, rangeMax:0.25, isGlitter:false },
      { flakeId:'F1480', color:'#A3ADB2', ratio:0.25, sizeCode:'s', rangeMin:0.25, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1790', color:'#496A9A', ratio:0.25, sizeCode:'s', rangeMin:0.5, rangeMax:0.75, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.25, sizeCode:'s', rangeMin:0.75, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-310-3SE', name: 'Starlight (Smokey Evening)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-310-3SE.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#A3ADB2", "#496A9A", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.25, sizeCode:'s', rangeMin:0.0, rangeMax:0.25, isGlitter:false },
      { flakeId:'F1480', color:'#A3ADB2', ratio:0.25, sizeCode:'s', rangeMin:0.25, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1790', color:'#496A9A', ratio:0.25, sizeCode:'s', rangeMin:0.5, rangeMax:0.75, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.25, sizeCode:'s', rangeMin:0.75, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-310-4OS', name: 'Starlight (Oyster Secret)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-310-4OS.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#A3ADB2", "#496A9A", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.25, sizeCode:'s', rangeMin:0.0, rangeMax:0.25, isGlitter:false },
      { flakeId:'F1480', color:'#A3ADB2', ratio:0.25, sizeCode:'s', rangeMin:0.25, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1790', color:'#496A9A', ratio:0.25, sizeCode:'s', rangeMin:0.5, rangeMax:0.75, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.25, sizeCode:'s', rangeMin:0.75, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-310-5LM', name: 'Starlight (Latte Macchiato)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-310-5LM.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#A3ADB2", "#496A9A", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.25, sizeCode:'s', rangeMin:0.0, rangeMax:0.25, isGlitter:false },
      { flakeId:'F1480', color:'#A3ADB2', ratio:0.25, sizeCode:'s', rangeMin:0.25, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1790', color:'#496A9A', ratio:0.25, sizeCode:'s', rangeMin:0.5, rangeMax:0.75, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.25, sizeCode:'s', rangeMin:0.75, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-310-6BB', name: 'Starlight (Brown Beige)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-310-6BB.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#A3ADB2", "#496A9A", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.25, sizeCode:'s', rangeMin:0.0, rangeMax:0.25, isGlitter:false },
      { flakeId:'F1480', color:'#A3ADB2', ratio:0.25, sizeCode:'s', rangeMin:0.25, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1790', color:'#496A9A', ratio:0.25, sizeCode:'s', rangeMin:0.5, rangeMax:0.75, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.25, sizeCode:'s', rangeMin:0.75, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-310-7LGR', name: 'Starlight (Lime Green)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-310-7LGR.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#A3ADB2", "#496A9A", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.25, sizeCode:'s', rangeMin:0.0, rangeMax:0.25, isGlitter:false },
      { flakeId:'F1480', color:'#A3ADB2', ratio:0.25, sizeCode:'s', rangeMin:0.25, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1790', color:'#496A9A', ratio:0.25, sizeCode:'s', rangeMin:0.5, rangeMax:0.75, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.25, sizeCode:'s', rangeMin:0.75, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-310-8BW', name: 'Starlight (Bordeaux Wine)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-310-8BW.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#A3ADB2", "#496A9A", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.25, sizeCode:'s', rangeMin:0.0, rangeMax:0.25, isGlitter:false },
      { flakeId:'F1480', color:'#A3ADB2', ratio:0.25, sizeCode:'s', rangeMin:0.25, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1790', color:'#496A9A', ratio:0.25, sizeCode:'s', rangeMin:0.5, rangeMax:0.75, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.25, sizeCode:'s', rangeMin:0.75, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-411-0LG', name: 'Dalmatian (Light Gray)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-411-0LG.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#B8B7AF", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.333, sizeCode:'s', rangeMin:0.0, rangeMax:0.333, isGlitter:false },
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.334, sizeCode:'s', rangeMin:0.333, rangeMax:0.667, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.333, sizeCode:'s', rangeMin:0.667, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-411-1DG', name: 'Dalmatian (Dolphin Gray)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-411-1DG.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#B8B7AF", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.333, sizeCode:'s', rangeMin:0.0, rangeMax:0.333, isGlitter:false },
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.334, sizeCode:'s', rangeMin:0.333, rangeMax:0.667, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.333, sizeCode:'s', rangeMin:0.667, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-411-2BL', name: 'Dalmatian (Black)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-411-2BL.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#B8B7AF", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.333, sizeCode:'s', rangeMin:0.0, rangeMax:0.333, isGlitter:false },
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.334, sizeCode:'s', rangeMin:0.333, rangeMax:0.667, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.333, sizeCode:'s', rangeMin:0.667, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-411-3SE', name: 'Dalmatian (Smokey Evening)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-411-3SE.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#B8B7AF", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.333, sizeCode:'s', rangeMin:0.0, rangeMax:0.333, isGlitter:false },
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.334, sizeCode:'s', rangeMin:0.333, rangeMax:0.667, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.333, sizeCode:'s', rangeMin:0.667, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-411-4OS', name: 'Dalmatian (Oyster Secret)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-411-4OS.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#B8B7AF", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.333, sizeCode:'s', rangeMin:0.0, rangeMax:0.333, isGlitter:false },
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.334, sizeCode:'s', rangeMin:0.333, rangeMax:0.667, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.333, sizeCode:'s', rangeMin:0.667, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-411-5LM', name: 'Dalmatian (Latte Macchiato)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-411-5LM.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#B8B7AF", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.333, sizeCode:'s', rangeMin:0.0, rangeMax:0.333, isGlitter:false },
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.334, sizeCode:'s', rangeMin:0.333, rangeMax:0.667, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.333, sizeCode:'s', rangeMin:0.667, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-411-6BB', name: 'Dalmatian (Brown Beige)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-411-6BB.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#B8B7AF", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.333, sizeCode:'s', rangeMin:0.0, rangeMax:0.333, isGlitter:false },
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.334, sizeCode:'s', rangeMin:0.333, rangeMax:0.667, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.333, sizeCode:'s', rangeMin:0.667, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-411-7LGR', name: 'Dalmatian (Lime Green)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-411-7LGR.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#B8B7AF", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.333, sizeCode:'s', rangeMin:0.0, rangeMax:0.333, isGlitter:false },
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.334, sizeCode:'s', rangeMin:0.333, rangeMax:0.667, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.333, sizeCode:'s', rangeMin:0.667, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-411-8BW', name: 'Dalmatian (Bordeaux Wine)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-411-8BW.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#B8B7AF", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.333, sizeCode:'s', rangeMin:0.0, rangeMax:0.333, isGlitter:false },
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.334, sizeCode:'s', rangeMin:0.333, rangeMax:0.667, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.333, sizeCode:'s', rangeMin:0.667, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-414-0LG', name: 'Shale (Light Gray)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-414-0LG.webp`,
    tags: ["Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#B8B7AF", "#707677", "#CAC9C5", "#F0EFE8"],
    parts: [
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.25, sizeCode:'s', rangeMin:0.0, rangeMax:0.25, isGlitter:false },
      { flakeId:'F1415', color:'#707677', ratio:0.25, sizeCode:'s', rangeMin:0.25, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1800', color:'#CAC9C5', ratio:0.25, sizeCode:'s', rangeMin:0.5, rangeMax:0.75, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.25, sizeCode:'s', rangeMin:0.75, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-414-1DG', name: 'Shale (Dolphin Gray)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-414-1DG.webp`,
    tags: ["Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#B8B7AF", "#707677", "#CAC9C5", "#F0EFE8"],
    parts: [
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.25, sizeCode:'s', rangeMin:0.0, rangeMax:0.25, isGlitter:false },
      { flakeId:'F1415', color:'#707677', ratio:0.25, sizeCode:'s', rangeMin:0.25, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1800', color:'#CAC9C5', ratio:0.25, sizeCode:'s', rangeMin:0.5, rangeMax:0.75, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.25, sizeCode:'s', rangeMin:0.75, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-414-2BL', name: 'Shale (Black)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-414-2BL.webp`,
    tags: ["Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#B8B7AF", "#707677", "#CAC9C5", "#F0EFE8"],
    parts: [
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.25, sizeCode:'s', rangeMin:0.0, rangeMax:0.25, isGlitter:false },
      { flakeId:'F1415', color:'#707677', ratio:0.25, sizeCode:'s', rangeMin:0.25, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1800', color:'#CAC9C5', ratio:0.25, sizeCode:'s', rangeMin:0.5, rangeMax:0.75, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.25, sizeCode:'s', rangeMin:0.75, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-414-3SE', name: 'Shale (Smokey Evening)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-414-3SE.webp`,
    tags: ["Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#B8B7AF", "#707677", "#CAC9C5", "#F0EFE8"],
    parts: [
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.25, sizeCode:'s', rangeMin:0.0, rangeMax:0.25, isGlitter:false },
      { flakeId:'F1415', color:'#707677', ratio:0.25, sizeCode:'s', rangeMin:0.25, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1800', color:'#CAC9C5', ratio:0.25, sizeCode:'s', rangeMin:0.5, rangeMax:0.75, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.25, sizeCode:'s', rangeMin:0.75, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-414-4OS', name: 'Shale (Oyster Secret)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-414-4OS.webp`,
    tags: ["Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#B8B7AF", "#707677", "#CAC9C5", "#F0EFE8"],
    parts: [
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.25, sizeCode:'s', rangeMin:0.0, rangeMax:0.25, isGlitter:false },
      { flakeId:'F1415', color:'#707677', ratio:0.25, sizeCode:'s', rangeMin:0.25, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1800', color:'#CAC9C5', ratio:0.25, sizeCode:'s', rangeMin:0.5, rangeMax:0.75, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.25, sizeCode:'s', rangeMin:0.75, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-414-5LM', name: 'Shale (Latte Macchiato)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-414-5LM.webp`,
    tags: ["Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#B8B7AF", "#707677", "#CAC9C5", "#F0EFE8"],
    parts: [
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.25, sizeCode:'s', rangeMin:0.0, rangeMax:0.25, isGlitter:false },
      { flakeId:'F1415', color:'#707677', ratio:0.25, sizeCode:'s', rangeMin:0.25, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1800', color:'#CAC9C5', ratio:0.25, sizeCode:'s', rangeMin:0.5, rangeMax:0.75, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.25, sizeCode:'s', rangeMin:0.75, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-414-6BB', name: 'Shale (Brown Beige)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-414-6BB.webp`,
    tags: ["Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#B8B7AF", "#707677", "#CAC9C5", "#F0EFE8"],
    parts: [
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.25, sizeCode:'s', rangeMin:0.0, rangeMax:0.25, isGlitter:false },
      { flakeId:'F1415', color:'#707677', ratio:0.25, sizeCode:'s', rangeMin:0.25, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1800', color:'#CAC9C5', ratio:0.25, sizeCode:'s', rangeMin:0.5, rangeMax:0.75, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.25, sizeCode:'s', rangeMin:0.75, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-414-7LGR', name: 'Shale (Lime Green)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-414-7LGR.webp`,
    tags: ["Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#B8B7AF", "#707677", "#CAC9C5", "#F0EFE8"],
    parts: [
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.25, sizeCode:'s', rangeMin:0.0, rangeMax:0.25, isGlitter:false },
      { flakeId:'F1415', color:'#707677', ratio:0.25, sizeCode:'s', rangeMin:0.25, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1800', color:'#CAC9C5', ratio:0.25, sizeCode:'s', rangeMin:0.5, rangeMax:0.75, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.25, sizeCode:'s', rangeMin:0.75, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-414-8BW', name: 'Shale (Bordeaux Wine)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-414-8BW.webp`,
    tags: ["Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#B8B7AF", "#707677", "#CAC9C5", "#F0EFE8"],
    parts: [
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.25, sizeCode:'s', rangeMin:0.0, rangeMax:0.25, isGlitter:false },
      { flakeId:'F1415', color:'#707677', ratio:0.25, sizeCode:'s', rangeMin:0.25, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1800', color:'#CAC9C5', ratio:0.25, sizeCode:'s', rangeMin:0.5, rangeMax:0.75, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.25, sizeCode:'s', rangeMin:0.75, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-421-0LG', name: 'Lakeshore (Light Gray)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-421-0LG.webp`,
    tags: ["Black", "Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#A98D6F", "#3C3C3C", "#ECE2CE", "#CDC1AC"],
    parts: [
      { flakeId:'F1040', color:'#A98D6F', ratio:0.11, sizeCode:'s', rangeMin:0.0, rangeMax:0.11, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.06, sizeCode:'s', rangeMin:0.11, rangeMax:0.17, isGlitter:false },
      { flakeId:'F1425', color:'#ECE2CE', ratio:0.33, sizeCode:'s', rangeMin:0.17, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1780', color:'#CDC1AC', ratio:0.5, sizeCode:'s', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-421-1DG', name: 'Lakeshore (Dolphin Gray)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-421-1DG.webp`,
    tags: ["Black", "Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#A98D6F", "#3C3C3C", "#ECE2CE", "#CDC1AC"],
    parts: [
      { flakeId:'F1040', color:'#A98D6F', ratio:0.11, sizeCode:'s', rangeMin:0.0, rangeMax:0.11, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.06, sizeCode:'s', rangeMin:0.11, rangeMax:0.17, isGlitter:false },
      { flakeId:'F1425', color:'#ECE2CE', ratio:0.33, sizeCode:'s', rangeMin:0.17, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1780', color:'#CDC1AC', ratio:0.5, sizeCode:'s', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-421-2BL', name: 'Lakeshore (Black)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-421-2BL.webp`,
    tags: ["Black", "Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#A98D6F", "#3C3C3C", "#ECE2CE", "#CDC1AC"],
    parts: [
      { flakeId:'F1040', color:'#A98D6F', ratio:0.11, sizeCode:'s', rangeMin:0.0, rangeMax:0.11, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.06, sizeCode:'s', rangeMin:0.11, rangeMax:0.17, isGlitter:false },
      { flakeId:'F1425', color:'#ECE2CE', ratio:0.33, sizeCode:'s', rangeMin:0.17, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1780', color:'#CDC1AC', ratio:0.5, sizeCode:'s', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-421-3SE', name: 'Lakeshore (Smokey Evening)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-421-3SE.webp`,
    tags: ["Black", "Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#A98D6F", "#3C3C3C", "#ECE2CE", "#CDC1AC"],
    parts: [
      { flakeId:'F1040', color:'#A98D6F', ratio:0.11, sizeCode:'s', rangeMin:0.0, rangeMax:0.11, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.06, sizeCode:'s', rangeMin:0.11, rangeMax:0.17, isGlitter:false },
      { flakeId:'F1425', color:'#ECE2CE', ratio:0.33, sizeCode:'s', rangeMin:0.17, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1780', color:'#CDC1AC', ratio:0.5, sizeCode:'s', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-421-4OS', name: 'Lakeshore (Oyster Secret)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-421-4OS.webp`,
    tags: ["Black", "Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#A98D6F", "#3C3C3C", "#ECE2CE", "#CDC1AC"],
    parts: [
      { flakeId:'F1040', color:'#A98D6F', ratio:0.11, sizeCode:'s', rangeMin:0.0, rangeMax:0.11, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.06, sizeCode:'s', rangeMin:0.11, rangeMax:0.17, isGlitter:false },
      { flakeId:'F1425', color:'#ECE2CE', ratio:0.33, sizeCode:'s', rangeMin:0.17, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1780', color:'#CDC1AC', ratio:0.5, sizeCode:'s', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-421-5LM', name: 'Lakeshore (Latte Macchiato)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-421-5LM.webp`,
    tags: ["Black", "Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#A98D6F", "#3C3C3C", "#ECE2CE", "#CDC1AC"],
    parts: [
      { flakeId:'F1040', color:'#A98D6F', ratio:0.11, sizeCode:'s', rangeMin:0.0, rangeMax:0.11, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.06, sizeCode:'s', rangeMin:0.11, rangeMax:0.17, isGlitter:false },
      { flakeId:'F1425', color:'#ECE2CE', ratio:0.33, sizeCode:'s', rangeMin:0.17, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1780', color:'#CDC1AC', ratio:0.5, sizeCode:'s', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-421-6BB', name: 'Lakeshore (Brown Beige)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-421-6BB.webp`,
    tags: ["Black", "Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#A98D6F", "#3C3C3C", "#ECE2CE", "#CDC1AC"],
    parts: [
      { flakeId:'F1040', color:'#A98D6F', ratio:0.11, sizeCode:'s', rangeMin:0.0, rangeMax:0.11, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.06, sizeCode:'s', rangeMin:0.11, rangeMax:0.17, isGlitter:false },
      { flakeId:'F1425', color:'#ECE2CE', ratio:0.33, sizeCode:'s', rangeMin:0.17, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1780', color:'#CDC1AC', ratio:0.5, sizeCode:'s', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-421-7LGR', name: 'Lakeshore (Lime Green)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-421-7LGR.webp`,
    tags: ["Black", "Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#A98D6F", "#3C3C3C", "#ECE2CE", "#CDC1AC"],
    parts: [
      { flakeId:'F1040', color:'#A98D6F', ratio:0.11, sizeCode:'s', rangeMin:0.0, rangeMax:0.11, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.06, sizeCode:'s', rangeMin:0.11, rangeMax:0.17, isGlitter:false },
      { flakeId:'F1425', color:'#ECE2CE', ratio:0.33, sizeCode:'s', rangeMin:0.17, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1780', color:'#CDC1AC', ratio:0.5, sizeCode:'s', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-421-8BW', name: 'Lakeshore (Bordeaux Wine)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-421-8BW.webp`,
    tags: ["Black", "Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#A98D6F", "#3C3C3C", "#ECE2CE", "#CDC1AC"],
    parts: [
      { flakeId:'F1040', color:'#A98D6F', ratio:0.11, sizeCode:'s', rangeMin:0.0, rangeMax:0.11, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.06, sizeCode:'s', rangeMin:0.11, rangeMax:0.17, isGlitter:false },
      { flakeId:'F1425', color:'#ECE2CE', ratio:0.33, sizeCode:'s', rangeMin:0.17, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1780', color:'#CDC1AC', ratio:0.5, sizeCode:'s', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-517-0LG', name: 'Wilderness (Light Gray)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-517-0LG.webp`,
    tags: ["Black", "Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#A98D6F", "#3C3C3C", "#6F5E56", "#BF9678", "#D9C4A3", "#F0EFE8"],
    parts: [
      { flakeId:'F1040', color:'#A98D6F', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.2, rangeMax:0.3, isGlitter:false },
      { flakeId:'F1060', color:'#6F5E56', ratio:0.1, sizeCode:'s', rangeMin:0.3, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1770', color:'#BF9678', ratio:0.15, sizeCode:'s', rangeMin:0.4, rangeMax:0.55, isGlitter:false },
      { flakeId:'F1785', color:'#D9C4A3', ratio:0.35, sizeCode:'s', rangeMin:0.55, rangeMax:0.9, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-517-1DG', name: 'Wilderness (Dolphin Gray)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-517-1DG.webp`,
    tags: ["Black", "Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#A98D6F", "#3C3C3C", "#6F5E56", "#BF9678", "#D9C4A3", "#F0EFE8"],
    parts: [
      { flakeId:'F1040', color:'#A98D6F', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.2, rangeMax:0.3, isGlitter:false },
      { flakeId:'F1060', color:'#6F5E56', ratio:0.1, sizeCode:'s', rangeMin:0.3, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1770', color:'#BF9678', ratio:0.15, sizeCode:'s', rangeMin:0.4, rangeMax:0.55, isGlitter:false },
      { flakeId:'F1785', color:'#D9C4A3', ratio:0.35, sizeCode:'s', rangeMin:0.55, rangeMax:0.9, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-517-2BL', name: 'Wilderness (Black)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-517-2BL.webp`,
    tags: ["Black", "Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#A98D6F", "#3C3C3C", "#6F5E56", "#BF9678", "#D9C4A3", "#F0EFE8"],
    parts: [
      { flakeId:'F1040', color:'#A98D6F', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.2, rangeMax:0.3, isGlitter:false },
      { flakeId:'F1060', color:'#6F5E56', ratio:0.1, sizeCode:'s', rangeMin:0.3, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1770', color:'#BF9678', ratio:0.15, sizeCode:'s', rangeMin:0.4, rangeMax:0.55, isGlitter:false },
      { flakeId:'F1785', color:'#D9C4A3', ratio:0.35, sizeCode:'s', rangeMin:0.55, rangeMax:0.9, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-517-3SE', name: 'Wilderness (Smokey Evening)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-517-3SE.webp`,
    tags: ["Black", "Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#A98D6F", "#3C3C3C", "#6F5E56", "#BF9678", "#D9C4A3", "#F0EFE8"],
    parts: [
      { flakeId:'F1040', color:'#A98D6F', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.2, rangeMax:0.3, isGlitter:false },
      { flakeId:'F1060', color:'#6F5E56', ratio:0.1, sizeCode:'s', rangeMin:0.3, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1770', color:'#BF9678', ratio:0.15, sizeCode:'s', rangeMin:0.4, rangeMax:0.55, isGlitter:false },
      { flakeId:'F1785', color:'#D9C4A3', ratio:0.35, sizeCode:'s', rangeMin:0.55, rangeMax:0.9, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-517-4OS', name: 'Wilderness (Oyster Secret)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-517-4OS.webp`,
    tags: ["Black", "Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#A98D6F", "#3C3C3C", "#6F5E56", "#BF9678", "#D9C4A3", "#F0EFE8"],
    parts: [
      { flakeId:'F1040', color:'#A98D6F', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.2, rangeMax:0.3, isGlitter:false },
      { flakeId:'F1060', color:'#6F5E56', ratio:0.1, sizeCode:'s', rangeMin:0.3, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1770', color:'#BF9678', ratio:0.15, sizeCode:'s', rangeMin:0.4, rangeMax:0.55, isGlitter:false },
      { flakeId:'F1785', color:'#D9C4A3', ratio:0.35, sizeCode:'s', rangeMin:0.55, rangeMax:0.9, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-517-5LM', name: 'Wilderness (Latte Macchiato)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-517-5LM.webp`,
    tags: ["Black", "Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#A98D6F", "#3C3C3C", "#6F5E56", "#BF9678", "#D9C4A3", "#F0EFE8"],
    parts: [
      { flakeId:'F1040', color:'#A98D6F', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.2, rangeMax:0.3, isGlitter:false },
      { flakeId:'F1060', color:'#6F5E56', ratio:0.1, sizeCode:'s', rangeMin:0.3, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1770', color:'#BF9678', ratio:0.15, sizeCode:'s', rangeMin:0.4, rangeMax:0.55, isGlitter:false },
      { flakeId:'F1785', color:'#D9C4A3', ratio:0.35, sizeCode:'s', rangeMin:0.55, rangeMax:0.9, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-517-6BB', name: 'Wilderness (Brown Beige)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-517-6BB.webp`,
    tags: ["Black", "Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#A98D6F", "#3C3C3C", "#6F5E56", "#BF9678", "#D9C4A3", "#F0EFE8"],
    parts: [
      { flakeId:'F1040', color:'#A98D6F', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.2, rangeMax:0.3, isGlitter:false },
      { flakeId:'F1060', color:'#6F5E56', ratio:0.1, sizeCode:'s', rangeMin:0.3, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1770', color:'#BF9678', ratio:0.15, sizeCode:'s', rangeMin:0.4, rangeMax:0.55, isGlitter:false },
      { flakeId:'F1785', color:'#D9C4A3', ratio:0.35, sizeCode:'s', rangeMin:0.55, rangeMax:0.9, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-517-7LGR', name: 'Wilderness (Lime Green)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-517-7LGR.webp`,
    tags: ["Black", "Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#A98D6F", "#3C3C3C", "#6F5E56", "#BF9678", "#D9C4A3", "#F0EFE8"],
    parts: [
      { flakeId:'F1040', color:'#A98D6F', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.2, rangeMax:0.3, isGlitter:false },
      { flakeId:'F1060', color:'#6F5E56', ratio:0.1, sizeCode:'s', rangeMin:0.3, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1770', color:'#BF9678', ratio:0.15, sizeCode:'s', rangeMin:0.4, rangeMax:0.55, isGlitter:false },
      { flakeId:'F1785', color:'#D9C4A3', ratio:0.35, sizeCode:'s', rangeMin:0.55, rangeMax:0.9, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-517-8BW', name: 'Wilderness (Bordeaux Wine)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-517-8BW.webp`,
    tags: ["Black", "Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#A98D6F", "#3C3C3C", "#6F5E56", "#BF9678", "#D9C4A3", "#F0EFE8"],
    parts: [
      { flakeId:'F1040', color:'#A98D6F', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.2, rangeMax:0.3, isGlitter:false },
      { flakeId:'F1060', color:'#6F5E56', ratio:0.1, sizeCode:'s', rangeMin:0.3, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1770', color:'#BF9678', ratio:0.15, sizeCode:'s', rangeMin:0.4, rangeMax:0.55, isGlitter:false },
      { flakeId:'F1785', color:'#D9C4A3', ratio:0.35, sizeCode:'s', rangeMin:0.55, rangeMax:0.9, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-616-0LG', name: 'Victoria (Light Gray)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-616-0LG.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#898A86", "#CAC9C5", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.15, sizeCode:'s', rangeMin:0.0, rangeMax:0.15, isGlitter:false },
      { flakeId:'F1090', color:'#898A86', ratio:0.55, sizeCode:'s', rangeMin:0.15, rangeMax:0.7, isGlitter:false },
      { flakeId:'F1800', color:'#CAC9C5', ratio:0.15, sizeCode:'s', rangeMin:0.7, rangeMax:0.85, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.15, sizeCode:'s', rangeMin:0.85, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-616-1DG', name: 'Victoria (Dolphin Gray)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-616-1DG.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#898A86", "#CAC9C5", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.15, sizeCode:'s', rangeMin:0.0, rangeMax:0.15, isGlitter:false },
      { flakeId:'F1090', color:'#898A86', ratio:0.55, sizeCode:'s', rangeMin:0.15, rangeMax:0.7, isGlitter:false },
      { flakeId:'F1800', color:'#CAC9C5', ratio:0.15, sizeCode:'s', rangeMin:0.7, rangeMax:0.85, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.15, sizeCode:'s', rangeMin:0.85, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-616-2BL', name: 'Victoria (Black)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-616-2BL.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#898A86", "#CAC9C5", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.15, sizeCode:'s', rangeMin:0.0, rangeMax:0.15, isGlitter:false },
      { flakeId:'F1090', color:'#898A86', ratio:0.55, sizeCode:'s', rangeMin:0.15, rangeMax:0.7, isGlitter:false },
      { flakeId:'F1800', color:'#CAC9C5', ratio:0.15, sizeCode:'s', rangeMin:0.7, rangeMax:0.85, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.15, sizeCode:'s', rangeMin:0.85, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-616-3SE', name: 'Victoria (Smokey Evening)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-616-3SE.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#898A86", "#CAC9C5", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.15, sizeCode:'s', rangeMin:0.0, rangeMax:0.15, isGlitter:false },
      { flakeId:'F1090', color:'#898A86', ratio:0.55, sizeCode:'s', rangeMin:0.15, rangeMax:0.7, isGlitter:false },
      { flakeId:'F1800', color:'#CAC9C5', ratio:0.15, sizeCode:'s', rangeMin:0.7, rangeMax:0.85, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.15, sizeCode:'s', rangeMin:0.85, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-616-4OS', name: 'Victoria (Oyster Secret)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-616-4OS.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#898A86", "#CAC9C5", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.15, sizeCode:'s', rangeMin:0.0, rangeMax:0.15, isGlitter:false },
      { flakeId:'F1090', color:'#898A86', ratio:0.55, sizeCode:'s', rangeMin:0.15, rangeMax:0.7, isGlitter:false },
      { flakeId:'F1800', color:'#CAC9C5', ratio:0.15, sizeCode:'s', rangeMin:0.7, rangeMax:0.85, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.15, sizeCode:'s', rangeMin:0.85, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-616-5LM', name: 'Victoria (Latte Macchiato)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-616-5LM.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#898A86", "#CAC9C5", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.15, sizeCode:'s', rangeMin:0.0, rangeMax:0.15, isGlitter:false },
      { flakeId:'F1090', color:'#898A86', ratio:0.55, sizeCode:'s', rangeMin:0.15, rangeMax:0.7, isGlitter:false },
      { flakeId:'F1800', color:'#CAC9C5', ratio:0.15, sizeCode:'s', rangeMin:0.7, rangeMax:0.85, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.15, sizeCode:'s', rangeMin:0.85, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-616-6BB', name: 'Victoria (Brown Beige)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-616-6BB.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#898A86", "#CAC9C5", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.15, sizeCode:'s', rangeMin:0.0, rangeMax:0.15, isGlitter:false },
      { flakeId:'F1090', color:'#898A86', ratio:0.55, sizeCode:'s', rangeMin:0.15, rangeMax:0.7, isGlitter:false },
      { flakeId:'F1800', color:'#CAC9C5', ratio:0.15, sizeCode:'s', rangeMin:0.7, rangeMax:0.85, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.15, sizeCode:'s', rangeMin:0.85, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-616-7LGR', name: 'Victoria (Lime Green)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-616-7LGR.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#898A86", "#CAC9C5", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.15, sizeCode:'s', rangeMin:0.0, rangeMax:0.15, isGlitter:false },
      { flakeId:'F1090', color:'#898A86', ratio:0.55, sizeCode:'s', rangeMin:0.15, rangeMax:0.7, isGlitter:false },
      { flakeId:'F1800', color:'#CAC9C5', ratio:0.15, sizeCode:'s', rangeMin:0.7, rangeMax:0.85, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.15, sizeCode:'s', rangeMin:0.85, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-616-8BW', name: 'Victoria (Bordeaux Wine)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-616-8BW.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#898A86", "#CAC9C5", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.15, sizeCode:'s', rangeMin:0.0, rangeMax:0.15, isGlitter:false },
      { flakeId:'F1090', color:'#898A86', ratio:0.55, sizeCode:'s', rangeMin:0.15, rangeMax:0.7, isGlitter:false },
      { flakeId:'F1800', color:'#CAC9C5', ratio:0.15, sizeCode:'s', rangeMin:0.7, rangeMax:0.85, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.15, sizeCode:'s', rangeMin:0.85, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-715-0LG', name: 'Midnight (Light Gray)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-715-0LG.webp`,
    tags: ["Black", "Dark", "Grey", "Neutral"],
    hex_colors: ["#898A86", "#3C3C3C", "#52565B", "#A5A59F", "#717373", "#767577", "#9F9C95"],
    parts: [
      { flakeId:'F1090', color:'#898A86', ratio:0.4, sizeCode:'s', rangeMin:0.0, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.4, rangeMax:0.5, isGlitter:false },
      { flakeId:'F5920', color:'#52565B', ratio:0.1, sizeCode:'s', rangeMin:0.5, rangeMax:0.6, isGlitter:false },
      { flakeId:'F6606', color:'#A5A59F', ratio:0.1, sizeCode:'s', rangeMin:0.6, rangeMax:0.7, isGlitter:false },
      { flakeId:'F9904', color:'#717373', ratio:0.1, sizeCode:'s', rangeMin:0.7, rangeMax:0.8, isGlitter:false },
      { flakeId:'F9955', color:'#767577', ratio:0.1, sizeCode:'s', rangeMin:0.8, rangeMax:0.9, isGlitter:false },
      { flakeId:'F9961', color:'#9F9C95', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-715-1DG', name: 'Midnight (Dolphin Gray)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-715-1DG.webp`,
    tags: ["Black", "Dark", "Grey", "Neutral"],
    hex_colors: ["#898A86", "#3C3C3C", "#52565B", "#A5A59F", "#717373", "#767577", "#9F9C95"],
    parts: [
      { flakeId:'F1090', color:'#898A86', ratio:0.4, sizeCode:'s', rangeMin:0.0, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.4, rangeMax:0.5, isGlitter:false },
      { flakeId:'F5920', color:'#52565B', ratio:0.1, sizeCode:'s', rangeMin:0.5, rangeMax:0.6, isGlitter:false },
      { flakeId:'F6606', color:'#A5A59F', ratio:0.1, sizeCode:'s', rangeMin:0.6, rangeMax:0.7, isGlitter:false },
      { flakeId:'F9904', color:'#717373', ratio:0.1, sizeCode:'s', rangeMin:0.7, rangeMax:0.8, isGlitter:false },
      { flakeId:'F9955', color:'#767577', ratio:0.1, sizeCode:'s', rangeMin:0.8, rangeMax:0.9, isGlitter:false },
      { flakeId:'F9961', color:'#9F9C95', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-715-2BL', name: 'Midnight (Black)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-715-2BL.webp`,
    tags: ["Black", "Dark", "Grey", "Neutral"],
    hex_colors: ["#898A86", "#3C3C3C", "#52565B", "#A5A59F", "#717373", "#767577", "#9F9C95"],
    parts: [
      { flakeId:'F1090', color:'#898A86', ratio:0.4, sizeCode:'s', rangeMin:0.0, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.4, rangeMax:0.5, isGlitter:false },
      { flakeId:'F5920', color:'#52565B', ratio:0.1, sizeCode:'s', rangeMin:0.5, rangeMax:0.6, isGlitter:false },
      { flakeId:'F6606', color:'#A5A59F', ratio:0.1, sizeCode:'s', rangeMin:0.6, rangeMax:0.7, isGlitter:false },
      { flakeId:'F9904', color:'#717373', ratio:0.1, sizeCode:'s', rangeMin:0.7, rangeMax:0.8, isGlitter:false },
      { flakeId:'F9955', color:'#767577', ratio:0.1, sizeCode:'s', rangeMin:0.8, rangeMax:0.9, isGlitter:false },
      { flakeId:'F9961', color:'#9F9C95', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-715-3SE', name: 'Midnight (Smokey Evening)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-715-3SE.webp`,
    tags: ["Black", "Dark", "Grey", "Neutral"],
    hex_colors: ["#898A86", "#3C3C3C", "#52565B", "#A5A59F", "#717373", "#767577", "#9F9C95"],
    parts: [
      { flakeId:'F1090', color:'#898A86', ratio:0.4, sizeCode:'s', rangeMin:0.0, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.4, rangeMax:0.5, isGlitter:false },
      { flakeId:'F5920', color:'#52565B', ratio:0.1, sizeCode:'s', rangeMin:0.5, rangeMax:0.6, isGlitter:false },
      { flakeId:'F6606', color:'#A5A59F', ratio:0.1, sizeCode:'s', rangeMin:0.6, rangeMax:0.7, isGlitter:false },
      { flakeId:'F9904', color:'#717373', ratio:0.1, sizeCode:'s', rangeMin:0.7, rangeMax:0.8, isGlitter:false },
      { flakeId:'F9955', color:'#767577', ratio:0.1, sizeCode:'s', rangeMin:0.8, rangeMax:0.9, isGlitter:false },
      { flakeId:'F9961', color:'#9F9C95', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-715-4OS', name: 'Midnight (Oyster Secret)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-715-4OS.webp`,
    tags: ["Black", "Dark", "Grey", "Neutral"],
    hex_colors: ["#898A86", "#3C3C3C", "#52565B", "#A5A59F", "#717373", "#767577", "#9F9C95"],
    parts: [
      { flakeId:'F1090', color:'#898A86', ratio:0.4, sizeCode:'s', rangeMin:0.0, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.4, rangeMax:0.5, isGlitter:false },
      { flakeId:'F5920', color:'#52565B', ratio:0.1, sizeCode:'s', rangeMin:0.5, rangeMax:0.6, isGlitter:false },
      { flakeId:'F6606', color:'#A5A59F', ratio:0.1, sizeCode:'s', rangeMin:0.6, rangeMax:0.7, isGlitter:false },
      { flakeId:'F9904', color:'#717373', ratio:0.1, sizeCode:'s', rangeMin:0.7, rangeMax:0.8, isGlitter:false },
      { flakeId:'F9955', color:'#767577', ratio:0.1, sizeCode:'s', rangeMin:0.8, rangeMax:0.9, isGlitter:false },
      { flakeId:'F9961', color:'#9F9C95', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-715-5LM', name: 'Midnight (Latte Macchiato)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-715-5LM.webp`,
    tags: ["Black", "Dark", "Grey", "Neutral"],
    hex_colors: ["#898A86", "#3C3C3C", "#52565B", "#A5A59F", "#717373", "#767577", "#9F9C95"],
    parts: [
      { flakeId:'F1090', color:'#898A86', ratio:0.4, sizeCode:'s', rangeMin:0.0, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.4, rangeMax:0.5, isGlitter:false },
      { flakeId:'F5920', color:'#52565B', ratio:0.1, sizeCode:'s', rangeMin:0.5, rangeMax:0.6, isGlitter:false },
      { flakeId:'F6606', color:'#A5A59F', ratio:0.1, sizeCode:'s', rangeMin:0.6, rangeMax:0.7, isGlitter:false },
      { flakeId:'F9904', color:'#717373', ratio:0.1, sizeCode:'s', rangeMin:0.7, rangeMax:0.8, isGlitter:false },
      { flakeId:'F9955', color:'#767577', ratio:0.1, sizeCode:'s', rangeMin:0.8, rangeMax:0.9, isGlitter:false },
      { flakeId:'F9961', color:'#9F9C95', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-715-6BB', name: 'Midnight (Brown Beige)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-715-6BB.webp`,
    tags: ["Black", "Dark", "Grey", "Neutral"],
    hex_colors: ["#898A86", "#3C3C3C", "#52565B", "#A5A59F", "#717373", "#767577", "#9F9C95"],
    parts: [
      { flakeId:'F1090', color:'#898A86', ratio:0.4, sizeCode:'s', rangeMin:0.0, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.4, rangeMax:0.5, isGlitter:false },
      { flakeId:'F5920', color:'#52565B', ratio:0.1, sizeCode:'s', rangeMin:0.5, rangeMax:0.6, isGlitter:false },
      { flakeId:'F6606', color:'#A5A59F', ratio:0.1, sizeCode:'s', rangeMin:0.6, rangeMax:0.7, isGlitter:false },
      { flakeId:'F9904', color:'#717373', ratio:0.1, sizeCode:'s', rangeMin:0.7, rangeMax:0.8, isGlitter:false },
      { flakeId:'F9955', color:'#767577', ratio:0.1, sizeCode:'s', rangeMin:0.8, rangeMax:0.9, isGlitter:false },
      { flakeId:'F9961', color:'#9F9C95', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-715-7LGR', name: 'Midnight (Lime Green)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-715-7LGR.webp`,
    tags: ["Black", "Dark", "Grey", "Neutral"],
    hex_colors: ["#898A86", "#3C3C3C", "#52565B", "#A5A59F", "#717373", "#767577", "#9F9C95"],
    parts: [
      { flakeId:'F1090', color:'#898A86', ratio:0.4, sizeCode:'s', rangeMin:0.0, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.4, rangeMax:0.5, isGlitter:false },
      { flakeId:'F5920', color:'#52565B', ratio:0.1, sizeCode:'s', rangeMin:0.5, rangeMax:0.6, isGlitter:false },
      { flakeId:'F6606', color:'#A5A59F', ratio:0.1, sizeCode:'s', rangeMin:0.6, rangeMax:0.7, isGlitter:false },
      { flakeId:'F9904', color:'#717373', ratio:0.1, sizeCode:'s', rangeMin:0.7, rangeMax:0.8, isGlitter:false },
      { flakeId:'F9955', color:'#767577', ratio:0.1, sizeCode:'s', rangeMin:0.8, rangeMax:0.9, isGlitter:false },
      { flakeId:'F9961', color:'#9F9C95', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-715-8BW', name: 'Midnight (Bordeaux Wine)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-715-8BW.webp`,
    tags: ["Black", "Dark", "Grey", "Neutral"],
    hex_colors: ["#898A86", "#3C3C3C", "#52565B", "#A5A59F", "#717373", "#767577", "#9F9C95"],
    parts: [
      { flakeId:'F1090', color:'#898A86', ratio:0.4, sizeCode:'s', rangeMin:0.0, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.4, rangeMax:0.5, isGlitter:false },
      { flakeId:'F5920', color:'#52565B', ratio:0.1, sizeCode:'s', rangeMin:0.5, rangeMax:0.6, isGlitter:false },
      { flakeId:'F6606', color:'#A5A59F', ratio:0.1, sizeCode:'s', rangeMin:0.6, rangeMax:0.7, isGlitter:false },
      { flakeId:'F9904', color:'#717373', ratio:0.1, sizeCode:'s', rangeMin:0.7, rangeMax:0.8, isGlitter:false },
      { flakeId:'F9955', color:'#767577', ratio:0.1, sizeCode:'s', rangeMin:0.8, rangeMax:0.9, isGlitter:false },
      { flakeId:'F9961', color:'#9F9C95', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-716-0LG', name: 'Streambed (Light Gray)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-716-0LG.webp`,
    tags: ["Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#928672", "#58504C", "#95805E", "#ADA08E", "#7C766D", "#A4A296", "#D8D4CB", "#745748", "#ABA49A"],
    parts: [
      { flakeId:'F1000', color:'#928672', ratio:0.03, sizeCode:'s', rangeMin:0.0, rangeMax:0.03, isGlitter:false },
      { flakeId:'F1100', color:'#58504C', ratio:0.03, sizeCode:'s', rangeMin:0.03, rangeMax:0.06, isGlitter:false },
      { flakeId:'F5115', color:'#95805E', ratio:0.03, sizeCode:'s', rangeMin:0.06, rangeMax:0.09, isGlitter:false },
      { flakeId:'F5116', color:'#ADA08E', ratio:0.25, sizeCode:'s', rangeMin:0.09, rangeMax:0.34, isGlitter:false },
      { flakeId:'F5306', color:'#7C766D', ratio:0.03, sizeCode:'s', rangeMin:0.34, rangeMax:0.37, isGlitter:false },
      { flakeId:'F5305', color:'#A4A296', ratio:0.1, sizeCode:'s', rangeMin:0.37, rangeMax:0.47, isGlitter:false },
      { flakeId:'F9959', color:'#D8D4CB', ratio:0.25, sizeCode:'s', rangeMin:0.47, rangeMax:0.72, isGlitter:false },
      { flakeId:'F9982', color:'#745748', ratio:0.03, sizeCode:'s', rangeMin:0.72, rangeMax:0.75, isGlitter:false },
      { flakeId:'F9987', color:'#ABA49A', ratio:0.25, sizeCode:'s', rangeMin:0.75, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-716-1DG', name: 'Streambed (Dolphin Gray)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-716-1DG.webp`,
    tags: ["Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#928672", "#58504C", "#95805E", "#ADA08E", "#7C766D", "#A4A296", "#D8D4CB", "#745748", "#ABA49A"],
    parts: [
      { flakeId:'F1000', color:'#928672', ratio:0.03, sizeCode:'s', rangeMin:0.0, rangeMax:0.03, isGlitter:false },
      { flakeId:'F1100', color:'#58504C', ratio:0.03, sizeCode:'s', rangeMin:0.03, rangeMax:0.06, isGlitter:false },
      { flakeId:'F5115', color:'#95805E', ratio:0.03, sizeCode:'s', rangeMin:0.06, rangeMax:0.09, isGlitter:false },
      { flakeId:'F5116', color:'#ADA08E', ratio:0.25, sizeCode:'s', rangeMin:0.09, rangeMax:0.34, isGlitter:false },
      { flakeId:'F5306', color:'#7C766D', ratio:0.03, sizeCode:'s', rangeMin:0.34, rangeMax:0.37, isGlitter:false },
      { flakeId:'F5305', color:'#A4A296', ratio:0.1, sizeCode:'s', rangeMin:0.37, rangeMax:0.47, isGlitter:false },
      { flakeId:'F9959', color:'#D8D4CB', ratio:0.25, sizeCode:'s', rangeMin:0.47, rangeMax:0.72, isGlitter:false },
      { flakeId:'F9982', color:'#745748', ratio:0.03, sizeCode:'s', rangeMin:0.72, rangeMax:0.75, isGlitter:false },
      { flakeId:'F9987', color:'#ABA49A', ratio:0.25, sizeCode:'s', rangeMin:0.75, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-716-2BL', name: 'Streambed (Black)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-716-2BL.webp`,
    tags: ["Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#928672", "#58504C", "#95805E", "#ADA08E", "#7C766D", "#A4A296", "#D8D4CB", "#745748", "#ABA49A"],
    parts: [
      { flakeId:'F1000', color:'#928672', ratio:0.03, sizeCode:'s', rangeMin:0.0, rangeMax:0.03, isGlitter:false },
      { flakeId:'F1100', color:'#58504C', ratio:0.03, sizeCode:'s', rangeMin:0.03, rangeMax:0.06, isGlitter:false },
      { flakeId:'F5115', color:'#95805E', ratio:0.03, sizeCode:'s', rangeMin:0.06, rangeMax:0.09, isGlitter:false },
      { flakeId:'F5116', color:'#ADA08E', ratio:0.25, sizeCode:'s', rangeMin:0.09, rangeMax:0.34, isGlitter:false },
      { flakeId:'F5306', color:'#7C766D', ratio:0.03, sizeCode:'s', rangeMin:0.34, rangeMax:0.37, isGlitter:false },
      { flakeId:'F5305', color:'#A4A296', ratio:0.1, sizeCode:'s', rangeMin:0.37, rangeMax:0.47, isGlitter:false },
      { flakeId:'F9959', color:'#D8D4CB', ratio:0.25, sizeCode:'s', rangeMin:0.47, rangeMax:0.72, isGlitter:false },
      { flakeId:'F9982', color:'#745748', ratio:0.03, sizeCode:'s', rangeMin:0.72, rangeMax:0.75, isGlitter:false },
      { flakeId:'F9987', color:'#ABA49A', ratio:0.25, sizeCode:'s', rangeMin:0.75, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-716-3SE', name: 'Streambed (Smokey Evening)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-716-3SE.webp`,
    tags: ["Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#928672", "#58504C", "#95805E", "#ADA08E", "#7C766D", "#A4A296", "#D8D4CB", "#745748", "#ABA49A"],
    parts: [
      { flakeId:'F1000', color:'#928672', ratio:0.03, sizeCode:'s', rangeMin:0.0, rangeMax:0.03, isGlitter:false },
      { flakeId:'F1100', color:'#58504C', ratio:0.03, sizeCode:'s', rangeMin:0.03, rangeMax:0.06, isGlitter:false },
      { flakeId:'F5115', color:'#95805E', ratio:0.03, sizeCode:'s', rangeMin:0.06, rangeMax:0.09, isGlitter:false },
      { flakeId:'F5116', color:'#ADA08E', ratio:0.25, sizeCode:'s', rangeMin:0.09, rangeMax:0.34, isGlitter:false },
      { flakeId:'F5306', color:'#7C766D', ratio:0.03, sizeCode:'s', rangeMin:0.34, rangeMax:0.37, isGlitter:false },
      { flakeId:'F5305', color:'#A4A296', ratio:0.1, sizeCode:'s', rangeMin:0.37, rangeMax:0.47, isGlitter:false },
      { flakeId:'F9959', color:'#D8D4CB', ratio:0.25, sizeCode:'s', rangeMin:0.47, rangeMax:0.72, isGlitter:false },
      { flakeId:'F9982', color:'#745748', ratio:0.03, sizeCode:'s', rangeMin:0.72, rangeMax:0.75, isGlitter:false },
      { flakeId:'F9987', color:'#ABA49A', ratio:0.25, sizeCode:'s', rangeMin:0.75, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-716-4OS', name: 'Streambed (Oyster Secret)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-716-4OS.webp`,
    tags: ["Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#928672", "#58504C", "#95805E", "#ADA08E", "#7C766D", "#A4A296", "#D8D4CB", "#745748", "#ABA49A"],
    parts: [
      { flakeId:'F1000', color:'#928672', ratio:0.03, sizeCode:'s', rangeMin:0.0, rangeMax:0.03, isGlitter:false },
      { flakeId:'F1100', color:'#58504C', ratio:0.03, sizeCode:'s', rangeMin:0.03, rangeMax:0.06, isGlitter:false },
      { flakeId:'F5115', color:'#95805E', ratio:0.03, sizeCode:'s', rangeMin:0.06, rangeMax:0.09, isGlitter:false },
      { flakeId:'F5116', color:'#ADA08E', ratio:0.25, sizeCode:'s', rangeMin:0.09, rangeMax:0.34, isGlitter:false },
      { flakeId:'F5306', color:'#7C766D', ratio:0.03, sizeCode:'s', rangeMin:0.34, rangeMax:0.37, isGlitter:false },
      { flakeId:'F5305', color:'#A4A296', ratio:0.1, sizeCode:'s', rangeMin:0.37, rangeMax:0.47, isGlitter:false },
      { flakeId:'F9959', color:'#D8D4CB', ratio:0.25, sizeCode:'s', rangeMin:0.47, rangeMax:0.72, isGlitter:false },
      { flakeId:'F9982', color:'#745748', ratio:0.03, sizeCode:'s', rangeMin:0.72, rangeMax:0.75, isGlitter:false },
      { flakeId:'F9987', color:'#ABA49A', ratio:0.25, sizeCode:'s', rangeMin:0.75, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-716-5LM', name: 'Streambed (Latte Macchiato)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-716-5LM.webp`,
    tags: ["Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#928672", "#58504C", "#95805E", "#ADA08E", "#7C766D", "#A4A296", "#D8D4CB", "#745748", "#ABA49A"],
    parts: [
      { flakeId:'F1000', color:'#928672', ratio:0.03, sizeCode:'s', rangeMin:0.0, rangeMax:0.03, isGlitter:false },
      { flakeId:'F1100', color:'#58504C', ratio:0.03, sizeCode:'s', rangeMin:0.03, rangeMax:0.06, isGlitter:false },
      { flakeId:'F5115', color:'#95805E', ratio:0.03, sizeCode:'s', rangeMin:0.06, rangeMax:0.09, isGlitter:false },
      { flakeId:'F5116', color:'#ADA08E', ratio:0.25, sizeCode:'s', rangeMin:0.09, rangeMax:0.34, isGlitter:false },
      { flakeId:'F5306', color:'#7C766D', ratio:0.03, sizeCode:'s', rangeMin:0.34, rangeMax:0.37, isGlitter:false },
      { flakeId:'F5305', color:'#A4A296', ratio:0.1, sizeCode:'s', rangeMin:0.37, rangeMax:0.47, isGlitter:false },
      { flakeId:'F9959', color:'#D8D4CB', ratio:0.25, sizeCode:'s', rangeMin:0.47, rangeMax:0.72, isGlitter:false },
      { flakeId:'F9982', color:'#745748', ratio:0.03, sizeCode:'s', rangeMin:0.72, rangeMax:0.75, isGlitter:false },
      { flakeId:'F9987', color:'#ABA49A', ratio:0.25, sizeCode:'s', rangeMin:0.75, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-716-6BB', name: 'Streambed (Brown Beige)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-716-6BB.webp`,
    tags: ["Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#928672", "#58504C", "#95805E", "#ADA08E", "#7C766D", "#A4A296", "#D8D4CB", "#745748", "#ABA49A"],
    parts: [
      { flakeId:'F1000', color:'#928672', ratio:0.03, sizeCode:'s', rangeMin:0.0, rangeMax:0.03, isGlitter:false },
      { flakeId:'F1100', color:'#58504C', ratio:0.03, sizeCode:'s', rangeMin:0.03, rangeMax:0.06, isGlitter:false },
      { flakeId:'F5115', color:'#95805E', ratio:0.03, sizeCode:'s', rangeMin:0.06, rangeMax:0.09, isGlitter:false },
      { flakeId:'F5116', color:'#ADA08E', ratio:0.25, sizeCode:'s', rangeMin:0.09, rangeMax:0.34, isGlitter:false },
      { flakeId:'F5306', color:'#7C766D', ratio:0.03, sizeCode:'s', rangeMin:0.34, rangeMax:0.37, isGlitter:false },
      { flakeId:'F5305', color:'#A4A296', ratio:0.1, sizeCode:'s', rangeMin:0.37, rangeMax:0.47, isGlitter:false },
      { flakeId:'F9959', color:'#D8D4CB', ratio:0.25, sizeCode:'s', rangeMin:0.47, rangeMax:0.72, isGlitter:false },
      { flakeId:'F9982', color:'#745748', ratio:0.03, sizeCode:'s', rangeMin:0.72, rangeMax:0.75, isGlitter:false },
      { flakeId:'F9987', color:'#ABA49A', ratio:0.25, sizeCode:'s', rangeMin:0.75, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-716-7LGR', name: 'Streambed (Lime Green)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-716-7LGR.webp`,
    tags: ["Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#928672", "#58504C", "#95805E", "#ADA08E", "#7C766D", "#A4A296", "#D8D4CB", "#745748", "#ABA49A"],
    parts: [
      { flakeId:'F1000', color:'#928672', ratio:0.03, sizeCode:'s', rangeMin:0.0, rangeMax:0.03, isGlitter:false },
      { flakeId:'F1100', color:'#58504C', ratio:0.03, sizeCode:'s', rangeMin:0.03, rangeMax:0.06, isGlitter:false },
      { flakeId:'F5115', color:'#95805E', ratio:0.03, sizeCode:'s', rangeMin:0.06, rangeMax:0.09, isGlitter:false },
      { flakeId:'F5116', color:'#ADA08E', ratio:0.25, sizeCode:'s', rangeMin:0.09, rangeMax:0.34, isGlitter:false },
      { flakeId:'F5306', color:'#7C766D', ratio:0.03, sizeCode:'s', rangeMin:0.34, rangeMax:0.37, isGlitter:false },
      { flakeId:'F5305', color:'#A4A296', ratio:0.1, sizeCode:'s', rangeMin:0.37, rangeMax:0.47, isGlitter:false },
      { flakeId:'F9959', color:'#D8D4CB', ratio:0.25, sizeCode:'s', rangeMin:0.47, rangeMax:0.72, isGlitter:false },
      { flakeId:'F9982', color:'#745748', ratio:0.03, sizeCode:'s', rangeMin:0.72, rangeMax:0.75, isGlitter:false },
      { flakeId:'F9987', color:'#ABA49A', ratio:0.25, sizeCode:'s', rangeMin:0.75, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-716-8BW', name: 'Streambed (Bordeaux Wine)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-716-8BW.webp`,
    tags: ["Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#928672", "#58504C", "#95805E", "#ADA08E", "#7C766D", "#A4A296", "#D8D4CB", "#745748", "#ABA49A"],
    parts: [
      { flakeId:'F1000', color:'#928672', ratio:0.03, sizeCode:'s', rangeMin:0.0, rangeMax:0.03, isGlitter:false },
      { flakeId:'F1100', color:'#58504C', ratio:0.03, sizeCode:'s', rangeMin:0.03, rangeMax:0.06, isGlitter:false },
      { flakeId:'F5115', color:'#95805E', ratio:0.03, sizeCode:'s', rangeMin:0.06, rangeMax:0.09, isGlitter:false },
      { flakeId:'F5116', color:'#ADA08E', ratio:0.25, sizeCode:'s', rangeMin:0.09, rangeMax:0.34, isGlitter:false },
      { flakeId:'F5306', color:'#7C766D', ratio:0.03, sizeCode:'s', rangeMin:0.34, rangeMax:0.37, isGlitter:false },
      { flakeId:'F5305', color:'#A4A296', ratio:0.1, sizeCode:'s', rangeMin:0.37, rangeMax:0.47, isGlitter:false },
      { flakeId:'F9959', color:'#D8D4CB', ratio:0.25, sizeCode:'s', rangeMin:0.47, rangeMax:0.72, isGlitter:false },
      { flakeId:'F9982', color:'#745748', ratio:0.03, sizeCode:'s', rangeMin:0.72, rangeMax:0.75, isGlitter:false },
      { flakeId:'F9987', color:'#ABA49A', ratio:0.25, sizeCode:'s', rangeMin:0.75, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-427-0LG', name: 'Graystoke (Light Gray)', type: 'flake-blend', collection: 'garage',
    img_url: `${CDN}assets/images/blends/FB-427-0LG.webp`,
    tags: ["Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#898A86", "#B8B7AF", "#707677", "#CAC9C5", "#F0EFE8"],
    parts: [
      { flakeId:'F1090', color:'#898A86', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.2, sizeCode:'s', rangeMin:0.2, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1415', color:'#707677', ratio:0.2, sizeCode:'s', rangeMin:0.4, rangeMax:0.6, isGlitter:false },
      { flakeId:'F1800', color:'#CAC9C5', ratio:0.2, sizeCode:'s', rangeMin:0.6, rangeMax:0.8, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.8, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-427-1DG', name: 'Graystoke (Dolphin Gray)', type: 'flake-blend', collection: 'garage',
    img_url: `${CDN}assets/images/blends/FB-427-1DG.webp`,
    tags: ["Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#898A86", "#B8B7AF", "#707677", "#CAC9C5", "#F0EFE8"],
    parts: [
      { flakeId:'F1090', color:'#898A86', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.2, sizeCode:'s', rangeMin:0.2, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1415', color:'#707677', ratio:0.2, sizeCode:'s', rangeMin:0.4, rangeMax:0.6, isGlitter:false },
      { flakeId:'F1800', color:'#CAC9C5', ratio:0.2, sizeCode:'s', rangeMin:0.6, rangeMax:0.8, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.8, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-427-2BL', name: 'Graystoke (Black)', type: 'flake-blend', collection: 'garage',
    img_url: `${CDN}assets/images/blends/FB-427-2BL.webp`,
    tags: ["Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#898A86", "#B8B7AF", "#707677", "#CAC9C5", "#F0EFE8"],
    parts: [
      { flakeId:'F1090', color:'#898A86', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.2, sizeCode:'s', rangeMin:0.2, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1415', color:'#707677', ratio:0.2, sizeCode:'s', rangeMin:0.4, rangeMax:0.6, isGlitter:false },
      { flakeId:'F1800', color:'#CAC9C5', ratio:0.2, sizeCode:'s', rangeMin:0.6, rangeMax:0.8, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.8, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-427-3SE', name: 'Graystoke (Smokey Evening)', type: 'flake-blend', collection: 'garage',
    img_url: `${CDN}assets/images/blends/FB-427-3SE.webp`,
    tags: ["Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#898A86", "#B8B7AF", "#707677", "#CAC9C5", "#F0EFE8"],
    parts: [
      { flakeId:'F1090', color:'#898A86', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.2, sizeCode:'s', rangeMin:0.2, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1415', color:'#707677', ratio:0.2, sizeCode:'s', rangeMin:0.4, rangeMax:0.6, isGlitter:false },
      { flakeId:'F1800', color:'#CAC9C5', ratio:0.2, sizeCode:'s', rangeMin:0.6, rangeMax:0.8, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.8, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-427-4OS', name: 'Graystoke (Oyster Secret)', type: 'flake-blend', collection: 'garage',
    img_url: `${CDN}assets/images/blends/FB-427-4OS.webp`,
    tags: ["Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#898A86", "#B8B7AF", "#707677", "#CAC9C5", "#F0EFE8"],
    parts: [
      { flakeId:'F1090', color:'#898A86', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.2, sizeCode:'s', rangeMin:0.2, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1415', color:'#707677', ratio:0.2, sizeCode:'s', rangeMin:0.4, rangeMax:0.6, isGlitter:false },
      { flakeId:'F1800', color:'#CAC9C5', ratio:0.2, sizeCode:'s', rangeMin:0.6, rangeMax:0.8, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.8, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-427-5LM', name: 'Graystoke (Latte Macchiato)', type: 'flake-blend', collection: 'garage',
    img_url: `${CDN}assets/images/blends/FB-427-5LM.webp`,
    tags: ["Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#898A86", "#B8B7AF", "#707677", "#CAC9C5", "#F0EFE8"],
    parts: [
      { flakeId:'F1090', color:'#898A86', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.2, sizeCode:'s', rangeMin:0.2, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1415', color:'#707677', ratio:0.2, sizeCode:'s', rangeMin:0.4, rangeMax:0.6, isGlitter:false },
      { flakeId:'F1800', color:'#CAC9C5', ratio:0.2, sizeCode:'s', rangeMin:0.6, rangeMax:0.8, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.8, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-427-6BB', name: 'Graystoke (Brown Beige)', type: 'flake-blend', collection: 'garage',
    img_url: `${CDN}assets/images/blends/FB-427-6BB.webp`,
    tags: ["Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#898A86", "#B8B7AF", "#707677", "#CAC9C5", "#F0EFE8"],
    parts: [
      { flakeId:'F1090', color:'#898A86', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.2, sizeCode:'s', rangeMin:0.2, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1415', color:'#707677', ratio:0.2, sizeCode:'s', rangeMin:0.4, rangeMax:0.6, isGlitter:false },
      { flakeId:'F1800', color:'#CAC9C5', ratio:0.2, sizeCode:'s', rangeMin:0.6, rangeMax:0.8, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.8, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-427-7LGR', name: 'Graystoke (Lime Green)', type: 'flake-blend', collection: 'garage',
    img_url: `${CDN}assets/images/blends/FB-427-7LGR.webp`,
    tags: ["Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#898A86", "#B8B7AF", "#707677", "#CAC9C5", "#F0EFE8"],
    parts: [
      { flakeId:'F1090', color:'#898A86', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.2, sizeCode:'s', rangeMin:0.2, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1415', color:'#707677', ratio:0.2, sizeCode:'s', rangeMin:0.4, rangeMax:0.6, isGlitter:false },
      { flakeId:'F1800', color:'#CAC9C5', ratio:0.2, sizeCode:'s', rangeMin:0.6, rangeMax:0.8, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.8, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-427-8BW', name: 'Graystoke (Bordeaux Wine)', type: 'flake-blend', collection: 'garage',
    img_url: `${CDN}assets/images/blends/FB-427-8BW.webp`,
    tags: ["Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#898A86", "#B8B7AF", "#707677", "#CAC9C5", "#F0EFE8"],
    parts: [
      { flakeId:'F1090', color:'#898A86', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.2, sizeCode:'s', rangeMin:0.2, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1415', color:'#707677', ratio:0.2, sizeCode:'s', rangeMin:0.4, rangeMax:0.6, isGlitter:false },
      { flakeId:'F1800', color:'#CAC9C5', ratio:0.2, sizeCode:'s', rangeMin:0.6, rangeMax:0.8, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.8, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-711-0LG', name: 'Zodiac (Light Gray)', type: 'flake-blend', collection: 'garage',
    img_url: `${CDN}assets/images/blends/FB-711-0LG.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#F0EFE8", "#4870A9", "#A5A59F", "#8B98A2", "#CBC8C2"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.1, rangeMax:0.3, isGlitter:false },
      { flakeId:'F6604', color:'#4870A9', ratio:0.1, sizeCode:'s', rangeMin:0.3, rangeMax:0.4, isGlitter:false },
      { flakeId:'F6606', color:'#A5A59F', ratio:0.2, sizeCode:'s', rangeMin:0.4, rangeMax:0.6, isGlitter:false },
      { flakeId:'F6621', color:'#8B98A2', ratio:0.2, sizeCode:'s', rangeMin:0.6, rangeMax:0.8, isGlitter:false },
      { flakeId:'F9958', color:'#CBC8C2', ratio:0.2, sizeCode:'s', rangeMin:0.8, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-711-1DG', name: 'Zodiac (Dolphin Gray)', type: 'flake-blend', collection: 'garage',
    img_url: `${CDN}assets/images/blends/FB-711-1DG.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#F0EFE8", "#4870A9", "#A5A59F", "#8B98A2", "#CBC8C2"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.1, rangeMax:0.3, isGlitter:false },
      { flakeId:'F6604', color:'#4870A9', ratio:0.1, sizeCode:'s', rangeMin:0.3, rangeMax:0.4, isGlitter:false },
      { flakeId:'F6606', color:'#A5A59F', ratio:0.2, sizeCode:'s', rangeMin:0.4, rangeMax:0.6, isGlitter:false },
      { flakeId:'F6621', color:'#8B98A2', ratio:0.2, sizeCode:'s', rangeMin:0.6, rangeMax:0.8, isGlitter:false },
      { flakeId:'F9958', color:'#CBC8C2', ratio:0.2, sizeCode:'s', rangeMin:0.8, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-711-2BL', name: 'Zodiac (Black)', type: 'flake-blend', collection: 'garage',
    img_url: `${CDN}assets/images/blends/FB-711-2BL.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#F0EFE8", "#4870A9", "#A5A59F", "#8B98A2", "#CBC8C2"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.1, rangeMax:0.3, isGlitter:false },
      { flakeId:'F6604', color:'#4870A9', ratio:0.1, sizeCode:'s', rangeMin:0.3, rangeMax:0.4, isGlitter:false },
      { flakeId:'F6606', color:'#A5A59F', ratio:0.2, sizeCode:'s', rangeMin:0.4, rangeMax:0.6, isGlitter:false },
      { flakeId:'F6621', color:'#8B98A2', ratio:0.2, sizeCode:'s', rangeMin:0.6, rangeMax:0.8, isGlitter:false },
      { flakeId:'F9958', color:'#CBC8C2', ratio:0.2, sizeCode:'s', rangeMin:0.8, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-711-3SE', name: 'Zodiac (Smokey Evening)', type: 'flake-blend', collection: 'garage',
    img_url: `${CDN}assets/images/blends/FB-711-3SE.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#F0EFE8", "#4870A9", "#A5A59F", "#8B98A2", "#CBC8C2"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.1, rangeMax:0.3, isGlitter:false },
      { flakeId:'F6604', color:'#4870A9', ratio:0.1, sizeCode:'s', rangeMin:0.3, rangeMax:0.4, isGlitter:false },
      { flakeId:'F6606', color:'#A5A59F', ratio:0.2, sizeCode:'s', rangeMin:0.4, rangeMax:0.6, isGlitter:false },
      { flakeId:'F6621', color:'#8B98A2', ratio:0.2, sizeCode:'s', rangeMin:0.6, rangeMax:0.8, isGlitter:false },
      { flakeId:'F9958', color:'#CBC8C2', ratio:0.2, sizeCode:'s', rangeMin:0.8, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-711-4OS', name: 'Zodiac (Oyster Secret)', type: 'flake-blend', collection: 'garage',
    img_url: `${CDN}assets/images/blends/FB-711-4OS.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#F0EFE8", "#4870A9", "#A5A59F", "#8B98A2", "#CBC8C2"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.1, rangeMax:0.3, isGlitter:false },
      { flakeId:'F6604', color:'#4870A9', ratio:0.1, sizeCode:'s', rangeMin:0.3, rangeMax:0.4, isGlitter:false },
      { flakeId:'F6606', color:'#A5A59F', ratio:0.2, sizeCode:'s', rangeMin:0.4, rangeMax:0.6, isGlitter:false },
      { flakeId:'F6621', color:'#8B98A2', ratio:0.2, sizeCode:'s', rangeMin:0.6, rangeMax:0.8, isGlitter:false },
      { flakeId:'F9958', color:'#CBC8C2', ratio:0.2, sizeCode:'s', rangeMin:0.8, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-711-5LM', name: 'Zodiac (Latte Macchiato)', type: 'flake-blend', collection: 'garage',
    img_url: `${CDN}assets/images/blends/FB-711-5LM.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#F0EFE8", "#4870A9", "#A5A59F", "#8B98A2", "#CBC8C2"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.1, rangeMax:0.3, isGlitter:false },
      { flakeId:'F6604', color:'#4870A9', ratio:0.1, sizeCode:'s', rangeMin:0.3, rangeMax:0.4, isGlitter:false },
      { flakeId:'F6606', color:'#A5A59F', ratio:0.2, sizeCode:'s', rangeMin:0.4, rangeMax:0.6, isGlitter:false },
      { flakeId:'F6621', color:'#8B98A2', ratio:0.2, sizeCode:'s', rangeMin:0.6, rangeMax:0.8, isGlitter:false },
      { flakeId:'F9958', color:'#CBC8C2', ratio:0.2, sizeCode:'s', rangeMin:0.8, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-711-6BB', name: 'Zodiac (Brown Beige)', type: 'flake-blend', collection: 'garage',
    img_url: `${CDN}assets/images/blends/FB-711-6BB.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#F0EFE8", "#4870A9", "#A5A59F", "#8B98A2", "#CBC8C2"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.1, rangeMax:0.3, isGlitter:false },
      { flakeId:'F6604', color:'#4870A9', ratio:0.1, sizeCode:'s', rangeMin:0.3, rangeMax:0.4, isGlitter:false },
      { flakeId:'F6606', color:'#A5A59F', ratio:0.2, sizeCode:'s', rangeMin:0.4, rangeMax:0.6, isGlitter:false },
      { flakeId:'F6621', color:'#8B98A2', ratio:0.2, sizeCode:'s', rangeMin:0.6, rangeMax:0.8, isGlitter:false },
      { flakeId:'F9958', color:'#CBC8C2', ratio:0.2, sizeCode:'s', rangeMin:0.8, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-711-7LGR', name: 'Zodiac (Lime Green)', type: 'flake-blend', collection: 'garage',
    img_url: `${CDN}assets/images/blends/FB-711-7LGR.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#F0EFE8", "#4870A9", "#A5A59F", "#8B98A2", "#CBC8C2"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.1, rangeMax:0.3, isGlitter:false },
      { flakeId:'F6604', color:'#4870A9', ratio:0.1, sizeCode:'s', rangeMin:0.3, rangeMax:0.4, isGlitter:false },
      { flakeId:'F6606', color:'#A5A59F', ratio:0.2, sizeCode:'s', rangeMin:0.4, rangeMax:0.6, isGlitter:false },
      { flakeId:'F6621', color:'#8B98A2', ratio:0.2, sizeCode:'s', rangeMin:0.6, rangeMax:0.8, isGlitter:false },
      { flakeId:'F9958', color:'#CBC8C2', ratio:0.2, sizeCode:'s', rangeMin:0.8, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-711-8BW', name: 'Zodiac (Bordeaux Wine)', type: 'flake-blend', collection: 'garage',
    img_url: `${CDN}assets/images/blends/FB-711-8BW.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#F0EFE8", "#4870A9", "#A5A59F", "#8B98A2", "#CBC8C2"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.1, rangeMax:0.3, isGlitter:false },
      { flakeId:'F6604', color:'#4870A9', ratio:0.1, sizeCode:'s', rangeMin:0.3, rangeMax:0.4, isGlitter:false },
      { flakeId:'F6606', color:'#A5A59F', ratio:0.2, sizeCode:'s', rangeMin:0.4, rangeMax:0.6, isGlitter:false },
      { flakeId:'F6621', color:'#8B98A2', ratio:0.2, sizeCode:'s', rangeMin:0.6, rangeMax:0.8, isGlitter:false },
      { flakeId:'F9958', color:'#CBC8C2', ratio:0.2, sizeCode:'s', rangeMin:0.8, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-423-0LG', name: 'Horizon (Light Gray)', type: 'flake-blend', collection: 'archive',
    img_url: `${CDN}assets/images/blends/FB-423-0LG.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#B8B7AF", "#A3ADB2", "#496A9A", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.2, sizeCode:'s', rangeMin:0.2, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1480', color:'#A3ADB2', ratio:0.2, sizeCode:'s', rangeMin:0.4, rangeMax:0.6, isGlitter:false },
      { flakeId:'F1790', color:'#496A9A', ratio:0.2, sizeCode:'s', rangeMin:0.6, rangeMax:0.8, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.8, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-423-1DG', name: 'Horizon (Dolphin Gray)', type: 'flake-blend', collection: 'archive',
    img_url: `${CDN}assets/images/blends/FB-423-1DG.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#B8B7AF", "#A3ADB2", "#496A9A", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.2, sizeCode:'s', rangeMin:0.2, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1480', color:'#A3ADB2', ratio:0.2, sizeCode:'s', rangeMin:0.4, rangeMax:0.6, isGlitter:false },
      { flakeId:'F1790', color:'#496A9A', ratio:0.2, sizeCode:'s', rangeMin:0.6, rangeMax:0.8, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.8, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-423-2BL', name: 'Horizon (Black)', type: 'flake-blend', collection: 'archive',
    img_url: `${CDN}assets/images/blends/FB-423-2BL.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#B8B7AF", "#A3ADB2", "#496A9A", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.2, sizeCode:'s', rangeMin:0.2, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1480', color:'#A3ADB2', ratio:0.2, sizeCode:'s', rangeMin:0.4, rangeMax:0.6, isGlitter:false },
      { flakeId:'F1790', color:'#496A9A', ratio:0.2, sizeCode:'s', rangeMin:0.6, rangeMax:0.8, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.8, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-423-3SE', name: 'Horizon (Smokey Evening)', type: 'flake-blend', collection: 'archive',
    img_url: `${CDN}assets/images/blends/FB-423-3SE.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#B8B7AF", "#A3ADB2", "#496A9A", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.2, sizeCode:'s', rangeMin:0.2, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1480', color:'#A3ADB2', ratio:0.2, sizeCode:'s', rangeMin:0.4, rangeMax:0.6, isGlitter:false },
      { flakeId:'F1790', color:'#496A9A', ratio:0.2, sizeCode:'s', rangeMin:0.6, rangeMax:0.8, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.8, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-423-4OS', name: 'Horizon (Oyster Secret)', type: 'flake-blend', collection: 'archive',
    img_url: `${CDN}assets/images/blends/FB-423-4OS.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#B8B7AF", "#A3ADB2", "#496A9A", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.2, sizeCode:'s', rangeMin:0.2, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1480', color:'#A3ADB2', ratio:0.2, sizeCode:'s', rangeMin:0.4, rangeMax:0.6, isGlitter:false },
      { flakeId:'F1790', color:'#496A9A', ratio:0.2, sizeCode:'s', rangeMin:0.6, rangeMax:0.8, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.8, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-423-5LM', name: 'Horizon (Latte Macchiato)', type: 'flake-blend', collection: 'archive',
    img_url: `${CDN}assets/images/blends/FB-423-5LM.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#B8B7AF", "#A3ADB2", "#496A9A", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.2, sizeCode:'s', rangeMin:0.2, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1480', color:'#A3ADB2', ratio:0.2, sizeCode:'s', rangeMin:0.4, rangeMax:0.6, isGlitter:false },
      { flakeId:'F1790', color:'#496A9A', ratio:0.2, sizeCode:'s', rangeMin:0.6, rangeMax:0.8, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.8, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-423-6BB', name: 'Horizon (Brown Beige)', type: 'flake-blend', collection: 'archive',
    img_url: `${CDN}assets/images/blends/FB-423-6BB.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#B8B7AF", "#A3ADB2", "#496A9A", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.2, sizeCode:'s', rangeMin:0.2, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1480', color:'#A3ADB2', ratio:0.2, sizeCode:'s', rangeMin:0.4, rangeMax:0.6, isGlitter:false },
      { flakeId:'F1790', color:'#496A9A', ratio:0.2, sizeCode:'s', rangeMin:0.6, rangeMax:0.8, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.8, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-423-7LGR', name: 'Horizon (Lime Green)', type: 'flake-blend', collection: 'archive',
    img_url: `${CDN}assets/images/blends/FB-423-7LGR.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#B8B7AF", "#A3ADB2", "#496A9A", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.2, sizeCode:'s', rangeMin:0.2, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1480', color:'#A3ADB2', ratio:0.2, sizeCode:'s', rangeMin:0.4, rangeMax:0.6, isGlitter:false },
      { flakeId:'F1790', color:'#496A9A', ratio:0.2, sizeCode:'s', rangeMin:0.6, rangeMax:0.8, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.8, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-423-8BW', name: 'Horizon (Bordeaux Wine)', type: 'flake-blend', collection: 'archive',
    img_url: `${CDN}assets/images/blends/FB-423-8BW.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3C3C3C", "#B8B7AF", "#A3ADB2", "#496A9A", "#F0EFE8"],
    parts: [
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F1410', color:'#B8B7AF', ratio:0.2, sizeCode:'s', rangeMin:0.2, rangeMax:0.4, isGlitter:false },
      { flakeId:'F1480', color:'#A3ADB2', ratio:0.2, sizeCode:'s', rangeMin:0.4, rangeMax:0.6, isGlitter:false },
      { flakeId:'F1790', color:'#496A9A', ratio:0.2, sizeCode:'s', rangeMin:0.6, rangeMax:0.8, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.8, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-706-0LG', name: 'Pebble (Light Gray)', type: 'flake-blend', collection: 'contemporary',
    img_url: `${CDN}assets/images/blends/FB-706-0LG.webp`,
    tags: ["Brown", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#ADA08E", "#817D76", "#BCB4A7", "#CBC8C2"],
    parts: [
      { flakeId:'F5116', color:'#ADA08E', ratio:0.4, sizeCode:'s', rangeMin:0.0, rangeMax:0.4, isGlitter:false },
      { flakeId:'F9801', color:'#817D76', ratio:0.3, sizeCode:'s', rangeMin:0.4, rangeMax:0.7, isGlitter:false },
      { flakeId:'F9957', color:'#BCB4A7', ratio:0.15, sizeCode:'s', rangeMin:0.7, rangeMax:0.85, isGlitter:false },
      { flakeId:'F9958', color:'#CBC8C2', ratio:0.15, sizeCode:'s', rangeMin:0.85, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-706-1DG', name: 'Pebble (Dolphin Gray)', type: 'flake-blend', collection: 'contemporary',
    img_url: `${CDN}assets/images/blends/FB-706-1DG.webp`,
    tags: ["Brown", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#ADA08E", "#817D76", "#BCB4A7", "#CBC8C2"],
    parts: [
      { flakeId:'F5116', color:'#ADA08E', ratio:0.4, sizeCode:'s', rangeMin:0.0, rangeMax:0.4, isGlitter:false },
      { flakeId:'F9801', color:'#817D76', ratio:0.3, sizeCode:'s', rangeMin:0.4, rangeMax:0.7, isGlitter:false },
      { flakeId:'F9957', color:'#BCB4A7', ratio:0.15, sizeCode:'s', rangeMin:0.7, rangeMax:0.85, isGlitter:false },
      { flakeId:'F9958', color:'#CBC8C2', ratio:0.15, sizeCode:'s', rangeMin:0.85, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-706-2BL', name: 'Pebble (Black)', type: 'flake-blend', collection: 'contemporary',
    img_url: `${CDN}assets/images/blends/FB-706-2BL.webp`,
    tags: ["Brown", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#ADA08E", "#817D76", "#BCB4A7", "#CBC8C2"],
    parts: [
      { flakeId:'F5116', color:'#ADA08E', ratio:0.4, sizeCode:'s', rangeMin:0.0, rangeMax:0.4, isGlitter:false },
      { flakeId:'F9801', color:'#817D76', ratio:0.3, sizeCode:'s', rangeMin:0.4, rangeMax:0.7, isGlitter:false },
      { flakeId:'F9957', color:'#BCB4A7', ratio:0.15, sizeCode:'s', rangeMin:0.7, rangeMax:0.85, isGlitter:false },
      { flakeId:'F9958', color:'#CBC8C2', ratio:0.15, sizeCode:'s', rangeMin:0.85, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-706-3SE', name: 'Pebble (Smokey Evening)', type: 'flake-blend', collection: 'contemporary',
    img_url: `${CDN}assets/images/blends/FB-706-3SE.webp`,
    tags: ["Brown", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#ADA08E", "#817D76", "#BCB4A7", "#CBC8C2"],
    parts: [
      { flakeId:'F5116', color:'#ADA08E', ratio:0.4, sizeCode:'s', rangeMin:0.0, rangeMax:0.4, isGlitter:false },
      { flakeId:'F9801', color:'#817D76', ratio:0.3, sizeCode:'s', rangeMin:0.4, rangeMax:0.7, isGlitter:false },
      { flakeId:'F9957', color:'#BCB4A7', ratio:0.15, sizeCode:'s', rangeMin:0.7, rangeMax:0.85, isGlitter:false },
      { flakeId:'F9958', color:'#CBC8C2', ratio:0.15, sizeCode:'s', rangeMin:0.85, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-706-4OS', name: 'Pebble (Oyster Secret)', type: 'flake-blend', collection: 'contemporary',
    img_url: `${CDN}assets/images/blends/FB-706-4OS.webp`,
    tags: ["Brown", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#ADA08E", "#817D76", "#BCB4A7", "#CBC8C2"],
    parts: [
      { flakeId:'F5116', color:'#ADA08E', ratio:0.4, sizeCode:'s', rangeMin:0.0, rangeMax:0.4, isGlitter:false },
      { flakeId:'F9801', color:'#817D76', ratio:0.3, sizeCode:'s', rangeMin:0.4, rangeMax:0.7, isGlitter:false },
      { flakeId:'F9957', color:'#BCB4A7', ratio:0.15, sizeCode:'s', rangeMin:0.7, rangeMax:0.85, isGlitter:false },
      { flakeId:'F9958', color:'#CBC8C2', ratio:0.15, sizeCode:'s', rangeMin:0.85, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-706-5LM', name: 'Pebble (Latte Macchiato)', type: 'flake-blend', collection: 'contemporary',
    img_url: `${CDN}assets/images/blends/FB-706-5LM.webp`,
    tags: ["Brown", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#ADA08E", "#817D76", "#BCB4A7", "#CBC8C2"],
    parts: [
      { flakeId:'F5116', color:'#ADA08E', ratio:0.4, sizeCode:'s', rangeMin:0.0, rangeMax:0.4, isGlitter:false },
      { flakeId:'F9801', color:'#817D76', ratio:0.3, sizeCode:'s', rangeMin:0.4, rangeMax:0.7, isGlitter:false },
      { flakeId:'F9957', color:'#BCB4A7', ratio:0.15, sizeCode:'s', rangeMin:0.7, rangeMax:0.85, isGlitter:false },
      { flakeId:'F9958', color:'#CBC8C2', ratio:0.15, sizeCode:'s', rangeMin:0.85, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-706-6BB', name: 'Pebble (Brown Beige)', type: 'flake-blend', collection: 'contemporary',
    img_url: `${CDN}assets/images/blends/FB-706-6BB.webp`,
    tags: ["Brown", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#ADA08E", "#817D76", "#BCB4A7", "#CBC8C2"],
    parts: [
      { flakeId:'F5116', color:'#ADA08E', ratio:0.4, sizeCode:'s', rangeMin:0.0, rangeMax:0.4, isGlitter:false },
      { flakeId:'F9801', color:'#817D76', ratio:0.3, sizeCode:'s', rangeMin:0.4, rangeMax:0.7, isGlitter:false },
      { flakeId:'F9957', color:'#BCB4A7', ratio:0.15, sizeCode:'s', rangeMin:0.7, rangeMax:0.85, isGlitter:false },
      { flakeId:'F9958', color:'#CBC8C2', ratio:0.15, sizeCode:'s', rangeMin:0.85, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-706-7LGR', name: 'Pebble (Lime Green)', type: 'flake-blend', collection: 'contemporary',
    img_url: `${CDN}assets/images/blends/FB-706-7LGR.webp`,
    tags: ["Brown", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#ADA08E", "#817D76", "#BCB4A7", "#CBC8C2"],
    parts: [
      { flakeId:'F5116', color:'#ADA08E', ratio:0.4, sizeCode:'s', rangeMin:0.0, rangeMax:0.4, isGlitter:false },
      { flakeId:'F9801', color:'#817D76', ratio:0.3, sizeCode:'s', rangeMin:0.4, rangeMax:0.7, isGlitter:false },
      { flakeId:'F9957', color:'#BCB4A7', ratio:0.15, sizeCode:'s', rangeMin:0.7, rangeMax:0.85, isGlitter:false },
      { flakeId:'F9958', color:'#CBC8C2', ratio:0.15, sizeCode:'s', rangeMin:0.85, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-706-8BW', name: 'Pebble (Bordeaux Wine)', type: 'flake-blend', collection: 'contemporary',
    img_url: `${CDN}assets/images/blends/FB-706-8BW.webp`,
    tags: ["Brown", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#ADA08E", "#817D76", "#BCB4A7", "#CBC8C2"],
    parts: [
      { flakeId:'F5116', color:'#ADA08E', ratio:0.4, sizeCode:'s', rangeMin:0.0, rangeMax:0.4, isGlitter:false },
      { flakeId:'F9801', color:'#817D76', ratio:0.3, sizeCode:'s', rangeMin:0.4, rangeMax:0.7, isGlitter:false },
      { flakeId:'F9957', color:'#BCB4A7', ratio:0.15, sizeCode:'s', rangeMin:0.7, rangeMax:0.85, isGlitter:false },
      { flakeId:'F9958', color:'#CBC8C2', ratio:0.15, sizeCode:'s', rangeMin:0.85, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-708-0LG', name: 'Matrix (Light Gray)', type: 'flake-blend', collection: 'accents',
    img_url: `${CDN}assets/images/blends/FB-708-0LG.webp`,
    tags: ["Blue", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3F5069", "#8B98A2", "#D8D4CB", "#62757E", "#ABA49A"],
    parts: [
      { flakeId:'F1130', color:'#3F5069', ratio:0.05, sizeCode:'s', rangeMin:0.0, rangeMax:0.05, isGlitter:false },
      { flakeId:'F6621', color:'#8B98A2', ratio:0.1, sizeCode:'s', rangeMin:0.05, rangeMax:0.15, isGlitter:false },
      { flakeId:'F9959', color:'#D8D4CB', ratio:0.25, sizeCode:'s', rangeMin:0.15, rangeMax:0.4, isGlitter:false },
      { flakeId:'F9972', color:'#62757E', ratio:0.1, sizeCode:'s', rangeMin:0.4, rangeMax:0.5, isGlitter:false },
      { flakeId:'F9987', color:'#ABA49A', ratio:0.5, sizeCode:'s', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-708-1DG', name: 'Matrix (Dolphin Gray)', type: 'flake-blend', collection: 'accents',
    img_url: `${CDN}assets/images/blends/FB-708-1DG.webp`,
    tags: ["Blue", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3F5069", "#8B98A2", "#D8D4CB", "#62757E", "#ABA49A"],
    parts: [
      { flakeId:'F1130', color:'#3F5069', ratio:0.05, sizeCode:'s', rangeMin:0.0, rangeMax:0.05, isGlitter:false },
      { flakeId:'F6621', color:'#8B98A2', ratio:0.1, sizeCode:'s', rangeMin:0.05, rangeMax:0.15, isGlitter:false },
      { flakeId:'F9959', color:'#D8D4CB', ratio:0.25, sizeCode:'s', rangeMin:0.15, rangeMax:0.4, isGlitter:false },
      { flakeId:'F9972', color:'#62757E', ratio:0.1, sizeCode:'s', rangeMin:0.4, rangeMax:0.5, isGlitter:false },
      { flakeId:'F9987', color:'#ABA49A', ratio:0.5, sizeCode:'s', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-708-2BL', name: 'Matrix (Black)', type: 'flake-blend', collection: 'accents',
    img_url: `${CDN}assets/images/blends/FB-708-2BL.webp`,
    tags: ["Blue", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3F5069", "#8B98A2", "#D8D4CB", "#62757E", "#ABA49A"],
    parts: [
      { flakeId:'F1130', color:'#3F5069', ratio:0.05, sizeCode:'s', rangeMin:0.0, rangeMax:0.05, isGlitter:false },
      { flakeId:'F6621', color:'#8B98A2', ratio:0.1, sizeCode:'s', rangeMin:0.05, rangeMax:0.15, isGlitter:false },
      { flakeId:'F9959', color:'#D8D4CB', ratio:0.25, sizeCode:'s', rangeMin:0.15, rangeMax:0.4, isGlitter:false },
      { flakeId:'F9972', color:'#62757E', ratio:0.1, sizeCode:'s', rangeMin:0.4, rangeMax:0.5, isGlitter:false },
      { flakeId:'F9987', color:'#ABA49A', ratio:0.5, sizeCode:'s', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-708-3SE', name: 'Matrix (Smokey Evening)', type: 'flake-blend', collection: 'accents',
    img_url: `${CDN}assets/images/blends/FB-708-3SE.webp`,
    tags: ["Blue", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3F5069", "#8B98A2", "#D8D4CB", "#62757E", "#ABA49A"],
    parts: [
      { flakeId:'F1130', color:'#3F5069', ratio:0.05, sizeCode:'s', rangeMin:0.0, rangeMax:0.05, isGlitter:false },
      { flakeId:'F6621', color:'#8B98A2', ratio:0.1, sizeCode:'s', rangeMin:0.05, rangeMax:0.15, isGlitter:false },
      { flakeId:'F9959', color:'#D8D4CB', ratio:0.25, sizeCode:'s', rangeMin:0.15, rangeMax:0.4, isGlitter:false },
      { flakeId:'F9972', color:'#62757E', ratio:0.1, sizeCode:'s', rangeMin:0.4, rangeMax:0.5, isGlitter:false },
      { flakeId:'F9987', color:'#ABA49A', ratio:0.5, sizeCode:'s', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-708-4OS', name: 'Matrix (Oyster Secret)', type: 'flake-blend', collection: 'accents',
    img_url: `${CDN}assets/images/blends/FB-708-4OS.webp`,
    tags: ["Blue", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3F5069", "#8B98A2", "#D8D4CB", "#62757E", "#ABA49A"],
    parts: [
      { flakeId:'F1130', color:'#3F5069', ratio:0.05, sizeCode:'s', rangeMin:0.0, rangeMax:0.05, isGlitter:false },
      { flakeId:'F6621', color:'#8B98A2', ratio:0.1, sizeCode:'s', rangeMin:0.05, rangeMax:0.15, isGlitter:false },
      { flakeId:'F9959', color:'#D8D4CB', ratio:0.25, sizeCode:'s', rangeMin:0.15, rangeMax:0.4, isGlitter:false },
      { flakeId:'F9972', color:'#62757E', ratio:0.1, sizeCode:'s', rangeMin:0.4, rangeMax:0.5, isGlitter:false },
      { flakeId:'F9987', color:'#ABA49A', ratio:0.5, sizeCode:'s', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-708-5LM', name: 'Matrix (Latte Macchiato)', type: 'flake-blend', collection: 'accents',
    img_url: `${CDN}assets/images/blends/FB-708-5LM.webp`,
    tags: ["Blue", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3F5069", "#8B98A2", "#D8D4CB", "#62757E", "#ABA49A"],
    parts: [
      { flakeId:'F1130', color:'#3F5069', ratio:0.05, sizeCode:'s', rangeMin:0.0, rangeMax:0.05, isGlitter:false },
      { flakeId:'F6621', color:'#8B98A2', ratio:0.1, sizeCode:'s', rangeMin:0.05, rangeMax:0.15, isGlitter:false },
      { flakeId:'F9959', color:'#D8D4CB', ratio:0.25, sizeCode:'s', rangeMin:0.15, rangeMax:0.4, isGlitter:false },
      { flakeId:'F9972', color:'#62757E', ratio:0.1, sizeCode:'s', rangeMin:0.4, rangeMax:0.5, isGlitter:false },
      { flakeId:'F9987', color:'#ABA49A', ratio:0.5, sizeCode:'s', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-708-6BB', name: 'Matrix (Brown Beige)', type: 'flake-blend', collection: 'accents',
    img_url: `${CDN}assets/images/blends/FB-708-6BB.webp`,
    tags: ["Blue", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3F5069", "#8B98A2", "#D8D4CB", "#62757E", "#ABA49A"],
    parts: [
      { flakeId:'F1130', color:'#3F5069', ratio:0.05, sizeCode:'s', rangeMin:0.0, rangeMax:0.05, isGlitter:false },
      { flakeId:'F6621', color:'#8B98A2', ratio:0.1, sizeCode:'s', rangeMin:0.05, rangeMax:0.15, isGlitter:false },
      { flakeId:'F9959', color:'#D8D4CB', ratio:0.25, sizeCode:'s', rangeMin:0.15, rangeMax:0.4, isGlitter:false },
      { flakeId:'F9972', color:'#62757E', ratio:0.1, sizeCode:'s', rangeMin:0.4, rangeMax:0.5, isGlitter:false },
      { flakeId:'F9987', color:'#ABA49A', ratio:0.5, sizeCode:'s', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-708-7LGR', name: 'Matrix (Lime Green)', type: 'flake-blend', collection: 'accents',
    img_url: `${CDN}assets/images/blends/FB-708-7LGR.webp`,
    tags: ["Blue", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3F5069", "#8B98A2", "#D8D4CB", "#62757E", "#ABA49A"],
    parts: [
      { flakeId:'F1130', color:'#3F5069', ratio:0.05, sizeCode:'s', rangeMin:0.0, rangeMax:0.05, isGlitter:false },
      { flakeId:'F6621', color:'#8B98A2', ratio:0.1, sizeCode:'s', rangeMin:0.05, rangeMax:0.15, isGlitter:false },
      { flakeId:'F9959', color:'#D8D4CB', ratio:0.25, sizeCode:'s', rangeMin:0.15, rangeMax:0.4, isGlitter:false },
      { flakeId:'F9972', color:'#62757E', ratio:0.1, sizeCode:'s', rangeMin:0.4, rangeMax:0.5, isGlitter:false },
      { flakeId:'F9987', color:'#ABA49A', ratio:0.5, sizeCode:'s', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-708-8BW', name: 'Matrix (Bordeaux Wine)', type: 'flake-blend', collection: 'accents',
    img_url: `${CDN}assets/images/blends/FB-708-8BW.webp`,
    tags: ["Blue", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#3F5069", "#8B98A2", "#D8D4CB", "#62757E", "#ABA49A"],
    parts: [
      { flakeId:'F1130', color:'#3F5069', ratio:0.05, sizeCode:'s', rangeMin:0.0, rangeMax:0.05, isGlitter:false },
      { flakeId:'F6621', color:'#8B98A2', ratio:0.1, sizeCode:'s', rangeMin:0.05, rangeMax:0.15, isGlitter:false },
      { flakeId:'F9959', color:'#D8D4CB', ratio:0.25, sizeCode:'s', rangeMin:0.15, rangeMax:0.4, isGlitter:false },
      { flakeId:'F9972', color:'#62757E', ratio:0.1, sizeCode:'s', rangeMin:0.4, rangeMax:0.5, isGlitter:false },
      { flakeId:'F9987', color:'#ABA49A', ratio:0.5, sizeCode:'s', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-807-0LG', name: 'Pumicite (Light Gray)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-807-0LG.webp`,
    tags: ["Blue", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#F0EFE8", "#8B98A2", "#B8B9B5", "#CBC8C2", "#D8D4CB", "#62757E"],
    parts: [
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F6621', color:'#8B98A2', ratio:0.1, sizeCode:'s', rangeMin:0.2, rangeMax:0.3, isGlitter:false },
      { flakeId:'F9903', color:'#B8B9B5', ratio:0.2, sizeCode:'s', rangeMin:0.3, rangeMax:0.5, isGlitter:false },
      { flakeId:'F9958', color:'#CBC8C2', ratio:0.2, sizeCode:'s', rangeMin:0.5, rangeMax:0.7, isGlitter:false },
      { flakeId:'F9959', color:'#D8D4CB', ratio:0.2, sizeCode:'s', rangeMin:0.7, rangeMax:0.9, isGlitter:false },
      { flakeId:'F9972', color:'#62757E', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-807-1DG', name: 'Pumicite (Dolphin Gray)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-807-1DG.webp`,
    tags: ["Blue", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#F0EFE8", "#8B98A2", "#B8B9B5", "#CBC8C2", "#D8D4CB", "#62757E"],
    parts: [
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F6621', color:'#8B98A2', ratio:0.1, sizeCode:'s', rangeMin:0.2, rangeMax:0.3, isGlitter:false },
      { flakeId:'F9903', color:'#B8B9B5', ratio:0.2, sizeCode:'s', rangeMin:0.3, rangeMax:0.5, isGlitter:false },
      { flakeId:'F9958', color:'#CBC8C2', ratio:0.2, sizeCode:'s', rangeMin:0.5, rangeMax:0.7, isGlitter:false },
      { flakeId:'F9959', color:'#D8D4CB', ratio:0.2, sizeCode:'s', rangeMin:0.7, rangeMax:0.9, isGlitter:false },
      { flakeId:'F9972', color:'#62757E', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-807-2BL', name: 'Pumicite (Black)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-807-2BL.webp`,
    tags: ["Blue", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#F0EFE8", "#8B98A2", "#B8B9B5", "#CBC8C2", "#D8D4CB", "#62757E"],
    parts: [
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F6621', color:'#8B98A2', ratio:0.1, sizeCode:'s', rangeMin:0.2, rangeMax:0.3, isGlitter:false },
      { flakeId:'F9903', color:'#B8B9B5', ratio:0.2, sizeCode:'s', rangeMin:0.3, rangeMax:0.5, isGlitter:false },
      { flakeId:'F9958', color:'#CBC8C2', ratio:0.2, sizeCode:'s', rangeMin:0.5, rangeMax:0.7, isGlitter:false },
      { flakeId:'F9959', color:'#D8D4CB', ratio:0.2, sizeCode:'s', rangeMin:0.7, rangeMax:0.9, isGlitter:false },
      { flakeId:'F9972', color:'#62757E', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-807-3SE', name: 'Pumicite (Smokey Evening)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-807-3SE.webp`,
    tags: ["Blue", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#F0EFE8", "#8B98A2", "#B8B9B5", "#CBC8C2", "#D8D4CB", "#62757E"],
    parts: [
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F6621', color:'#8B98A2', ratio:0.1, sizeCode:'s', rangeMin:0.2, rangeMax:0.3, isGlitter:false },
      { flakeId:'F9903', color:'#B8B9B5', ratio:0.2, sizeCode:'s', rangeMin:0.3, rangeMax:0.5, isGlitter:false },
      { flakeId:'F9958', color:'#CBC8C2', ratio:0.2, sizeCode:'s', rangeMin:0.5, rangeMax:0.7, isGlitter:false },
      { flakeId:'F9959', color:'#D8D4CB', ratio:0.2, sizeCode:'s', rangeMin:0.7, rangeMax:0.9, isGlitter:false },
      { flakeId:'F9972', color:'#62757E', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-807-4OS', name: 'Pumicite (Oyster Secret)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-807-4OS.webp`,
    tags: ["Blue", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#F0EFE8", "#8B98A2", "#B8B9B5", "#CBC8C2", "#D8D4CB", "#62757E"],
    parts: [
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F6621', color:'#8B98A2', ratio:0.1, sizeCode:'s', rangeMin:0.2, rangeMax:0.3, isGlitter:false },
      { flakeId:'F9903', color:'#B8B9B5', ratio:0.2, sizeCode:'s', rangeMin:0.3, rangeMax:0.5, isGlitter:false },
      { flakeId:'F9958', color:'#CBC8C2', ratio:0.2, sizeCode:'s', rangeMin:0.5, rangeMax:0.7, isGlitter:false },
      { flakeId:'F9959', color:'#D8D4CB', ratio:0.2, sizeCode:'s', rangeMin:0.7, rangeMax:0.9, isGlitter:false },
      { flakeId:'F9972', color:'#62757E', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-807-5LM', name: 'Pumicite (Latte Macchiato)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-807-5LM.webp`,
    tags: ["Blue", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#F0EFE8", "#8B98A2", "#B8B9B5", "#CBC8C2", "#D8D4CB", "#62757E"],
    parts: [
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F6621', color:'#8B98A2', ratio:0.1, sizeCode:'s', rangeMin:0.2, rangeMax:0.3, isGlitter:false },
      { flakeId:'F9903', color:'#B8B9B5', ratio:0.2, sizeCode:'s', rangeMin:0.3, rangeMax:0.5, isGlitter:false },
      { flakeId:'F9958', color:'#CBC8C2', ratio:0.2, sizeCode:'s', rangeMin:0.5, rangeMax:0.7, isGlitter:false },
      { flakeId:'F9959', color:'#D8D4CB', ratio:0.2, sizeCode:'s', rangeMin:0.7, rangeMax:0.9, isGlitter:false },
      { flakeId:'F9972', color:'#62757E', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-807-6BB', name: 'Pumicite (Brown Beige)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-807-6BB.webp`,
    tags: ["Blue", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#F0EFE8", "#8B98A2", "#B8B9B5", "#CBC8C2", "#D8D4CB", "#62757E"],
    parts: [
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F6621', color:'#8B98A2', ratio:0.1, sizeCode:'s', rangeMin:0.2, rangeMax:0.3, isGlitter:false },
      { flakeId:'F9903', color:'#B8B9B5', ratio:0.2, sizeCode:'s', rangeMin:0.3, rangeMax:0.5, isGlitter:false },
      { flakeId:'F9958', color:'#CBC8C2', ratio:0.2, sizeCode:'s', rangeMin:0.5, rangeMax:0.7, isGlitter:false },
      { flakeId:'F9959', color:'#D8D4CB', ratio:0.2, sizeCode:'s', rangeMin:0.7, rangeMax:0.9, isGlitter:false },
      { flakeId:'F9972', color:'#62757E', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-807-7LGR', name: 'Pumicite (Lime Green)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-807-7LGR.webp`,
    tags: ["Blue", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#F0EFE8", "#8B98A2", "#B8B9B5", "#CBC8C2", "#D8D4CB", "#62757E"],
    parts: [
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F6621', color:'#8B98A2', ratio:0.1, sizeCode:'s', rangeMin:0.2, rangeMax:0.3, isGlitter:false },
      { flakeId:'F9903', color:'#B8B9B5', ratio:0.2, sizeCode:'s', rangeMin:0.3, rangeMax:0.5, isGlitter:false },
      { flakeId:'F9958', color:'#CBC8C2', ratio:0.2, sizeCode:'s', rangeMin:0.5, rangeMax:0.7, isGlitter:false },
      { flakeId:'F9959', color:'#D8D4CB', ratio:0.2, sizeCode:'s', rangeMin:0.7, rangeMax:0.9, isGlitter:false },
      { flakeId:'F9972', color:'#62757E', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-807-8BW', name: 'Pumicite (Bordeaux Wine)', type: 'flake-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/FB-807-8BW.webp`,
    tags: ["Blue", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#F0EFE8", "#8B98A2", "#B8B9B5", "#CBC8C2", "#D8D4CB", "#62757E"],
    parts: [
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'F6621', color:'#8B98A2', ratio:0.1, sizeCode:'s', rangeMin:0.2, rangeMax:0.3, isGlitter:false },
      { flakeId:'F9903', color:'#B8B9B5', ratio:0.2, sizeCode:'s', rangeMin:0.3, rangeMax:0.5, isGlitter:false },
      { flakeId:'F9958', color:'#CBC8C2', ratio:0.2, sizeCode:'s', rangeMin:0.5, rangeMax:0.7, isGlitter:false },
      { flakeId:'F9959', color:'#D8D4CB', ratio:0.2, sizeCode:'s', rangeMin:0.7, rangeMax:0.9, isGlitter:false },
      { flakeId:'F9972', color:'#62757E', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-960-0LG', name: 'Chestnut (Light Gray)', type: 'flake-blend', collection: 'garage',
    img_url: `${CDN}assets/images/blends/FB-960-0LG.webp`,
    tags: ["Black", "Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#6F5E56", "#B79878", "#E6DFCC", "#F0EFE8", "#A28568", "#3C3C3C"],
    parts: [
      { flakeId:'F1060', color:'#6F5E56', ratio:0.1, sizeCode:'s', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'F1320', color:'#B79878', ratio:0.2, sizeCode:'s', rangeMin:0.1, rangeMax:0.3, isGlitter:false },
      { flakeId:'F9986', color:'#E6DFCC', ratio:0.2, sizeCode:'s', rangeMin:0.3, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.5, rangeMax:0.7, isGlitter:false },
      { flakeId:'F6607', color:'#A28568', ratio:0.2, sizeCode:'s', rangeMin:0.7, rangeMax:0.9, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-960-1DG', name: 'Chestnut (Dolphin Gray)', type: 'flake-blend', collection: 'garage',
    img_url: `${CDN}assets/images/blends/FB-960-1DG.webp`,
    tags: ["Black", "Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#6F5E56", "#B79878", "#E6DFCC", "#F0EFE8", "#A28568", "#3C3C3C"],
    parts: [
      { flakeId:'F1060', color:'#6F5E56', ratio:0.1, sizeCode:'s', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'F1320', color:'#B79878', ratio:0.2, sizeCode:'s', rangeMin:0.1, rangeMax:0.3, isGlitter:false },
      { flakeId:'F9986', color:'#E6DFCC', ratio:0.2, sizeCode:'s', rangeMin:0.3, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.5, rangeMax:0.7, isGlitter:false },
      { flakeId:'F6607', color:'#A28568', ratio:0.2, sizeCode:'s', rangeMin:0.7, rangeMax:0.9, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-960-2BL', name: 'Chestnut (Black)', type: 'flake-blend', collection: 'garage',
    img_url: `${CDN}assets/images/blends/FB-960-2BL.webp`,
    tags: ["Black", "Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#6F5E56", "#B79878", "#E6DFCC", "#F0EFE8", "#A28568", "#3C3C3C"],
    parts: [
      { flakeId:'F1060', color:'#6F5E56', ratio:0.1, sizeCode:'s', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'F1320', color:'#B79878', ratio:0.2, sizeCode:'s', rangeMin:0.1, rangeMax:0.3, isGlitter:false },
      { flakeId:'F9986', color:'#E6DFCC', ratio:0.2, sizeCode:'s', rangeMin:0.3, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.5, rangeMax:0.7, isGlitter:false },
      { flakeId:'F6607', color:'#A28568', ratio:0.2, sizeCode:'s', rangeMin:0.7, rangeMax:0.9, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-960-3SE', name: 'Chestnut (Smokey Evening)', type: 'flake-blend', collection: 'garage',
    img_url: `${CDN}assets/images/blends/FB-960-3SE.webp`,
    tags: ["Black", "Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#6F5E56", "#B79878", "#E6DFCC", "#F0EFE8", "#A28568", "#3C3C3C"],
    parts: [
      { flakeId:'F1060', color:'#6F5E56', ratio:0.1, sizeCode:'s', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'F1320', color:'#B79878', ratio:0.2, sizeCode:'s', rangeMin:0.1, rangeMax:0.3, isGlitter:false },
      { flakeId:'F9986', color:'#E6DFCC', ratio:0.2, sizeCode:'s', rangeMin:0.3, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.5, rangeMax:0.7, isGlitter:false },
      { flakeId:'F6607', color:'#A28568', ratio:0.2, sizeCode:'s', rangeMin:0.7, rangeMax:0.9, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-960-4OS', name: 'Chestnut (Oyster Secret)', type: 'flake-blend', collection: 'garage',
    img_url: `${CDN}assets/images/blends/FB-960-4OS.webp`,
    tags: ["Black", "Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#6F5E56", "#B79878", "#E6DFCC", "#F0EFE8", "#A28568", "#3C3C3C"],
    parts: [
      { flakeId:'F1060', color:'#6F5E56', ratio:0.1, sizeCode:'s', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'F1320', color:'#B79878', ratio:0.2, sizeCode:'s', rangeMin:0.1, rangeMax:0.3, isGlitter:false },
      { flakeId:'F9986', color:'#E6DFCC', ratio:0.2, sizeCode:'s', rangeMin:0.3, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.5, rangeMax:0.7, isGlitter:false },
      { flakeId:'F6607', color:'#A28568', ratio:0.2, sizeCode:'s', rangeMin:0.7, rangeMax:0.9, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-960-5LM', name: 'Chestnut (Latte Macchiato)', type: 'flake-blend', collection: 'garage',
    img_url: `${CDN}assets/images/blends/FB-960-5LM.webp`,
    tags: ["Black", "Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#6F5E56", "#B79878", "#E6DFCC", "#F0EFE8", "#A28568", "#3C3C3C"],
    parts: [
      { flakeId:'F1060', color:'#6F5E56', ratio:0.1, sizeCode:'s', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'F1320', color:'#B79878', ratio:0.2, sizeCode:'s', rangeMin:0.1, rangeMax:0.3, isGlitter:false },
      { flakeId:'F9986', color:'#E6DFCC', ratio:0.2, sizeCode:'s', rangeMin:0.3, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.5, rangeMax:0.7, isGlitter:false },
      { flakeId:'F6607', color:'#A28568', ratio:0.2, sizeCode:'s', rangeMin:0.7, rangeMax:0.9, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-960-6BB', name: 'Chestnut (Brown Beige)', type: 'flake-blend', collection: 'garage',
    img_url: `${CDN}assets/images/blends/FB-960-6BB.webp`,
    tags: ["Black", "Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#6F5E56", "#B79878", "#E6DFCC", "#F0EFE8", "#A28568", "#3C3C3C"],
    parts: [
      { flakeId:'F1060', color:'#6F5E56', ratio:0.1, sizeCode:'s', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'F1320', color:'#B79878', ratio:0.2, sizeCode:'s', rangeMin:0.1, rangeMax:0.3, isGlitter:false },
      { flakeId:'F9986', color:'#E6DFCC', ratio:0.2, sizeCode:'s', rangeMin:0.3, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.5, rangeMax:0.7, isGlitter:false },
      { flakeId:'F6607', color:'#A28568', ratio:0.2, sizeCode:'s', rangeMin:0.7, rangeMax:0.9, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-960-7LGR', name: 'Chestnut (Lime Green)', type: 'flake-blend', collection: 'garage',
    img_url: `${CDN}assets/images/blends/FB-960-7LGR.webp`,
    tags: ["Black", "Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#6F5E56", "#B79878", "#E6DFCC", "#F0EFE8", "#A28568", "#3C3C3C"],
    parts: [
      { flakeId:'F1060', color:'#6F5E56', ratio:0.1, sizeCode:'s', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'F1320', color:'#B79878', ratio:0.2, sizeCode:'s', rangeMin:0.1, rangeMax:0.3, isGlitter:false },
      { flakeId:'F9986', color:'#E6DFCC', ratio:0.2, sizeCode:'s', rangeMin:0.3, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.5, rangeMax:0.7, isGlitter:false },
      { flakeId:'F6607', color:'#A28568', ratio:0.2, sizeCode:'s', rangeMin:0.7, rangeMax:0.9, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'FB-960-8BW', name: 'Chestnut (Bordeaux Wine)', type: 'flake-blend', collection: 'garage',
    img_url: `${CDN}assets/images/blends/FB-960-8BW.webp`,
    tags: ["Black", "Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#6F5E56", "#B79878", "#E6DFCC", "#F0EFE8", "#A28568", "#3C3C3C"],
    parts: [
      { flakeId:'F1060', color:'#6F5E56', ratio:0.1, sizeCode:'s', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'F1320', color:'#B79878', ratio:0.2, sizeCode:'s', rangeMin:0.1, rangeMax:0.3, isGlitter:false },
      { flakeId:'F9986', color:'#E6DFCC', ratio:0.2, sizeCode:'s', rangeMin:0.3, rangeMax:0.5, isGlitter:false },
      { flakeId:'F1820', color:'#F0EFE8', ratio:0.2, sizeCode:'s', rangeMin:0.5, rangeMax:0.7, isGlitter:false },
      { flakeId:'F6607', color:'#A28568', ratio:0.2, sizeCode:'s', rangeMin:0.7, rangeMax:0.9, isGlitter:false },
      { flakeId:'F1050', color:'#3C3C3C', ratio:0.1, sizeCode:'s', rangeMin:0.9, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB032-25A-0LG', name: 'Ledgestone (Light Gray)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB032-25A-0LG.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.1, sizeCode:'l', rangeMin:0.1, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.8, sizeCode:'l', rangeMin:0.2, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB032-25A-1DG', name: 'Ledgestone (Dolphin Gray)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB032-25A-1DG.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.1, sizeCode:'l', rangeMin:0.1, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.8, sizeCode:'l', rangeMin:0.2, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB032-25A-2BL', name: 'Ledgestone (Black)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB032-25A-2BL.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.1, sizeCode:'l', rangeMin:0.1, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.8, sizeCode:'l', rangeMin:0.2, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB032-25A-3SE', name: 'Ledgestone (Smokey Evening)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB032-25A-3SE.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.1, sizeCode:'l', rangeMin:0.1, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.8, sizeCode:'l', rangeMin:0.2, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB032-25A-4OS', name: 'Ledgestone (Oyster Secret)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB032-25A-4OS.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.1, sizeCode:'l', rangeMin:0.1, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.8, sizeCode:'l', rangeMin:0.2, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB032-25A-5LM', name: 'Ledgestone (Latte Macchiato)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB032-25A-5LM.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.1, sizeCode:'l', rangeMin:0.1, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.8, sizeCode:'l', rangeMin:0.2, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB032-25A-6BB', name: 'Ledgestone (Brown Beige)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB032-25A-6BB.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.1, sizeCode:'l', rangeMin:0.1, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.8, sizeCode:'l', rangeMin:0.2, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB032-25A-7LGR', name: 'Ledgestone (Lime Green)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB032-25A-7LGR.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.1, sizeCode:'l', rangeMin:0.1, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.8, sizeCode:'l', rangeMin:0.2, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB032-25A-8BW', name: 'Ledgestone (Bordeaux Wine)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB032-25A-8BW.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.1, sizeCode:'l', rangeMin:0.1, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.8, sizeCode:'l', rangeMin:0.2, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB033-25A-0LG', name: 'Prairie (Light Gray)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB033-25A-0LG.webp`,
    tags: ["Black", "Dark", "Light", "Purple", "White"],
    hex_colors: ["#333132", "#9C8C91", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1810', color:'#9C8C91', ratio:0.3, sizeCode:'l', rangeMin:0.1, rangeMax:0.4, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.6, sizeCode:'l', rangeMin:0.4, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB033-25A-1DG', name: 'Prairie (Dolphin Gray)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB033-25A-1DG.webp`,
    tags: ["Black", "Dark", "Light", "Purple", "White"],
    hex_colors: ["#333132", "#9C8C91", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1810', color:'#9C8C91', ratio:0.3, sizeCode:'l', rangeMin:0.1, rangeMax:0.4, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.6, sizeCode:'l', rangeMin:0.4, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB033-25A-2BL', name: 'Prairie (Black)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB033-25A-2BL.webp`,
    tags: ["Black", "Dark", "Light", "Purple", "White"],
    hex_colors: ["#333132", "#9C8C91", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1810', color:'#9C8C91', ratio:0.3, sizeCode:'l', rangeMin:0.1, rangeMax:0.4, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.6, sizeCode:'l', rangeMin:0.4, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB033-25A-3SE', name: 'Prairie (Smokey Evening)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB033-25A-3SE.webp`,
    tags: ["Black", "Dark", "Light", "Purple", "White"],
    hex_colors: ["#333132", "#9C8C91", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1810', color:'#9C8C91', ratio:0.3, sizeCode:'l', rangeMin:0.1, rangeMax:0.4, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.6, sizeCode:'l', rangeMin:0.4, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB033-25A-4OS', name: 'Prairie (Oyster Secret)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB033-25A-4OS.webp`,
    tags: ["Black", "Dark", "Light", "Purple", "White"],
    hex_colors: ["#333132", "#9C8C91", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1810', color:'#9C8C91', ratio:0.3, sizeCode:'l', rangeMin:0.1, rangeMax:0.4, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.6, sizeCode:'l', rangeMin:0.4, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB033-25A-5LM', name: 'Prairie (Latte Macchiato)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB033-25A-5LM.webp`,
    tags: ["Black", "Dark", "Light", "Purple", "White"],
    hex_colors: ["#333132", "#9C8C91", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1810', color:'#9C8C91', ratio:0.3, sizeCode:'l', rangeMin:0.1, rangeMax:0.4, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.6, sizeCode:'l', rangeMin:0.4, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB033-25A-6BB', name: 'Prairie (Brown Beige)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB033-25A-6BB.webp`,
    tags: ["Black", "Dark", "Light", "Purple", "White"],
    hex_colors: ["#333132", "#9C8C91", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1810', color:'#9C8C91', ratio:0.3, sizeCode:'l', rangeMin:0.1, rangeMax:0.4, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.6, sizeCode:'l', rangeMin:0.4, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB033-25A-7LGR', name: 'Prairie (Lime Green)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB033-25A-7LGR.webp`,
    tags: ["Black", "Dark", "Light", "Purple", "White"],
    hex_colors: ["#333132", "#9C8C91", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1810', color:'#9C8C91', ratio:0.3, sizeCode:'l', rangeMin:0.1, rangeMax:0.4, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.6, sizeCode:'l', rangeMin:0.4, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB033-25A-8BW', name: 'Prairie (Bordeaux Wine)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB033-25A-8BW.webp`,
    tags: ["Black", "Dark", "Light", "Purple", "White"],
    hex_colors: ["#333132", "#9C8C91", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1810', color:'#9C8C91', ratio:0.3, sizeCode:'l', rangeMin:0.1, rangeMax:0.4, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.6, sizeCode:'l', rangeMin:0.4, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB038-40S-0LG', name: 'Bedrock (Light Gray)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB038-40S-0LG.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#C2C4C6", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1330', color:'#C2C4C6', ratio:0.5, sizeCode:'l', rangeMin:0.1, rangeMax:0.6, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.4, sizeCode:'l', rangeMin:0.6, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB038-40S-1DG', name: 'Bedrock (Dolphin Gray)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB038-40S-1DG.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#C2C4C6", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1330', color:'#C2C4C6', ratio:0.5, sizeCode:'l', rangeMin:0.1, rangeMax:0.6, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.4, sizeCode:'l', rangeMin:0.6, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB038-40S-2BL', name: 'Bedrock (Black)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB038-40S-2BL.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#C2C4C6", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1330', color:'#C2C4C6', ratio:0.5, sizeCode:'l', rangeMin:0.1, rangeMax:0.6, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.4, sizeCode:'l', rangeMin:0.6, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB038-40S-3SE', name: 'Bedrock (Smokey Evening)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB038-40S-3SE.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#C2C4C6", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1330', color:'#C2C4C6', ratio:0.5, sizeCode:'l', rangeMin:0.1, rangeMax:0.6, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.4, sizeCode:'l', rangeMin:0.6, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB038-40S-4OS', name: 'Bedrock (Oyster Secret)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB038-40S-4OS.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#C2C4C6", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1330', color:'#C2C4C6', ratio:0.5, sizeCode:'l', rangeMin:0.1, rangeMax:0.6, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.4, sizeCode:'l', rangeMin:0.6, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB038-40S-5LM', name: 'Bedrock (Latte Macchiato)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB038-40S-5LM.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#C2C4C6", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1330', color:'#C2C4C6', ratio:0.5, sizeCode:'l', rangeMin:0.1, rangeMax:0.6, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.4, sizeCode:'l', rangeMin:0.6, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB038-40S-6BB', name: 'Bedrock (Brown Beige)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB038-40S-6BB.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#C2C4C6", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1330', color:'#C2C4C6', ratio:0.5, sizeCode:'l', rangeMin:0.1, rangeMax:0.6, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.4, sizeCode:'l', rangeMin:0.6, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB038-40S-7LGR', name: 'Bedrock (Lime Green)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB038-40S-7LGR.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#C2C4C6", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1330', color:'#C2C4C6', ratio:0.5, sizeCode:'l', rangeMin:0.1, rangeMax:0.6, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.4, sizeCode:'l', rangeMin:0.6, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB038-40S-8BW', name: 'Bedrock (Bordeaux Wine)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB038-40S-8BW.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#C2C4C6", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1330', color:'#C2C4C6', ratio:0.5, sizeCode:'l', rangeMin:0.1, rangeMax:0.6, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.4, sizeCode:'l', rangeMin:0.6, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB042-40S-0LG', name: 'Conifer (Light Gray)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB042-40S-0LG.webp`,
    tags: ["Black", "Bright", "Dark", "Green", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#C2C4C6", "#409542", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.090909, sizeCode:'l', rangeMin:0.0, rangeMax:0.090909, isGlitter:false },
      { flakeId:'Q1330', color:'#C2C4C6', ratio:0.363636, sizeCode:'l', rangeMin:0.090909, rangeMax:0.454545, isGlitter:false },
      { flakeId:'Q1420', color:'#409542', ratio:0.363636, sizeCode:'l', rangeMin:0.454545, rangeMax:0.818182, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.181818, sizeCode:'l', rangeMin:0.818182, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB042-40S-1DG', name: 'Conifer (Dolphin Gray)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB042-40S-1DG.webp`,
    tags: ["Black", "Bright", "Dark", "Green", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#C2C4C6", "#409542", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.090909, sizeCode:'l', rangeMin:0.0, rangeMax:0.090909, isGlitter:false },
      { flakeId:'Q1330', color:'#C2C4C6', ratio:0.363636, sizeCode:'l', rangeMin:0.090909, rangeMax:0.454545, isGlitter:false },
      { flakeId:'Q1420', color:'#409542', ratio:0.363636, sizeCode:'l', rangeMin:0.454545, rangeMax:0.818182, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.181818, sizeCode:'l', rangeMin:0.818182, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB042-40S-2BL', name: 'Conifer (Black)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB042-40S-2BL.webp`,
    tags: ["Black", "Bright", "Dark", "Green", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#C2C4C6", "#409542", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.090909, sizeCode:'l', rangeMin:0.0, rangeMax:0.090909, isGlitter:false },
      { flakeId:'Q1330', color:'#C2C4C6', ratio:0.363636, sizeCode:'l', rangeMin:0.090909, rangeMax:0.454545, isGlitter:false },
      { flakeId:'Q1420', color:'#409542', ratio:0.363636, sizeCode:'l', rangeMin:0.454545, rangeMax:0.818182, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.181818, sizeCode:'l', rangeMin:0.818182, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB042-40S-3SE', name: 'Conifer (Smokey Evening)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB042-40S-3SE.webp`,
    tags: ["Black", "Bright", "Dark", "Green", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#C2C4C6", "#409542", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.090909, sizeCode:'l', rangeMin:0.0, rangeMax:0.090909, isGlitter:false },
      { flakeId:'Q1330', color:'#C2C4C6', ratio:0.363636, sizeCode:'l', rangeMin:0.090909, rangeMax:0.454545, isGlitter:false },
      { flakeId:'Q1420', color:'#409542', ratio:0.363636, sizeCode:'l', rangeMin:0.454545, rangeMax:0.818182, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.181818, sizeCode:'l', rangeMin:0.818182, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB042-40S-4OS', name: 'Conifer (Oyster Secret)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB042-40S-4OS.webp`,
    tags: ["Black", "Bright", "Dark", "Green", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#C2C4C6", "#409542", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.090909, sizeCode:'l', rangeMin:0.0, rangeMax:0.090909, isGlitter:false },
      { flakeId:'Q1330', color:'#C2C4C6', ratio:0.363636, sizeCode:'l', rangeMin:0.090909, rangeMax:0.454545, isGlitter:false },
      { flakeId:'Q1420', color:'#409542', ratio:0.363636, sizeCode:'l', rangeMin:0.454545, rangeMax:0.818182, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.181818, sizeCode:'l', rangeMin:0.818182, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB042-40S-5LM', name: 'Conifer (Latte Macchiato)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB042-40S-5LM.webp`,
    tags: ["Black", "Bright", "Dark", "Green", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#C2C4C6", "#409542", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.090909, sizeCode:'l', rangeMin:0.0, rangeMax:0.090909, isGlitter:false },
      { flakeId:'Q1330', color:'#C2C4C6', ratio:0.363636, sizeCode:'l', rangeMin:0.090909, rangeMax:0.454545, isGlitter:false },
      { flakeId:'Q1420', color:'#409542', ratio:0.363636, sizeCode:'l', rangeMin:0.454545, rangeMax:0.818182, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.181818, sizeCode:'l', rangeMin:0.818182, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB042-40S-6BB', name: 'Conifer (Brown Beige)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB042-40S-6BB.webp`,
    tags: ["Black", "Bright", "Dark", "Green", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#C2C4C6", "#409542", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.090909, sizeCode:'l', rangeMin:0.0, rangeMax:0.090909, isGlitter:false },
      { flakeId:'Q1330', color:'#C2C4C6', ratio:0.363636, sizeCode:'l', rangeMin:0.090909, rangeMax:0.454545, isGlitter:false },
      { flakeId:'Q1420', color:'#409542', ratio:0.363636, sizeCode:'l', rangeMin:0.454545, rangeMax:0.818182, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.181818, sizeCode:'l', rangeMin:0.818182, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB042-40S-7LGR', name: 'Conifer (Lime Green)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB042-40S-7LGR.webp`,
    tags: ["Black", "Bright", "Dark", "Green", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#C2C4C6", "#409542", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.090909, sizeCode:'l', rangeMin:0.0, rangeMax:0.090909, isGlitter:false },
      { flakeId:'Q1330', color:'#C2C4C6', ratio:0.363636, sizeCode:'l', rangeMin:0.090909, rangeMax:0.454545, isGlitter:false },
      { flakeId:'Q1420', color:'#409542', ratio:0.363636, sizeCode:'l', rangeMin:0.454545, rangeMax:0.818182, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.181818, sizeCode:'l', rangeMin:0.818182, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB042-40S-8BW', name: 'Conifer (Bordeaux Wine)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB042-40S-8BW.webp`,
    tags: ["Black", "Bright", "Dark", "Green", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#C2C4C6", "#409542", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.090909, sizeCode:'l', rangeMin:0.0, rangeMax:0.090909, isGlitter:false },
      { flakeId:'Q1330', color:'#C2C4C6', ratio:0.363636, sizeCode:'l', rangeMin:0.090909, rangeMax:0.454545, isGlitter:false },
      { flakeId:'Q1420', color:'#409542', ratio:0.363636, sizeCode:'l', rangeMin:0.454545, rangeMax:0.818182, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.181818, sizeCode:'l', rangeMin:0.818182, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB034-40S-0LG', name: 'Gneiss (Light Gray)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB034-40S-0LG.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.2, sizeCode:'l', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.4, sizeCode:'l', rangeMin:0.2, rangeMax:0.6, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.4, sizeCode:'l', rangeMin:0.6, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB034-40S-1DG', name: 'Gneiss (Dolphin Gray)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB034-40S-1DG.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.2, sizeCode:'l', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.4, sizeCode:'l', rangeMin:0.2, rangeMax:0.6, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.4, sizeCode:'l', rangeMin:0.6, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB034-40S-2BL', name: 'Gneiss (Black)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB034-40S-2BL.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.2, sizeCode:'l', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.4, sizeCode:'l', rangeMin:0.2, rangeMax:0.6, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.4, sizeCode:'l', rangeMin:0.6, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB034-40S-3SE', name: 'Gneiss (Smokey Evening)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB034-40S-3SE.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.2, sizeCode:'l', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.4, sizeCode:'l', rangeMin:0.2, rangeMax:0.6, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.4, sizeCode:'l', rangeMin:0.6, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB034-40S-4OS', name: 'Gneiss (Oyster Secret)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB034-40S-4OS.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.2, sizeCode:'l', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.4, sizeCode:'l', rangeMin:0.2, rangeMax:0.6, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.4, sizeCode:'l', rangeMin:0.6, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB034-40S-5LM', name: 'Gneiss (Latte Macchiato)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB034-40S-5LM.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.2, sizeCode:'l', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.4, sizeCode:'l', rangeMin:0.2, rangeMax:0.6, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.4, sizeCode:'l', rangeMin:0.6, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB034-40S-6BB', name: 'Gneiss (Brown Beige)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB034-40S-6BB.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.2, sizeCode:'l', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.4, sizeCode:'l', rangeMin:0.2, rangeMax:0.6, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.4, sizeCode:'l', rangeMin:0.6, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB034-40S-7LGR', name: 'Gneiss (Lime Green)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB034-40S-7LGR.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.2, sizeCode:'l', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.4, sizeCode:'l', rangeMin:0.2, rangeMax:0.6, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.4, sizeCode:'l', rangeMin:0.6, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB034-40S-8BW', name: 'Gneiss (Bordeaux Wine)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB034-40S-8BW.webp`,
    tags: ["Black", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#333132", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1020', color:'#333132', ratio:0.2, sizeCode:'l', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.4, sizeCode:'l', rangeMin:0.2, rangeMax:0.6, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.4, sizeCode:'l', rangeMin:0.6, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB041-25A-0LG', name: 'Bluestone (Light Gray)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB041-25A-0LG.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#005DAC", "#C2C4C6", "#F8F8F9", "#333132"],
    parts: [
      { flakeId:'Q1110', color:'#005DAC', ratio:0.363726, sizeCode:'l', rangeMin:0.0, rangeMax:0.363726, isGlitter:false },
      { flakeId:'Q1330', color:'#C2C4C6', ratio:0.212091, sizeCode:'l', rangeMin:0.363726, rangeMax:0.575818, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.353816, sizeCode:'l', rangeMin:0.575818, rangeMax:0.929633, isGlitter:false },
      { flakeId:'Q1020', color:'#333132', ratio:0.070367, sizeCode:'l', rangeMin:0.929633, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB041-25A-1DG', name: 'Bluestone (Dolphin Gray)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB041-25A-1DG.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#005DAC", "#C2C4C6", "#F8F8F9", "#333132"],
    parts: [
      { flakeId:'Q1110', color:'#005DAC', ratio:0.363726, sizeCode:'l', rangeMin:0.0, rangeMax:0.363726, isGlitter:false },
      { flakeId:'Q1330', color:'#C2C4C6', ratio:0.212091, sizeCode:'l', rangeMin:0.363726, rangeMax:0.575818, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.353816, sizeCode:'l', rangeMin:0.575818, rangeMax:0.929633, isGlitter:false },
      { flakeId:'Q1020', color:'#333132', ratio:0.070367, sizeCode:'l', rangeMin:0.929633, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB041-25A-2BL', name: 'Bluestone (Black)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB041-25A-2BL.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#005DAC", "#C2C4C6", "#F8F8F9", "#333132"],
    parts: [
      { flakeId:'Q1110', color:'#005DAC', ratio:0.363726, sizeCode:'l', rangeMin:0.0, rangeMax:0.363726, isGlitter:false },
      { flakeId:'Q1330', color:'#C2C4C6', ratio:0.212091, sizeCode:'l', rangeMin:0.363726, rangeMax:0.575818, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.353816, sizeCode:'l', rangeMin:0.575818, rangeMax:0.929633, isGlitter:false },
      { flakeId:'Q1020', color:'#333132', ratio:0.070367, sizeCode:'l', rangeMin:0.929633, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB041-25A-3SE', name: 'Bluestone (Smokey Evening)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB041-25A-3SE.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#005DAC", "#C2C4C6", "#F8F8F9", "#333132"],
    parts: [
      { flakeId:'Q1110', color:'#005DAC', ratio:0.363726, sizeCode:'l', rangeMin:0.0, rangeMax:0.363726, isGlitter:false },
      { flakeId:'Q1330', color:'#C2C4C6', ratio:0.212091, sizeCode:'l', rangeMin:0.363726, rangeMax:0.575818, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.353816, sizeCode:'l', rangeMin:0.575818, rangeMax:0.929633, isGlitter:false },
      { flakeId:'Q1020', color:'#333132', ratio:0.070367, sizeCode:'l', rangeMin:0.929633, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB041-25A-4OS', name: 'Bluestone (Oyster Secret)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB041-25A-4OS.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#005DAC", "#C2C4C6", "#F8F8F9", "#333132"],
    parts: [
      { flakeId:'Q1110', color:'#005DAC', ratio:0.363726, sizeCode:'l', rangeMin:0.0, rangeMax:0.363726, isGlitter:false },
      { flakeId:'Q1330', color:'#C2C4C6', ratio:0.212091, sizeCode:'l', rangeMin:0.363726, rangeMax:0.575818, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.353816, sizeCode:'l', rangeMin:0.575818, rangeMax:0.929633, isGlitter:false },
      { flakeId:'Q1020', color:'#333132', ratio:0.070367, sizeCode:'l', rangeMin:0.929633, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB041-25A-5LM', name: 'Bluestone (Latte Macchiato)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB041-25A-5LM.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#005DAC", "#C2C4C6", "#F8F8F9", "#333132"],
    parts: [
      { flakeId:'Q1110', color:'#005DAC', ratio:0.363726, sizeCode:'l', rangeMin:0.0, rangeMax:0.363726, isGlitter:false },
      { flakeId:'Q1330', color:'#C2C4C6', ratio:0.212091, sizeCode:'l', rangeMin:0.363726, rangeMax:0.575818, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.353816, sizeCode:'l', rangeMin:0.575818, rangeMax:0.929633, isGlitter:false },
      { flakeId:'Q1020', color:'#333132', ratio:0.070367, sizeCode:'l', rangeMin:0.929633, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB041-25A-6BB', name: 'Bluestone (Brown Beige)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB041-25A-6BB.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#005DAC", "#C2C4C6", "#F8F8F9", "#333132"],
    parts: [
      { flakeId:'Q1110', color:'#005DAC', ratio:0.363726, sizeCode:'l', rangeMin:0.0, rangeMax:0.363726, isGlitter:false },
      { flakeId:'Q1330', color:'#C2C4C6', ratio:0.212091, sizeCode:'l', rangeMin:0.363726, rangeMax:0.575818, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.353816, sizeCode:'l', rangeMin:0.575818, rangeMax:0.929633, isGlitter:false },
      { flakeId:'Q1020', color:'#333132', ratio:0.070367, sizeCode:'l', rangeMin:0.929633, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB041-25A-7LGR', name: 'Bluestone (Lime Green)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB041-25A-7LGR.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#005DAC", "#C2C4C6", "#F8F8F9", "#333132"],
    parts: [
      { flakeId:'Q1110', color:'#005DAC', ratio:0.363726, sizeCode:'l', rangeMin:0.0, rangeMax:0.363726, isGlitter:false },
      { flakeId:'Q1330', color:'#C2C4C6', ratio:0.212091, sizeCode:'l', rangeMin:0.363726, rangeMax:0.575818, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.353816, sizeCode:'l', rangeMin:0.575818, rangeMax:0.929633, isGlitter:false },
      { flakeId:'Q1020', color:'#333132', ratio:0.070367, sizeCode:'l', rangeMin:0.929633, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB041-25A-8BW', name: 'Bluestone (Bordeaux Wine)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB041-25A-8BW.webp`,
    tags: ["Black", "Blue", "Bright", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#005DAC", "#C2C4C6", "#F8F8F9", "#333132"],
    parts: [
      { flakeId:'Q1110', color:'#005DAC', ratio:0.363726, sizeCode:'l', rangeMin:0.0, rangeMax:0.363726, isGlitter:false },
      { flakeId:'Q1330', color:'#C2C4C6', ratio:0.212091, sizeCode:'l', rangeMin:0.363726, rangeMax:0.575818, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.353816, sizeCode:'l', rangeMin:0.575818, rangeMax:0.929633, isGlitter:false },
      { flakeId:'Q1020', color:'#333132', ratio:0.070367, sizeCode:'l', rangeMin:0.929633, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB035-40S-0LG', name: 'Jasper (Light Gray)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB035-40S-0LG.webp`,
    tags: ["Blue", "Bright", "Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#005DAC", "#5D463A", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1110', color:'#005DAC', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1270', color:'#5D463A', ratio:0.2, sizeCode:'l', rangeMin:0.1, rangeMax:0.3, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.2, sizeCode:'l', rangeMin:0.3, rangeMax:0.5, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.5, sizeCode:'l', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB035-40S-1DG', name: 'Jasper (Dolphin Gray)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB035-40S-1DG.webp`,
    tags: ["Blue", "Bright", "Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#005DAC", "#5D463A", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1110', color:'#005DAC', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1270', color:'#5D463A', ratio:0.2, sizeCode:'l', rangeMin:0.1, rangeMax:0.3, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.2, sizeCode:'l', rangeMin:0.3, rangeMax:0.5, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.5, sizeCode:'l', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB035-40S-2BL', name: 'Jasper (Black)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB035-40S-2BL.webp`,
    tags: ["Blue", "Bright", "Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#005DAC", "#5D463A", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1110', color:'#005DAC', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1270', color:'#5D463A', ratio:0.2, sizeCode:'l', rangeMin:0.1, rangeMax:0.3, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.2, sizeCode:'l', rangeMin:0.3, rangeMax:0.5, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.5, sizeCode:'l', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB035-40S-3SE', name: 'Jasper (Smokey Evening)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB035-40S-3SE.webp`,
    tags: ["Blue", "Bright", "Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#005DAC", "#5D463A", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1110', color:'#005DAC', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1270', color:'#5D463A', ratio:0.2, sizeCode:'l', rangeMin:0.1, rangeMax:0.3, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.2, sizeCode:'l', rangeMin:0.3, rangeMax:0.5, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.5, sizeCode:'l', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB035-40S-4OS', name: 'Jasper (Oyster Secret)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB035-40S-4OS.webp`,
    tags: ["Blue", "Bright", "Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#005DAC", "#5D463A", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1110', color:'#005DAC', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1270', color:'#5D463A', ratio:0.2, sizeCode:'l', rangeMin:0.1, rangeMax:0.3, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.2, sizeCode:'l', rangeMin:0.3, rangeMax:0.5, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.5, sizeCode:'l', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB035-40S-5LM', name: 'Jasper (Latte Macchiato)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB035-40S-5LM.webp`,
    tags: ["Blue", "Bright", "Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#005DAC", "#5D463A", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1110', color:'#005DAC', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1270', color:'#5D463A', ratio:0.2, sizeCode:'l', rangeMin:0.1, rangeMax:0.3, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.2, sizeCode:'l', rangeMin:0.3, rangeMax:0.5, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.5, sizeCode:'l', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB035-40S-6BB', name: 'Jasper (Brown Beige)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB035-40S-6BB.webp`,
    tags: ["Blue", "Bright", "Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#005DAC", "#5D463A", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1110', color:'#005DAC', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1270', color:'#5D463A', ratio:0.2, sizeCode:'l', rangeMin:0.1, rangeMax:0.3, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.2, sizeCode:'l', rangeMin:0.3, rangeMax:0.5, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.5, sizeCode:'l', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB035-40S-7LGR', name: 'Jasper (Lime Green)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB035-40S-7LGR.webp`,
    tags: ["Blue", "Bright", "Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#005DAC", "#5D463A", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1110', color:'#005DAC', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1270', color:'#5D463A', ratio:0.2, sizeCode:'l', rangeMin:0.1, rangeMax:0.3, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.2, sizeCode:'l', rangeMin:0.3, rangeMax:0.5, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.5, sizeCode:'l', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB035-40S-8BW', name: 'Jasper (Bordeaux Wine)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB035-40S-8BW.webp`,
    tags: ["Blue", "Bright", "Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#005DAC", "#5D463A", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1110', color:'#005DAC', ratio:0.1, sizeCode:'l', rangeMin:0.0, rangeMax:0.1, isGlitter:false },
      { flakeId:'Q1270', color:'#5D463A', ratio:0.2, sizeCode:'l', rangeMin:0.1, rangeMax:0.3, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.2, sizeCode:'l', rangeMin:0.3, rangeMax:0.5, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.5, sizeCode:'l', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB037-40S-0LG', name: 'Dune (Light Gray)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB037-40S-0LG.webp`,
    tags: ["Brown", "Light", "Neutral", "Pink", "White"],
    hex_colors: ["#D9C499", "#EFE6E3", "#F8F8F9"],
    parts: [
      { flakeId:'Q1240', color:'#D9C499', ratio:0.2, sizeCode:'l', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1630', color:'#EFE6E3', ratio:0.2, sizeCode:'l', rangeMin:0.2, rangeMax:0.4, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.6, sizeCode:'l', rangeMin:0.4, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB037-40S-1DG', name: 'Dune (Dolphin Gray)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB037-40S-1DG.webp`,
    tags: ["Brown", "Light", "Neutral", "Pink", "White"],
    hex_colors: ["#D9C499", "#EFE6E3", "#F8F8F9"],
    parts: [
      { flakeId:'Q1240', color:'#D9C499', ratio:0.2, sizeCode:'l', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1630', color:'#EFE6E3', ratio:0.2, sizeCode:'l', rangeMin:0.2, rangeMax:0.4, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.6, sizeCode:'l', rangeMin:0.4, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB037-40S-2BL', name: 'Dune (Black)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB037-40S-2BL.webp`,
    tags: ["Brown", "Light", "Neutral", "Pink", "White"],
    hex_colors: ["#D9C499", "#EFE6E3", "#F8F8F9"],
    parts: [
      { flakeId:'Q1240', color:'#D9C499', ratio:0.2, sizeCode:'l', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1630', color:'#EFE6E3', ratio:0.2, sizeCode:'l', rangeMin:0.2, rangeMax:0.4, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.6, sizeCode:'l', rangeMin:0.4, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB037-40S-3SE', name: 'Dune (Smokey Evening)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB037-40S-3SE.webp`,
    tags: ["Brown", "Light", "Neutral", "Pink", "White"],
    hex_colors: ["#D9C499", "#EFE6E3", "#F8F8F9"],
    parts: [
      { flakeId:'Q1240', color:'#D9C499', ratio:0.2, sizeCode:'l', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1630', color:'#EFE6E3', ratio:0.2, sizeCode:'l', rangeMin:0.2, rangeMax:0.4, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.6, sizeCode:'l', rangeMin:0.4, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB037-40S-4OS', name: 'Dune (Oyster Secret)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB037-40S-4OS.webp`,
    tags: ["Brown", "Light", "Neutral", "Pink", "White"],
    hex_colors: ["#D9C499", "#EFE6E3", "#F8F8F9"],
    parts: [
      { flakeId:'Q1240', color:'#D9C499', ratio:0.2, sizeCode:'l', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1630', color:'#EFE6E3', ratio:0.2, sizeCode:'l', rangeMin:0.2, rangeMax:0.4, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.6, sizeCode:'l', rangeMin:0.4, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB037-40S-5LM', name: 'Dune (Latte Macchiato)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB037-40S-5LM.webp`,
    tags: ["Brown", "Light", "Neutral", "Pink", "White"],
    hex_colors: ["#D9C499", "#EFE6E3", "#F8F8F9"],
    parts: [
      { flakeId:'Q1240', color:'#D9C499', ratio:0.2, sizeCode:'l', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1630', color:'#EFE6E3', ratio:0.2, sizeCode:'l', rangeMin:0.2, rangeMax:0.4, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.6, sizeCode:'l', rangeMin:0.4, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB037-40S-6BB', name: 'Dune (Brown Beige)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB037-40S-6BB.webp`,
    tags: ["Brown", "Light", "Neutral", "Pink", "White"],
    hex_colors: ["#D9C499", "#EFE6E3", "#F8F8F9"],
    parts: [
      { flakeId:'Q1240', color:'#D9C499', ratio:0.2, sizeCode:'l', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1630', color:'#EFE6E3', ratio:0.2, sizeCode:'l', rangeMin:0.2, rangeMax:0.4, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.6, sizeCode:'l', rangeMin:0.4, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB037-40S-7LGR', name: 'Dune (Lime Green)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB037-40S-7LGR.webp`,
    tags: ["Brown", "Light", "Neutral", "Pink", "White"],
    hex_colors: ["#D9C499", "#EFE6E3", "#F8F8F9"],
    parts: [
      { flakeId:'Q1240', color:'#D9C499', ratio:0.2, sizeCode:'l', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1630', color:'#EFE6E3', ratio:0.2, sizeCode:'l', rangeMin:0.2, rangeMax:0.4, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.6, sizeCode:'l', rangeMin:0.4, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB037-40S-8BW', name: 'Dune (Bordeaux Wine)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB037-40S-8BW.webp`,
    tags: ["Brown", "Light", "Neutral", "Pink", "White"],
    hex_colors: ["#D9C499", "#EFE6E3", "#F8F8F9"],
    parts: [
      { flakeId:'Q1240', color:'#D9C499', ratio:0.2, sizeCode:'l', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1630', color:'#EFE6E3', ratio:0.2, sizeCode:'l', rangeMin:0.2, rangeMax:0.4, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.6, sizeCode:'l', rangeMin:0.4, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB036-40S-0LG', name: 'India Red (Light Gray)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB036-40S-0LG.webp`,
    tags: ["Brown", "Dark", "Light", "Neutral", "Red", "White"],
    hex_colors: ["#D9C499", "#942D1B", "#F8F8F9"],
    parts: [
      { flakeId:'Q1240', color:'#D9C499', ratio:0.25, sizeCode:'l', rangeMin:0.0, rangeMax:0.25, isGlitter:false },
      { flakeId:'Q1620', color:'#942D1B', ratio:0.25, sizeCode:'l', rangeMin:0.25, rangeMax:0.5, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.5, sizeCode:'l', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB036-40S-1DG', name: 'India Red (Dolphin Gray)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB036-40S-1DG.webp`,
    tags: ["Brown", "Dark", "Light", "Neutral", "Red", "White"],
    hex_colors: ["#D9C499", "#942D1B", "#F8F8F9"],
    parts: [
      { flakeId:'Q1240', color:'#D9C499', ratio:0.25, sizeCode:'l', rangeMin:0.0, rangeMax:0.25, isGlitter:false },
      { flakeId:'Q1620', color:'#942D1B', ratio:0.25, sizeCode:'l', rangeMin:0.25, rangeMax:0.5, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.5, sizeCode:'l', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB036-40S-2BL', name: 'India Red (Black)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB036-40S-2BL.webp`,
    tags: ["Brown", "Dark", "Light", "Neutral", "Red", "White"],
    hex_colors: ["#D9C499", "#942D1B", "#F8F8F9"],
    parts: [
      { flakeId:'Q1240', color:'#D9C499', ratio:0.25, sizeCode:'l', rangeMin:0.0, rangeMax:0.25, isGlitter:false },
      { flakeId:'Q1620', color:'#942D1B', ratio:0.25, sizeCode:'l', rangeMin:0.25, rangeMax:0.5, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.5, sizeCode:'l', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB036-40S-3SE', name: 'India Red (Smokey Evening)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB036-40S-3SE.webp`,
    tags: ["Brown", "Dark", "Light", "Neutral", "Red", "White"],
    hex_colors: ["#D9C499", "#942D1B", "#F8F8F9"],
    parts: [
      { flakeId:'Q1240', color:'#D9C499', ratio:0.25, sizeCode:'l', rangeMin:0.0, rangeMax:0.25, isGlitter:false },
      { flakeId:'Q1620', color:'#942D1B', ratio:0.25, sizeCode:'l', rangeMin:0.25, rangeMax:0.5, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.5, sizeCode:'l', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB036-40S-4OS', name: 'India Red (Oyster Secret)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB036-40S-4OS.webp`,
    tags: ["Brown", "Dark", "Light", "Neutral", "Red", "White"],
    hex_colors: ["#D9C499", "#942D1B", "#F8F8F9"],
    parts: [
      { flakeId:'Q1240', color:'#D9C499', ratio:0.25, sizeCode:'l', rangeMin:0.0, rangeMax:0.25, isGlitter:false },
      { flakeId:'Q1620', color:'#942D1B', ratio:0.25, sizeCode:'l', rangeMin:0.25, rangeMax:0.5, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.5, sizeCode:'l', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB036-40S-5LM', name: 'India Red (Latte Macchiato)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB036-40S-5LM.webp`,
    tags: ["Brown", "Dark", "Light", "Neutral", "Red", "White"],
    hex_colors: ["#D9C499", "#942D1B", "#F8F8F9"],
    parts: [
      { flakeId:'Q1240', color:'#D9C499', ratio:0.25, sizeCode:'l', rangeMin:0.0, rangeMax:0.25, isGlitter:false },
      { flakeId:'Q1620', color:'#942D1B', ratio:0.25, sizeCode:'l', rangeMin:0.25, rangeMax:0.5, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.5, sizeCode:'l', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB036-40S-6BB', name: 'India Red (Brown Beige)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB036-40S-6BB.webp`,
    tags: ["Brown", "Dark", "Light", "Neutral", "Red", "White"],
    hex_colors: ["#D9C499", "#942D1B", "#F8F8F9"],
    parts: [
      { flakeId:'Q1240', color:'#D9C499', ratio:0.25, sizeCode:'l', rangeMin:0.0, rangeMax:0.25, isGlitter:false },
      { flakeId:'Q1620', color:'#942D1B', ratio:0.25, sizeCode:'l', rangeMin:0.25, rangeMax:0.5, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.5, sizeCode:'l', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB036-40S-7LGR', name: 'India Red (Lime Green)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB036-40S-7LGR.webp`,
    tags: ["Brown", "Dark", "Light", "Neutral", "Red", "White"],
    hex_colors: ["#D9C499", "#942D1B", "#F8F8F9"],
    parts: [
      { flakeId:'Q1240', color:'#D9C499', ratio:0.25, sizeCode:'l', rangeMin:0.0, rangeMax:0.25, isGlitter:false },
      { flakeId:'Q1620', color:'#942D1B', ratio:0.25, sizeCode:'l', rangeMin:0.25, rangeMax:0.5, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.5, sizeCode:'l', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB036-40S-8BW', name: 'India Red (Bordeaux Wine)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB036-40S-8BW.webp`,
    tags: ["Brown", "Dark", "Light", "Neutral", "Red", "White"],
    hex_colors: ["#D9C499", "#942D1B", "#F8F8F9"],
    parts: [
      { flakeId:'Q1240', color:'#D9C499', ratio:0.25, sizeCode:'l', rangeMin:0.0, rangeMax:0.25, isGlitter:false },
      { flakeId:'Q1620', color:'#942D1B', ratio:0.25, sizeCode:'l', rangeMin:0.25, rangeMax:0.5, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.5, sizeCode:'l', rangeMin:0.5, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB039-40S-0LG', name: 'Dacite (Light Gray)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB039-40S-0LG.webp`,
    tags: ["Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#5D463A", "#F8F8F9"],
    parts: [
      { flakeId:'Q1270', color:'#5D463A', ratio:0.2, sizeCode:'l', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.8, sizeCode:'l', rangeMin:0.2, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB039-40S-1DG', name: 'Dacite (Dolphin Gray)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB039-40S-1DG.webp`,
    tags: ["Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#5D463A", "#F8F8F9"],
    parts: [
      { flakeId:'Q1270', color:'#5D463A', ratio:0.2, sizeCode:'l', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.8, sizeCode:'l', rangeMin:0.2, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB039-40S-2BL', name: 'Dacite (Black)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB039-40S-2BL.webp`,
    tags: ["Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#5D463A", "#F8F8F9"],
    parts: [
      { flakeId:'Q1270', color:'#5D463A', ratio:0.2, sizeCode:'l', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.8, sizeCode:'l', rangeMin:0.2, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB039-40S-3SE', name: 'Dacite (Smokey Evening)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB039-40S-3SE.webp`,
    tags: ["Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#5D463A", "#F8F8F9"],
    parts: [
      { flakeId:'Q1270', color:'#5D463A', ratio:0.2, sizeCode:'l', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.8, sizeCode:'l', rangeMin:0.2, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB039-40S-4OS', name: 'Dacite (Oyster Secret)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB039-40S-4OS.webp`,
    tags: ["Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#5D463A", "#F8F8F9"],
    parts: [
      { flakeId:'Q1270', color:'#5D463A', ratio:0.2, sizeCode:'l', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.8, sizeCode:'l', rangeMin:0.2, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB039-40S-5LM', name: 'Dacite (Latte Macchiato)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB039-40S-5LM.webp`,
    tags: ["Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#5D463A", "#F8F8F9"],
    parts: [
      { flakeId:'Q1270', color:'#5D463A', ratio:0.2, sizeCode:'l', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.8, sizeCode:'l', rangeMin:0.2, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB039-40S-6BB', name: 'Dacite (Brown Beige)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB039-40S-6BB.webp`,
    tags: ["Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#5D463A", "#F8F8F9"],
    parts: [
      { flakeId:'Q1270', color:'#5D463A', ratio:0.2, sizeCode:'l', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.8, sizeCode:'l', rangeMin:0.2, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB039-40S-7LGR', name: 'Dacite (Lime Green)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB039-40S-7LGR.webp`,
    tags: ["Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#5D463A", "#F8F8F9"],
    parts: [
      { flakeId:'Q1270', color:'#5D463A', ratio:0.2, sizeCode:'l', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.8, sizeCode:'l', rangeMin:0.2, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB039-40S-8BW', name: 'Dacite (Bordeaux Wine)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB039-40S-8BW.webp`,
    tags: ["Brown", "Dark", "Light", "Neutral", "White"],
    hex_colors: ["#5D463A", "#F8F8F9"],
    parts: [
      { flakeId:'Q1270', color:'#5D463A', ratio:0.2, sizeCode:'l', rangeMin:0.0, rangeMax:0.2, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.8, sizeCode:'l', rangeMin:0.2, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB043-40S-0LG', name: 'Russet (Light Gray)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB043-40S-0LG.webp`,
    tags: ["Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#5D463A", "#D9C499", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1270', color:'#5D463A', ratio:0.278, sizeCode:'l', rangeMin:0.0, rangeMax:0.278, isGlitter:false },
      { flakeId:'Q1240', color:'#D9C499', ratio:0.278, sizeCode:'l', rangeMin:0.278, rangeMax:0.556, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.166, sizeCode:'l', rangeMin:0.556, rangeMax:0.722, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.278, sizeCode:'l', rangeMin:0.722, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB043-40S-1DG', name: 'Russet (Dolphin Gray)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB043-40S-1DG.webp`,
    tags: ["Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#5D463A", "#D9C499", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1270', color:'#5D463A', ratio:0.278, sizeCode:'l', rangeMin:0.0, rangeMax:0.278, isGlitter:false },
      { flakeId:'Q1240', color:'#D9C499', ratio:0.278, sizeCode:'l', rangeMin:0.278, rangeMax:0.556, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.166, sizeCode:'l', rangeMin:0.556, rangeMax:0.722, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.278, sizeCode:'l', rangeMin:0.722, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB043-40S-2BL', name: 'Russet (Black)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB043-40S-2BL.webp`,
    tags: ["Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#5D463A", "#D9C499", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1270', color:'#5D463A', ratio:0.278, sizeCode:'l', rangeMin:0.0, rangeMax:0.278, isGlitter:false },
      { flakeId:'Q1240', color:'#D9C499', ratio:0.278, sizeCode:'l', rangeMin:0.278, rangeMax:0.556, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.166, sizeCode:'l', rangeMin:0.556, rangeMax:0.722, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.278, sizeCode:'l', rangeMin:0.722, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB043-40S-3SE', name: 'Russet (Smokey Evening)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB043-40S-3SE.webp`,
    tags: ["Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#5D463A", "#D9C499", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1270', color:'#5D463A', ratio:0.278, sizeCode:'l', rangeMin:0.0, rangeMax:0.278, isGlitter:false },
      { flakeId:'Q1240', color:'#D9C499', ratio:0.278, sizeCode:'l', rangeMin:0.278, rangeMax:0.556, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.166, sizeCode:'l', rangeMin:0.556, rangeMax:0.722, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.278, sizeCode:'l', rangeMin:0.722, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB043-40S-4OS', name: 'Russet (Oyster Secret)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB043-40S-4OS.webp`,
    tags: ["Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#5D463A", "#D9C499", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1270', color:'#5D463A', ratio:0.278, sizeCode:'l', rangeMin:0.0, rangeMax:0.278, isGlitter:false },
      { flakeId:'Q1240', color:'#D9C499', ratio:0.278, sizeCode:'l', rangeMin:0.278, rangeMax:0.556, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.166, sizeCode:'l', rangeMin:0.556, rangeMax:0.722, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.278, sizeCode:'l', rangeMin:0.722, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB043-40S-5LM', name: 'Russet (Latte Macchiato)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB043-40S-5LM.webp`,
    tags: ["Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#5D463A", "#D9C499", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1270', color:'#5D463A', ratio:0.278, sizeCode:'l', rangeMin:0.0, rangeMax:0.278, isGlitter:false },
      { flakeId:'Q1240', color:'#D9C499', ratio:0.278, sizeCode:'l', rangeMin:0.278, rangeMax:0.556, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.166, sizeCode:'l', rangeMin:0.556, rangeMax:0.722, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.278, sizeCode:'l', rangeMin:0.722, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB043-40S-6BB', name: 'Russet (Brown Beige)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB043-40S-6BB.webp`,
    tags: ["Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#5D463A", "#D9C499", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1270', color:'#5D463A', ratio:0.278, sizeCode:'l', rangeMin:0.0, rangeMax:0.278, isGlitter:false },
      { flakeId:'Q1240', color:'#D9C499', ratio:0.278, sizeCode:'l', rangeMin:0.278, rangeMax:0.556, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.166, sizeCode:'l', rangeMin:0.556, rangeMax:0.722, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.278, sizeCode:'l', rangeMin:0.722, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB043-40S-7LGR', name: 'Russet (Lime Green)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB043-40S-7LGR.webp`,
    tags: ["Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#5D463A", "#D9C499", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1270', color:'#5D463A', ratio:0.278, sizeCode:'l', rangeMin:0.0, rangeMax:0.278, isGlitter:false },
      { flakeId:'Q1240', color:'#D9C499', ratio:0.278, sizeCode:'l', rangeMin:0.278, rangeMax:0.556, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.166, sizeCode:'l', rangeMin:0.556, rangeMax:0.722, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.278, sizeCode:'l', rangeMin:0.722, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB043-40S-8BW', name: 'Russet (Bordeaux Wine)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB043-40S-8BW.webp`,
    tags: ["Brown", "Dark", "Grey", "Light", "Neutral", "White"],
    hex_colors: ["#5D463A", "#D9C499", "#D1D3D4", "#F8F8F9"],
    parts: [
      { flakeId:'Q1270', color:'#5D463A', ratio:0.278, sizeCode:'l', rangeMin:0.0, rangeMax:0.278, isGlitter:false },
      { flakeId:'Q1240', color:'#D9C499', ratio:0.278, sizeCode:'l', rangeMin:0.278, rangeMax:0.556, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.166, sizeCode:'l', rangeMin:0.556, rangeMax:0.722, isGlitter:false },
      { flakeId:'Q1010', color:'#F8F8F9', ratio:0.278, sizeCode:'l', rangeMin:0.722, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB040-40S-0LG', name: 'Ares (Light Gray)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB040-40S-0LG.webp`,
    tags: ["Brown", "Dark", "Grey", "Light", "Neutral", "Red"],
    hex_colors: ["#942D1B", "#D1D3D4"],
    parts: [
      { flakeId:'Q1620', color:'#942D1B', ratio:0.3, sizeCode:'l', rangeMin:0.0, rangeMax:0.3, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.7, sizeCode:'l', rangeMin:0.3, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB040-40S-1DG', name: 'Ares (Dolphin Gray)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB040-40S-1DG.webp`,
    tags: ["Brown", "Dark", "Grey", "Light", "Neutral", "Red"],
    hex_colors: ["#942D1B", "#D1D3D4"],
    parts: [
      { flakeId:'Q1620', color:'#942D1B', ratio:0.3, sizeCode:'l', rangeMin:0.0, rangeMax:0.3, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.7, sizeCode:'l', rangeMin:0.3, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB040-40S-2BL', name: 'Ares (Black)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB040-40S-2BL.webp`,
    tags: ["Brown", "Dark", "Grey", "Light", "Neutral", "Red"],
    hex_colors: ["#942D1B", "#D1D3D4"],
    parts: [
      { flakeId:'Q1620', color:'#942D1B', ratio:0.3, sizeCode:'l', rangeMin:0.0, rangeMax:0.3, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.7, sizeCode:'l', rangeMin:0.3, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB040-40S-3SE', name: 'Ares (Smokey Evening)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB040-40S-3SE.webp`,
    tags: ["Brown", "Dark", "Grey", "Light", "Neutral", "Red"],
    hex_colors: ["#942D1B", "#D1D3D4"],
    parts: [
      { flakeId:'Q1620', color:'#942D1B', ratio:0.3, sizeCode:'l', rangeMin:0.0, rangeMax:0.3, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.7, sizeCode:'l', rangeMin:0.3, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB040-40S-4OS', name: 'Ares (Oyster Secret)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB040-40S-4OS.webp`,
    tags: ["Brown", "Dark", "Grey", "Light", "Neutral", "Red"],
    hex_colors: ["#942D1B", "#D1D3D4"],
    parts: [
      { flakeId:'Q1620', color:'#942D1B', ratio:0.3, sizeCode:'l', rangeMin:0.0, rangeMax:0.3, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.7, sizeCode:'l', rangeMin:0.3, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB040-40S-5LM', name: 'Ares (Latte Macchiato)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB040-40S-5LM.webp`,
    tags: ["Brown", "Dark", "Grey", "Light", "Neutral", "Red"],
    hex_colors: ["#942D1B", "#D1D3D4"],
    parts: [
      { flakeId:'Q1620', color:'#942D1B', ratio:0.3, sizeCode:'l', rangeMin:0.0, rangeMax:0.3, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.7, sizeCode:'l', rangeMin:0.3, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB040-40S-6BB', name: 'Ares (Brown Beige)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB040-40S-6BB.webp`,
    tags: ["Brown", "Dark", "Grey", "Light", "Neutral", "Red"],
    hex_colors: ["#942D1B", "#D1D3D4"],
    parts: [
      { flakeId:'Q1620', color:'#942D1B', ratio:0.3, sizeCode:'l', rangeMin:0.0, rangeMax:0.3, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.7, sizeCode:'l', rangeMin:0.3, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB040-40S-7LGR', name: 'Ares (Lime Green)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB040-40S-7LGR.webp`,
    tags: ["Brown", "Dark", "Grey", "Light", "Neutral", "Red"],
    hex_colors: ["#942D1B", "#D1D3D4"],
    parts: [
      { flakeId:'Q1620', color:'#942D1B', ratio:0.3, sizeCode:'l', rangeMin:0.0, rangeMax:0.3, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.7, sizeCode:'l', rangeMin:0.3, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: '101390-QB040-40S-8BW', name: 'Ares (Bordeaux Wine)', type: 'quartz-blend', collection: '',
    img_url: `${CDN}assets/images/blends/101390-QB040-40S-8BW.webp`,
    tags: ["Brown", "Dark", "Grey", "Light", "Neutral", "Red"],
    hex_colors: ["#942D1B", "#D1D3D4"],
    parts: [
      { flakeId:'Q1620', color:'#942D1B', ratio:0.3, sizeCode:'l', rangeMin:0.0, rangeMax:0.3, isGlitter:false },
      { flakeId:'Q1320', color:'#D1D3D4', ratio:0.7, sizeCode:'l', rangeMin:0.3, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1010-0LG', name: 'Pearl (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1010-0LG.webp`,
    tags: ["Light", "White"],
    hex_colors: ["#BDC5C9"],
    parts: [
      { flakeId:'P1010', color:'#BDC5C9', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1010-1DG', name: 'Pearl (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1010-1DG.webp`,
    tags: ["Light", "White"],
    hex_colors: ["#BDC5C9"],
    parts: [
      { flakeId:'P1010', color:'#BDC5C9', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1010-2BL', name: 'Pearl (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1010-2BL.webp`,
    tags: ["Light", "White"],
    hex_colors: ["#BDC5C9"],
    parts: [
      { flakeId:'P1010', color:'#BDC5C9', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1010-3SE', name: 'Pearl (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1010-3SE.webp`,
    tags: ["Light", "White"],
    hex_colors: ["#BDC5C9"],
    parts: [
      { flakeId:'P1010', color:'#BDC5C9', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1010-4OS', name: 'Pearl (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1010-4OS.webp`,
    tags: ["Light", "White"],
    hex_colors: ["#BDC5C9"],
    parts: [
      { flakeId:'P1010', color:'#BDC5C9', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1010-5LM', name: 'Pearl (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1010-5LM.webp`,
    tags: ["Light", "White"],
    hex_colors: ["#BDC5C9"],
    parts: [
      { flakeId:'P1010', color:'#BDC5C9', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1010-6BB', name: 'Pearl (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1010-6BB.webp`,
    tags: ["Light", "White"],
    hex_colors: ["#BDC5C9"],
    parts: [
      { flakeId:'P1010', color:'#BDC5C9', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1010-7LGR', name: 'Pearl (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1010-7LGR.webp`,
    tags: ["Light", "White"],
    hex_colors: ["#BDC5C9"],
    parts: [
      { flakeId:'P1010', color:'#BDC5C9', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1010-8BW', name: 'Pearl (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1010-8BW.webp`,
    tags: ["Light", "White"],
    hex_colors: ["#BDC5C9"],
    parts: [
      { flakeId:'P1010', color:'#BDC5C9', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1020-0LG', name: 'Dolphin (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1020-0LG.webp`,
    tags: ["Grey", "Neutral"],
    hex_colors: ["#9EA3A6"],
    parts: [
      { flakeId:'P1020', color:'#9EA3A6', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1020-1DG', name: 'Dolphin (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1020-1DG.webp`,
    tags: ["Grey", "Neutral"],
    hex_colors: ["#9EA3A6"],
    parts: [
      { flakeId:'P1020', color:'#9EA3A6', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1020-2BL', name: 'Dolphin (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1020-2BL.webp`,
    tags: ["Grey", "Neutral"],
    hex_colors: ["#9EA3A6"],
    parts: [
      { flakeId:'P1020', color:'#9EA3A6', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1020-3SE', name: 'Dolphin (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1020-3SE.webp`,
    tags: ["Grey", "Neutral"],
    hex_colors: ["#9EA3A6"],
    parts: [
      { flakeId:'P1020', color:'#9EA3A6', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1020-4OS', name: 'Dolphin (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1020-4OS.webp`,
    tags: ["Grey", "Neutral"],
    hex_colors: ["#9EA3A6"],
    parts: [
      { flakeId:'P1020', color:'#9EA3A6', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1020-5LM', name: 'Dolphin (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1020-5LM.webp`,
    tags: ["Grey", "Neutral"],
    hex_colors: ["#9EA3A6"],
    parts: [
      { flakeId:'P1020', color:'#9EA3A6', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1020-6BB', name: 'Dolphin (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1020-6BB.webp`,
    tags: ["Grey", "Neutral"],
    hex_colors: ["#9EA3A6"],
    parts: [
      { flakeId:'P1020', color:'#9EA3A6', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1020-7LGR', name: 'Dolphin (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1020-7LGR.webp`,
    tags: ["Grey", "Neutral"],
    hex_colors: ["#9EA3A6"],
    parts: [
      { flakeId:'P1020', color:'#9EA3A6', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1020-8BW', name: 'Dolphin (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1020-8BW.webp`,
    tags: ["Grey", "Neutral"],
    hex_colors: ["#9EA3A6"],
    parts: [
      { flakeId:'P1020', color:'#9EA3A6', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1030-0LG', name: 'Manatee (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1030-0LG.webp`,
    tags: ["Dark", "Grey"],
    hex_colors: ["#8A8D90"],
    parts: [
      { flakeId:'P1030', color:'#8A8D90', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1030-1DG', name: 'Manatee (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1030-1DG.webp`,
    tags: ["Dark", "Grey"],
    hex_colors: ["#8A8D90"],
    parts: [
      { flakeId:'P1030', color:'#8A8D90', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1030-2BL', name: 'Manatee (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1030-2BL.webp`,
    tags: ["Dark", "Grey"],
    hex_colors: ["#8A8D90"],
    parts: [
      { flakeId:'P1030', color:'#8A8D90', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1030-3SE', name: 'Manatee (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1030-3SE.webp`,
    tags: ["Dark", "Grey"],
    hex_colors: ["#8A8D90"],
    parts: [
      { flakeId:'P1030', color:'#8A8D90', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1030-4OS', name: 'Manatee (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1030-4OS.webp`,
    tags: ["Dark", "Grey"],
    hex_colors: ["#8A8D90"],
    parts: [
      { flakeId:'P1030', color:'#8A8D90', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1030-5LM', name: 'Manatee (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1030-5LM.webp`,
    tags: ["Dark", "Grey"],
    hex_colors: ["#8A8D90"],
    parts: [
      { flakeId:'P1030', color:'#8A8D90', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1030-6BB', name: 'Manatee (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1030-6BB.webp`,
    tags: ["Dark", "Grey"],
    hex_colors: ["#8A8D90"],
    parts: [
      { flakeId:'P1030', color:'#8A8D90', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1030-7LGR', name: 'Manatee (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1030-7LGR.webp`,
    tags: ["Dark", "Grey"],
    hex_colors: ["#8A8D90"],
    parts: [
      { flakeId:'P1030', color:'#8A8D90', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1030-8BW', name: 'Manatee (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1030-8BW.webp`,
    tags: ["Dark", "Grey"],
    hex_colors: ["#8A8D90"],
    parts: [
      { flakeId:'P1030', color:'#8A8D90', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1040-0LG', name: 'Whale (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1040-0LG.webp`,
    tags: ["Dark", "Grey"],
    hex_colors: ["#626568"],
    parts: [
      { flakeId:'P1040', color:'#626568', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1040-1DG', name: 'Whale (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1040-1DG.webp`,
    tags: ["Dark", "Grey"],
    hex_colors: ["#626568"],
    parts: [
      { flakeId:'P1040', color:'#626568', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1040-2BL', name: 'Whale (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1040-2BL.webp`,
    tags: ["Dark", "Grey"],
    hex_colors: ["#626568"],
    parts: [
      { flakeId:'P1040', color:'#626568', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1040-3SE', name: 'Whale (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1040-3SE.webp`,
    tags: ["Dark", "Grey"],
    hex_colors: ["#626568"],
    parts: [
      { flakeId:'P1040', color:'#626568', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1040-4OS', name: 'Whale (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1040-4OS.webp`,
    tags: ["Dark", "Grey"],
    hex_colors: ["#626568"],
    parts: [
      { flakeId:'P1040', color:'#626568', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1040-5LM', name: 'Whale (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1040-5LM.webp`,
    tags: ["Dark", "Grey"],
    hex_colors: ["#626568"],
    parts: [
      { flakeId:'P1040', color:'#626568', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1040-6BB', name: 'Whale (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1040-6BB.webp`,
    tags: ["Dark", "Grey"],
    hex_colors: ["#626568"],
    parts: [
      { flakeId:'P1040', color:'#626568', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1040-7LGR', name: 'Whale (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1040-7LGR.webp`,
    tags: ["Dark", "Grey"],
    hex_colors: ["#626568"],
    parts: [
      { flakeId:'P1040', color:'#626568', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1040-8BW', name: 'Whale (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1040-8BW.webp`,
    tags: ["Dark", "Grey"],
    hex_colors: ["#626568"],
    parts: [
      { flakeId:'P1040', color:'#626568', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1050-0LG', name: 'Caviar (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1050-0LG.webp`,
    tags: ["Black", "Dark", "Grey"],
    hex_colors: ["#444342"],
    parts: [
      { flakeId:'P1050', color:'#444342', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1050-1DG', name: 'Caviar (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1050-1DG.webp`,
    tags: ["Black", "Dark", "Grey"],
    hex_colors: ["#444342"],
    parts: [
      { flakeId:'P1050', color:'#444342', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1050-2BL', name: 'Caviar (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1050-2BL.webp`,
    tags: ["Black", "Dark", "Grey"],
    hex_colors: ["#444342"],
    parts: [
      { flakeId:'P1050', color:'#444342', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1050-3SE', name: 'Caviar (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1050-3SE.webp`,
    tags: ["Black", "Dark", "Grey"],
    hex_colors: ["#444342"],
    parts: [
      { flakeId:'P1050', color:'#444342', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1050-4OS', name: 'Caviar (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1050-4OS.webp`,
    tags: ["Black", "Dark", "Grey"],
    hex_colors: ["#444342"],
    parts: [
      { flakeId:'P1050', color:'#444342', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1050-5LM', name: 'Caviar (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1050-5LM.webp`,
    tags: ["Black", "Dark", "Grey"],
    hex_colors: ["#444342"],
    parts: [
      { flakeId:'P1050', color:'#444342', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1050-6BB', name: 'Caviar (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1050-6BB.webp`,
    tags: ["Black", "Dark", "Grey"],
    hex_colors: ["#444342"],
    parts: [
      { flakeId:'P1050', color:'#444342', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1050-7LGR', name: 'Caviar (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1050-7LGR.webp`,
    tags: ["Black", "Dark", "Grey"],
    hex_colors: ["#444342"],
    parts: [
      { flakeId:'P1050', color:'#444342', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1050-8BW', name: 'Caviar (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1050-8BW.webp`,
    tags: ["Black", "Dark", "Grey"],
    hex_colors: ["#444342"],
    parts: [
      { flakeId:'P1050', color:'#444342', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1105-0LG', name: 'Guava (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1105-0LG.webp`,
    tags: ["Brown", "Grey", "Neutral"],
    hex_colors: ["#B0A89D"],
    parts: [
      { flakeId:'P1105', color:'#B0A89D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1105-1DG', name: 'Guava (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1105-1DG.webp`,
    tags: ["Brown", "Grey", "Neutral"],
    hex_colors: ["#B0A89D"],
    parts: [
      { flakeId:'P1105', color:'#B0A89D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1105-2BL', name: 'Guava (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1105-2BL.webp`,
    tags: ["Brown", "Grey", "Neutral"],
    hex_colors: ["#B0A89D"],
    parts: [
      { flakeId:'P1105', color:'#B0A89D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1105-3SE', name: 'Guava (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1105-3SE.webp`,
    tags: ["Brown", "Grey", "Neutral"],
    hex_colors: ["#B0A89D"],
    parts: [
      { flakeId:'P1105', color:'#B0A89D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1105-4OS', name: 'Guava (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1105-4OS.webp`,
    tags: ["Brown", "Grey", "Neutral"],
    hex_colors: ["#B0A89D"],
    parts: [
      { flakeId:'P1105', color:'#B0A89D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1105-5LM', name: 'Guava (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1105-5LM.webp`,
    tags: ["Brown", "Grey", "Neutral"],
    hex_colors: ["#B0A89D"],
    parts: [
      { flakeId:'P1105', color:'#B0A89D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1105-6BB', name: 'Guava (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1105-6BB.webp`,
    tags: ["Brown", "Grey", "Neutral"],
    hex_colors: ["#B0A89D"],
    parts: [
      { flakeId:'P1105', color:'#B0A89D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1105-7LGR', name: 'Guava (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1105-7LGR.webp`,
    tags: ["Brown", "Grey", "Neutral"],
    hex_colors: ["#B0A89D"],
    parts: [
      { flakeId:'P1105', color:'#B0A89D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1105-8BW', name: 'Guava (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1105-8BW.webp`,
    tags: ["Brown", "Grey", "Neutral"],
    hex_colors: ["#B0A89D"],
    parts: [
      { flakeId:'P1105', color:'#B0A89D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1110-0LG', name: 'Overcast (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1110-0LG.webp`,
    tags: ["Brown", "Grey", "Neutral"],
    hex_colors: ["#9B9588"],
    parts: [
      { flakeId:'P1110', color:'#9B9588', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1110-1DG', name: 'Overcast (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1110-1DG.webp`,
    tags: ["Brown", "Grey", "Neutral"],
    hex_colors: ["#9B9588"],
    parts: [
      { flakeId:'P1110', color:'#9B9588', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1110-2BL', name: 'Overcast (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1110-2BL.webp`,
    tags: ["Brown", "Grey", "Neutral"],
    hex_colors: ["#9B9588"],
    parts: [
      { flakeId:'P1110', color:'#9B9588', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1110-3SE', name: 'Overcast (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1110-3SE.webp`,
    tags: ["Brown", "Grey", "Neutral"],
    hex_colors: ["#9B9588"],
    parts: [
      { flakeId:'P1110', color:'#9B9588', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1110-4OS', name: 'Overcast (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1110-4OS.webp`,
    tags: ["Brown", "Grey", "Neutral"],
    hex_colors: ["#9B9588"],
    parts: [
      { flakeId:'P1110', color:'#9B9588', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1110-5LM', name: 'Overcast (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1110-5LM.webp`,
    tags: ["Brown", "Grey", "Neutral"],
    hex_colors: ["#9B9588"],
    parts: [
      { flakeId:'P1110', color:'#9B9588', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1110-6BB', name: 'Overcast (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1110-6BB.webp`,
    tags: ["Brown", "Grey", "Neutral"],
    hex_colors: ["#9B9588"],
    parts: [
      { flakeId:'P1110', color:'#9B9588', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1110-7LGR', name: 'Overcast (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1110-7LGR.webp`,
    tags: ["Brown", "Grey", "Neutral"],
    hex_colors: ["#9B9588"],
    parts: [
      { flakeId:'P1110', color:'#9B9588', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1110-8BW', name: 'Overcast (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1110-8BW.webp`,
    tags: ["Brown", "Grey", "Neutral"],
    hex_colors: ["#9B9588"],
    parts: [
      { flakeId:'P1110', color:'#9B9588', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1115-0LG', name: 'Sandbar (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1115-0LG.webp`,
    tags: ["Brown", "Light", "Neutral", "Yellow"],
    hex_colors: ["#B1A68C"],
    parts: [
      { flakeId:'P1115', color:'#B1A68C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1115-1DG', name: 'Sandbar (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1115-1DG.webp`,
    tags: ["Brown", "Light", "Neutral", "Yellow"],
    hex_colors: ["#B1A68C"],
    parts: [
      { flakeId:'P1115', color:'#B1A68C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1115-2BL', name: 'Sandbar (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1115-2BL.webp`,
    tags: ["Brown", "Light", "Neutral", "Yellow"],
    hex_colors: ["#B1A68C"],
    parts: [
      { flakeId:'P1115', color:'#B1A68C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1115-3SE', name: 'Sandbar (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1115-3SE.webp`,
    tags: ["Brown", "Light", "Neutral", "Yellow"],
    hex_colors: ["#B1A68C"],
    parts: [
      { flakeId:'P1115', color:'#B1A68C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1115-4OS', name: 'Sandbar (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1115-4OS.webp`,
    tags: ["Brown", "Light", "Neutral", "Yellow"],
    hex_colors: ["#B1A68C"],
    parts: [
      { flakeId:'P1115', color:'#B1A68C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1115-5LM', name: 'Sandbar (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1115-5LM.webp`,
    tags: ["Brown", "Light", "Neutral", "Yellow"],
    hex_colors: ["#B1A68C"],
    parts: [
      { flakeId:'P1115', color:'#B1A68C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1115-6BB', name: 'Sandbar (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1115-6BB.webp`,
    tags: ["Brown", "Light", "Neutral", "Yellow"],
    hex_colors: ["#B1A68C"],
    parts: [
      { flakeId:'P1115', color:'#B1A68C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1115-7LGR', name: 'Sandbar (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1115-7LGR.webp`,
    tags: ["Brown", "Light", "Neutral", "Yellow"],
    hex_colors: ["#B1A68C"],
    parts: [
      { flakeId:'P1115', color:'#B1A68C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1115-8BW', name: 'Sandbar (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1115-8BW.webp`,
    tags: ["Brown", "Light", "Neutral", "Yellow"],
    hex_colors: ["#B1A68C"],
    parts: [
      { flakeId:'P1115', color:'#B1A68C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1120-0LG', name: 'Palapa (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1120-0LG.webp`,
    tags: ["Brown", "Light", "Neutral", "Yellow"],
    hex_colors: ["#B2A789"],
    parts: [
      { flakeId:'P1120', color:'#B2A789', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1120-1DG', name: 'Palapa (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1120-1DG.webp`,
    tags: ["Brown", "Light", "Neutral", "Yellow"],
    hex_colors: ["#B2A789"],
    parts: [
      { flakeId:'P1120', color:'#B2A789', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1120-2BL', name: 'Palapa (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1120-2BL.webp`,
    tags: ["Brown", "Light", "Neutral", "Yellow"],
    hex_colors: ["#B2A789"],
    parts: [
      { flakeId:'P1120', color:'#B2A789', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1120-3SE', name: 'Palapa (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1120-3SE.webp`,
    tags: ["Brown", "Light", "Neutral", "Yellow"],
    hex_colors: ["#B2A789"],
    parts: [
      { flakeId:'P1120', color:'#B2A789', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1120-4OS', name: 'Palapa (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1120-4OS.webp`,
    tags: ["Brown", "Light", "Neutral", "Yellow"],
    hex_colors: ["#B2A789"],
    parts: [
      { flakeId:'P1120', color:'#B2A789', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1120-5LM', name: 'Palapa (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1120-5LM.webp`,
    tags: ["Brown", "Light", "Neutral", "Yellow"],
    hex_colors: ["#B2A789"],
    parts: [
      { flakeId:'P1120', color:'#B2A789', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1120-6BB', name: 'Palapa (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1120-6BB.webp`,
    tags: ["Brown", "Light", "Neutral", "Yellow"],
    hex_colors: ["#B2A789"],
    parts: [
      { flakeId:'P1120', color:'#B2A789', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1120-7LGR', name: 'Palapa (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1120-7LGR.webp`,
    tags: ["Brown", "Light", "Neutral", "Yellow"],
    hex_colors: ["#B2A789"],
    parts: [
      { flakeId:'P1120', color:'#B2A789', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1120-8BW', name: 'Palapa (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1120-8BW.webp`,
    tags: ["Brown", "Light", "Neutral", "Yellow"],
    hex_colors: ["#B2A789"],
    parts: [
      { flakeId:'P1120', color:'#B2A789', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1125-0LG', name: 'Bamboo (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1125-0LG.webp`,
    tags: ["Brown", "Dark", "Green"],
    hex_colors: ["#867959"],
    parts: [
      { flakeId:'P1125', color:'#867959', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1125-1DG', name: 'Bamboo (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1125-1DG.webp`,
    tags: ["Brown", "Dark", "Green"],
    hex_colors: ["#867959"],
    parts: [
      { flakeId:'P1125', color:'#867959', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1125-2BL', name: 'Bamboo (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1125-2BL.webp`,
    tags: ["Brown", "Dark", "Green"],
    hex_colors: ["#867959"],
    parts: [
      { flakeId:'P1125', color:'#867959', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1125-3SE', name: 'Bamboo (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1125-3SE.webp`,
    tags: ["Brown", "Dark", "Green"],
    hex_colors: ["#867959"],
    parts: [
      { flakeId:'P1125', color:'#867959', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1125-4OS', name: 'Bamboo (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1125-4OS.webp`,
    tags: ["Brown", "Dark", "Green"],
    hex_colors: ["#867959"],
    parts: [
      { flakeId:'P1125', color:'#867959', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1125-5LM', name: 'Bamboo (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1125-5LM.webp`,
    tags: ["Brown", "Dark", "Green"],
    hex_colors: ["#867959"],
    parts: [
      { flakeId:'P1125', color:'#867959', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1125-6BB', name: 'Bamboo (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1125-6BB.webp`,
    tags: ["Brown", "Dark", "Green"],
    hex_colors: ["#867959"],
    parts: [
      { flakeId:'P1125', color:'#867959', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1125-7LGR', name: 'Bamboo (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1125-7LGR.webp`,
    tags: ["Brown", "Dark", "Green"],
    hex_colors: ["#867959"],
    parts: [
      { flakeId:'P1125', color:'#867959', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1125-8BW', name: 'Bamboo (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1125-8BW.webp`,
    tags: ["Brown", "Dark", "Green"],
    hex_colors: ["#867959"],
    parts: [
      { flakeId:'P1125', color:'#867959', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1130-0LG', name: 'Lager (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1130-0LG.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#B99062"],
    parts: [
      { flakeId:'P1130', color:'#B99062', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1130-1DG', name: 'Lager (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1130-1DG.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#B99062"],
    parts: [
      { flakeId:'P1130', color:'#B99062', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1130-2BL', name: 'Lager (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1130-2BL.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#B99062"],
    parts: [
      { flakeId:'P1130', color:'#B99062', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1130-3SE', name: 'Lager (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1130-3SE.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#B99062"],
    parts: [
      { flakeId:'P1130', color:'#B99062', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1130-4OS', name: 'Lager (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1130-4OS.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#B99062"],
    parts: [
      { flakeId:'P1130', color:'#B99062', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1130-5LM', name: 'Lager (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1130-5LM.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#B99062"],
    parts: [
      { flakeId:'P1130', color:'#B99062', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1130-6BB', name: 'Lager (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1130-6BB.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#B99062"],
    parts: [
      { flakeId:'P1130', color:'#B99062', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1130-7LGR', name: 'Lager (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1130-7LGR.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#B99062"],
    parts: [
      { flakeId:'P1130', color:'#B99062', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1130-8BW', name: 'Lager (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1130-8BW.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#B99062"],
    parts: [
      { flakeId:'P1130', color:'#B99062', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1135-0LG', name: 'Driftwood (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1135-0LG.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#997B5B"],
    parts: [
      { flakeId:'P1135', color:'#997B5B', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1135-1DG', name: 'Driftwood (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1135-1DG.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#997B5B"],
    parts: [
      { flakeId:'P1135', color:'#997B5B', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1135-2BL', name: 'Driftwood (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1135-2BL.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#997B5B"],
    parts: [
      { flakeId:'P1135', color:'#997B5B', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1135-3SE', name: 'Driftwood (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1135-3SE.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#997B5B"],
    parts: [
      { flakeId:'P1135', color:'#997B5B', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1135-4OS', name: 'Driftwood (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1135-4OS.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#997B5B"],
    parts: [
      { flakeId:'P1135', color:'#997B5B', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1135-5LM', name: 'Driftwood (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1135-5LM.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#997B5B"],
    parts: [
      { flakeId:'P1135', color:'#997B5B', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1135-6BB', name: 'Driftwood (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1135-6BB.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#997B5B"],
    parts: [
      { flakeId:'P1135', color:'#997B5B', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1135-7LGR', name: 'Driftwood (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1135-7LGR.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#997B5B"],
    parts: [
      { flakeId:'P1135', color:'#997B5B', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1135-8BW', name: 'Driftwood (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1135-8BW.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#997B5B"],
    parts: [
      { flakeId:'P1135', color:'#997B5B', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1140-0LG', name: 'Hammock (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1140-0LG.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#A4825A"],
    parts: [
      { flakeId:'P1140', color:'#A4825A', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1140-1DG', name: 'Hammock (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1140-1DG.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#A4825A"],
    parts: [
      { flakeId:'P1140', color:'#A4825A', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1140-2BL', name: 'Hammock (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1140-2BL.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#A4825A"],
    parts: [
      { flakeId:'P1140', color:'#A4825A', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1140-3SE', name: 'Hammock (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1140-3SE.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#A4825A"],
    parts: [
      { flakeId:'P1140', color:'#A4825A', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1140-4OS', name: 'Hammock (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1140-4OS.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#A4825A"],
    parts: [
      { flakeId:'P1140', color:'#A4825A', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1140-5LM', name: 'Hammock (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1140-5LM.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#A4825A"],
    parts: [
      { flakeId:'P1140', color:'#A4825A', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1140-6BB', name: 'Hammock (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1140-6BB.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#A4825A"],
    parts: [
      { flakeId:'P1140', color:'#A4825A', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1140-7LGR', name: 'Hammock (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1140-7LGR.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#A4825A"],
    parts: [
      { flakeId:'P1140', color:'#A4825A', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1140-8BW', name: 'Hammock (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1140-8BW.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#A4825A"],
    parts: [
      { flakeId:'P1140', color:'#A4825A', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1145-0LG', name: 'Rum (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1145-0LG.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#9A7961"],
    parts: [
      { flakeId:'P1145', color:'#9A7961', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1145-1DG', name: 'Rum (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1145-1DG.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#9A7961"],
    parts: [
      { flakeId:'P1145', color:'#9A7961', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1145-2BL', name: 'Rum (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1145-2BL.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#9A7961"],
    parts: [
      { flakeId:'P1145', color:'#9A7961', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1145-3SE', name: 'Rum (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1145-3SE.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#9A7961"],
    parts: [
      { flakeId:'P1145', color:'#9A7961', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1145-4OS', name: 'Rum (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1145-4OS.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#9A7961"],
    parts: [
      { flakeId:'P1145', color:'#9A7961', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1145-5LM', name: 'Rum (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1145-5LM.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#9A7961"],
    parts: [
      { flakeId:'P1145', color:'#9A7961', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1145-6BB', name: 'Rum (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1145-6BB.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#9A7961"],
    parts: [
      { flakeId:'P1145', color:'#9A7961', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1145-7LGR', name: 'Rum (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1145-7LGR.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#9A7961"],
    parts: [
      { flakeId:'P1145', color:'#9A7961', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1145-8BW', name: 'Rum (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1145-8BW.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#9A7961"],
    parts: [
      { flakeId:'P1145', color:'#9A7961', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1150-0LG', name: 'Shipwreck (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1150-0LG.webp`,
    tags: ["Brown", "Dark", "Neutral"],
    hex_colors: ["#8D7357"],
    parts: [
      { flakeId:'P1150', color:'#8D7357', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1150-1DG', name: 'Shipwreck (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1150-1DG.webp`,
    tags: ["Brown", "Dark", "Neutral"],
    hex_colors: ["#8D7357"],
    parts: [
      { flakeId:'P1150', color:'#8D7357', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1150-2BL', name: 'Shipwreck (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1150-2BL.webp`,
    tags: ["Brown", "Dark", "Neutral"],
    hex_colors: ["#8D7357"],
    parts: [
      { flakeId:'P1150', color:'#8D7357', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1150-3SE', name: 'Shipwreck (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1150-3SE.webp`,
    tags: ["Brown", "Dark", "Neutral"],
    hex_colors: ["#8D7357"],
    parts: [
      { flakeId:'P1150', color:'#8D7357', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1150-4OS', name: 'Shipwreck (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1150-4OS.webp`,
    tags: ["Brown", "Dark", "Neutral"],
    hex_colors: ["#8D7357"],
    parts: [
      { flakeId:'P1150', color:'#8D7357', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1150-5LM', name: 'Shipwreck (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1150-5LM.webp`,
    tags: ["Brown", "Dark", "Neutral"],
    hex_colors: ["#8D7357"],
    parts: [
      { flakeId:'P1150', color:'#8D7357', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1150-6BB', name: 'Shipwreck (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1150-6BB.webp`,
    tags: ["Brown", "Dark", "Neutral"],
    hex_colors: ["#8D7357"],
    parts: [
      { flakeId:'P1150', color:'#8D7357', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1150-7LGR', name: 'Shipwreck (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1150-7LGR.webp`,
    tags: ["Brown", "Dark", "Neutral"],
    hex_colors: ["#8D7357"],
    parts: [
      { flakeId:'P1150', color:'#8D7357', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1150-8BW', name: 'Shipwreck (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1150-8BW.webp`,
    tags: ["Brown", "Dark", "Neutral"],
    hex_colors: ["#8D7357"],
    parts: [
      { flakeId:'P1150', color:'#8D7357', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1155-0LG', name: 'Tiki (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1155-0LG.webp`,
    tags: ["Brown", "Neutral"],
    hex_colors: ["#A5865D"],
    parts: [
      { flakeId:'P1155', color:'#A5865D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1155-1DG', name: 'Tiki (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1155-1DG.webp`,
    tags: ["Brown", "Neutral"],
    hex_colors: ["#A5865D"],
    parts: [
      { flakeId:'P1155', color:'#A5865D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1155-2BL', name: 'Tiki (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1155-2BL.webp`,
    tags: ["Brown", "Neutral"],
    hex_colors: ["#A5865D"],
    parts: [
      { flakeId:'P1155', color:'#A5865D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1155-3SE', name: 'Tiki (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1155-3SE.webp`,
    tags: ["Brown", "Neutral"],
    hex_colors: ["#A5865D"],
    parts: [
      { flakeId:'P1155', color:'#A5865D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1155-4OS', name: 'Tiki (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1155-4OS.webp`,
    tags: ["Brown", "Neutral"],
    hex_colors: ["#A5865D"],
    parts: [
      { flakeId:'P1155', color:'#A5865D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1155-5LM', name: 'Tiki (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1155-5LM.webp`,
    tags: ["Brown", "Neutral"],
    hex_colors: ["#A5865D"],
    parts: [
      { flakeId:'P1155', color:'#A5865D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1155-6BB', name: 'Tiki (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1155-6BB.webp`,
    tags: ["Brown", "Neutral"],
    hex_colors: ["#A5865D"],
    parts: [
      { flakeId:'P1155', color:'#A5865D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1155-7LGR', name: 'Tiki (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1155-7LGR.webp`,
    tags: ["Brown", "Neutral"],
    hex_colors: ["#A5865D"],
    parts: [
      { flakeId:'P1155', color:'#A5865D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1155-8BW', name: 'Tiki (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1155-8BW.webp`,
    tags: ["Brown", "Neutral"],
    hex_colors: ["#A5865D"],
    parts: [
      { flakeId:'P1155', color:'#A5865D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1160-0LG', name: 'Cabana (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1160-0LG.webp`,
    tags: ["Brown", "Neutral", "Orange", "Red"],
    hex_colors: ["#926B57"],
    parts: [
      { flakeId:'P1160', color:'#926B57', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1160-1DG', name: 'Cabana (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1160-1DG.webp`,
    tags: ["Brown", "Neutral", "Orange", "Red"],
    hex_colors: ["#926B57"],
    parts: [
      { flakeId:'P1160', color:'#926B57', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1160-2BL', name: 'Cabana (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1160-2BL.webp`,
    tags: ["Brown", "Neutral", "Orange", "Red"],
    hex_colors: ["#926B57"],
    parts: [
      { flakeId:'P1160', color:'#926B57', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1160-3SE', name: 'Cabana (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1160-3SE.webp`,
    tags: ["Brown", "Neutral", "Orange", "Red"],
    hex_colors: ["#926B57"],
    parts: [
      { flakeId:'P1160', color:'#926B57', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1160-4OS', name: 'Cabana (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1160-4OS.webp`,
    tags: ["Brown", "Neutral", "Orange", "Red"],
    hex_colors: ["#926B57"],
    parts: [
      { flakeId:'P1160', color:'#926B57', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1160-5LM', name: 'Cabana (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1160-5LM.webp`,
    tags: ["Brown", "Neutral", "Orange", "Red"],
    hex_colors: ["#926B57"],
    parts: [
      { flakeId:'P1160', color:'#926B57', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1160-6BB', name: 'Cabana (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1160-6BB.webp`,
    tags: ["Brown", "Neutral", "Orange", "Red"],
    hex_colors: ["#926B57"],
    parts: [
      { flakeId:'P1160', color:'#926B57', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1160-7LGR', name: 'Cabana (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1160-7LGR.webp`,
    tags: ["Brown", "Neutral", "Orange", "Red"],
    hex_colors: ["#926B57"],
    parts: [
      { flakeId:'P1160', color:'#926B57', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1160-8BW', name: 'Cabana (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1160-8BW.webp`,
    tags: ["Brown", "Neutral", "Orange", "Red"],
    hex_colors: ["#926B57"],
    parts: [
      { flakeId:'P1160', color:'#926B57', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1165-0LG', name: 'Cannon (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1165-0LG.webp`,
    tags: ["Brown", "Dark"],
    hex_colors: ["#7C7466"],
    parts: [
      { flakeId:'P1165', color:'#7C7466', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1165-1DG', name: 'Cannon (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1165-1DG.webp`,
    tags: ["Brown", "Dark"],
    hex_colors: ["#7C7466"],
    parts: [
      { flakeId:'P1165', color:'#7C7466', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1165-2BL', name: 'Cannon (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1165-2BL.webp`,
    tags: ["Brown", "Dark"],
    hex_colors: ["#7C7466"],
    parts: [
      { flakeId:'P1165', color:'#7C7466', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1165-3SE', name: 'Cannon (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1165-3SE.webp`,
    tags: ["Brown", "Dark"],
    hex_colors: ["#7C7466"],
    parts: [
      { flakeId:'P1165', color:'#7C7466', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1165-4OS', name: 'Cannon (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1165-4OS.webp`,
    tags: ["Brown", "Dark"],
    hex_colors: ["#7C7466"],
    parts: [
      { flakeId:'P1165', color:'#7C7466', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1165-5LM', name: 'Cannon (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1165-5LM.webp`,
    tags: ["Brown", "Dark"],
    hex_colors: ["#7C7466"],
    parts: [
      { flakeId:'P1165', color:'#7C7466', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1165-6BB', name: 'Cannon (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1165-6BB.webp`,
    tags: ["Brown", "Dark"],
    hex_colors: ["#7C7466"],
    parts: [
      { flakeId:'P1165', color:'#7C7466', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1165-7LGR', name: 'Cannon (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1165-7LGR.webp`,
    tags: ["Brown", "Dark"],
    hex_colors: ["#7C7466"],
    parts: [
      { flakeId:'P1165', color:'#7C7466', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1165-8BW', name: 'Cannon (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1165-8BW.webp`,
    tags: ["Brown", "Dark"],
    hex_colors: ["#7C7466"],
    parts: [
      { flakeId:'P1165', color:'#7C7466', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1170-0LG', name: 'Sandal (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1170-0LG.webp`,
    tags: ["Brown", "Dark"],
    hex_colors: ["#7C6B5B"],
    parts: [
      { flakeId:'P1170', color:'#7C6B5B', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1170-1DG', name: 'Sandal (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1170-1DG.webp`,
    tags: ["Brown", "Dark"],
    hex_colors: ["#7C6B5B"],
    parts: [
      { flakeId:'P1170', color:'#7C6B5B', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1170-2BL', name: 'Sandal (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1170-2BL.webp`,
    tags: ["Brown", "Dark"],
    hex_colors: ["#7C6B5B"],
    parts: [
      { flakeId:'P1170', color:'#7C6B5B', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1170-3SE', name: 'Sandal (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1170-3SE.webp`,
    tags: ["Brown", "Dark"],
    hex_colors: ["#7C6B5B"],
    parts: [
      { flakeId:'P1170', color:'#7C6B5B', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1170-4OS', name: 'Sandal (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1170-4OS.webp`,
    tags: ["Brown", "Dark"],
    hex_colors: ["#7C6B5B"],
    parts: [
      { flakeId:'P1170', color:'#7C6B5B', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1170-5LM', name: 'Sandal (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1170-5LM.webp`,
    tags: ["Brown", "Dark"],
    hex_colors: ["#7C6B5B"],
    parts: [
      { flakeId:'P1170', color:'#7C6B5B', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1170-6BB', name: 'Sandal (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1170-6BB.webp`,
    tags: ["Brown", "Dark"],
    hex_colors: ["#7C6B5B"],
    parts: [
      { flakeId:'P1170', color:'#7C6B5B', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1170-7LGR', name: 'Sandal (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1170-7LGR.webp`,
    tags: ["Brown", "Dark"],
    hex_colors: ["#7C6B5B"],
    parts: [
      { flakeId:'P1170', color:'#7C6B5B', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1170-8BW', name: 'Sandal (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1170-8BW.webp`,
    tags: ["Brown", "Dark"],
    hex_colors: ["#7C6B5B"],
    parts: [
      { flakeId:'P1170', color:'#7C6B5B', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1210-0LG', name: 'Parrot (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1210-0LG.webp`,
    tags: ["Brown", "Dark"],
    hex_colors: ["#6882AE"],
    parts: [
      { flakeId:'P1210', color:'#6882AE', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1210-1DG', name: 'Parrot (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1210-1DG.webp`,
    tags: ["Brown", "Dark"],
    hex_colors: ["#6882AE"],
    parts: [
      { flakeId:'P1210', color:'#6882AE', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1210-2BL', name: 'Parrot (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1210-2BL.webp`,
    tags: ["Brown", "Dark"],
    hex_colors: ["#6882AE"],
    parts: [
      { flakeId:'P1210', color:'#6882AE', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1210-3SE', name: 'Parrot (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1210-3SE.webp`,
    tags: ["Brown", "Dark"],
    hex_colors: ["#6882AE"],
    parts: [
      { flakeId:'P1210', color:'#6882AE', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1210-4OS', name: 'Parrot (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1210-4OS.webp`,
    tags: ["Brown", "Dark"],
    hex_colors: ["#6882AE"],
    parts: [
      { flakeId:'P1210', color:'#6882AE', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1210-5LM', name: 'Parrot (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1210-5LM.webp`,
    tags: ["Brown", "Dark"],
    hex_colors: ["#6882AE"],
    parts: [
      { flakeId:'P1210', color:'#6882AE', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1210-6BB', name: 'Parrot (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1210-6BB.webp`,
    tags: ["Brown", "Dark"],
    hex_colors: ["#6882AE"],
    parts: [
      { flakeId:'P1210', color:'#6882AE', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1210-7LGR', name: 'Parrot (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1210-7LGR.webp`,
    tags: ["Brown", "Dark"],
    hex_colors: ["#6882AE"],
    parts: [
      { flakeId:'P1210', color:'#6882AE', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1210-8BW', name: 'Parrot (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1210-8BW.webp`,
    tags: ["Brown", "Dark"],
    hex_colors: ["#6882AE"],
    parts: [
      { flakeId:'P1210', color:'#6882AE', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1220-0LG', name: 'Bikini (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1220-0LG.webp`,
    tags: ["Bright", "Pink"],
    hex_colors: ["#A65C80"],
    parts: [
      { flakeId:'P1220', color:'#A65C80', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1220-1DG', name: 'Bikini (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1220-1DG.webp`,
    tags: ["Bright", "Pink"],
    hex_colors: ["#A65C80"],
    parts: [
      { flakeId:'P1220', color:'#A65C80', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1220-2BL', name: 'Bikini (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1220-2BL.webp`,
    tags: ["Bright", "Pink"],
    hex_colors: ["#A65C80"],
    parts: [
      { flakeId:'P1220', color:'#A65C80', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1220-3SE', name: 'Bikini (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1220-3SE.webp`,
    tags: ["Bright", "Pink"],
    hex_colors: ["#A65C80"],
    parts: [
      { flakeId:'P1220', color:'#A65C80', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1220-4OS', name: 'Bikini (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1220-4OS.webp`,
    tags: ["Bright", "Pink"],
    hex_colors: ["#A65C80"],
    parts: [
      { flakeId:'P1220', color:'#A65C80', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1220-5LM', name: 'Bikini (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1220-5LM.webp`,
    tags: ["Bright", "Pink"],
    hex_colors: ["#A65C80"],
    parts: [
      { flakeId:'P1220', color:'#A65C80', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1220-6BB', name: 'Bikini (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1220-6BB.webp`,
    tags: ["Bright", "Pink"],
    hex_colors: ["#A65C80"],
    parts: [
      { flakeId:'P1220', color:'#A65C80', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1220-7LGR', name: 'Bikini (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1220-7LGR.webp`,
    tags: ["Bright", "Pink"],
    hex_colors: ["#A65C80"],
    parts: [
      { flakeId:'P1220', color:'#A65C80', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1220-8BW', name: 'Bikini (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1220-8BW.webp`,
    tags: ["Bright", "Pink"],
    hex_colors: ["#A65C80"],
    parts: [
      { flakeId:'P1220', color:'#A65C80', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1230-0LG', name: 'Starfish (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1230-0LG.webp`,
    tags: ["Bold", "Orange", "Red"],
    hex_colors: ["#AF6B5D"],
    parts: [
      { flakeId:'P1230', color:'#AF6B5D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1230-1DG', name: 'Starfish (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1230-1DG.webp`,
    tags: ["Bold", "Orange", "Red"],
    hex_colors: ["#AF6B5D"],
    parts: [
      { flakeId:'P1230', color:'#AF6B5D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1230-2BL', name: 'Starfish (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1230-2BL.webp`,
    tags: ["Bold", "Orange", "Red"],
    hex_colors: ["#AF6B5D"],
    parts: [
      { flakeId:'P1230', color:'#AF6B5D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1230-3SE', name: 'Starfish (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1230-3SE.webp`,
    tags: ["Bold", "Orange", "Red"],
    hex_colors: ["#AF6B5D"],
    parts: [
      { flakeId:'P1230', color:'#AF6B5D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1230-4OS', name: 'Starfish (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1230-4OS.webp`,
    tags: ["Bold", "Orange", "Red"],
    hex_colors: ["#AF6B5D"],
    parts: [
      { flakeId:'P1230', color:'#AF6B5D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1230-5LM', name: 'Starfish (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1230-5LM.webp`,
    tags: ["Bold", "Orange", "Red"],
    hex_colors: ["#AF6B5D"],
    parts: [
      { flakeId:'P1230', color:'#AF6B5D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1230-6BB', name: 'Starfish (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1230-6BB.webp`,
    tags: ["Bold", "Orange", "Red"],
    hex_colors: ["#AF6B5D"],
    parts: [
      { flakeId:'P1230', color:'#AF6B5D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1230-7LGR', name: 'Starfish (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1230-7LGR.webp`,
    tags: ["Bold", "Orange", "Red"],
    hex_colors: ["#AF6B5D"],
    parts: [
      { flakeId:'P1230', color:'#AF6B5D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1230-8BW', name: 'Starfish (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1230-8BW.webp`,
    tags: ["Bold", "Orange", "Red"],
    hex_colors: ["#AF6B5D"],
    parts: [
      { flakeId:'P1230', color:'#AF6B5D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1240-0LG', name: 'Americana (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1240-0LG.webp`,
    tags: ["Bright", "Red"],
    hex_colors: ["#A25859"],
    parts: [
      { flakeId:'P1240', color:'#A25859', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1240-1DG', name: 'Americana (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1240-1DG.webp`,
    tags: ["Bright", "Red"],
    hex_colors: ["#A25859"],
    parts: [
      { flakeId:'P1240', color:'#A25859', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1240-2BL', name: 'Americana (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1240-2BL.webp`,
    tags: ["Bright", "Red"],
    hex_colors: ["#A25859"],
    parts: [
      { flakeId:'P1240', color:'#A25859', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1240-3SE', name: 'Americana (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1240-3SE.webp`,
    tags: ["Bright", "Red"],
    hex_colors: ["#A25859"],
    parts: [
      { flakeId:'P1240', color:'#A25859', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1240-4OS', name: 'Americana (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1240-4OS.webp`,
    tags: ["Bright", "Red"],
    hex_colors: ["#A25859"],
    parts: [
      { flakeId:'P1240', color:'#A25859', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1240-5LM', name: 'Americana (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1240-5LM.webp`,
    tags: ["Bright", "Red"],
    hex_colors: ["#A25859"],
    parts: [
      { flakeId:'P1240', color:'#A25859', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1240-6BB', name: 'Americana (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1240-6BB.webp`,
    tags: ["Bright", "Red"],
    hex_colors: ["#A25859"],
    parts: [
      { flakeId:'P1240', color:'#A25859', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1240-7LGR', name: 'Americana (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1240-7LGR.webp`,
    tags: ["Bright", "Red"],
    hex_colors: ["#A25859"],
    parts: [
      { flakeId:'P1240', color:'#A25859', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1240-8BW', name: 'Americana (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1240-8BW.webp`,
    tags: ["Bright", "Red"],
    hex_colors: ["#A25859"],
    parts: [
      { flakeId:'P1240', color:'#A25859', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1250-0LG', name: 'Sangria (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1250-0LG.webp`,
    tags: ["Dark", "Purple", "Red"],
    hex_colors: ["#85686C"],
    parts: [
      { flakeId:'P1250', color:'#85686C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1250-1DG', name: 'Sangria (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1250-1DG.webp`,
    tags: ["Dark", "Purple", "Red"],
    hex_colors: ["#85686C"],
    parts: [
      { flakeId:'P1250', color:'#85686C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1250-2BL', name: 'Sangria (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1250-2BL.webp`,
    tags: ["Dark", "Purple", "Red"],
    hex_colors: ["#85686C"],
    parts: [
      { flakeId:'P1250', color:'#85686C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1250-3SE', name: 'Sangria (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1250-3SE.webp`,
    tags: ["Dark", "Purple", "Red"],
    hex_colors: ["#85686C"],
    parts: [
      { flakeId:'P1250', color:'#85686C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1250-4OS', name: 'Sangria (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1250-4OS.webp`,
    tags: ["Dark", "Purple", "Red"],
    hex_colors: ["#85686C"],
    parts: [
      { flakeId:'P1250', color:'#85686C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1250-5LM', name: 'Sangria (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1250-5LM.webp`,
    tags: ["Dark", "Purple", "Red"],
    hex_colors: ["#85686C"],
    parts: [
      { flakeId:'P1250', color:'#85686C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1250-6BB', name: 'Sangria (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1250-6BB.webp`,
    tags: ["Dark", "Purple", "Red"],
    hex_colors: ["#85686C"],
    parts: [
      { flakeId:'P1250', color:'#85686C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1250-7LGR', name: 'Sangria (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1250-7LGR.webp`,
    tags: ["Dark", "Purple", "Red"],
    hex_colors: ["#85686C"],
    parts: [
      { flakeId:'P1250', color:'#85686C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1250-8BW', name: 'Sangria (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1250-8BW.webp`,
    tags: ["Dark", "Purple", "Red"],
    hex_colors: ["#85686C"],
    parts: [
      { flakeId:'P1250', color:'#85686C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1310-0LG', name: 'Mandarin (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1310-0LG.webp`,
    tags: ["Bright", "Orange", "Yellow"],
    hex_colors: ["#BE8E5B"],
    parts: [
      { flakeId:'P1310', color:'#BE8E5B', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1310-1DG', name: 'Mandarin (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1310-1DG.webp`,
    tags: ["Bright", "Orange", "Yellow"],
    hex_colors: ["#BE8E5B"],
    parts: [
      { flakeId:'P1310', color:'#BE8E5B', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1310-2BL', name: 'Mandarin (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1310-2BL.webp`,
    tags: ["Bright", "Orange", "Yellow"],
    hex_colors: ["#BE8E5B"],
    parts: [
      { flakeId:'P1310', color:'#BE8E5B', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1310-3SE', name: 'Mandarin (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1310-3SE.webp`,
    tags: ["Bright", "Orange", "Yellow"],
    hex_colors: ["#BE8E5B"],
    parts: [
      { flakeId:'P1310', color:'#BE8E5B', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1310-4OS', name: 'Mandarin (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1310-4OS.webp`,
    tags: ["Bright", "Orange", "Yellow"],
    hex_colors: ["#BE8E5B"],
    parts: [
      { flakeId:'P1310', color:'#BE8E5B', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1310-5LM', name: 'Mandarin (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1310-5LM.webp`,
    tags: ["Bright", "Orange", "Yellow"],
    hex_colors: ["#BE8E5B"],
    parts: [
      { flakeId:'P1310', color:'#BE8E5B', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1310-6BB', name: 'Mandarin (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1310-6BB.webp`,
    tags: ["Bright", "Orange", "Yellow"],
    hex_colors: ["#BE8E5B"],
    parts: [
      { flakeId:'P1310', color:'#BE8E5B', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1310-7LGR', name: 'Mandarin (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1310-7LGR.webp`,
    tags: ["Bright", "Orange", "Yellow"],
    hex_colors: ["#BE8E5B"],
    parts: [
      { flakeId:'P1310', color:'#BE8E5B', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1310-8BW', name: 'Mandarin (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1310-8BW.webp`,
    tags: ["Bright", "Orange", "Yellow"],
    hex_colors: ["#BE8E5B"],
    parts: [
      { flakeId:'P1310', color:'#BE8E5B', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1320-0LG', name: 'Mango (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1320-0LG.webp`,
    tags: ["Bright", "Orange", "Red"],
    hex_colors: ["#B36855"],
    parts: [
      { flakeId:'P1320', color:'#B36855', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1320-1DG', name: 'Mango (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1320-1DG.webp`,
    tags: ["Bright", "Orange", "Red"],
    hex_colors: ["#B36855"],
    parts: [
      { flakeId:'P1320', color:'#B36855', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1320-2BL', name: 'Mango (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1320-2BL.webp`,
    tags: ["Bright", "Orange", "Red"],
    hex_colors: ["#B36855"],
    parts: [
      { flakeId:'P1320', color:'#B36855', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1320-3SE', name: 'Mango (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1320-3SE.webp`,
    tags: ["Bright", "Orange", "Red"],
    hex_colors: ["#B36855"],
    parts: [
      { flakeId:'P1320', color:'#B36855', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1320-4OS', name: 'Mango (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1320-4OS.webp`,
    tags: ["Bright", "Orange", "Red"],
    hex_colors: ["#B36855"],
    parts: [
      { flakeId:'P1320', color:'#B36855', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1320-5LM', name: 'Mango (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1320-5LM.webp`,
    tags: ["Bright", "Orange", "Red"],
    hex_colors: ["#B36855"],
    parts: [
      { flakeId:'P1320', color:'#B36855', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1320-6BB', name: 'Mango (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1320-6BB.webp`,
    tags: ["Bright", "Orange", "Red"],
    hex_colors: ["#B36855"],
    parts: [
      { flakeId:'P1320', color:'#B36855', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1320-7LGR', name: 'Mango (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1320-7LGR.webp`,
    tags: ["Bright", "Orange", "Red"],
    hex_colors: ["#B36855"],
    parts: [
      { flakeId:'P1320', color:'#B36855', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1320-8BW', name: 'Mango (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1320-8BW.webp`,
    tags: ["Bright", "Orange", "Red"],
    hex_colors: ["#B36855"],
    parts: [
      { flakeId:'P1320', color:'#B36855', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1330-0LG', name: 'Coral (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1330-0LG.webp`,
    tags: ["Bright", "Orange"],
    hex_colors: ["#B98762"],
    parts: [
      { flakeId:'P1330', color:'#B98762', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1330-1DG', name: 'Coral (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1330-1DG.webp`,
    tags: ["Bright", "Orange"],
    hex_colors: ["#B98762"],
    parts: [
      { flakeId:'P1330', color:'#B98762', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1330-2BL', name: 'Coral (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1330-2BL.webp`,
    tags: ["Bright", "Orange"],
    hex_colors: ["#B98762"],
    parts: [
      { flakeId:'P1330', color:'#B98762', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1330-3SE', name: 'Coral (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1330-3SE.webp`,
    tags: ["Bright", "Orange"],
    hex_colors: ["#B98762"],
    parts: [
      { flakeId:'P1330', color:'#B98762', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1330-4OS', name: 'Coral (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1330-4OS.webp`,
    tags: ["Bright", "Orange"],
    hex_colors: ["#B98762"],
    parts: [
      { flakeId:'P1330', color:'#B98762', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1330-5LM', name: 'Coral (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1330-5LM.webp`,
    tags: ["Bright", "Orange"],
    hex_colors: ["#B98762"],
    parts: [
      { flakeId:'P1330', color:'#B98762', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1330-6BB', name: 'Coral (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1330-6BB.webp`,
    tags: ["Bright", "Orange"],
    hex_colors: ["#B98762"],
    parts: [
      { flakeId:'P1330', color:'#B98762', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1330-7LGR', name: 'Coral (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1330-7LGR.webp`,
    tags: ["Bright", "Orange"],
    hex_colors: ["#B98762"],
    parts: [
      { flakeId:'P1330', color:'#B98762', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1330-8BW', name: 'Coral (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1330-8BW.webp`,
    tags: ["Bright", "Orange"],
    hex_colors: ["#B98762"],
    parts: [
      { flakeId:'P1330', color:'#B98762', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1340-0LG', name: 'Ginger (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1340-0LG.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#976B57"],
    parts: [
      { flakeId:'P1340', color:'#976B57', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1340-1DG', name: 'Ginger (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1340-1DG.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#976B57"],
    parts: [
      { flakeId:'P1340', color:'#976B57', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1340-2BL', name: 'Ginger (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1340-2BL.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#976B57"],
    parts: [
      { flakeId:'P1340', color:'#976B57', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1340-3SE', name: 'Ginger (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1340-3SE.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#976B57"],
    parts: [
      { flakeId:'P1340', color:'#976B57', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1340-4OS', name: 'Ginger (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1340-4OS.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#976B57"],
    parts: [
      { flakeId:'P1340', color:'#976B57', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1340-5LM', name: 'Ginger (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1340-5LM.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#976B57"],
    parts: [
      { flakeId:'P1340', color:'#976B57', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1340-6BB', name: 'Ginger (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1340-6BB.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#976B57"],
    parts: [
      { flakeId:'P1340', color:'#976B57', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1340-7LGR', name: 'Ginger (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1340-7LGR.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#976B57"],
    parts: [
      { flakeId:'P1340', color:'#976B57', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1340-8BW', name: 'Ginger (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1340-8BW.webp`,
    tags: ["Brown", "Neutral", "Orange"],
    hex_colors: ["#976B57"],
    parts: [
      { flakeId:'P1340', color:'#976B57', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1410-0LG', name: 'Banana (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1410-0LG.webp`,
    tags: ["Bold", "Bright", "Yellow"],
    hex_colors: ["#C6B357"],
    parts: [
      { flakeId:'P1410', color:'#C6B357', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1410-1DG', name: 'Banana (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1410-1DG.webp`,
    tags: ["Bold", "Bright", "Yellow"],
    hex_colors: ["#C6B357"],
    parts: [
      { flakeId:'P1410', color:'#C6B357', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1410-2BL', name: 'Banana (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1410-2BL.webp`,
    tags: ["Bold", "Bright", "Yellow"],
    hex_colors: ["#C6B357"],
    parts: [
      { flakeId:'P1410', color:'#C6B357', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1410-3SE', name: 'Banana (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1410-3SE.webp`,
    tags: ["Bold", "Bright", "Yellow"],
    hex_colors: ["#C6B357"],
    parts: [
      { flakeId:'P1410', color:'#C6B357', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1410-4OS', name: 'Banana (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1410-4OS.webp`,
    tags: ["Bold", "Bright", "Yellow"],
    hex_colors: ["#C6B357"],
    parts: [
      { flakeId:'P1410', color:'#C6B357', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1410-5LM', name: 'Banana (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1410-5LM.webp`,
    tags: ["Bold", "Bright", "Yellow"],
    hex_colors: ["#C6B357"],
    parts: [
      { flakeId:'P1410', color:'#C6B357', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1410-6BB', name: 'Banana (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1410-6BB.webp`,
    tags: ["Bold", "Bright", "Yellow"],
    hex_colors: ["#C6B357"],
    parts: [
      { flakeId:'P1410', color:'#C6B357', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1410-7LGR', name: 'Banana (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1410-7LGR.webp`,
    tags: ["Bold", "Bright", "Yellow"],
    hex_colors: ["#C6B357"],
    parts: [
      { flakeId:'P1410', color:'#C6B357', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1410-8BW', name: 'Banana (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1410-8BW.webp`,
    tags: ["Bold", "Bright", "Yellow"],
    hex_colors: ["#C6B357"],
    parts: [
      { flakeId:'P1410', color:'#C6B357', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1420-0LG', name: 'Papaya (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1420-0LG.webp`,
    tags: ["Bright", "Yellow"],
    hex_colors: ["#C4AF6C"],
    parts: [
      { flakeId:'P1420', color:'#C4AF6C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1420-1DG', name: 'Papaya (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1420-1DG.webp`,
    tags: ["Bright", "Yellow"],
    hex_colors: ["#C4AF6C"],
    parts: [
      { flakeId:'P1420', color:'#C4AF6C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1420-2BL', name: 'Papaya (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1420-2BL.webp`,
    tags: ["Bright", "Yellow"],
    hex_colors: ["#C4AF6C"],
    parts: [
      { flakeId:'P1420', color:'#C4AF6C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1420-3SE', name: 'Papaya (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1420-3SE.webp`,
    tags: ["Bright", "Yellow"],
    hex_colors: ["#C4AF6C"],
    parts: [
      { flakeId:'P1420', color:'#C4AF6C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1420-4OS', name: 'Papaya (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1420-4OS.webp`,
    tags: ["Bright", "Yellow"],
    hex_colors: ["#C4AF6C"],
    parts: [
      { flakeId:'P1420', color:'#C4AF6C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1420-5LM', name: 'Papaya (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1420-5LM.webp`,
    tags: ["Bright", "Yellow"],
    hex_colors: ["#C4AF6C"],
    parts: [
      { flakeId:'P1420', color:'#C4AF6C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1420-6BB', name: 'Papaya (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1420-6BB.webp`,
    tags: ["Bright", "Yellow"],
    hex_colors: ["#C4AF6C"],
    parts: [
      { flakeId:'P1420', color:'#C4AF6C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1420-7LGR', name: 'Papaya (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1420-7LGR.webp`,
    tags: ["Bright", "Yellow"],
    hex_colors: ["#C4AF6C"],
    parts: [
      { flakeId:'P1420', color:'#C4AF6C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1420-8BW', name: 'Papaya (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1420-8BW.webp`,
    tags: ["Bright", "Yellow"],
    hex_colors: ["#C4AF6C"],
    parts: [
      { flakeId:'P1420', color:'#C4AF6C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1430-0LG', name: 'Daydream (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1430-0LG.webp`,
    tags: ["Green", "Grey", "Neutral", "Yellow"],
    hex_colors: ["#9D9070"],
    parts: [
      { flakeId:'P1430', color:'#9D9070', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1430-1DG', name: 'Daydream (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1430-1DG.webp`,
    tags: ["Green", "Grey", "Neutral", "Yellow"],
    hex_colors: ["#9D9070"],
    parts: [
      { flakeId:'P1430', color:'#9D9070', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1430-2BL', name: 'Daydream (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1430-2BL.webp`,
    tags: ["Green", "Grey", "Neutral", "Yellow"],
    hex_colors: ["#9D9070"],
    parts: [
      { flakeId:'P1430', color:'#9D9070', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1430-3SE', name: 'Daydream (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1430-3SE.webp`,
    tags: ["Green", "Grey", "Neutral", "Yellow"],
    hex_colors: ["#9D9070"],
    parts: [
      { flakeId:'P1430', color:'#9D9070', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1430-4OS', name: 'Daydream (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1430-4OS.webp`,
    tags: ["Green", "Grey", "Neutral", "Yellow"],
    hex_colors: ["#9D9070"],
    parts: [
      { flakeId:'P1430', color:'#9D9070', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1430-5LM', name: 'Daydream (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1430-5LM.webp`,
    tags: ["Green", "Grey", "Neutral", "Yellow"],
    hex_colors: ["#9D9070"],
    parts: [
      { flakeId:'P1430', color:'#9D9070', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1430-6BB', name: 'Daydream (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1430-6BB.webp`,
    tags: ["Green", "Grey", "Neutral", "Yellow"],
    hex_colors: ["#9D9070"],
    parts: [
      { flakeId:'P1430', color:'#9D9070', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1430-7LGR', name: 'Daydream (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1430-7LGR.webp`,
    tags: ["Green", "Grey", "Neutral", "Yellow"],
    hex_colors: ["#9D9070"],
    parts: [
      { flakeId:'P1430', color:'#9D9070', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1430-8BW', name: 'Daydream (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1430-8BW.webp`,
    tags: ["Green", "Grey", "Neutral", "Yellow"],
    hex_colors: ["#9D9070"],
    parts: [
      { flakeId:'P1430', color:'#9D9070', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1440-0LG', name: 'Sunset (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1440-0LG.webp`,
    tags: ["Green", "Grey", "Neutral"],
    hex_colors: ["#A29C84"],
    parts: [
      { flakeId:'P1440', color:'#A29C84', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1440-1DG', name: 'Sunset (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1440-1DG.webp`,
    tags: ["Green", "Grey", "Neutral"],
    hex_colors: ["#A29C84"],
    parts: [
      { flakeId:'P1440', color:'#A29C84', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1440-2BL', name: 'Sunset (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1440-2BL.webp`,
    tags: ["Green", "Grey", "Neutral"],
    hex_colors: ["#A29C84"],
    parts: [
      { flakeId:'P1440', color:'#A29C84', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1440-3SE', name: 'Sunset (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1440-3SE.webp`,
    tags: ["Green", "Grey", "Neutral"],
    hex_colors: ["#A29C84"],
    parts: [
      { flakeId:'P1440', color:'#A29C84', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1440-4OS', name: 'Sunset (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1440-4OS.webp`,
    tags: ["Green", "Grey", "Neutral"],
    hex_colors: ["#A29C84"],
    parts: [
      { flakeId:'P1440', color:'#A29C84', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1440-5LM', name: 'Sunset (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1440-5LM.webp`,
    tags: ["Green", "Grey", "Neutral"],
    hex_colors: ["#A29C84"],
    parts: [
      { flakeId:'P1440', color:'#A29C84', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1440-6BB', name: 'Sunset (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1440-6BB.webp`,
    tags: ["Green", "Grey", "Neutral"],
    hex_colors: ["#A29C84"],
    parts: [
      { flakeId:'P1440', color:'#A29C84', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1440-7LGR', name: 'Sunset (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1440-7LGR.webp`,
    tags: ["Green", "Grey", "Neutral"],
    hex_colors: ["#A29C84"],
    parts: [
      { flakeId:'P1440', color:'#A29C84', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1440-8BW', name: 'Sunset (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1440-8BW.webp`,
    tags: ["Green", "Grey", "Neutral"],
    hex_colors: ["#A29C84"],
    parts: [
      { flakeId:'P1440', color:'#A29C84', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1510-0LG', name: 'Margarita (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1510-0LG.webp`,
    tags: ["Bold", "Bright", "Green"],
    hex_colors: ["#759B7E"],
    parts: [
      { flakeId:'P1510', color:'#759B7E', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1510-1DG', name: 'Margarita (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1510-1DG.webp`,
    tags: ["Bold", "Bright", "Green"],
    hex_colors: ["#759B7E"],
    parts: [
      { flakeId:'P1510', color:'#759B7E', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1510-2BL', name: 'Margarita (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1510-2BL.webp`,
    tags: ["Bold", "Bright", "Green"],
    hex_colors: ["#759B7E"],
    parts: [
      { flakeId:'P1510', color:'#759B7E', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1510-3SE', name: 'Margarita (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1510-3SE.webp`,
    tags: ["Bold", "Bright", "Green"],
    hex_colors: ["#759B7E"],
    parts: [
      { flakeId:'P1510', color:'#759B7E', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1510-4OS', name: 'Margarita (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1510-4OS.webp`,
    tags: ["Bold", "Bright", "Green"],
    hex_colors: ["#759B7E"],
    parts: [
      { flakeId:'P1510', color:'#759B7E', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1510-5LM', name: 'Margarita (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1510-5LM.webp`,
    tags: ["Bold", "Bright", "Green"],
    hex_colors: ["#759B7E"],
    parts: [
      { flakeId:'P1510', color:'#759B7E', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1510-6BB', name: 'Margarita (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1510-6BB.webp`,
    tags: ["Bold", "Bright", "Green"],
    hex_colors: ["#759B7E"],
    parts: [
      { flakeId:'P1510', color:'#759B7E', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1510-7LGR', name: 'Margarita (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1510-7LGR.webp`,
    tags: ["Bold", "Bright", "Green"],
    hex_colors: ["#759B7E"],
    parts: [
      { flakeId:'P1510', color:'#759B7E', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1510-8BW', name: 'Margarita (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1510-8BW.webp`,
    tags: ["Bold", "Bright", "Green"],
    hex_colors: ["#759B7E"],
    parts: [
      { flakeId:'P1510', color:'#759B7E', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1520-0LG', name: 'Avocado (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1520-0LG.webp`,
    tags: ["Bold", "Bright", "Green"],
    hex_colors: ["#7DA57A"],
    parts: [
      { flakeId:'P1520', color:'#7DA57A', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1520-1DG', name: 'Avocado (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1520-1DG.webp`,
    tags: ["Bold", "Bright", "Green"],
    hex_colors: ["#7DA57A"],
    parts: [
      { flakeId:'P1520', color:'#7DA57A', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1520-2BL', name: 'Avocado (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1520-2BL.webp`,
    tags: ["Bold", "Bright", "Green"],
    hex_colors: ["#7DA57A"],
    parts: [
      { flakeId:'P1520', color:'#7DA57A', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1520-3SE', name: 'Avocado (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1520-3SE.webp`,
    tags: ["Bold", "Bright", "Green"],
    hex_colors: ["#7DA57A"],
    parts: [
      { flakeId:'P1520', color:'#7DA57A', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1520-4OS', name: 'Avocado (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1520-4OS.webp`,
    tags: ["Bold", "Bright", "Green"],
    hex_colors: ["#7DA57A"],
    parts: [
      { flakeId:'P1520', color:'#7DA57A', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1520-5LM', name: 'Avocado (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1520-5LM.webp`,
    tags: ["Bold", "Bright", "Green"],
    hex_colors: ["#7DA57A"],
    parts: [
      { flakeId:'P1520', color:'#7DA57A', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1520-6BB', name: 'Avocado (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1520-6BB.webp`,
    tags: ["Bold", "Bright", "Green"],
    hex_colors: ["#7DA57A"],
    parts: [
      { flakeId:'P1520', color:'#7DA57A', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1520-7LGR', name: 'Avocado (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1520-7LGR.webp`,
    tags: ["Bold", "Bright", "Green"],
    hex_colors: ["#7DA57A"],
    parts: [
      { flakeId:'P1520', color:'#7DA57A', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1520-8BW', name: 'Avocado (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1520-8BW.webp`,
    tags: ["Bold", "Bright", "Green"],
    hex_colors: ["#7DA57A"],
    parts: [
      { flakeId:'P1520', color:'#7DA57A', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1530-0LG', name: 'Seaweed (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1530-0LG.webp`,
    tags: ["Bold", "Green"],
    hex_colors: ["#657867"],
    parts: [
      { flakeId:'P1530', color:'#657867', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1530-1DG', name: 'Seaweed (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1530-1DG.webp`,
    tags: ["Bold", "Green"],
    hex_colors: ["#657867"],
    parts: [
      { flakeId:'P1530', color:'#657867', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1530-2BL', name: 'Seaweed (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1530-2BL.webp`,
    tags: ["Bold", "Green"],
    hex_colors: ["#657867"],
    parts: [
      { flakeId:'P1530', color:'#657867', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1530-3SE', name: 'Seaweed (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1530-3SE.webp`,
    tags: ["Bold", "Green"],
    hex_colors: ["#657867"],
    parts: [
      { flakeId:'P1530', color:'#657867', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1530-4OS', name: 'Seaweed (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1530-4OS.webp`,
    tags: ["Bold", "Green"],
    hex_colors: ["#657867"],
    parts: [
      { flakeId:'P1530', color:'#657867', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1530-5LM', name: 'Seaweed (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1530-5LM.webp`,
    tags: ["Bold", "Green"],
    hex_colors: ["#657867"],
    parts: [
      { flakeId:'P1530', color:'#657867', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1530-6BB', name: 'Seaweed (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1530-6BB.webp`,
    tags: ["Bold", "Green"],
    hex_colors: ["#657867"],
    parts: [
      { flakeId:'P1530', color:'#657867', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1530-7LGR', name: 'Seaweed (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1530-7LGR.webp`,
    tags: ["Bold", "Green"],
    hex_colors: ["#657867"],
    parts: [
      { flakeId:'P1530', color:'#657867', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1530-8BW', name: 'Seaweed (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1530-8BW.webp`,
    tags: ["Bold", "Green"],
    hex_colors: ["#657867"],
    parts: [
      { flakeId:'P1530', color:'#657867', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1540-0LG', name: 'Palm (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1540-0LG.webp`,
    tags: ["Brown", "Green", "Grey", "Neutral"],
    hex_colors: ["#798067"],
    parts: [
      { flakeId:'P1540', color:'#798067', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1540-1DG', name: 'Palm (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1540-1DG.webp`,
    tags: ["Brown", "Green", "Grey", "Neutral"],
    hex_colors: ["#798067"],
    parts: [
      { flakeId:'P1540', color:'#798067', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1540-2BL', name: 'Palm (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1540-2BL.webp`,
    tags: ["Brown", "Green", "Grey", "Neutral"],
    hex_colors: ["#798067"],
    parts: [
      { flakeId:'P1540', color:'#798067', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1540-3SE', name: 'Palm (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1540-3SE.webp`,
    tags: ["Brown", "Green", "Grey", "Neutral"],
    hex_colors: ["#798067"],
    parts: [
      { flakeId:'P1540', color:'#798067', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1540-4OS', name: 'Palm (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1540-4OS.webp`,
    tags: ["Brown", "Green", "Grey", "Neutral"],
    hex_colors: ["#798067"],
    parts: [
      { flakeId:'P1540', color:'#798067', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1540-5LM', name: 'Palm (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1540-5LM.webp`,
    tags: ["Brown", "Green", "Grey", "Neutral"],
    hex_colors: ["#798067"],
    parts: [
      { flakeId:'P1540', color:'#798067', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1540-6BB', name: 'Palm (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1540-6BB.webp`,
    tags: ["Brown", "Green", "Grey", "Neutral"],
    hex_colors: ["#798067"],
    parts: [
      { flakeId:'P1540', color:'#798067', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1540-7LGR', name: 'Palm (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1540-7LGR.webp`,
    tags: ["Brown", "Green", "Grey", "Neutral"],
    hex_colors: ["#798067"],
    parts: [
      { flakeId:'P1540', color:'#798067', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1540-8BW', name: 'Palm (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1540-8BW.webp`,
    tags: ["Brown", "Green", "Grey", "Neutral"],
    hex_colors: ["#798067"],
    parts: [
      { flakeId:'P1540', color:'#798067', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1550-0LG', name: 'Pier (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1550-0LG.webp`,
    tags: ["Brown", "Green", "Grey", "Neutral"],
    hex_colors: ["#7C7E65"],
    parts: [
      { flakeId:'P1550', color:'#7C7E65', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1550-1DG', name: 'Pier (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1550-1DG.webp`,
    tags: ["Brown", "Green", "Grey", "Neutral"],
    hex_colors: ["#7C7E65"],
    parts: [
      { flakeId:'P1550', color:'#7C7E65', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1550-2BL', name: 'Pier (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1550-2BL.webp`,
    tags: ["Brown", "Green", "Grey", "Neutral"],
    hex_colors: ["#7C7E65"],
    parts: [
      { flakeId:'P1550', color:'#7C7E65', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1550-3SE', name: 'Pier (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1550-3SE.webp`,
    tags: ["Brown", "Green", "Grey", "Neutral"],
    hex_colors: ["#7C7E65"],
    parts: [
      { flakeId:'P1550', color:'#7C7E65', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1550-4OS', name: 'Pier (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1550-4OS.webp`,
    tags: ["Brown", "Green", "Grey", "Neutral"],
    hex_colors: ["#7C7E65"],
    parts: [
      { flakeId:'P1550', color:'#7C7E65', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1550-5LM', name: 'Pier (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1550-5LM.webp`,
    tags: ["Brown", "Green", "Grey", "Neutral"],
    hex_colors: ["#7C7E65"],
    parts: [
      { flakeId:'P1550', color:'#7C7E65', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1550-6BB', name: 'Pier (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1550-6BB.webp`,
    tags: ["Brown", "Green", "Grey", "Neutral"],
    hex_colors: ["#7C7E65"],
    parts: [
      { flakeId:'P1550', color:'#7C7E65', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1550-7LGR', name: 'Pier (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1550-7LGR.webp`,
    tags: ["Brown", "Green", "Grey", "Neutral"],
    hex_colors: ["#7C7E65"],
    parts: [
      { flakeId:'P1550', color:'#7C7E65', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1550-8BW', name: 'Pier (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1550-8BW.webp`,
    tags: ["Brown", "Green", "Grey", "Neutral"],
    hex_colors: ["#7C7E65"],
    parts: [
      { flakeId:'P1550', color:'#7C7E65', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1560-0LG', name: 'Kona (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1560-0LG.webp`,
    tags: ["Dark", "Green"],
    hex_colors: ["#545F53"],
    parts: [
      { flakeId:'P1560', color:'#545F53', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1560-1DG', name: 'Kona (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1560-1DG.webp`,
    tags: ["Dark", "Green"],
    hex_colors: ["#545F53"],
    parts: [
      { flakeId:'P1560', color:'#545F53', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1560-2BL', name: 'Kona (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1560-2BL.webp`,
    tags: ["Dark", "Green"],
    hex_colors: ["#545F53"],
    parts: [
      { flakeId:'P1560', color:'#545F53', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1560-3SE', name: 'Kona (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1560-3SE.webp`,
    tags: ["Dark", "Green"],
    hex_colors: ["#545F53"],
    parts: [
      { flakeId:'P1560', color:'#545F53', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1560-4OS', name: 'Kona (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1560-4OS.webp`,
    tags: ["Dark", "Green"],
    hex_colors: ["#545F53"],
    parts: [
      { flakeId:'P1560', color:'#545F53', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1560-5LM', name: 'Kona (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1560-5LM.webp`,
    tags: ["Dark", "Green"],
    hex_colors: ["#545F53"],
    parts: [
      { flakeId:'P1560', color:'#545F53', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1560-6BB', name: 'Kona (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1560-6BB.webp`,
    tags: ["Dark", "Green"],
    hex_colors: ["#545F53"],
    parts: [
      { flakeId:'P1560', color:'#545F53', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1560-7LGR', name: 'Kona (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1560-7LGR.webp`,
    tags: ["Dark", "Green"],
    hex_colors: ["#545F53"],
    parts: [
      { flakeId:'P1560', color:'#545F53', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1560-8BW', name: 'Kona (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1560-8BW.webp`,
    tags: ["Dark", "Green"],
    hex_colors: ["#545F53"],
    parts: [
      { flakeId:'P1560', color:'#545F53', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1610-0LG', name: 'Caribbean (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1610-0LG.webp`,
    tags: ["Blue", "Light"],
    hex_colors: ["#7DB2CA"],
    parts: [
      { flakeId:'P1610', color:'#7DB2CA', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1610-1DG', name: 'Caribbean (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1610-1DG.webp`,
    tags: ["Blue", "Light"],
    hex_colors: ["#7DB2CA"],
    parts: [
      { flakeId:'P1610', color:'#7DB2CA', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1610-2BL', name: 'Caribbean (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1610-2BL.webp`,
    tags: ["Blue", "Light"],
    hex_colors: ["#7DB2CA"],
    parts: [
      { flakeId:'P1610', color:'#7DB2CA', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1610-3SE', name: 'Caribbean (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1610-3SE.webp`,
    tags: ["Blue", "Light"],
    hex_colors: ["#7DB2CA"],
    parts: [
      { flakeId:'P1610', color:'#7DB2CA', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1610-4OS', name: 'Caribbean (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1610-4OS.webp`,
    tags: ["Blue", "Light"],
    hex_colors: ["#7DB2CA"],
    parts: [
      { flakeId:'P1610', color:'#7DB2CA', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1610-5LM', name: 'Caribbean (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1610-5LM.webp`,
    tags: ["Blue", "Light"],
    hex_colors: ["#7DB2CA"],
    parts: [
      { flakeId:'P1610', color:'#7DB2CA', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1610-6BB', name: 'Caribbean (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1610-6BB.webp`,
    tags: ["Blue", "Light"],
    hex_colors: ["#7DB2CA"],
    parts: [
      { flakeId:'P1610', color:'#7DB2CA', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1610-7LGR', name: 'Caribbean (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1610-7LGR.webp`,
    tags: ["Blue", "Light"],
    hex_colors: ["#7DB2CA"],
    parts: [
      { flakeId:'P1610', color:'#7DB2CA', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1610-8BW', name: 'Caribbean (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1610-8BW.webp`,
    tags: ["Blue", "Light"],
    hex_colors: ["#7DB2CA"],
    parts: [
      { flakeId:'P1610', color:'#7DB2CA', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1620-0LG', name: 'Maui (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1620-0LG.webp`,
    tags: ["Blue", "Bright"],
    hex_colors: ["#2087BA"],
    parts: [
      { flakeId:'P1620', color:'#2087BA', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1620-1DG', name: 'Maui (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1620-1DG.webp`,
    tags: ["Blue", "Bright"],
    hex_colors: ["#2087BA"],
    parts: [
      { flakeId:'P1620', color:'#2087BA', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1620-2BL', name: 'Maui (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1620-2BL.webp`,
    tags: ["Blue", "Bright"],
    hex_colors: ["#2087BA"],
    parts: [
      { flakeId:'P1620', color:'#2087BA', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1620-3SE', name: 'Maui (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1620-3SE.webp`,
    tags: ["Blue", "Bright"],
    hex_colors: ["#2087BA"],
    parts: [
      { flakeId:'P1620', color:'#2087BA', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1620-4OS', name: 'Maui (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1620-4OS.webp`,
    tags: ["Blue", "Bright"],
    hex_colors: ["#2087BA"],
    parts: [
      { flakeId:'P1620', color:'#2087BA', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1620-5LM', name: 'Maui (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1620-5LM.webp`,
    tags: ["Blue", "Bright"],
    hex_colors: ["#2087BA"],
    parts: [
      { flakeId:'P1620', color:'#2087BA', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1620-6BB', name: 'Maui (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1620-6BB.webp`,
    tags: ["Blue", "Bright"],
    hex_colors: ["#2087BA"],
    parts: [
      { flakeId:'P1620', color:'#2087BA', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1620-7LGR', name: 'Maui (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1620-7LGR.webp`,
    tags: ["Blue", "Bright"],
    hex_colors: ["#2087BA"],
    parts: [
      { flakeId:'P1620', color:'#2087BA', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1620-8BW', name: 'Maui (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1620-8BW.webp`,
    tags: ["Blue", "Bright"],
    hex_colors: ["#2087BA"],
    parts: [
      { flakeId:'P1620', color:'#2087BA', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1630-0LG', name: 'Curacao (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1630-0LG.webp`,
    tags: ["Blue", "Grey", "Neutral"],
    hex_colors: ["#757B7C"],
    parts: [
      { flakeId:'P1630', color:'#757B7C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1630-1DG', name: 'Curacao (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1630-1DG.webp`,
    tags: ["Blue", "Grey", "Neutral"],
    hex_colors: ["#757B7C"],
    parts: [
      { flakeId:'P1630', color:'#757B7C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1630-2BL', name: 'Curacao (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1630-2BL.webp`,
    tags: ["Blue", "Grey", "Neutral"],
    hex_colors: ["#757B7C"],
    parts: [
      { flakeId:'P1630', color:'#757B7C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1630-3SE', name: 'Curacao (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1630-3SE.webp`,
    tags: ["Blue", "Grey", "Neutral"],
    hex_colors: ["#757B7C"],
    parts: [
      { flakeId:'P1630', color:'#757B7C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1630-4OS', name: 'Curacao (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1630-4OS.webp`,
    tags: ["Blue", "Grey", "Neutral"],
    hex_colors: ["#757B7C"],
    parts: [
      { flakeId:'P1630', color:'#757B7C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1630-5LM', name: 'Curacao (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1630-5LM.webp`,
    tags: ["Blue", "Grey", "Neutral"],
    hex_colors: ["#757B7C"],
    parts: [
      { flakeId:'P1630', color:'#757B7C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1630-6BB', name: 'Curacao (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1630-6BB.webp`,
    tags: ["Blue", "Grey", "Neutral"],
    hex_colors: ["#757B7C"],
    parts: [
      { flakeId:'P1630', color:'#757B7C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1630-7LGR', name: 'Curacao (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1630-7LGR.webp`,
    tags: ["Blue", "Grey", "Neutral"],
    hex_colors: ["#757B7C"],
    parts: [
      { flakeId:'P1630', color:'#757B7C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1630-8BW', name: 'Curacao (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1630-8BW.webp`,
    tags: ["Blue", "Grey", "Neutral"],
    hex_colors: ["#757B7C"],
    parts: [
      { flakeId:'P1630', color:'#757B7C', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1640-0LG', name: 'Azure (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1640-0LG.webp`,
    tags: ["Blue", "Grey", "Neutral"],
    hex_colors: ["#6D7B82"],
    parts: [
      { flakeId:'P1640', color:'#6D7B82', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1640-1DG', name: 'Azure (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1640-1DG.webp`,
    tags: ["Blue", "Grey", "Neutral"],
    hex_colors: ["#6D7B82"],
    parts: [
      { flakeId:'P1640', color:'#6D7B82', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1640-2BL', name: 'Azure (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1640-2BL.webp`,
    tags: ["Blue", "Grey", "Neutral"],
    hex_colors: ["#6D7B82"],
    parts: [
      { flakeId:'P1640', color:'#6D7B82', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1640-3SE', name: 'Azure (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1640-3SE.webp`,
    tags: ["Blue", "Grey", "Neutral"],
    hex_colors: ["#6D7B82"],
    parts: [
      { flakeId:'P1640', color:'#6D7B82', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1640-4OS', name: 'Azure (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1640-4OS.webp`,
    tags: ["Blue", "Grey", "Neutral"],
    hex_colors: ["#6D7B82"],
    parts: [
      { flakeId:'P1640', color:'#6D7B82', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1640-5LM', name: 'Azure (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1640-5LM.webp`,
    tags: ["Blue", "Grey", "Neutral"],
    hex_colors: ["#6D7B82"],
    parts: [
      { flakeId:'P1640', color:'#6D7B82', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1640-6BB', name: 'Azure (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1640-6BB.webp`,
    tags: ["Blue", "Grey", "Neutral"],
    hex_colors: ["#6D7B82"],
    parts: [
      { flakeId:'P1640', color:'#6D7B82', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1640-7LGR', name: 'Azure (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1640-7LGR.webp`,
    tags: ["Blue", "Grey", "Neutral"],
    hex_colors: ["#6D7B82"],
    parts: [
      { flakeId:'P1640', color:'#6D7B82', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1640-8BW', name: 'Azure (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1640-8BW.webp`,
    tags: ["Blue", "Grey", "Neutral"],
    hex_colors: ["#6D7B82"],
    parts: [
      { flakeId:'P1640', color:'#6D7B82', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1650-0LG', name: 'Ocean (Light Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1650-0LG.webp`,
    tags: ["Blue", "Dark"],
    hex_colors: ["#42596D"],
    parts: [
      { flakeId:'P1650', color:'#42596D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1650-1DG', name: 'Ocean (Dolphin Gray)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1650-1DG.webp`,
    tags: ["Blue", "Dark"],
    hex_colors: ["#42596D"],
    parts: [
      { flakeId:'P1650', color:'#42596D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1650-2BL', name: 'Ocean (Black)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1650-2BL.webp`,
    tags: ["Blue", "Dark"],
    hex_colors: ["#42596D"],
    parts: [
      { flakeId:'P1650', color:'#42596D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1650-3SE', name: 'Ocean (Smokey Evening)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1650-3SE.webp`,
    tags: ["Blue", "Dark"],
    hex_colors: ["#42596D"],
    parts: [
      { flakeId:'P1650', color:'#42596D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1650-4OS', name: 'Ocean (Oyster Secret)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1650-4OS.webp`,
    tags: ["Blue", "Dark"],
    hex_colors: ["#42596D"],
    parts: [
      { flakeId:'P1650', color:'#42596D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1650-5LM', name: 'Ocean (Latte Macchiato)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1650-5LM.webp`,
    tags: ["Blue", "Dark"],
    hex_colors: ["#42596D"],
    parts: [
      { flakeId:'P1650', color:'#42596D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1650-6BB', name: 'Ocean (Brown Beige)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1650-6BB.webp`,
    tags: ["Blue", "Dark"],
    hex_colors: ["#42596D"],
    parts: [
      { flakeId:'P1650', color:'#42596D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1650-7LGR', name: 'Ocean (Lime Green)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1650-7LGR.webp`,
    tags: ["Blue", "Dark"],
    hex_colors: ["#42596D"],
    parts: [
      { flakeId:'P1650', color:'#42596D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'PB-1650-8BW', name: 'Ocean (Bordeaux Wine)', type: 'pigment-blend', collection: 'signature',
    img_url: `${CDN}assets/images/blends/PB-1650-8BW.webp`,
    tags: ["Blue", "Dark"],
    hex_colors: ["#42596D"],
    parts: [
      { flakeId:'P1650', color:'#42596D', ratio:1.0, sizeCode:'l', rangeMin:0.0, rangeMax:1.0, isGlitter:false }
    ],
  },
  {
    id: 'SB-7001-0LG', name: 'Silver Gray (Light Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7001-0LG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7001-1DG', name: 'Silver Gray (Dolphin Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7001-1DG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7001-2BL', name: 'Silver Gray (Black)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7001-2BL.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7001-3SE', name: 'Silver Gray (Smokey Evening)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7001-3SE.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7001-4OS', name: 'Silver Gray (Oyster Secret)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7001-4OS.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7001-5LM', name: 'Silver Gray (Latte Macchiato)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7001-5LM.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7001-6BB', name: 'Silver Gray (Brown Beige)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7001-6BB.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7001-7LGR', name: 'Silver Gray (Lime Green)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7001-7LGR.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7001-8BW', name: 'Silver Gray (Bordeaux Wine)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7001-8BW.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7035-0LG', name: 'Light Gray (Light Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7035-0LG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7035-1DG', name: 'Light Gray (Dolphin Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7035-1DG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7035-2BL', name: 'Light Gray (Black)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7035-2BL.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7035-3SE', name: 'Light Gray (Smokey Evening)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7035-3SE.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7035-4OS', name: 'Light Gray (Oyster Secret)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7035-4OS.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7035-5LM', name: 'Light Gray (Latte Macchiato)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7035-5LM.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7035-6BB', name: 'Light Gray (Brown Beige)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7035-6BB.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7035-7LGR', name: 'Light Gray (Lime Green)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7035-7LGR.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7035-8BW', name: 'Light Gray (Bordeaux Wine)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7035-8BW.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7040-0LG', name: 'Window Gray (Light Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7040-0LG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7040-1DG', name: 'Window Gray (Dolphin Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7040-1DG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7040-2BL', name: 'Window Gray (Black)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7040-2BL.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7040-3SE', name: 'Window Gray (Smokey Evening)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7040-3SE.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7040-4OS', name: 'Window Gray (Oyster Secret)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7040-4OS.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7040-5LM', name: 'Window Gray (Latte Macchiato)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7040-5LM.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7040-6BB', name: 'Window Gray (Brown Beige)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7040-6BB.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7040-7LGR', name: 'Window Gray (Lime Green)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7040-7LGR.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7040-8BW', name: 'Window Gray (Bordeaux Wine)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7040-8BW.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7042-0LG', name: 'Traffic Gray (Light Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7042-0LG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7042-1DG', name: 'Traffic Gray (Dolphin Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7042-1DG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7042-2BL', name: 'Traffic Gray (Black)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7042-2BL.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7042-3SE', name: 'Traffic Gray (Smokey Evening)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7042-3SE.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7042-4OS', name: 'Traffic Gray (Oyster Secret)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7042-4OS.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7042-5LM', name: 'Traffic Gray (Latte Macchiato)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7042-5LM.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7042-6BB', name: 'Traffic Gray (Brown Beige)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7042-6BB.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7042-7LGR', name: 'Traffic Gray (Lime Green)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7042-7LGR.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7042-8BW', name: 'Traffic Gray (Bordeaux Wine)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7042-8BW.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1019-0LG', name: 'Gray Beige (Light Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1019-0LG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1019-1DG', name: 'Gray Beige (Dolphin Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1019-1DG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1019-2BL', name: 'Gray Beige (Black)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1019-2BL.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1019-3SE', name: 'Gray Beige (Smokey Evening)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1019-3SE.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1019-4OS', name: 'Gray Beige (Oyster Secret)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1019-4OS.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1019-5LM', name: 'Gray Beige (Latte Macchiato)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1019-5LM.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1019-6BB', name: 'Gray Beige (Brown Beige)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1019-6BB.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1019-7LGR', name: 'Gray Beige (Lime Green)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1019-7LGR.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1019-8BW', name: 'Gray Beige (Bordeaux Wine)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1019-8BW.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1017-0LG', name: 'Signal Yellow (Light Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1017-0LG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1017-1DG', name: 'Signal Yellow (Dolphin Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1017-1DG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1017-2BL', name: 'Signal Yellow (Black)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1017-2BL.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1017-3SE', name: 'Signal Yellow (Smokey Evening)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1017-3SE.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1017-4OS', name: 'Signal Yellow (Oyster Secret)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1017-4OS.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1017-5LM', name: 'Signal Yellow (Latte Macchiato)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1017-5LM.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1017-6BB', name: 'Signal Yellow (Brown Beige)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1017-6BB.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1017-7LGR', name: 'Signal Yellow (Lime Green)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1017-7LGR.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1017-8BW', name: 'Signal Yellow (Bordeaux Wine)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1017-8BW.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9005-0LG', name: 'Jet Black (Light Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9005-0LG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9005-1DG', name: 'Jet Black (Dolphin Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9005-1DG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9005-2BL', name: 'Jet Black (Black)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9005-2BL.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9005-3SE', name: 'Jet Black (Smokey Evening)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9005-3SE.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9005-4OS', name: 'Jet Black (Oyster Secret)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9005-4OS.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9005-5LM', name: 'Jet Black (Latte Macchiato)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9005-5LM.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9005-6BB', name: 'Jet Black (Brown Beige)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9005-6BB.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9005-7LGR', name: 'Jet Black (Lime Green)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9005-7LGR.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9005-8BW', name: 'Jet Black (Bordeaux Wine)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9005-8BW.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1001-0LG', name: 'Beige (Light Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1001-0LG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1001-1DG', name: 'Beige (Dolphin Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1001-1DG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1001-2BL', name: 'Beige (Black)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1001-2BL.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1001-3SE', name: 'Beige (Smokey Evening)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1001-3SE.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1001-4OS', name: 'Beige (Oyster Secret)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1001-4OS.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1001-5LM', name: 'Beige (Latte Macchiato)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1001-5LM.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1001-6BB', name: 'Beige (Brown Beige)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1001-6BB.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1001-7LGR', name: 'Beige (Lime Green)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1001-7LGR.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1001-8BW', name: 'Beige (Bordeaux Wine)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1001-8BW.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7012-0LG', name: 'Basalt Gray (Light Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7012-0LG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7012-1DG', name: 'Basalt Gray (Dolphin Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7012-1DG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7012-2BL', name: 'Basalt Gray (Black)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7012-2BL.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7012-3SE', name: 'Basalt Gray (Smokey Evening)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7012-3SE.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7012-4OS', name: 'Basalt Gray (Oyster Secret)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7012-4OS.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7012-5LM', name: 'Basalt Gray (Latte Macchiato)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7012-5LM.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7012-6BB', name: 'Basalt Gray (Brown Beige)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7012-6BB.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7012-7LGR', name: 'Basalt Gray (Lime Green)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7012-7LGR.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7012-8BW', name: 'Basalt Gray (Bordeaux Wine)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7012-8BW.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-5017-0LG', name: 'Traffic Blue (Light Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-5017-0LG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-5017-1DG', name: 'Traffic Blue (Dolphin Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-5017-1DG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-5017-2BL', name: 'Traffic Blue (Black)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-5017-2BL.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-5017-3SE', name: 'Traffic Blue (Smokey Evening)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-5017-3SE.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-5017-4OS', name: 'Traffic Blue (Oyster Secret)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-5017-4OS.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-5017-5LM', name: 'Traffic Blue (Latte Macchiato)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-5017-5LM.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-5017-6BB', name: 'Traffic Blue (Brown Beige)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-5017-6BB.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-5017-7LGR', name: 'Traffic Blue (Lime Green)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-5017-7LGR.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-5017-8BW', name: 'Traffic Blue (Bordeaux Wine)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-5017-8BW.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-6021-0LG', name: 'Pale Green (Light Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-6021-0LG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-6021-1DG', name: 'Pale Green (Dolphin Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-6021-1DG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-6021-2BL', name: 'Pale Green (Black)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-6021-2BL.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-6021-3SE', name: 'Pale Green (Smokey Evening)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-6021-3SE.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-6021-4OS', name: 'Pale Green (Oyster Secret)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-6021-4OS.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-6021-5LM', name: 'Pale Green (Latte Macchiato)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-6021-5LM.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-6021-6BB', name: 'Pale Green (Brown Beige)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-6021-6BB.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-6021-7LGR', name: 'Pale Green (Lime Green)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-6021-7LGR.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-6021-8BW', name: 'Pale Green (Bordeaux Wine)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-6021-8BW.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3009-0LG', name: 'Oxide Red (Light Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3009-0LG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3009-1DG', name: 'Oxide Red (Dolphin Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3009-1DG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3009-2BL', name: 'Oxide Red (Black)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3009-2BL.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3009-3SE', name: 'Oxide Red (Smokey Evening)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3009-3SE.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3009-4OS', name: 'Oxide Red (Oyster Secret)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3009-4OS.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3009-5LM', name: 'Oxide Red (Latte Macchiato)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3009-5LM.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3009-6BB', name: 'Oxide Red (Brown Beige)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3009-6BB.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3009-7LGR', name: 'Oxide Red (Lime Green)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3009-7LGR.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3009-8BW', name: 'Oxide Red (Bordeaux Wine)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3009-8BW.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3020-0LG', name: 'Traffic Red (Light Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3020-0LG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3020-1DG', name: 'Traffic Red (Dolphin Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3020-1DG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3020-2BL', name: 'Traffic Red (Black)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3020-2BL.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3020-3SE', name: 'Traffic Red (Smokey Evening)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3020-3SE.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3020-4OS', name: 'Traffic Red (Oyster Secret)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3020-4OS.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3020-5LM', name: 'Traffic Red (Latte Macchiato)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3020-5LM.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3020-6BB', name: 'Traffic Red (Brown Beige)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3020-6BB.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3020-7LGR', name: 'Traffic Red (Lime Green)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3020-7LGR.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3020-8BW', name: 'Traffic Red (Bordeaux Wine)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3020-8BW.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9003-0LG', name: 'Signal White (Light Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9003-0LG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9003-1DG', name: 'Signal White (Dolphin Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9003-1DG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9003-2BL', name: 'Signal White (Black)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9003-2BL.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9003-3SE', name: 'Signal White (Smokey Evening)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9003-3SE.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9003-4OS', name: 'Signal White (Oyster Secret)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9003-4OS.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9003-5LM', name: 'Signal White (Latte Macchiato)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9003-5LM.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9003-6BB', name: 'Signal White (Brown Beige)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9003-6BB.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9003-7LGR', name: 'Signal White (Lime Green)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9003-7LGR.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9003-8BW', name: 'Signal White (Bordeaux Wine)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9003-8BW.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7001-t-0LG', name: 'Silver Gray (Textured) (Light Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7001-t-0LG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7001-t-1DG', name: 'Silver Gray (Textured) (Dolphin Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7001-t-1DG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7001-t-2BL', name: 'Silver Gray (Textured) (Black)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7001-t-2BL.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7001-t-3SE', name: 'Silver Gray (Textured) (Smokey Evening)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7001-t-3SE.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7001-t-4OS', name: 'Silver Gray (Textured) (Oyster Secret)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7001-t-4OS.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7001-t-5LM', name: 'Silver Gray (Textured) (Latte Macchiato)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7001-t-5LM.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7001-t-6BB', name: 'Silver Gray (Textured) (Brown Beige)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7001-t-6BB.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7001-t-7LGR', name: 'Silver Gray (Textured) (Lime Green)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7001-t-7LGR.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7001-t-8BW', name: 'Silver Gray (Textured) (Bordeaux Wine)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7001-t-8BW.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7035-t-0LG', name: 'Light Gray (Textured) (Light Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7035-t-0LG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7035-t-1DG', name: 'Light Gray (Textured) (Dolphin Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7035-t-1DG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7035-t-2BL', name: 'Light Gray (Textured) (Black)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7035-t-2BL.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7035-t-3SE', name: 'Light Gray (Textured) (Smokey Evening)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7035-t-3SE.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7035-t-4OS', name: 'Light Gray (Textured) (Oyster Secret)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7035-t-4OS.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7035-t-5LM', name: 'Light Gray (Textured) (Latte Macchiato)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7035-t-5LM.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7035-t-6BB', name: 'Light Gray (Textured) (Brown Beige)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7035-t-6BB.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7035-t-7LGR', name: 'Light Gray (Textured) (Lime Green)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7035-t-7LGR.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7035-t-8BW', name: 'Light Gray (Textured) (Bordeaux Wine)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7035-t-8BW.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7040-t-0LG', name: 'Window Gray (Textured) (Light Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7040-t-0LG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7040-t-1DG', name: 'Window Gray (Textured) (Dolphin Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7040-t-1DG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7040-t-2BL', name: 'Window Gray (Textured) (Black)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7040-t-2BL.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7040-t-3SE', name: 'Window Gray (Textured) (Smokey Evening)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7040-t-3SE.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7040-t-4OS', name: 'Window Gray (Textured) (Oyster Secret)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7040-t-4OS.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7040-t-5LM', name: 'Window Gray (Textured) (Latte Macchiato)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7040-t-5LM.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7040-t-6BB', name: 'Window Gray (Textured) (Brown Beige)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7040-t-6BB.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7040-t-7LGR', name: 'Window Gray (Textured) (Lime Green)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7040-t-7LGR.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7040-t-8BW', name: 'Window Gray (Textured) (Bordeaux Wine)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7040-t-8BW.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7042-t-0LG', name: 'Traffic Gray (Textured) (Light Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7042-t-0LG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7042-t-1DG', name: 'Traffic Gray (Textured) (Dolphin Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7042-t-1DG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7042-t-2BL', name: 'Traffic Gray (Textured) (Black)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7042-t-2BL.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7042-t-3SE', name: 'Traffic Gray (Textured) (Smokey Evening)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7042-t-3SE.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7042-t-4OS', name: 'Traffic Gray (Textured) (Oyster Secret)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7042-t-4OS.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7042-t-5LM', name: 'Traffic Gray (Textured) (Latte Macchiato)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7042-t-5LM.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7042-t-6BB', name: 'Traffic Gray (Textured) (Brown Beige)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7042-t-6BB.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7042-t-7LGR', name: 'Traffic Gray (Textured) (Lime Green)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7042-t-7LGR.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7042-t-8BW', name: 'Traffic Gray (Textured) (Bordeaux Wine)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7042-t-8BW.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1019-t-0LG', name: 'Gray Beige (Textured) (Light Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1019-t-0LG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1019-t-1DG', name: 'Gray Beige (Textured) (Dolphin Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1019-t-1DG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1019-t-2BL', name: 'Gray Beige (Textured) (Black)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1019-t-2BL.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1019-t-3SE', name: 'Gray Beige (Textured) (Smokey Evening)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1019-t-3SE.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1019-t-4OS', name: 'Gray Beige (Textured) (Oyster Secret)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1019-t-4OS.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1019-t-5LM', name: 'Gray Beige (Textured) (Latte Macchiato)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1019-t-5LM.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1019-t-6BB', name: 'Gray Beige (Textured) (Brown Beige)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1019-t-6BB.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1019-t-7LGR', name: 'Gray Beige (Textured) (Lime Green)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1019-t-7LGR.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1019-t-8BW', name: 'Gray Beige (Textured) (Bordeaux Wine)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1019-t-8BW.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1017-t-0LG', name: 'Signal Yellow (Textured) (Light Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1017-t-0LG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1017-t-1DG', name: 'Signal Yellow (Textured) (Dolphin Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1017-t-1DG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1017-t-2BL', name: 'Signal Yellow (Textured) (Black)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1017-t-2BL.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1017-t-3SE', name: 'Signal Yellow (Textured) (Smokey Evening)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1017-t-3SE.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1017-t-4OS', name: 'Signal Yellow (Textured) (Oyster Secret)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1017-t-4OS.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1017-t-5LM', name: 'Signal Yellow (Textured) (Latte Macchiato)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1017-t-5LM.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1017-t-6BB', name: 'Signal Yellow (Textured) (Brown Beige)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1017-t-6BB.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1017-t-7LGR', name: 'Signal Yellow (Textured) (Lime Green)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1017-t-7LGR.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1017-t-8BW', name: 'Signal Yellow (Textured) (Bordeaux Wine)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1017-t-8BW.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9005-t-0LG', name: 'Jet Black (Textured) (Light Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9005-t-0LG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9005-t-1DG', name: 'Jet Black (Textured) (Dolphin Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9005-t-1DG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9005-t-2BL', name: 'Jet Black (Textured) (Black)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9005-t-2BL.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9005-t-3SE', name: 'Jet Black (Textured) (Smokey Evening)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9005-t-3SE.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9005-t-4OS', name: 'Jet Black (Textured) (Oyster Secret)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9005-t-4OS.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9005-t-5LM', name: 'Jet Black (Textured) (Latte Macchiato)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9005-t-5LM.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9005-t-6BB', name: 'Jet Black (Textured) (Brown Beige)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9005-t-6BB.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9005-t-7LGR', name: 'Jet Black (Textured) (Lime Green)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9005-t-7LGR.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9005-t-8BW', name: 'Jet Black (Textured) (Bordeaux Wine)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9005-t-8BW.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1001-t-0LG', name: 'Beige (Textured) (Light Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1001-t-0LG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1001-t-1DG', name: 'Beige (Textured) (Dolphin Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1001-t-1DG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1001-t-2BL', name: 'Beige (Textured) (Black)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1001-t-2BL.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1001-t-3SE', name: 'Beige (Textured) (Smokey Evening)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1001-t-3SE.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1001-t-4OS', name: 'Beige (Textured) (Oyster Secret)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1001-t-4OS.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1001-t-5LM', name: 'Beige (Textured) (Latte Macchiato)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1001-t-5LM.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1001-t-6BB', name: 'Beige (Textured) (Brown Beige)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1001-t-6BB.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1001-t-7LGR', name: 'Beige (Textured) (Lime Green)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1001-t-7LGR.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-1001-t-8BW', name: 'Beige (Textured) (Bordeaux Wine)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-1001-t-8BW.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7012-t-0LG', name: 'Basalt Gray (Textured) (Light Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7012-t-0LG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7012-t-1DG', name: 'Basalt Gray (Textured) (Dolphin Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7012-t-1DG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7012-t-2BL', name: 'Basalt Gray (Textured) (Black)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7012-t-2BL.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7012-t-3SE', name: 'Basalt Gray (Textured) (Smokey Evening)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7012-t-3SE.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7012-t-4OS', name: 'Basalt Gray (Textured) (Oyster Secret)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7012-t-4OS.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7012-t-5LM', name: 'Basalt Gray (Textured) (Latte Macchiato)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7012-t-5LM.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7012-t-6BB', name: 'Basalt Gray (Textured) (Brown Beige)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7012-t-6BB.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7012-t-7LGR', name: 'Basalt Gray (Textured) (Lime Green)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7012-t-7LGR.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-7012-t-8BW', name: 'Basalt Gray (Textured) (Bordeaux Wine)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-7012-t-8BW.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-5017-t-0LG', name: 'Traffic Blue (Textured) (Light Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-5017-t-0LG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-5017-t-1DG', name: 'Traffic Blue (Textured) (Dolphin Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-5017-t-1DG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-5017-t-2BL', name: 'Traffic Blue (Textured) (Black)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-5017-t-2BL.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-5017-t-3SE', name: 'Traffic Blue (Textured) (Smokey Evening)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-5017-t-3SE.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-5017-t-4OS', name: 'Traffic Blue (Textured) (Oyster Secret)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-5017-t-4OS.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-5017-t-5LM', name: 'Traffic Blue (Textured) (Latte Macchiato)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-5017-t-5LM.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-5017-t-6BB', name: 'Traffic Blue (Textured) (Brown Beige)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-5017-t-6BB.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-5017-t-7LGR', name: 'Traffic Blue (Textured) (Lime Green)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-5017-t-7LGR.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-5017-t-8BW', name: 'Traffic Blue (Textured) (Bordeaux Wine)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-5017-t-8BW.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-6021-t-0LG', name: 'Pale Green (Textured) (Light Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-6021-t-0LG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-6021-t-1DG', name: 'Pale Green (Textured) (Dolphin Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-6021-t-1DG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-6021-t-2BL', name: 'Pale Green (Textured) (Black)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-6021-t-2BL.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-6021-t-3SE', name: 'Pale Green (Textured) (Smokey Evening)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-6021-t-3SE.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-6021-t-4OS', name: 'Pale Green (Textured) (Oyster Secret)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-6021-t-4OS.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-6021-t-5LM', name: 'Pale Green (Textured) (Latte Macchiato)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-6021-t-5LM.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-6021-t-6BB', name: 'Pale Green (Textured) (Brown Beige)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-6021-t-6BB.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-6021-t-7LGR', name: 'Pale Green (Textured) (Lime Green)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-6021-t-7LGR.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-6021-t-8BW', name: 'Pale Green (Textured) (Bordeaux Wine)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-6021-t-8BW.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3009-t-0LG', name: 'Oxide Red (Textured) (Light Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3009-t-0LG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3009-t-1DG', name: 'Oxide Red (Textured) (Dolphin Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3009-t-1DG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3009-t-2BL', name: 'Oxide Red (Textured) (Black)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3009-t-2BL.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3009-t-3SE', name: 'Oxide Red (Textured) (Smokey Evening)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3009-t-3SE.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3009-t-4OS', name: 'Oxide Red (Textured) (Oyster Secret)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3009-t-4OS.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3009-t-5LM', name: 'Oxide Red (Textured) (Latte Macchiato)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3009-t-5LM.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3009-t-6BB', name: 'Oxide Red (Textured) (Brown Beige)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3009-t-6BB.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3009-t-7LGR', name: 'Oxide Red (Textured) (Lime Green)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3009-t-7LGR.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3009-t-8BW', name: 'Oxide Red (Textured) (Bordeaux Wine)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3009-t-8BW.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3020-t-0LG', name: 'Traffic Red (Textured) (Light Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3020-t-0LG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3020-t-1DG', name: 'Traffic Red (Textured) (Dolphin Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3020-t-1DG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3020-t-2BL', name: 'Traffic Red (Textured) (Black)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3020-t-2BL.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3020-t-3SE', name: 'Traffic Red (Textured) (Smokey Evening)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3020-t-3SE.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3020-t-4OS', name: 'Traffic Red (Textured) (Oyster Secret)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3020-t-4OS.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3020-t-5LM', name: 'Traffic Red (Textured) (Latte Macchiato)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3020-t-5LM.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3020-t-6BB', name: 'Traffic Red (Textured) (Brown Beige)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3020-t-6BB.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3020-t-7LGR', name: 'Traffic Red (Textured) (Lime Green)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3020-t-7LGR.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-3020-t-8BW', name: 'Traffic Red (Textured) (Bordeaux Wine)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-3020-t-8BW.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9003-t-0LG', name: 'Signal White (Textured) (Light Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9003-t-0LG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9003-t-1DG', name: 'Signal White (Textured) (Dolphin Gray)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9003-t-1DG.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9003-t-2BL', name: 'Signal White (Textured) (Black)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9003-t-2BL.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9003-t-3SE', name: 'Signal White (Textured) (Smokey Evening)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9003-t-3SE.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9003-t-4OS', name: 'Signal White (Textured) (Oyster Secret)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9003-t-4OS.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9003-t-5LM', name: 'Signal White (Textured) (Latte Macchiato)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9003-t-5LM.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9003-t-6BB', name: 'Signal White (Textured) (Brown Beige)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9003-t-6BB.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9003-t-7LGR', name: 'Signal White (Textured) (Lime Green)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9003-t-7LGR.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
  {
    id: 'SB-9003-t-8BW', name: 'Signal White (Textured) (Bordeaux Wine)', type: 'sika-blend', collection: 'sika',
    img_url: `${CDN}assets/images/blends/SB-9003-t-8BW.webp`,
    tags: [],
    hex_colors: [],
    parts: [
      
    ],
  },
]