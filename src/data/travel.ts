export type Pin = {
  name: string;
  coords: [number, number]; // [lat, lng]
  type: 'lived' | 'trek';
  note?: string;
  emoji?: string;
};

// Big markers: places lived + treks. Small dots: cities visited. States get shaded.
export const pins: Pin[] = [
  // USA
  { name: 'Atlanta, GA', coords: [33.75, -84.39], type: 'lived', note: 'M.S. @ Georgia State — 4.0 GPA', emoji: '🍑' },
  { name: 'Washington DC area, VA', coords: [38.89, -77.22], type: 'lived', note: 'Senior ML Engineer @ Vinci Education', emoji: '🏛️' },
  // India — lived
  { name: 'Delhi NCR', coords: [28.53, 77.57], type: 'lived', note: 'B.Tech @ Shiv Nadar University', emoji: '🎓' },
  { name: 'Bengaluru', coords: [12.97, 77.59], type: 'lived', note: 'Data Scientist @ HP', emoji: '💻' },
  { name: 'Chennai', coords: [13.08, 80.27], type: 'lived', note: 'HP internship days', emoji: '🌊' },
  { name: 'Mumbai', coords: [19.08, 72.88], type: 'lived', note: 'city that never sleeps, me neither', emoji: '🌃' },
  { name: 'Hyderabad', coords: [17.38, 78.49], type: 'lived', note: 'biryani HQ', emoji: '🍛' },
  { name: 'Vizag', coords: [17.69, 83.22], type: 'lived', note: 'beach city years', emoji: '🏖️' },
  { name: 'Lucknow', coords: [26.85, 80.95], type: 'lived', note: 'nawabi tehzeeb', emoji: '🕌' },
  { name: 'Ludhiana', coords: [30.9, 75.86], type: 'lived', note: 'Punjab chapter', emoji: '🌾' },
  { name: 'Gandhidham', coords: [23.08, 70.13], type: 'lived', note: 'Kutch, Gujarat', emoji: '🐫' },
  // Treks
  { name: 'Kedarnath trek', coords: [30.73, 79.07], type: 'trek', note: '11,750 ft, Uttarakhand Himalayas', emoji: '🏔️' },
  { name: 'Triund trek', coords: [32.25, 76.35], type: 'trek', note: 'Dhauladhar views, Himachal', emoji: '⛺' },
];

// Visited cities — rendered as small glowing dots
export const cityDots: { name: string; coords: [number, number] }[] = [
  // USA
  { name: 'Chicago', coords: [41.88, -87.63] },
  { name: 'New York City', coords: [40.71, -74.01] },
  { name: 'Miami', coords: [25.76, -80.19] },
  { name: 'Philadelphia', coords: [39.95, -75.17] },
  { name: 'Pittsburgh', coords: [40.44, -80.0] },
  { name: 'New Hampshire', coords: [43.9, -71.5] },
  { name: 'Rhode Island', coords: [41.82, -71.41] },
  { name: 'Panama City Beach', coords: [30.18, -85.81] },
  { name: 'New Orleans', coords: [29.95, -90.07] },
  { name: 'Pensacola', coords: [30.42, -87.22] },
  { name: 'Destin', coords: [30.39, -86.5] },
  { name: 'Savannah', coords: [32.08, -81.09] },
  { name: 'Charleston', coords: [32.78, -79.93] },
  { name: 'Myrtle Beach', coords: [33.69, -78.89] },
  { name: 'Raleigh', coords: [35.78, -78.64] },
  { name: 'Charlotte', coords: [35.23, -80.84] },
  { name: 'Richmond', coords: [37.54, -77.44] },
  // India
  { name: 'Kochi', coords: [9.93, 76.27] },
  { name: 'Trivandrum', coords: [8.52, 76.94] },
  { name: 'Kanyakumari', coords: [8.09, 77.54] },
  { name: 'Dhanushkodi', coords: [9.15, 79.44] },
  { name: 'Gangtok', coords: [27.33, 88.61] },
];

// Names must match the GeoJSON exactly: us-states.json `name`, india-states.json `st_nm`
export const visitedStates = {
  us: [
    'Georgia', 'Virginia', 'District of Columbia', 'Illinois', 'New York', 'Florida',
    'Pennsylvania', 'New Hampshire', 'Rhode Island', 'Louisiana', 'South Carolina', 'North Carolina',
  ],
  india: [
    'Delhi', 'Uttar Pradesh', 'Punjab', 'Gujarat', 'Maharashtra', 'Madhya Pradesh',
    'Andhra Pradesh', 'Telangana', 'Karnataka', 'Tamil Nadu', 'Kerala',
    'Himachal Pradesh', 'Uttarakhand', 'Sikkim', 'West Bengal', 'Bihar',
  ],
};
