export type Hobby = {
  title: string;
  emoji: string;
  tag: string;
  blurb: string;
  // Drop the actual photos at these paths under public/ — cards show a
  // labeled placeholder until the file exists.
  // pos = CSS object-position, to keep the subject in frame when a portrait photo is cropped to 4:3
  images: { src: string; alt: string; caption?: string; pos?: string; tall?: boolean }[];
  link?: { href: string; label: string };
};

export const hobbies: Hobby[] = [
  {
    title: 'Cricket',
    emoji: '🏏',
    tag: 'first love',
    blurb:
      'Bat in hand since before I could spell "machine learning". Played competitive cricket — and the awards shelf is not for decoration.',
    images: [
      { src: '/hobbies/cricket-1.jpg', alt: 'Raising a cricket trophy', caption: 'trophy up', pos: 'center 30%', tall: true },
      { src: '/hobbies/cricket-awards.jpg', alt: 'Holding two cricket awards', caption: 'the receipts', pos: 'center 40%', tall: true },
    ],
  },
  {
    title: 'Golf',
    emoji: '⛳',
    tag: 'new obsession',
    blurb:
      'The newest addiction. Turns out chasing a tiny ball across a giant lawn is the perfect gradient descent metaphor — small corrections, occasional divergence.',
    images: [
      { src: '/hobbies/golf.jpg', alt: 'Top of my backswing on the driving range', caption: 'negotiating with my slice', pos: 'center 45%' },
    ],
  },
  {
    title: 'Football · PSG',
    emoji: '⚽',
    tag: 'allez paris',
    blurb:
      'PSG supporter through the highs, the lows, and years of Champions League heartbreak, finally paid off by that night in Munich in 2025. Yes I own the jersey. Yes it comes out on matchdays.',
    images: [],
  },
  {
    title: 'Formula 1 · Ferrari',
    emoji: '🏎️',
    tag: 'forza ferrari',
    blurb:
      'Tifosi. I watch every race, defend every strategy call (painfully), and built a huge Ferrari Lego that has permanent pole position on my desk.',
    images: [{ src: '/hobbies/ferrari-lego.jpg', alt: 'Ferrari Lego Technic F1 car build', caption: 'pole position, every race', pos: 'center 65%' }],
  },
  {
    title: 'Food & Cooking',
    emoji: '🍳',
    tag: 'chef mode',
    blurb:
      'I travel to eat and I cook well enough that people ask for seconds — and the recipe. Great food is just a well-tuned pipeline with taste as the eval metric.',
    images: [
      { src: '/hobbies/food-3.jpg', alt: 'Chocolate croquembouche tower', caption: 'croquembouche' },
      { src: '/hobbies/food-4.jpg', alt: 'Sliced chocolate babka', caption: 'chocolate babka', pos: 'center 40%' },
      { src: '/hobbies/food-2.jpg', alt: 'Pav bhaji with buttered pav', caption: 'pav bhaji' },
      { src: '/hobbies/food-1.jpg', alt: 'Butter naan with curry', caption: 'naan + curry' },
    ],
  },
  {
    title: 'Travelling',
    emoji: '🌍',
    tag: '28 states deep',
    blurb:
      'Two countries, 28 states/regions and counting — Himalayan treks to Gulf-coast beaches. The full log lives on the map.',
    images: [],
    link: { href: '/travel', label: 'open the map →' },
  },
];
