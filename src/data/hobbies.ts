export type Hobby = {
  title: string;
  emoji: string;
  tag: string;
  blurb: string;
  // Drop the actual photos at these paths under public/ — cards show a
  // labeled placeholder until the file exists.
  images: { src: string; alt: string; caption?: string }[];
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
      { src: '/hobbies/cricket-1.jpg', alt: 'Playing cricket', caption: 'mid-innings' },
      { src: '/hobbies/cricket-awards.jpg', alt: 'Cricket awards', caption: 'the receipts' },
    ],
  },
  {
    title: 'Golf',
    emoji: '⛳',
    tag: 'new obsession',
    blurb:
      'The newest addiction. Turns out chasing a tiny ball across a giant lawn is the perfect gradient descent metaphor — small corrections, occasional divergence.',
    images: [{ src: '/hobbies/golf.jpg', alt: 'On the golf course', caption: 'negotiating with my slice' }],
  },
  {
    title: 'Football · PSG',
    emoji: '⚽',
    tag: 'allez paris',
    blurb:
      'PSG supporter through the highs, the lows, and the Champions League heartbreaks. Yes I own the jersey. Yes it comes out on matchdays.',
    images: [{ src: '/hobbies/psg-jersey.jpg', alt: 'Wearing the PSG jersey', caption: 'matchday fit' }],
  },
  {
    title: 'Formula 1 · Ferrari',
    emoji: '🏎️',
    tag: 'forza ferrari',
    blurb:
      'Tifosi. I watch every race, defend every strategy call (painfully), and built a huge Ferrari Lego that has permanent pole position on my desk.',
    images: [{ src: '/hobbies/ferrari-lego.jpg', alt: 'Ferrari Lego build', caption: 'the desk build' }],
  },
  {
    title: 'Food & Cooking',
    emoji: '🍳',
    tag: 'chef mode',
    blurb:
      'I travel to eat and I cook well enough that people ask for seconds — and the recipe. Great food is just a well-tuned pipeline with taste as the eval metric.',
    images: [{ src: '/hobbies/food.jpg', alt: 'Something I cooked', caption: 'shipped to production (dinner)' }],
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
