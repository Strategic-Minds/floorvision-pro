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

export const SIZES = [
  { id: '116', label: '1/16"', desc: 'Fine — interior, showroom' },
  { id: '18',  label: '1/8"',  desc: 'Standard — garage, basement' },
  { id: '40',  label: '1/4"',  desc: 'Coarse — heavy traffic' },
];
