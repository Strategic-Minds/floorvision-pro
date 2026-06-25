export type Category = 'flake' | 'metallic' | 'quartz' | 'hybrid' | 'uv' | 'glitter' | 'pigment';

export interface ColorChart {
  id: string;
  name: string;
  category: Category;
  description: string;
  driveUrl: string;
  tags: string[];
}

export const COLOR_CHARTS: ColorChart[] = [
  {
    id: 'polymer-flake',
    name: 'Polymer Flake Collection',
    category: 'flake',
    description: 'Full broadcast polymer flake system — stadium-grade durability, 58+ colorways.',
    driveUrl: 'https://drive.google.com/uc?export=view&id=19aB60DKYBIvgggGJRTAtOatiQlWBfW3P',
    tags: ['In Stock', 'Most Popular', 'Residential', 'Commercial'],
  },
  {
    id: 'hybrid-flooring',
    name: 'Hybrid Flooring Collection',
    category: 'hybrid',
    description: 'Next-gen hybrid flake/quartz blend. Best of both worlds — texture + color depth.',
    driveUrl: 'https://drive.google.com/uc?export=view&id=1T0xunaWZPaWkH2-SHsIzkvgyXUSwwuY-',
    tags: ['Premium', 'High-Traffic', 'Commercial'],
  },
  {
    id: 'uv-flake',
    name: 'UV Flake Collection',
    category: 'uv',
    description: 'UV-stable polymer flakes engineered for exterior applications and direct sunlight.',
    driveUrl: 'https://drive.google.com/uc?export=view&id=1sKOc26qgnZqJ4YYxWI9kNMhu8KQv1tI5',
    tags: ['Exterior', 'UV-Stable', 'Pool Deck'],
  },
  {
    id: 'insignia-series',
    name: 'Insignia Series',
    category: 'flake',
    description: 'Curated premium colorways for luxury residential and high-end commercial installs.',
    driveUrl: 'https://drive.google.com/uc?export=view&id=1tFuscyCvOCF2hb2HZ4iD9DzWpN9sAqzL',
    tags: ['Luxury', 'Residential', 'Premium'],
  },
  {
    id: 'in-stock-colors',
    name: 'In-Stock Colors',
    category: 'flake',
    description: 'Ships same-day. Our fastest-moving flake blends always in inventory.',
    driveUrl: 'https://drive.google.com/uc?export=view&id=1zS7EgIGjqBSqtnkYliVBuE6kMYdhaRDj',
    tags: ['In Stock', 'Fast Ship', 'Best Value'],
  },
  {
    id: 'metallic-powder',
    name: 'Metallic Powder System',
    category: 'metallic',
    description: 'Mica-based metallic pigment powder for mirror-finish marbled epoxy floors.',
    driveUrl: 'https://drive.google.com/uc?export=view&id=1C27sAP7VxXIQGi28K4yILLsXOtAnRzAI',
    tags: ['Metallic', 'Luxury', 'Mirror Finish'],
  },
  {
    id: 'quartz-signature',
    name: 'Quartz Signature Collection',
    category: 'quartz',
    description: 'Torginol quartz aggregate — signature series. Slip-resistant, all-weather proven.',
    driveUrl: 'https://drive.google.com/uc?export=view&id=1skddY2lIPmaV1EkLvd1bxLtHIWpvxEp9',
    tags: ['Quartz', 'Slip-Resistant', 'Outdoor'],
  },
  {
    id: 'quartz-warm',
    name: 'Quartz Warm Collection',
    category: 'quartz',
    description: 'Earth-tone quartz blends — cream, tan, terra cotta. Perfect for pool decks and patios.',
    driveUrl: 'https://drive.google.com/uc?export=view&id=1UQ_hY0AsbyxbyMHa1_J_F7sOxeILvN3x',
    tags: ['Quartz', 'Warm Tones', 'Pool Deck', 'Patio'],
  },
  {
    id: 'quartz-cool',
    name: 'Quartz Cool Collection',
    category: 'quartz',
    description: 'Blue, grey and stone-tone quartz aggregate for modern commercial interiors.',
    driveUrl: 'https://drive.google.com/uc?export=view&id=14vcl0n_XLv0q5EFeHN975FpL8_Ody05g',
    tags: ['Quartz', 'Cool Tones', 'Commercial', 'Modern'],
  },
  {
    id: 'mica-natural',
    name: 'Mica Natural Collection',
    category: 'metallic',
    description: 'Natural mica flakes — organic shimmer without synthetic metallic effect.',
    driveUrl: 'https://drive.google.com/uc?export=view&id=1qg3xKJRO4AmdMUbYgbuL55PWdm9bpHQA',
    tags: ['Mica', 'Natural', 'Organic'],
  },
  {
    id: 'metallic-glitter',
    name: 'Metallic Glitter',
    category: 'glitter',
    description: 'Coarse metallic glitter particles for maximum sparkle in luxury epoxy.',
    driveUrl: 'https://drive.google.com/uc?export=view&id=1qUWgtrrHso1s2KMTY1QNFQV3T2t60eDf',
    tags: ['Glitter', 'Metallic', 'Luxury'],
  },
  {
    id: 'iridescent-glitter',
    name: 'Iridescent Glitter',
    category: 'glitter',
    description: 'Color-shifting iridescent glitter — unique light-reactive effects.',
    driveUrl: 'https://drive.google.com/uc?export=view&id=1u_O6AjKylVODXQhICODhy8SH30i62EYK',
    tags: ['Glitter', 'Iridescent', 'Color-Shift'],
  },
  {
    id: 'holographic-glitter',
    name: 'Holographic Glitter',
    category: 'glitter',
    description: 'Rainbow prismatic holographic glitter for nightclub, showroom and luxury installations.',
    driveUrl: 'https://drive.google.com/uc?export=view&id=1qsOmVTfEijbYmDKk4FGNd2-jubANjkLu',
    tags: ['Glitter', 'Holographic', 'Showroom'],
  },
  {
    id: 'fluorescent-powder',
    name: 'Fluorescent Powder',
    category: 'pigment',
    description: 'UV-reactive fluorescent pigment powders — glows under blacklight.',
    driveUrl: 'https://drive.google.com/uc?export=view&id=1cBMMVdjf_ef9cviZ_bZq35OrWNLSTuHc',
    tags: ['Fluorescent', 'UV-Reactive', 'Specialty'],
  },
  {
    id: 'torginol-fandeck',
    name: 'Torginol Flake Fan Deck 2026',
    category: 'flake',
    description: 'Complete 2026 Torginol flake fan deck — full catalog with swatches.',
    driveUrl: 'https://drive.google.com/uc?export=view&id=1SPNXjHZi2I6h7XnSsHNGhN6LR3P2IpC1',
    tags: ['Torginol', 'Full Catalog', '2026'],
  },
];

export const CATEGORIES: { id: Category | 'all'; label: string }[] = [
  { id: 'all',      label: 'All Collections' },
  { id: 'flake',    label: 'Polymer Flake' },
  { id: 'hybrid',   label: 'Hybrid' },
  { id: 'metallic', label: 'Metallic' },
  { id: 'quartz',   label: 'Quartz' },
  { id: 'glitter',  label: 'Glitter' },
  { id: 'uv',       label: 'UV Stable' },
  { id: 'pigment',  label: 'Pigment' },
];

export const STATS = [
  { value: '58+',   label: 'Colorways' },
  { value: '15',    label: 'Collections' },
  { value: '500+',  label: 'Projects' },
  { value: '48hr',  label: 'Ship Time' },
];

export const ROOM_TYPES = [
  { id: 'garage',    label: 'Garage',       icon: '🏠' },
  { id: 'basement',  label: 'Basement',     icon: '🏗️' },
  { id: 'showroom',  label: 'Showroom',     icon: '🏢' },
  { id: 'warehouse', label: 'Warehouse',    icon: '🏭' },
  { id: 'pool-deck', label: 'Pool Deck',    icon: '🏊' },
  { id: 'patio',     label: 'Patio',        icon: '🌿' },
];
