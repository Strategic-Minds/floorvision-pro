/* ═══════════════════════════════════════════════════════════════════════
   FloorVision Pro — ROOMS DATA (Real Onfigr CDN)
   Source: https://staging.cdn-onfigr.com/sika/flooring/visualizer/latest.json
   Extracted: 2026-06-25 via Browserless network interception
   12 confirmed rooms | diffuse + hms depth maps confirmed
   
   Image types:
     thumb   = thumbnail for room picker
     diffuse = full-res photo for 2D renderer  
     hms     = height-map-shadow for 3D depth lighting
═══════════════════════════════════════════════════════════════════════ */

export interface Room {
  id: string
  name: string
  type: 'Residential' | 'Commercial' | 'Industrial'
  mode: '2d' | '3d'
  background: string   // full-res diffuse image
  thumb: string        // thumbnail for picker
  hms?: string         // height-map-shadow (depth map)
  lightIntensity: number
}

const CDN = 'https://staging.cdn-onfigr.com/shared_assets/floor_visualizer/core/latest/'

export const ROOMS: Room[] = [
  // ── RESIDENTIAL ─────────────────────────────────────────────────────────
  {
    id:             'sr1',
    name:           'Garage',
    type:           'Residential',
    mode:           '2d',
    background:     `${CDN}assets/images/static/residential/garage_b/diffuse.jpg`,
    thumb:          `${CDN}assets/images/static/residential/garage_b/thumb.jpg`,
    hms:            `${CDN}assets/images/static/residential/garage_b/hms.jpg`,
    lightIntensity: 3,
  },
  {
    id:             'sr2',
    name:           'Garage (Alt)',
    type:           'Residential',
    mode:           '2d',
    background:     `${CDN}assets/images/static/residential/garage_a/thumb.jpg`,
    thumb:          `${CDN}assets/images/static/residential/garage_a/thumb.jpg`,
    lightIntensity: 3,
  },
  {
    id:             'sr3',
    name:           'Bedroom',
    type:           'Residential',
    mode:           '2d',
    background:     `${CDN}assets/images/static/residential/bedroom/diffuse.jpg`,
    thumb:          `${CDN}assets/images/static/residential/bedroom/thumb.jpg`,
    hms:            `${CDN}assets/images/static/residential/bedroom/hms.jpg`,
    lightIntensity: 3,
  },
  {
    id:             'sr4',
    name:           'Kitchen',
    type:           'Residential',
    mode:           '2d',
    background:     `${CDN}assets/images/static/residential/kitchen/diffuse.jpg`,
    thumb:          `${CDN}assets/images/static/residential/kitchen/thumb.jpg`,
    hms:            `${CDN}assets/images/static/residential/kitchen/hms.jpg`,
    lightIntensity: 3,
  },
  {
    id:             'sr5',
    name:           'Bathroom',
    type:           'Residential',
    mode:           '2d',
    background:     `${CDN}assets/images/static/residential/bathroom/diffuse.jpg`,
    thumb:          `${CDN}assets/images/static/residential/bathroom/thumb.jpg`,
    hms:            `${CDN}assets/images/static/residential/bathroom/hms.jpg`,
    lightIntensity: 3,
  },
  // ── COMMERCIAL ──────────────────────────────────────────────────────────
  {
    id:             'sc1',
    name:           'Hospital',
    type:           'Commercial',
    mode:           '2d',
    background:     `${CDN}assets/images/static/commercial/hospital/diffuse.jpg`,
    thumb:          `${CDN}assets/images/static/commercial/hospital/thumb.jpg`,
    hms:            `${CDN}assets/images/static/commercial/hospital/hms.jpg`,
    lightIntensity: 3,
  },
  {
    id:             'sc2',
    name:           'Public Restroom',
    type:           'Commercial',
    mode:           '2d',
    background:     `${CDN}assets/images/static/commercial/public-restroom/diffuse.jpg`,
    thumb:          `${CDN}assets/images/static/commercial/public-restroom/thumb.jpg`,
    hms:            `${CDN}assets/images/static/commercial/public-restroom/hms.jpg`,
    lightIntensity: 3,
  },
  {
    id:             'sc3',
    name:           'School',
    type:           'Commercial',
    mode:           '2d',
    background:     `${CDN}assets/images/static/commercial/school/diffuse.jpg`,
    thumb:          `${CDN}assets/images/static/commercial/school/thumb.jpg`,
    hms:            `${CDN}assets/images/static/commercial/school/hms.jpg`,
    lightIntensity: 3,
  },
  {
    id:             'tc1',
    name:           'Warehouse',
    type:           'Commercial',
    mode:           '3d',
    background:     `${CDN}assets/images/envs/warehouse.jpg`,
    thumb:          `${CDN}assets/images/envs/warehouse.jpg`,
    lightIntensity: 1.5,
  },
  {
    id:             'tc2',
    name:           'Airport',
    type:           'Commercial',
    mode:           '3d',
    background:     `${CDN}assets/images/envs/airport.jpg`,
    thumb:          `${CDN}assets/images/envs/airport.jpg`,
    lightIntensity: 1.5,
  },
  // ── INDUSTRIAL ──────────────────────────────────────────────────────────
  {
    id:             'si0',
    name:           'Laboratory',
    type:           'Industrial',
    mode:           '2d',
    background:     `${CDN}assets/images/static/industrial/cleanroom/laboratory/diffuse.jpg`,
    thumb:          `${CDN}assets/images/static/industrial/cleanroom/laboratory/thumb.jpg`,
    hms:            `${CDN}assets/images/static/industrial/cleanroom/laboratory/hms.jpg`,
    lightIntensity: 3,
  },
  {
    id:             'si1',
    name:           'Food Processing Plant',
    type:           'Industrial',
    mode:           '2d',
    background:     `${CDN}assets/images/static/industrial/food-processing-plant/diffuse.jpg`,
    thumb:          `${CDN}assets/images/static/industrial/food-processing-plant/thumb.jpg`,
    hms:            `${CDN}assets/images/static/industrial/food-processing-plant/hms.jpg`,
    lightIntensity: 3,
  },
  {
    id:             'si4',
    name:           'Industrial Kitchen',
    type:           'Industrial',
    mode:           '2d',
    background:     `${CDN}assets/images/static/industrial/industrial-kitchen/diffuse.jpg`,
    thumb:          `${CDN}assets/images/static/industrial/industrial-kitchen/thumb.jpg`,
    hms:            `${CDN}assets/images/static/industrial/industrial-kitchen/hms.jpg`,
    lightIntensity: 3,
  },
  {
    id:             'si5',
    name:           'EV / Auto Manufacturing',
    type:           'Industrial',
    mode:           '2d',
    background:     `${CDN}assets/images/static/sika/industrial/ev_auto/diffuse.jpg`,
    thumb:          `${CDN}assets/images/static/sika/industrial/ev_auto/thumbnail.jpg`,
    hms:            `${CDN}assets/images/static/sika/industrial/ev_auto/hms.jpg`,
    lightIntensity: 3,
  },
  {
    id:             'si6',
    name:           'Heavy Industry',
    type:           'Industrial',
    mode:           '2d',
    background:     `${CDN}assets/images/static/sika/industrial/heavy_industry/diffuse.jpg`,
    thumb:          `${CDN}assets/images/static/sika/industrial/heavy_industry/thumbnail.jpg`,
    hms:            `${CDN}assets/images/static/sika/industrial/heavy_industry/hms.jpg`,
    lightIntensity: 3,
  },
  {
    id:             'si7',
    name:           'Aircraft Hangar',
    type:           'Industrial',
    mode:           '2d',
    background:     `${CDN}assets/images/static/sika/industrial/jet_hanger/diffuse.jpg`,
    thumb:          `${CDN}assets/images/static/sika/industrial/jet_hanger/thumbnail.jpg`,
    hms:            `${CDN}assets/images/static/sika/industrial/jet_hanger/hms.jpg`,
    lightIntensity: 3,
  },
]
