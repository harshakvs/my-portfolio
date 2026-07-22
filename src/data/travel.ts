export type Pin = {
  name: string;
  coords: [number, number]; // [lat, lng] — right-click any spot on Google Maps to copy these
  type: 'lived' | 'visited' | 'wishlist';
  note?: string;
  emoji?: string;
};

// Add a line per place as they come back to you — the map updates automatically.
// Example: { name: 'Tokyo, Japan', coords: [35.68, 139.69], type: 'visited', note: 'ramen pilgrimage', emoji: '🍜' },
export const pins: Pin[] = [
  // From the resume — places lived/worked
  { name: 'Delhi NCR, India', coords: [28.53, 77.57], type: 'lived', note: 'B.Tech @ Shiv Nadar University', emoji: '🎓' },
  { name: 'Bengaluru, India', coords: [12.97, 77.59], type: 'lived', note: 'Data Scientist @ HP', emoji: '💻' },
  { name: 'Chennai, India', coords: [13.08, 80.27], type: 'lived', note: 'Data Science Intern @ HP', emoji: '🌊' },
  { name: 'Atlanta, USA', coords: [33.75, -84.39], type: 'lived', note: 'M.S. @ Georgia State — 4.0 GPA', emoji: '🍑' },
  { name: 'Washington DC area, USA', coords: [38.89, -77.22], type: 'lived', note: 'Senior ML Engineer @ Vinci Education', emoji: '🏛️' },

  // TODO(harsha): add your visited + wishlist places here ↓
];

export const pinStyle = {
  lived: { emoji: '🏠', label: 'lived' },
  visited: { emoji: '📍', label: 'visited' },
  wishlist: { emoji: '✨', label: 'wishlist' },
};
