/** World setting for Mato, the enchanted megacity. */

export type RegionId = 'west' | 'north' | 'south' | 'east' | 'centre';

export interface Region {
  id: RegionId;
  /** Display name of the district */
  name: string;
  /** Japanese reading or title, shown as a subtitle */
  subtitle: string;
  direction: string;
  guardian: string;
  guardianKanji: string;
  guardianTitle: string;
  element: string;
  season: string;
  colour: string;
  /** Accent used for the map and card */
  accent: string;
  meaning: string;
  vibe: string;
  description: string;
  /** Names of the peoples who mostly live here */
  peoples: string[];
  status?: string;
}

export const MATO_INTRO =
  'Mato is an enchanted megacity where humans and yokai live side by side. It is divided into five districts, North, East, South, West and Centre, each with its own season, mood and celestial guardian.';

export interface TimelineBeat {
  title: string;
  text: string;
}

export const CATACLYSM = {
  title: 'The Merging of Worlds',
  summary:
    'Fifty years ago a cataclysm tore through Mato and destroyed the southern district, Nankin. It is the reason humans now live in this world.',
  beats: [
    {
      title: 'The cataclysm',
      text: 'A section of the human world forced its way into the southern district and wiped it out. Suzaku, the guardian of the south, vanished with it.',
    },
    {
      title: 'What scientists found',
      text: 'Researchers studied debris from an unknown world and spoke with humans who were carried across. They named the event the merging of worlds.',
    },
    {
      title: 'The cause',
      text: "A vast build-up of emotion, energy and magic, usually produced by warfare, caused it. Human survivors point to nuclear war. In this world the same kind of power is linked to Yataragasu.",
    },
    {
      title: 'Mato today',
      text: 'Humans have settled into the city. Mato is rebuilding the southern district and searching for ways to stop another cataclysm.',
    },
  ] as TimelineBeat[],
};

export const REGIONS: Region[] = [
  {
    id: 'west',
    name: 'Kurenai-Gaoka',
    subtitle: 'The red-lit hills',
    direction: 'West',
    guardian: 'Byakko',
    guardianKanji: '白虎',
    guardianTitle: 'The White Tiger of the West',
    element: 'Metal',
    season: 'Autumn',
    colour: 'White',
    accent: '#c8102e',
    meaning: 'Strength, courage, and protection against evil spirits.',
    vibe: 'A red light district glowing under maple (momiji) trees.',
    description:
      'Most peoples live here, with slightly more Oniborne, Haniwa and humans than elsewhere. Paper lanterns burn through the night beneath the autumn leaves.',
    peoples: ['Oniborne', 'Haniwa', 'Human'],
  },
  {
    id: 'north',
    name: 'Lake Hakame',
    subtitle: 'Hakamenoko',
    direction: 'North',
    guardian: 'Genbu',
    guardianKanji: '玄武',
    guardianTitle: 'The Black Tortoise of the North',
    element: 'Water',
    season: 'Winter',
    colour: 'Black, or dark',
    accent: '#3d5a8a',
    meaning:
      'Shown as a tortoise entwined with a snake. Wisdom, long life, and defence against harsh winter winds.',
    vibe: 'A vast lake filled with floating ice. It is cold but not snowing, with only the occasional light flurry.',
    description:
      'Home to most of the Ryokido, Fuyoren and Isetsu. The cold keeps the district calm and quiet.',
    peoples: ['Ryokido', 'Fuyoren', 'Isetsu'],
  },
  {
    id: 'south',
    name: 'Nankin',
    subtitle: 'The Southern Capital',
    direction: 'South',
    guardian: 'Suzaku',
    guardianKanji: '朱雀',
    guardianTitle: 'The Vermilion Bird of the South',
    element: 'Fire',
    season: 'Summer',
    colour: 'Vermilion',
    accent: '#d9481f',
    meaning: 'The fire and warmth of summer.',
    vibe: 'A crater where a great city once stood, now slowly being rebuilt.',
    description:
      'Nankin was destroyed fifty years ago and is now a crater. It once housed most of the Kitsune, so Kitsune are now far fewer than they were. Suzaku has disappeared.',
    peoples: ['Kitsune'],
    status: 'Destroyed in the cataclysm',
  },
  {
    id: 'east',
    name: 'Tento',
    subtitle: 'The Celestial Island',
    direction: 'East',
    guardian: 'Seiryu',
    guardianKanji: '青龍',
    guardianTitle: 'The Azure Dragon of the East',
    element: 'Wood',
    season: 'Spring',
    colour: 'Azure',
    accent: '#2a8fa8',
    meaning: 'The renewal of spring.',
    vibe: 'A city of skyscrapers held up by great jade pillars above the clouds.',
    description:
      'The main home of the Ryujin and Nishikin (the Tatsumi), the Tengu and the Enkoh. The only way to reach the temple at the centre of Mato is through this island.',
    peoples: ['Ryujin', 'Nishikin', 'Tengu', 'Enkoh'],
  },
  {
    id: 'centre',
    name: 'Shinbashira',
    subtitle: 'The Divine Pillar',
    direction: 'Centre',
    guardian: 'Huanglong',
    guardianKanji: '黄龍',
    guardianTitle: 'The Auspicious Gold Dragon',
    element: 'None',
    season: 'None',
    colour: 'Gold',
    accent: '#c9981f',
    meaning: 'The balance at the heart of the other four.',
    vibe: 'A golden temple on a great pillar, quiet and empty.',
    description:
      'The temple of the Gold Dragon. No one lives here, and it can only be reached through the Celestial Island.',
    peoples: [],
    status: 'Uninhabited',
  },
];

export interface People {
  name: string;
  /** Short note on who they are (from the race data) */
  blurb: string;
  homes: RegionId[];
  /** Whether the setting study names a home for them */
  homeNote?: string;
}

export const PEOPLES: People[] = [
  { name: 'Oniborne', blurb: 'Descendants of oni with simmering, instinctive magic.', homes: ['west'] },
  { name: 'Haniwa', blurb: 'Sentient clay guardians reborn from ancient vessels.', homes: ['west'] },
  { name: 'Human', blurb: 'Newcomers from another world, carried across by the merging.', homes: ['west'] },
  { name: 'Ryokido', blurb: 'Turtle-folk with moss-like manes who value family and community.', homes: ['north'] },
  { name: 'Fuyoren', blurb: 'Mobile plant people born of gentle rivers and still ponds.', homes: ['north'] },
  { name: 'Isetsu', blurb: 'Crustacean-like folk from the coastal cliffs, masters of fortune.', homes: ['north'] },
  { name: 'Kitsune', blurb: 'Long-lived fox-folk with powers of transformation. Most lived in Nankin.', homes: ['south'], homeNote: 'Fewer now since Nankin fell' },
  { name: 'Ryujin', blurb: 'Dragon-folk of the Tatsumi. A Nishikin can become a Ryujin at a moment of great significance.', homes: ['east'] },
  { name: 'Nishikin', blurb: 'Fish-folk of the Tatsumi who may one day metamorphose into Ryujin.', homes: ['east'] },
  { name: 'Tengu', blurb: 'Aloof forest guardians with a proud warrior tradition and illusion magic.', homes: ['east'] },
  { name: 'Enkoh', blurb: 'Thick-furred simian folk with a gift for survival.', homes: ['east'] },
  { name: 'Hanamori', blurb: 'Gaunt crimson-petalled plant folk who resonate with the spirits of the dying.', homes: [], homeNote: 'No home district named yet' },
];
