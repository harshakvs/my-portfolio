export type Pin = {
  name: string;
  coords: [number, number]; // [lat, lng]
  type: 'lived' | 'trek';
  note?: string;
  emoji?: string;
};

// Pins: places lived + treks. Everywhere else is tracked at state level (visitedStates).
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

// Names must match the GeoJSON exactly: us-states.json `name`, india-states.json `st_nm`
export const visitedStates = {
  us: [
    'Georgia', 'Virginia', 'District of Columbia', 'Illinois', 'New York', 'Florida',
    'Pennsylvania', 'New Hampshire', 'Rhode Island', 'Louisiana', 'South Carolina', 'North Carolina',
    'Maryland', 'Tennessee', 'Texas',
  ],
  india: [
    'Delhi', 'Uttar Pradesh', 'Punjab', 'Gujarat', 'Maharashtra', 'Madhya Pradesh',
    'Andhra Pradesh', 'Telangana', 'Karnataka', 'Tamil Nadu', 'Kerala',
    'Himachal Pradesh', 'Uttarakhand', 'Sikkim', 'West Bengal', 'Bihar',
    'Goa', 'Andaman and Nicobar Islands', 'Lakshadweep',
  ],
};

// Used in copy across the site (travel page, hobbies card, chatbot, robot), so it never goes stale.
export const stateCount = visitedStates.us.length + visitedStates.india.length;
