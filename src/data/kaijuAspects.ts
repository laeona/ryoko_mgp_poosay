/**
 * Path of the Kaiju: the aspect chosen each time a barbarian rages, plus the
 * level 6 and level 10 features that build on it.
 */
export interface RageContext {
  /** Barbarian level */
  level: number;
  strMod: number;
  conMod: number;
  /** Proficiency bonus */
  pb: number;
}

export const KAIJU_NAMES = [
  'Ascendant Dragon',
  'Eternal Leviathan',
  'Titan Earth',
  'Armoured Kabuto',
  'Infinite Tempest',
] as const;

const fmt = (n: number) => (n >= 0 ? `+${n}` : `${n}`);

/** Aspect of the Kaiju (level 3): what the chosen kaiju grants while you rage. */
export function getAspectBenefit(name: string, c: RageContext): string {
  switch (name) {
    case 'Ascendant Dragon': {
      const dice = c.level >= 17 ? 5 : c.level >= 11 ? 4 : c.level >= 5 ? 3 : 2;
      const dc = 8 + c.strMod + c.pb;
      return `Action: loose a blast of radiant energy in a 15-ft cone. Each creature makes a Dexterity save (DC ${dc}), taking ${dice}d10 radiant damage on a failure or half on a success. Using it counts as making an attack for keeping your rage going.`;
    }
    case 'Eternal Leviathan': {
      const dc = 8 + c.conMod + c.pb;
      return `When you enter your rage, or as a bonus action while raging, bellow an echoing cry. Each creature of your choice within 10 ft makes a Wisdom save (DC ${dc}) or has disadvantage on attack rolls against any target other than you until the start of your next turn.`;
    }
    case 'Titan Earth':
      return `Use your Constitution modifier (${fmt(c.conMod)}) instead of Strength for Strength checks and for attack and damage rolls with unarmed strikes and weapons. These still count as Strength-based for your other features. You also have tremorsense out to 10 ft.`;
    case 'Armoured Kabuto':
      return 'If you move at least 15 ft straight towards a target and then immediately hit it with a weapon attack, it takes an extra 2d8 bludgeoning damage.';
    case 'Infinite Tempest':
      return 'The first time each turn you hit a target with a melee attack roll, deal 1d6 lightning damage to each creature of your choice within 5 ft of the target.';
    default:
      return '';
  }
}

/** Kaiju Force (level 6): applies whenever you rage. */
export function getKaijuForce(c: RageContext): string {
  return `Kaiju Force: when you enter your rage you can grow to Large (objects you carry grow with you; if there's no room you grow as large as you can). While in this form add your Constitution modifier (${fmt(c.conMod)}) to Strength checks and Strength saves, and your weapon attacks deal an extra 1d4 damage on a hit.`;
}

/** Transformation of the Kaiju (level 10): the vassal form taken while raging. */
export function getTransformation(name: string, c: RageContext): string {
  switch (name) {
    case 'Ascendant Dragon':
      return 'You and your gear turn pseudo-liquid. You have resistance to fire damage, are immune to being grappled or restrained, gain a 60 ft swimming speed, can move through other creatures\' spaces and gaps as small as 1 inch wide without squeezing (but can\'t stop there), and gain the benefits of half cover while submerged in water.';
    case 'Eternal Leviathan':
      return 'You adopt a translucent, ghastly form. You have resistance to cold and necrotic damage, and you can move through other creatures and objects as if they were difficult terrain. You take 5 force damage if you end your turn inside an object or creature. If you are inside one when your rage ends, you are shunted to the nearest unoccupied space and take 5 force damage for every 5 feet travelled.';
    case 'Titan Earth':
      return 'When you use Kaiju Force, if you are smaller than Huge you become Huge instead of Large, along with anything you are wearing. On top of that feature\'s effects, your reach increases by 5 ft and your weapon attacks deal an extra 1d4 damage on a hit (2d4 extra in total) until your rage ends.';
    case 'Armoured Kabuto':
      return 'You sprout large, insectoid wings. You have a flying speed equal to your walking speed, and opportunity attacks against you have disadvantage.';
    case 'Infinite Tempest': {
      const dc = 8 + c.conMod + c.pb;
      return `You crackle with lightning and your blows land with booming claps of thunder. You have resistance to lightning and thunder damage, and you can use a bonus action to move in a straight line up to 30 ft, passing through other creatures without provoking opportunity attacks. Each creature you pass through makes a Dexterity save (DC ${dc}) or takes 2d6 lightning damage.`;
    }
    default:
      return '';
  }
}
