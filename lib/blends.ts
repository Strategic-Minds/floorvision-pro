export interface Blend {
  id: string;
  base_id: string;
  name: string;
  collection: string;
  tags: string[];
  eCommerceLink: string;
  type: string;
  img_url: string;
}

export interface Room {
  id: string;
  name: string;
  type: string;
  thumb: string;
  base_url: string;
}

// All 451 unique XPS blends from FloorWiz CDN
export const COLLECTIONS = [
  'All Collections',
  'Insignia Collection',
  'Torginol Collection',
  'UV Collection',
  'Hybrid Stone Collection',
  'Quartz Cool Collection',
  'Quartz Warm Collection',
  'Pigment Blend',
];

export const ROOMS: Room[] = [
  { id:'garage07',          name:'Garage',             type:'residential', thumb:'https://cdn.floor-wiz.com/organisations/xtreme_polishing_systems/visualisers/300/new/residential-garage-07_thumb.webp',  base_url:'https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/static/new/residential-garage-07_' },
  { id:'rw_garagecleardoors', name:'Garage (Open)',    type:'residential', thumb:'https://cdn.floor-wiz.com/organisations/xtreme_polishing_systems/visualisers/300/new/rw_garagecleardoors_thumb.webp',      base_url:'https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/static/new/rw_garagecleardoors_' },
  { id:'rw_bedroom1',       name:'Bedroom',            type:'residential', thumb:'https://cdn.floor-wiz.com/organisations/xtreme_polishing_systems/visualisers/300/new/rw_bedroom1_thumb.webp',               base_url:'https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/static/new/rw_bedroom1_' },
  { id:'dining2',           name:'Dining Room',        type:'residential', thumb:'https://cdn.floor-wiz.com/organisations/xtreme_polishing_systems/visualisers/300/new/rw_dining2_thumb.webp',                 base_url:'https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/static/new/rw_dining2_' },
  { id:'rw_hallway',        name:'Hallway',            type:'residential', thumb:'https://cdn.floor-wiz.com/organisations/xtreme_polishing_systems/visualisers/300/new/rw_hallway_thumb.webp',                 base_url:'https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/static/new/rw_hallway_' },
  { id:'re_livingroom',     name:'Living Room',        type:'residential', thumb:'https://cdn.floor-wiz.com/organisations/xtreme_polishing_systems/visualisers/300/new/re_livingroom_thumb.webp',              base_url:'https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/static/new/re_livingroom_' },
  { id:'fw_basement',       name:'Basement',           type:'residential', thumb:'https://cdn.floor-wiz.com/organisations/xtreme_polishing_systems/visualisers/300/custom/fw_basement_thumb.webp',             base_url:'https://cdn.floor-wiz.com/organisations/xtreme_polishing_systems/visualisers/300/custom/fw_basement_' },
  { id:'fw_pooldeck-01',    name:'Pool Deck',          type:'outdoor',     thumb:'https://cdn.floor-wiz.com/organisations/xtreme_polishing_systems/visualisers/300/custom/fw_pooldeck-01_thumb.webp',          base_url:'https://cdn.floor-wiz.com/organisations/xtreme_polishing_systems/visualisers/300/custom/fw_pooldeck-01_' },
  { id:'fw_porch-hr-01',    name:'Porch/Patio',        type:'outdoor',     thumb:'https://cdn.floor-wiz.com/organisations/xtreme_polishing_systems/visualisers/300/custom/fw_porch-hr-01_thumb.webp',          base_url:'https://cdn.floor-wiz.com/organisations/xtreme_polishing_systems/visualisers/300/custom/fw_porch-hr-01_' },
  { id:'com_warehouse',     name:'Warehouse',          type:'commercial',  thumb:'https://cdn.floor-wiz.com/organisations/xtreme_polishing_systems/visualisers/300/new/com_warehouse_thumb.webp',              base_url:'https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/static/new/com_warehouse_' },
];

// Flake sizes
export const SIZES = [
  { id: '116', label: '1/16"', desc: 'Fine — interior, showroom' },
  { id: '18',  label: '1/8"',  desc: 'Standard — garage, basement' },
  { id: '40',  label: '1/4"',  desc: 'Coarse — heavy traffic' },
];
