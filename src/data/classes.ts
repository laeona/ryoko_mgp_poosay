import type { DnDClass } from '../types/character';

export const CLASSES: DnDClass[] = [
  // ============================================================
  // BARBARIAN
  // ============================================================
  {
    name: 'Barbarian',
    description:
      'A fierce warrior of primitive background who can enter a battle rage.',
    hitDie: 12,
    primaryAbility: ['strength'],
    savingThrows: ['strength', 'constitution'],
    armorProficiencies: ['Light Armor', 'Medium Armor', 'Shields'],
    weaponProficiencies: ['Simple Weapons', 'Martial Weapons'],
    toolProficiencies: [],
    skillChoices: {
      count: 2,
      options: [
        'Animal Handling',
        'Athletics',
        'Intimidation',
        'Nature',
        'Perception',
        'Survival',
      ],
    },
    subclassLevel: 3,
    subclassLabel: 'Primal Path',
    martialTier: 'full',
    features: [
      { level: 1, name: 'Rage', description: 'Bonus action: advantage on Strength checks/saves, bonus melee damage, resistance to physical damage.' },
      { level: 1, name: 'Unarmored Defense', description: 'AC = 10 + DEX + CON when not wearing armor.' },
      { level: 2, name: 'Reckless Attack', description: 'Advantage on Strength attacks this turn; attacks against you have advantage until your next turn.' },
      { level: 2, name: 'Danger Sense', description: 'Advantage on DEX saves against effects you can see.' },
      { level: 3, name: 'Primal Path', description: 'Choose a subclass.' },
      { level: 4, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 5, name: 'Extra Attack', description: 'Attack twice when you take the Attack action.' },
      { level: 5, name: 'Fast Movement', description: 'Speed increases by 10 ft. while not wearing heavy armor.' },
      { level: 6, name: 'Path Feature', description: 'Subclass feature.' },
      { level: 7, name: 'Feral Instinct', description: 'Advantage on initiative. Can act while surprised if you rage first.' },
      { level: 8, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 9, name: 'Brutal Critical', description: 'Roll one additional weapon damage die on a critical hit.' },
      { level: 10, name: 'Path Feature', description: 'Subclass feature.' },
      { level: 11, name: 'Relentless Rage', description: 'If you drop to 0 HP while raging, make a DC 10 CON save to stay at 1 HP instead.' },
      { level: 12, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 13, name: 'Brutal Critical (2)', description: 'Roll two additional weapon damage dice on a critical hit.' },
      { level: 14, name: 'Path Feature', description: 'Subclass feature.' },
      { level: 15, name: 'Persistent Rage', description: 'Your rage only ends early if you fall unconscious or choose to end it.' },
      { level: 16, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 17, name: 'Brutal Critical (3)', description: 'Roll three additional weapon damage dice on a critical hit.' },
      { level: 18, name: 'Indomitable Might', description: 'If your Strength check total is less than your Strength score, use the score instead.' },
      { level: 19, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 20, name: 'Primal Champion', description: '+4 to Strength and Constitution (max 24).' },
    ],
    choices: [
      {
        id: 'barbarian-kaiju-aspect',
        label: 'Aspect of the Kaiju',
        type: 'select',
        level: 3,
        options: [
          'Ascendant Dragon',
          'Eternal Leviathan',
          'Titan Earth',
          'Armoured Kabuto',
          'Infinite Tempest',
        ],
      },
    ],
    subclasses: [
      {
        name: 'Path of the Kaiju',
        description:
          'Draw power from a primordial kaiju to become a vassal of destruction.',
        features: [
          { level: 3, name: 'Aspect of the Kaiju', description: 'Choose a kaiju aspect for unique rage benefits.' },
          { level: 3, name: 'Apex Hunter', description: 'Proficiency in Medicine and Survival. Brace, stand from prone, or mount for only 5 ft.' },
          { level: 6, name: 'Kaiju Force', description: 'When you rage, grow to Large. Add CON to Strength checks/saves. +1d4 weapon damage.' },
          { level: 10, name: 'Transformation of the Kaiju', description: 'Assume a vassal form of your chosen kaiju while raging.' },
          { level: 14, name: 'Kaiju Ascendant', description: 'Further kaiju transformation benefits.' },
        ],
      },
    ],
  },

  // ============================================================
  // BARD
  // ============================================================
  {
    name: 'Bard',
    description:
      'An inspiring magician whose power echoes the music of creation.',
    hitDie: 8,
    primaryAbility: ['charisma'],
    savingThrows: ['dexterity', 'charisma'],
    armorProficiencies: ['Light Armor'],
    weaponProficiencies: [
      'Simple Weapons',
      'Hand Crossbows',
      'Longswords',
      'Rapiers',
      'Shortswords',
    ],
    toolProficiencies: ["Three musical instruments of your choice"],
    skillChoices: {
      count: 3,
      options: [
        'Acrobatics',
        'Animal Handling',
        'Arcana',
        'Athletics',
        'Deception',
        'History',
        'Insight',
        'Intimidation',
        'Investigation',
        'Medicine',
        'Nature',
        'Perception',
        'Performance',
        'Persuasion',
        'Religion',
        'Sleight of Hand',
        'Stealth',
        'Survival',
      ],
    },
    subclassLevel: 3,
    subclassLabel: 'Bard College',
    martialTier: 'none',
    spellcasting: {
      type: 'full',
      ability: 'charisma',
      ritual: true,
      focus: 'Musical instrument',
    },
    features: [
      { level: 1, name: 'Spellcasting', description: 'Cast bard spells using Charisma. Ritual casting available.' },
      { level: 1, name: 'Bardic Inspiration', description: 'Bonus action: give a creature a d6 to add to one roll. Uses = CHA mod.' },
      { level: 2, name: 'Jack of All Trades', description: 'Add half proficiency to any ability check that doesn\'t already use proficiency.' },
      { level: 2, name: 'Song of Rest', description: 'Allies regain extra HP during short rests (d6 at level 2).' },
      { level: 3, name: 'Bard College', description: 'Choose a subclass.' },
      { level: 3, name: 'Expertise', description: 'Double proficiency in two skills.' },
      { level: 4, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 5, name: 'Bardic Inspiration (d8)', description: 'Inspiration die increases to d8.' },
      { level: 5, name: 'Font of Inspiration', description: 'Regain Bardic Inspiration on short rest.' },
      { level: 6, name: 'Countercharm', description: 'Use action to give allies advantage against frightened/charmed.' },
      { level: 6, name: 'Bard College Feature', description: 'Subclass feature.' },
      { level: 8, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 9, name: 'Song of Rest (d8)', description: 'Song of Rest die increases to d8.' },
      { level: 10, name: 'Bardic Inspiration (d10)', description: 'Inspiration die increases to d10.' },
      { level: 10, name: 'Expertise (2)', description: 'Two more skills gain doubled proficiency.' },
      { level: 10, name: 'Magical Secrets', description: 'Learn 2 spells from any class.' },
      { level: 12, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 13, name: 'Song of Rest (d10)', description: 'Song of Rest die increases to d10.' },
      { level: 14, name: 'Magical Secrets (2)', description: 'Learn 2 more spells from any class.' },
      { level: 14, name: 'Bard College Feature', description: 'Subclass feature.' },
      { level: 15, name: 'Bardic Inspiration (d12)', description: 'Inspiration die increases to d12.' },
      { level: 16, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 17, name: 'Song of Rest (d12)', description: 'Song of Rest die increases to d12.' },
      { level: 18, name: 'Magical Secrets (3)', description: 'Learn 2 more spells from any class.' },
      { level: 19, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 20, name: 'Superior Inspiration', description: 'Regain Bardic Inspiration when you roll initiative and have none.' },
    ],
    subclasses: [
      {
        name: 'College of Hanabi',
        description:
          'A bard who weaves fireworks and pyrotechnics into powerful magical performances.',
        features: [
          { level: 3, name: 'Pyrotechnics', description: 'Create magical pyrotechnics (Kodama Candle, Screaming Nue, Raijū\'s Rupture, Wanyūdō Wheel).' },
          { level: 6, name: 'Firework Display', description: 'Create a 1-minute display to influence up to 2× CHA mod creatures for 24 hours.' },
          { level: 14, name: 'Master of Illuminations', description: 'Firework Display affects 3× creatures. Pyrotechnics improved.' },
        ],
      },
      {
        name: 'College of Masks',
        description:
          'A performer who transforms through conjured masks, embodying different personas.',
        features: [
          { level: 3, name: 'Nogaku Conjuration', description: 'Bonus action: conjure a mask (Beauty, Hope, Solitude, War).' },
          { level: 3, name: 'Inspiring Performance', description: 'A 10-minute performance grants temp HP and initiative advantage.' },
          { level: 6, name: 'Stagecraft', description: 'Bonus action: swap places with a creature within 60 ft.' },
          { level: 14, name: 'Grandiose Transformation', description: 'Masks grant enhanced benefits.' },
        ],
      },
    ],
  },

  // ============================================================
  // BENDER (NEW CLASS)
  // ============================================================
  {
    name: 'Bender',
    description:
      'A martial spellcaster who bends the four elements through precise physical movement.',
    hitDie: 8,
    primaryAbility: ['intelligence', 'wisdom', 'charisma'],
    savingThrows: ['strength', 'constitution'],
    armorProficiencies: ['Light Armor'],
    weaponProficiencies: [
      'Simple Weapons',
      'Chakrams',
      'Nunchaku',
      'Shortswords',
      'Shuriken',
      'Starknives',
      'Twinblades',
    ],
    toolProficiencies: ["One artisan's tools or one musical instrument"],
    skillChoices: {
      count: 2,
      options: [
        'Acrobatics',
        'Athletics',
        'History',
        'Insight',
        'Religion',
        'Stealth',
      ],
    },
    subclassLevel: 3,
    subclassLabel: 'Bender Discipline',
    martialTier: 'half',
    spellcasting: {
      type: 'half',
      ability: 'choice',
      focus: 'Free hand',
    },
    features: [
      { level: 1, name: 'Spellcasting', description: 'Choose INT, WIS, or CHA as your spellcasting ability. Prepare spells from the bender spell list.' },
      { level: 1, name: 'Elemental Affinity', description: 'Choose one of Air, Earth, Fire, Water. Adds its spells to your list and defines your damage types.' },
      { level: 1, name: 'Elemental Strikes', description: 'Unarmed strikes deal 1d6 + mod (melee, 10-ft reach) or 1d4 + mod (ranged, 60 ft).' },
      { level: 2, name: 'Elemental Combo', description: 'After attacking or casting a levelled spell, bonus action to make a 1d4 elemental attack.' },
      { level: 3, name: 'Bender Discipline', description: 'Choose a subclass.' },
      { level: 4, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 5, name: 'Extra Attack', description: 'Attack twice when you take the Attack action.' },
      { level: 6, name: 'Elemental Affinity (2)', description: 'Choose another element, or the same one again (upcasting).' },
      { level: 7, name: 'Discipline Feature', description: 'Subclass feature.' },
      { level: 8, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 10, name: 'Elemental Affinity (3)', description: 'Choose another element, or the same one again.' },
      { level: 11, name: 'Primordial Form', description: 'Bonus action: embody an element for 1 minute with special benefits.' },
      { level: 12, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 14, name: 'Elemental Affinity (4)', description: 'Choose another element, or the same one again.' },
      { level: 15, name: 'Discipline Feature', description: 'Subclass feature.' },
      { level: 16, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 18, name: 'Primordial Avatar', description: 'Become an incarnation of your elements for 10 minutes.' },
      { level: 19, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 20, name: 'Discipline Feature', description: 'Subclass feature.' },
    ],
    choices: [
      {
        id: 'bender-spellcasting-ability',
        label: 'Spellcasting Ability',
        type: 'select',
        level: 1,
        options: ['Intelligence', 'Wisdom', 'Charisma'],
      },
    ],
    subclasses: [
      {
        name: 'Disciple of Ferocity',
        description:
          'A blade-wielding bender who channels destruction through weapons.',
        features: [
          { level: 3, name: 'Discipline Spells', description: 'magic missile, magic weapon, blink, guardian of faith, arcane hand.' },
          { level: 3, name: 'Martial Proficiencies', description: 'Medium armor, shields, martial weapons. Weapons can be spellcasting focus.' },
          { level: 3, name: 'Elemental Conduit', description: 'Use spellcasting ability instead of STR/DEX for weapon attacks.' },
          { level: 7, name: 'Destructive Nature', description: 'Expend spell slot for extra 2d8+ elemental damage on a hit.' },
          { level: 15, name: 'Elemental Ferocity', description: 'Elemental Combo damage increases to 5d4.' },
          { level: 20, name: 'Primordial Battery', description: 'Attack three times with the Attack action.' },
        ],
      },
      {
        name: 'Disciple of Fortification',
        description:
          'A protective bender who shields allies with elemental barriers.',
        features: [
          { level: 3, name: 'Discipline Spells', description: 'shield, shielding word, protection from energy, resilient sphere, endure.' },
          { level: 3, name: 'Defensive Proficiencies', description: 'Medium + heavy armor, shields. Shield can be spellcasting focus.' },
          { level: 3, name: 'Primordial Shield', description: 'Bonus action: 1d6 temp HP to self or ally within 30 ft.' },
          { level: 7, name: 'Redirect Elements', description: 'Reduce damage of your affinity types by 2d6 per affinity. Redirect if reduced to 0.' },
          { level: 15, name: 'Fortified Retaliation', description: 'Additional retaliatory damage.' },
          { level: 20, name: 'Absolute Fortress', description: 'Capstone defensive ability.' },
        ],
      },
      {
        name: 'Disciple of Fusion',
        description:
          'A bender who blends elements to create hybrid effects.',
        features: [
          { level: 3, name: 'Bonus Cantrips', description: 'Two additional bender cantrips from any element.' },
          { level: 3, name: 'Bonus Spells', description: 'One 1st-level spell from any element. More at 5th, 9th, 13th, 17th.' },
          { level: 3, name: 'Fusionist Spellcasting', description: 'Augment spells with a second element (Dust, Smoke, Ice, Lava, Mud, Steam).' },
          { level: 7, name: 'Elemental Substitution', description: 'Change damage types between your affinities.' },
          { level: 15, name: 'Unleashed Elements', description: 'Cast a cantrip as bonus action after casting a levelled bender spell.' },
          { level: 20, name: 'Avatar of Elements', description: 'Two additional Elemental Affinities.' },
        ],
      },
      {
        name: 'Disciple of Invigoration',
        description:
          'A supporting bender who bolsters allies with elemental energy.',
        features: [
          { level: 3, name: 'Discipline Spells', description: 'bless, enhance ability, haste, freedom of movement, greater restoration.' },
          { level: 3, name: 'Invigorating Body', description: 'HP max +3, +1 per level. Add spellcasting mod to concentration checks.' },
          { level: 3, name: 'Primordial Pulse', description: 'Reaction: reroll a missed attack or failed save for an ally within 30 ft.' },
          { level: 7, name: 'Distracting Onslaught', description: 'Deal elemental damage: target has -1d8 on next attack/save.' },
          { level: 15, name: 'Elemental Enhancement', description: 'Enhance ally-targeted spells with bonus effects.' },
          { level: 20, name: 'Primordial Invigoration', description: 'Grant Avatar benefits to up to 5 allies.' },
        ],
      },
    ],
  },

  // ============================================================
  // CLERIC
  // ============================================================
  {
    name: 'Cleric',
    description:
      'A priestly champion who wields divine magic in service of a higher power.',
    hitDie: 8,
    primaryAbility: ['wisdom'],
    savingThrows: ['wisdom', 'charisma'],
    armorProficiencies: ['Light Armor', 'Medium Armor', 'Shields'],
    weaponProficiencies: ['Simple Weapons'],
    toolProficiencies: [],
    skillChoices: {
      count: 2,
      options: ['History', 'Insight', 'Medicine', 'Persuasion', 'Religion'],
    },
    subclassLevel: 1,
    subclassLabel: 'Divine Domain',
    martialTier: 'none',
    spellcasting: {
      type: 'full',
      ability: 'wisdom',
      ritual: true,
      focus: 'Holy symbol',
    },
    features: [
      { level: 1, name: 'Spellcasting', description: 'Cast cleric spells using Wisdom. Prepare spells from the cleric spell list.' },
      { level: 1, name: 'Divine Domain', description: 'Choose a domain. Grants spells and features at 1st, 2nd, 6th, 8th, and 17th level.' },
      { level: 2, name: 'Channel Divinity', description: 'Channel divine energy for Turn Undead and domain effects. Uses = 1, +1 at 6th, 18th.' },
      { level: 4, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 5, name: 'Destroy Undead', description: 'Turn Undead destroys low-CR undead.' },
      { level: 6, name: 'Channel Divinity (2)', description: 'Two uses of Channel Divinity per rest.' },
      { level: 8, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 8, name: 'Divine Strike / Potent Spellcasting', description: 'Domain feature.' },
      { level: 10, name: 'Divine Intervention', description: 'Call on your deity for aid. 10% success, +10% per level after.' },
      { level: 12, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 16, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 18, name: 'Channel Divinity (3)', description: 'Three uses of Channel Divinity per rest.' },
      { level: 19, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 20, name: 'Divine Intervention Improvement', description: 'Divine Intervention succeeds automatically.' },
    ],
    subclasses: [
      {
        name: 'Shrine Warden Domain',
        description:
          'A cleric who consecrates sacred ground, trapping enemies and empowering allies.',
        features: [
          { level: 1, name: 'Bonus Proficiencies', description: 'Martial weapons and heavy armor.' },
          { level: 1, name: 'Enrapture', description: 'On hit: push or slow the target (CHA save). Uses = WIS mod per long rest.' },
          { level: 2, name: 'Channel Divinity: Consecration', description: 'Bonus action: create a shrine. Bless or curse creatures in a 20-ft radius.' },
          { level: 6, name: 'Shrine Guardian', description: 'Consecration summons a Tiny spirit. Reaction: ±1d4 to a creature\'s roll.' },
          { level: 8, name: 'Divine Strike', description: 'Extra 1d8 radiant damage on weapon hit (2d8 at 14th).' },
          { level: 17, name: 'Empowered Consecration', description: 'Aura increases to 30 ft. All 3 blessings or curses at once.' },
        ],
      },
    ],
  },

  // ============================================================
  // DRUID
  // ============================================================
  {
    name: 'Druid',
    description:
      'A priest of the Old Faith, wielding the powers of nature and adopting animal forms.',
    hitDie: 8,
    primaryAbility: ['wisdom'],
    savingThrows: ['intelligence', 'wisdom'],
    armorProficiencies: ['Light Armor', 'Medium Armor', 'Shields (non-metal)'],
    weaponProficiencies: [
      'Clubs',
      'Daggers',
      'Darts',
      'Javelins',
      'Maces',
      'Quarterstaffs',
      'Scimitars',
      'Sickles',
      'Slings',
      'Spears',
    ],
    toolProficiencies: ['Herbalism Kit'],
    skillChoices: {
      count: 2,
      options: [
        'Arcana',
        'Animal Handling',
        'Insight',
        'Medicine',
        'Nature',
        'Perception',
        'Religion',
        'Survival',
      ],
    },
    subclassLevel: 2,
    subclassLabel: 'Druid Circle',
    martialTier: 'none',
    spellcasting: {
      type: 'full',
      ability: 'wisdom',
      ritual: true,
      focus: 'Druidic focus',
    },
    features: [
      { level: 1, name: 'Druidic', description: 'Know the secret language of druids.' },
      { level: 1, name: 'Spellcasting', description: 'Cast druid spells using Wisdom. Prepare spells.' },
      { level: 2, name: 'Wild Shape', description: 'Transform into a beast you\'ve seen. Twice per short rest.' },
      { level: 2, name: 'Druid Circle', description: 'Choose a subclass.' },
      { level: 4, name: 'Wild Shape Improvement', description: 'Higher CR beasts; swim speed allowed.' },
      { level: 4, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 6, name: 'Druid Circle Feature', description: 'Subclass feature.' },
      { level: 8, name: 'Wild Shape Improvement', description: 'Flying speed allowed.' },
      { level: 8, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 10, name: 'Druid Circle Feature', description: 'Subclass feature.' },
      { level: 12, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 14, name: 'Druid Circle Feature', description: 'Subclass feature.' },
      { level: 16, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 18, name: 'Timeless Body', description: 'You age 10× slower and can\'t be magically aged.' },
      { level: 18, name: 'Beast Spells', description: 'Cast druid spells while in Wild Shape.' },
      { level: 19, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 20, name: 'Archdruid', description: 'Unlimited Wild Shape uses. Ignore verbal/somatic components.' },
    ],
    subclasses: [
      {
        name: 'Circle of the Yokai',
        description:
          'A druid who transforms into powerful yokai forms instead of just beasts.',
        features: [
          { level: 2, name: 'Circle Spells', description: 'earthen uppercut, find familiar, invisibility, wanyūdō\'s fury, haste, water wyrm, compulsion, lion\'s roar, dominate person, eruption, animate objects.' },
          { level: 2, name: 'Yokai Wild Shape', description: 'Transform into Beast, Celestial, Construct, Fey, Fiend, Monstrosity, or Plant yokai. Speak normally. Advantage on concentration.' },
          { level: 6, name: 'Empowered Transformation', description: 'Cast a spell, then Wild Shape as a reaction. Weapon attacks in Wild Shape count as magical.' },
          { level: 10, name: 'Beckon the Yokai', description: 'Cast animate objects as an action, no spell slot, lasts 10 minutes.' },
          { level: 14, name: 'Yokai Fortification', description: 'If dropped to 0 HP while transformed, instantly re-transform, carrying excess damage over.' },
        ],
      },
    ],
  },

  // ============================================================
  // FIGHTER
  // ============================================================
  {
    name: 'Fighter',
    description:
      'A master of martial combat, skilled with a variety of weapons and armor.',
    hitDie: 10,
    primaryAbility: ['strength', 'dexterity'],
    savingThrows: ['strength', 'constitution'],
    armorProficiencies: ['All Armor', 'Shields'],
    weaponProficiencies: ['Simple Weapons', 'Martial Weapons'],
    toolProficiencies: [],
    skillChoices: {
      count: 2,
      options: [
        'Acrobatics',
        'Animal Handling',
        'Athletics',
        'History',
        'Insight',
        'Intimidation',
        'Perception',
        'Survival',
      ],
    },
    subclassLevel: 3,
    subclassLabel: 'Martial Archetype',
    martialTier: 'full',
    features: [
      { level: 1, name: 'Fighting Style', description: 'Choose a combat specialty (Archery, Defense, Dueling, etc.).' },
      { level: 1, name: 'Second Wind', description: 'Bonus action: regain 1d10 + fighter level HP. Recharges on short rest.' },
      { level: 2, name: 'Action Surge', description: 'Take one additional action on your turn. Once per short rest.' },
      { level: 3, name: 'Martial Archetype', description: 'Choose a subclass.' },
      { level: 4, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 5, name: 'Extra Attack', description: 'Attack twice when you take the Attack action.' },
      { level: 7, name: 'Martial Archetype Feature', description: 'Subclass feature.' },
      { level: 8, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 9, name: 'Indomitable', description: 'Reroll a failed save (once per long rest).' },
      { level: 10, name: 'Martial Archetype Feature', description: 'Subclass feature.' },
      { level: 11, name: 'Extra Attack (2)', description: 'Attack three times when you take the Attack action.' },
      { level: 12, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 13, name: 'Indomitable (2)', description: 'Two uses of Indomitable.' },
      { level: 14, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 15, name: 'Martial Archetype Feature', description: 'Subclass feature.' },
      { level: 16, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 17, name: 'Action Surge (2)', description: 'Two uses of Action Surge.' },
      { level: 17, name: 'Indomitable (3)', description: 'Three uses of Indomitable.' },
      { level: 18, name: 'Martial Archetype Feature', description: 'Subclass feature.' },
      { level: 19, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 20, name: 'Extra Attack (3)', description: 'Attack four times when you take the Attack action.' },
    ],
    subclasses: [
      {
        name: 'Skeletal Blade',
        description:
          'A fighter who wields their own skeleton as a lethal weapon.',
        features: [
          { level: 3, name: 'Malleable Physique', description: 'Action: change height ±1 ft and facial features.' },
          { level: 3, name: 'Skeletal Form', description: 'Bonus action: bone weapon (1d8 piercing, Finesse, Skewer). Choose a benefit (reach, speed, climb, AC, temp HP).' },
          { level: 7, name: 'Osseous Prodigy', description: 'Choose an additional benefit + weapon property (Impact & Reeling Blow; Light & Hamstring; Heavy & Shockwave).' },
          { level: 10, name: 'Skeletal Knight', description: '+1 attack/damage with skeletal blade (+2 at 18th). Enhanced benefits: wings, resistances, bonus damage, grapple damage.' },
          { level: 15, name: 'One with Nothing', description: 'If reduced to 0 HP in Skeletal Form, revert and stay at 1 HP.' },
          { level: 18, name: 'Living Weapon', description: 'Two additional benefits on entering Skeletal Form.' },
        ],
      },
    ],
  },
    // ============================================================
  // MONK
  // ============================================================
  {
    name: 'Monk',
    description:
      'A master of martial arts, harnessing the power of the body in pursuit of perfection.',
    hitDie: 8,
    primaryAbility: ['dexterity', 'wisdom'],
    savingThrows: ['strength', 'dexterity'],
    armorProficiencies: [],
    weaponProficiencies: [
      'Simple Weapons',
      'Shortswords',
      'Chakrams',
      'Kusarigama',
      'Meteor Hammers',
      'Nunchaku',
      'Rope Darts',
      'Shuriken',
      'Tessen',
    ],
    toolProficiencies: ["One artisan's tools or one musical instrument"],
    skillChoices: {
      count: 2,
      options: [
        'Acrobatics',
        'Athletics',
        'History',
        'Insight',
        'Religion',
        'Stealth',
      ],
    },
    subclassLevel: 3,
    subclassLabel: 'Monastic Tradition',
    martialTier: 'full',
    features: [
      { level: 1, name: 'Unarmored Defense', description: 'AC = 10 + DEX + WIS when not wearing armor and not wielding a shield.' },
      { level: 1, name: 'Martial Arts', description: 'Use DEX for unarmed strikes and monk weapons. Bonus action unarmed strike. Unarmed damage die scales.' },
      { level: 2, name: 'Ki', description: 'Ki points = monk level. Fuel Flurry of Blows, Patient Defense, Step of the Wind.' },
      { level: 2, name: 'Unarmored Movement', description: '+10 ft. speed. Improves with level.' },
      { level: 3, name: 'Monastic Tradition', description: 'Choose a subclass.' },
      { level: 3, name: 'Deflect Missiles', description: 'Reduce ranged damage by 1d10 + DEX + monk level. Redirect if reduced to 0.' },
      { level: 4, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 4, name: 'Slow Fall', description: 'Reaction: reduce fall damage by 5 × monk level.' },
      { level: 5, name: 'Extra Attack', description: 'Attack twice when you take the Attack action.' },
      { level: 5, name: 'Stunning Strike', description: 'Spend 1 ki to attempt stun on a hit (CON save).' },
      { level: 6, name: 'Ki-Empowered Strikes', description: 'Unarmed strikes count as magical.' },
      { level: 6, name: 'Monastic Tradition Feature', description: 'Subclass feature.' },
      { level: 7, name: 'Evasion', description: 'On DEX saves vs area effects, no damage on success and half on fail.' },
      { level: 7, name: 'Stillness of Mind', description: 'Use action to end charmed or frightened on yourself.' },
      { level: 8, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 9, name: 'Unarmored Movement Improvement', description: 'Move along vertical surfaces and across liquids.' },
      { level: 10, name: 'Purity of Body', description: 'Immune to disease and poison.' },
      { level: 11, name: 'Monastic Tradition Feature', description: 'Subclass feature.' },
      { level: 12, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 13, name: 'Tongue of the Sun and Moon', description: 'Understand and be understood by any creature with a language.' },
      { level: 14, name: 'Diamond Soul', description: 'Proficiency in all saving throws. Reroll failed saves with 1 ki.' },
      { level: 15, name: 'Timeless Body', description: 'No aging penalties. No need for food or water.' },
      { level: 16, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 17, name: 'Monastic Tradition Feature', description: 'Subclass feature.' },
      { level: 18, name: 'Empty Body', description: 'Spend 4 ki for invisibility, or 8 ki for astral projection.' },
      { level: 19, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 20, name: 'Perfect Self', description: 'Regain 4 ki when you roll initiative with none.' },
    ],
    subclasses: [
      {
        name: 'Way of the Eight Gates',
        description:
          'Master the eight internal gates of ki, gaining increasingly powerful abilities.',
        features: [
          { level: 3, name: 'Gate of Earth', description: 'Regain HP = WIS mod when using Patient Defense or Step of the Wind.' },
          { level: 3, name: 'Gate of Water', description: 'Additional ki points equal to WIS mod.' },
          { level: 3, name: 'Gate of Air', description: 'Spend 1 ki on a hit: target has disadvantage on attacks vs others.' },
          { level: 3, name: 'Gate of Flame', description: 'Extra unarmed strike on Flurry of Blows. Uses = WIS mod per long rest.' },
          { level: 6, name: 'Gate of Presence', description: 'Add WIS mod to Charisma checks.' },
          { level: 11, name: 'Gate of Spirit', description: 'Bonus action: spend 2 ki. Touch a willing creature for temp HP + immediate reaction attack/Dodge/move.' },
          { level: 11, name: 'Gate of Mind', description: 'Cast telepathic bond without components. Once per short or long rest.' },
          { level: 17, name: 'Gate of Infinity', description: 'Action: spend 6 ki for 1 min of apotheosis (+20 speed, +2 AC, extra unarmed strike, WIS to attack/damage).' },
        ],
      },
    ],
  },

  // ============================================================
  // PALADIN
  // ============================================================
  {
    name: 'Paladin',
    description:
      'A holy warrior bound to a sacred oath.',
    hitDie: 10,
    primaryAbility: ['strength', 'charisma'],
    savingThrows: ['wisdom', 'charisma'],
    armorProficiencies: ['All Armor', 'Shields'],
    weaponProficiencies: ['Simple Weapons', 'Martial Weapons'],
    toolProficiencies: [],
    skillChoices: {
      count: 2,
      options: [
        'Athletics',
        'Insight',
        'Intimidation',
        'Medicine',
        'Persuasion',
        'Religion',
      ],
    },
    subclassLevel: 3,
    subclassLabel: 'Sacred Oath',
    martialTier: 'half',
    spellcasting: {
      type: 'half',
      ability: 'charisma',
      focus: 'Holy symbol',
    },
    features: [
      { level: 1, name: 'Divine Sense', description: 'Detect celestials, fiends, and undead within 60 ft.' },
      { level: 1, name: 'Lay on Hands', description: 'Pool of HP equal to 5 × paladin level. Use to heal or cure disease/poison.' },
      { level: 2, name: 'Fighting Style', description: 'Choose a combat specialty.' },
      { level: 2, name: 'Spellcasting', description: 'Cast paladin spells using Charisma. Prepare spells.' },
      { level: 2, name: 'Divine Smite', description: 'Expend a spell slot for extra radiant damage on a melee hit.' },
      { level: 3, name: 'Divine Health', description: 'Immune to disease.' },
      { level: 3, name: 'Sacred Oath', description: 'Choose a subclass. Grants Channel Divinity and oath spells.' },
      { level: 4, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 5, name: 'Extra Attack', description: 'Attack twice when you take the Attack action.' },
      { level: 6, name: 'Aura of Protection', description: 'You and allies within 10 ft add CHA mod to saves.' },
      { level: 7, name: 'Sacred Oath Feature', description: 'Subclass feature.' },
      { level: 8, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 10, name: 'Aura of Courage', description: 'You and allies within 10 ft can\'t be frightened.' },
      { level: 11, name: 'Improved Divine Smite', description: 'Melee weapon hits deal +1d8 radiant.' },
      { level: 12, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 14, name: 'Cleansing Touch', description: 'Use action to end one spell on yourself or willing ally. Uses = CHA mod.' },
      { level: 15, name: 'Sacred Oath Feature', description: 'Subclass feature.' },
      { level: 16, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 18, name: 'Aura Improvements', description: 'Auras extend to 30 ft.' },
      { level: 19, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 20, name: 'Sacred Oath Feature', description: 'Subclass feature.' },
    ],
    subclasses: [
      {
        name: 'Oath of the Yojimbo',
        description:
          'Swear to protect the vulnerable, becoming a shield against tyranny.',
        features: [
          { level: 3, name: 'Oath Spells', description: 'heroism, sanctuary, earthskin, warding bond, spirit guardians, switcheroo, death ward, steelskin, Bakuryō\'s blessed blizzard, wall of force.' },
          { level: 3, name: 'Channel Divinity: Holy Ward', description: 'Ritual: make a willing creature your ward for 24 hours. Grants immunity to frightened and lets you Smite through them.' },
          { level: 3, name: 'Channel Divinity: Guardian\'s Intervention', description: 'Reaction: reduce damage to a creature within 30 ft by 1d10 per 2 paladin levels.' },
          { level: 7, name: 'Daring Protector', description: 'Reaction: move toward an attacker targeting an ally within 10 ft to intercept.' },
          { level: 15, name: 'True Guardian', description: 'Help or Lay on Hands as a bonus action. Help grants CHA mod to the roll.' },
          { level: 20, name: 'Ultimate Protector', description: 'Action: 1 min of avatar state with +3 AC aura, ward revival, +2d8 radiant, free Guardian\'s Intervention.' },
        ],
      },
    ],
  },

  // ============================================================
  // RANGER
  // ============================================================
  {
    name: 'Ranger',
    description:
      'A warrior who uses martial prowess and nature magic to combat threats on the edges of civilization.',
    hitDie: 10,
    primaryAbility: ['dexterity', 'wisdom'],
    savingThrows: ['strength', 'dexterity'],
    armorProficiencies: ['Light Armor', 'Medium Armor', 'Shields'],
    weaponProficiencies: ['Simple Weapons', 'Martial Weapons'],
    toolProficiencies: [],
    skillChoices: {
      count: 3,
      options: [
        'Animal Handling',
        'Athletics',
        'Insight',
        'Investigation',
        'Nature',
        'Perception',
        'Stealth',
        'Survival',
      ],
    },
    subclassLevel: 3,
    subclassLabel: 'Ranger Archetype',
    martialTier: 'half',
    spellcasting: {
      type: 'half',
      ability: 'wisdom',
      focus: 'None (uses component pouch)',
    },
    features: [
      { level: 1, name: 'Favored Enemy', description: 'Choose a type of favored enemy. Advantage on tracking and recalling info.' },
      { level: 1, name: 'Natural Explorer', description: 'Mastery of a favored terrain type.' },
      { level: 2, name: 'Fighting Style', description: 'Choose a combat specialty (Archery, Defense, Dueling, Two-Weapon Fighting).' },
      { level: 2, name: 'Spellcasting', description: 'Cast ranger spells using Wisdom.' },
      { level: 3, name: 'Primeval Awareness', description: 'Expend a spell slot to sense certain creature types within miles.' },
      { level: 3, name: 'Ranger Archetype', description: 'Choose a subclass.' },
      { level: 4, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 5, name: 'Extra Attack', description: 'Attack twice when you take the Attack action.' },
      { level: 6, name: 'Favored Enemy and Natural Explorer Improvements', description: 'Gain additional favored enemies and terrains.' },
      { level: 7, name: 'Ranger Archetype Feature', description: 'Subclass feature.' },
      { level: 8, name: 'Land\'s Stride', description: 'Ignore difficult terrain. Advantage on saves vs plants. Advantage on saves vs magical plant effects.' },
      { level: 8, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 10, name: 'Hide in Plain Sight', description: 'Spend 1 minute camouflaging to gain +10 Stealth while motionless.' },
      { level: 11, name: 'Ranger Archetype Feature', description: 'Subclass feature.' },
      { level: 12, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 14, name: 'Vanish', description: 'Hide as a bonus action. Can\'t be tracked non-magically.' },
      { level: 15, name: 'Ranger Archetype Feature', description: 'Subclass feature.' },
      { level: 16, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 18, name: 'Feral Senses', description: 'Sense invisible creatures within 30 ft. No disadvantage on unseen attackers.' },
      { level: 19, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 20, name: 'Foe Slayer', description: 'Once per turn, add WIS mod to attack or damage roll vs favored enemy.' },
    ],
    subclasses: [
      {
        name: 'Ronin',
        description:
          'A masterless wanderer, deadly with a blade and unbound by code.',
        features: [
          { level: 3, name: 'Slash Draw', description: 'Extra 1d6 damage on first hit with a drawn weapon each turn. Draw/stow 3 weapons per turn.' },
          { level: 3, name: 'Wandering Magic', description: 'expeditious retreat, blur, remove curse, death ward, legend lore.' },
          { level: 3, name: 'Masterless', description: 'Add 1d6 to saves vs charmed.' },
          { level: 7, name: 'Cleaving Parry', description: 'Reaction: +DEX or STR mod to AC vs a weapon attack. Gain temp HP.' },
          { level: 11, name: 'Multi-Weapon Mastery', description: 'Advantage on first melee and first ranged attack each turn. No disadvantage for ranged in melee.' },
          { level: 15, name: 'Relentless Onslaught', description: 'Extra attacks on crits or kills (up to 3 per turn).' },
        ],
      },
    ],
  },

  // ============================================================
  // ROGUE
  // ============================================================
  {
    name: 'Rogue',
    description:
      'A scoundrel who uses stealth and trickery to overcome obstacles and enemies.',
    hitDie: 8,
    primaryAbility: ['dexterity'],
    savingThrows: ['dexterity', 'intelligence'],
    armorProficiencies: ['Light Armor'],
    weaponProficiencies: [
      'Simple Weapons',
      'Hand Crossbows',
      'Longswords',
      'Rapiers',
      'Shortswords',
      'Chakrams',
      'Sai',
      'Shuriken',
      'Tessen',
      'Tonfa',
    ],
    toolProficiencies: ["Thieves' tools"],
    skillChoices: {
      count: 4,
      options: [
        'Acrobatics',
        'Athletics',
        'Deception',
        'Insight',
        'Intimidation',
        'Investigation',
        'Perception',
        'Performance',
        'Persuasion',
        'Sleight of Hand',
        'Stealth',
      ],
    },
    subclassLevel: 3,
    subclassLabel: 'Roguish Archetype',
    martialTier: 'full',
    features: [
      { level: 1, name: 'Expertise', description: 'Double proficiency in two skills (or one skill + thieves\' tools).' },
      { level: 1, name: 'Sneak Attack', description: '+1d6 damage per odd rogue level when you have advantage or an ally adjacent to the target.' },
      { level: 1, name: "Thieves' Cant", description: 'Know the secret rogue language.' },
      { level: 2, name: 'Cunning Action', description: 'Bonus action: Dash, Disengage, or Hide.' },
      { level: 3, name: 'Roguish Archetype', description: 'Choose a subclass.' },
      { level: 4, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 5, name: 'Uncanny Dodge', description: 'Reaction: halve the damage from one attack you can see.' },
      { level: 6, name: 'Expertise (2)', description: 'Two more skills gain doubled proficiency.' },
      { level: 7, name: 'Evasion', description: 'On DEX saves vs area effects, no damage on success and half on fail.' },
      { level: 8, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 9, name: 'Roguish Archetype Feature', description: 'Subclass feature.' },
      { level: 10, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 11, name: 'Reliable Talent', description: 'Treat any d20 roll of 9 or lower as a 10 for skill checks with proficiency.' },
      { level: 12, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 13, name: 'Roguish Archetype Feature', description: 'Subclass feature.' },
      { level: 14, name: 'Blindsense', description: 'Sense hidden or invisible creatures within 10 ft.' },
      { level: 15, name: 'Slippery Mind', description: 'Proficiency in Wisdom saving throws.' },
      { level: 16, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 17, name: 'Roguish Archetype Feature', description: 'Subclass feature.' },
      { level: 18, name: 'Elusive', description: 'No attack roll has advantage against you while you\'re not incapacitated.' },
      { level: 19, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 20, name: 'Stroke of Luck', description: 'Once per short rest, turn a miss into a hit or a failed check into a 20.' },
    ],
    subclasses: [
      {
        name: 'Tamaya',
        description:
          'A rogue who weaponizes fireworks and spellbombs, a virtuoso of thunder, fire, and smoke.',
        features: [
          { level: 3, name: 'Pyrotechnician', description: 'Proficiency with magitech firearms and two artisan\'s tools.' },
          { level: 3, name: 'Spellbombs', description: 'Craft spellbombs using hanabi points (= rogue level). Recharge on long rest.' },
          { level: 9, name: 'Initiative Shift', description: 'Reaction on initiative: disorient enemies within 20 ft with flashbangs (-10 to initiative).' },
          { level: 13, name: 'Inured', description: 'Immune to your own spellbombs. Detonate spellbombs from up to 1,000 ft.' },
          { level: 17, name: 'Hanabi Primer', description: 'Set a concealed explosive trap (6d6 thunder + 6d6 elemental).' },
        ],
      },
    ],
  },

  // ============================================================
  // SORCERER
  // ============================================================
  {
    name: 'Sorcerer',
    description:
      'A spellcaster who draws on inherent magic from a gift or bloodline.',
    hitDie: 6,
    primaryAbility: ['charisma'],
    savingThrows: ['constitution', 'charisma'],
    armorProficiencies: [],
    weaponProficiencies: [
      'Daggers',
      'Darts',
      'Slings',
      'Quarterstaffs',
      'Light Crossbows',
    ],
    toolProficiencies: [],
    skillChoices: {
      count: 2,
      options: [
        'Arcana',
        'Deception',
        'Insight',
        'Intimidation',
        'Persuasion',
        'Religion',
      ],
    },
    subclassLevel: 1,
    subclassLabel: 'Sorcerous Origin',
    martialTier: 'none',
    spellcasting: {
      type: 'full',
      ability: 'charisma',
      focus: 'Arcane focus',
    },
    features: [
      { level: 1, name: 'Spellcasting', description: 'Cast sorcerer spells using Charisma. Learn (not prepare) spells.' },
      { level: 1, name: 'Sorcerous Origin', description: 'Choose a subclass.' },
      { level: 2, name: 'Font of Magic', description: 'Sorcery points (= sorcerer level). Convert to/from spell slots.' },
      { level: 3, name: 'Metamagic', description: 'Choose two Metamagic options.' },
      { level: 4, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 6, name: 'Sorcerous Origin Feature', description: 'Subclass feature.' },
      { level: 8, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 10, name: 'Metamagic (2)', description: 'Choose one additional Metamagic option.' },
      { level: 12, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 14, name: 'Sorcerous Origin Feature', description: 'Subclass feature.' },
      { level: 16, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 17, name: 'Metamagic (3)', description: 'Choose one additional Metamagic option.' },
      { level: 18, name: 'Sorcerous Origin Feature', description: 'Subclass feature.' },
      { level: 19, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 20, name: 'Sorcerous Restoration', description: 'Regain 4 sorcery points on short rest.' },
    ],
    subclasses: [
      {
        name: 'Spirit Caller',
        description:
          'A sorcerer whose soul manifests as a spirit entity, an externalized will.',
        features: [
          { level: 1, name: 'Spirit Caller Spells', description: 'command, mage armor, minor illusion, aid, mirror image, plant growth, phantom steed, banishment, guardian of faith, reincarnate, seeming, astral projection.' },
          { level: 1, name: 'Conduit of the Soul', description: 'Action: manifest a spirit. Uses = 2 per short/long rest.' },
          { level: 6, name: 'Spirit Synchronicity', description: 'Cast ranged spells from your spirit\'s position if within 120 ft.' },
          { level: 6, name: 'Soul Empowerment', description: 'Expend sorcery points to grant your spirit boons (Resistance, Enlarge, Frenzy, Detonator, etc.).' },
          { level: 14, name: 'Explosive Emergence', description: 'Summoned spirit can take an additional action on its first turn. Gain spirit\'s resistances.' },
          { level: 18, name: 'Final Form Manifestation', description: 'No concentration on spirit. One free boon. Choose Medium or Large spirit.' },
        ],
      },
    ],
  },

  // ============================================================
  // TAMER
  // ============================================================
  {
    name: 'Tamer',
    description:
      'A hunter of creatures who bonds with companions and fights alongside them.',
    hitDie: 8,
    primaryAbility: ['intelligence', 'wisdom', 'charisma'],
    savingThrows: ['constitution', 'charisma'],
    armorProficiencies: ['Light Armor', 'Medium Armor', 'Shields'],
    weaponProficiencies: ['Simple Weapons', 'Nets'],
    toolProficiencies: ["One artisan's tools or one musical instrument"],
    skillChoices: {
      count: 2,
      options: [
        'Animal Handling',
        'Insight',
        'Medicine',
        'Nature',
        'Perception',
        'Persuasion',
      ],
    },
    subclassLevel: 3,
    subclassLabel: 'Training Paradigm',
    martialTier: 'none',
    spellcasting: {
      type: 'half',
      ability: 'choice',
      focus: 'Companion vessel',
    },
    features: [
      { level: 1, name: 'Pocket Familiar', description: 'Bond a Small or smaller companion with CR 1/2 or lower. Store in a magical vessel.' },
      { level: 1, name: 'Monster Trainer', description: 'Command your companion in combat. Improves with Tamer levels.' },
      { level: 1, name: 'Soul Bond', description: 'Shared telepathic bond with your companion.' },
      { level: 1, name: 'Tame Creature', description: 'Capture creatures in vessels to become companions.' },
      { level: 2, name: 'Spellcasting', description: 'Cast tamer spells using INT, WIS, or CHA.' },
      { level: 2, name: 'Bolster', description: 'Expend spell slot to heal your companion.' },
      { level: 2, name: 'Psychic Bond', description: 'Telepathic communication. See through companion\'s eyes.' },
      { level: 3, name: 'Pocket Family', description: 'Bond more companions (2 at 3rd, 3 at 7th, 4 at 11th, 5 at 15th, 6 at 19th).' },
      { level: 3, name: 'Training Paradigm', description: 'Choose a subclass.' },
      { level: 4, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 5, name: 'Multiattack', description: 'Companion gains Multiattack action.' },
      { level: 5, name: 'Malleable Presence', description: 'Companion shifts behavior (aggressive/cautious) affecting nearby foes.' },
      { level: 6, name: 'Alpha Strike', description: 'Command companion to act immediately on summon.' },
      { level: 6, name: 'Wilful Blows', description: 'Companion attacks count as magical.' },
      { level: 7, name: 'Training Paradigm Feature', description: 'Subclass feature.' },
      { level: 8, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 10, name: 'Training Paradigm Feature', description: 'Subclass feature.' },
      { level: 12, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 13, name: 'Switcheroo', description: 'Swap places with your companion within 100 ft as a bonus action or reaction.' },
      { level: 14, name: 'Training Paradigm Feature', description: 'Subclass feature.' },
      { level: 16, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 17, name: 'Magnificent Presence', description: 'Companion can adopt Provoking Poise or Shrinking Violet behavior.' },
      { level: 18, name: 'Training Paradigm Feature', description: 'Subclass feature.' },
      { level: 19, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 20, name: 'Summon the Horde', description: 'Summon up to 3 companions simultaneously for 1 minute.' },
    ],
    choices: [
      {
        id: 'tamer-spellcasting-ability',
        label: 'Spellcasting Ability',
        type: 'select',
        level: 1,
        options: ['Intelligence', 'Wisdom', 'Charisma'],
      },
    ],
    subclasses: [
      {
        name: 'Sensei',
        description:
          'A coach who trains companions in martial arts, unlocking their inner fighter.',
        features: [
          { level: 3, name: 'Martial Strikes', description: 'Companion gains a Martial Strike (1d6 at 3rd, 1d8 at 7th, 1d10 at 10th, 1d12 at 18th).' },
          { level: 3, name: 'Martial Techniques', description: 'Choose three techniques (Avoid, Block, Charge, Dancing Feet, Grapple, Sweep, Throw, People\'s Elbow, Uppercut).' },
          { level: 3, name: 'Sensei Spells', description: 'flash, repulsing palm, earthskin, wind strike, create food and water, haste, freedom of movement, steelskin, endure, greater restoration.' },
          { level: 7, name: 'Unleash', description: 'Companion moves up to speed and makes up to 6 Martial Strikes against different targets.' },
          { level: 10, name: 'Shrug It Off', description: 'Reduce companion\'s physical damage by your spellcasting mod.' },
          { level: 14, name: 'Martial Prodigy', description: 'Companion makes 4 Martial Strikes, 2 bonus actions, and gains temp HP per turn.' },
        ],
      },
    ],
  },

  // ============================================================
  // WARLOCK
  // ============================================================
  {
    name: 'Warlock',
    description:
      'A wielder of magic that is derived from a bargain with an extraplanar entity.',
    hitDie: 8,
    primaryAbility: ['charisma'],
    savingThrows: ['wisdom', 'charisma'],
    armorProficiencies: ['Light Armor'],
    weaponProficiencies: ['Simple Weapons'],
    toolProficiencies: [],
    skillChoices: {
      count: 2,
      options: [
        'Arcana',
        'Deception',
        'History',
        'Intimidation',
        'Investigation',
        'Nature',
        'Religion',
      ],
    },
    subclassLevel: 1,
    subclassLabel: 'Otherworldly Patron',
    martialTier: 'none',
    spellcasting: {
      type: 'pact',
      ability: 'charisma',
      focus: 'Arcane focus',
    },
    features: [
      { level: 1, name: 'Otherworldly Patron', description: 'Choose a subclass.' },
      { level: 1, name: 'Pact Magic', description: 'Cast warlock spells using Charisma. Slots refresh on short rest.' },
      { level: 2, name: 'Eldritch Invocations', description: 'Choose two invocations. More at higher levels.' },
      { level: 3, name: 'Pact Boon', description: 'Choose Chain, Blade, Tome, or Talisman.' },
      { level: 4, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 6, name: 'Otherworldly Patron Feature', description: 'Subclass feature.' },
      { level: 8, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 10, name: 'Otherworldly Patron Feature', description: 'Subclass feature.' },
      { level: 11, name: 'Mystic Arcanum (6th)', description: 'Cast a 6th-level spell once per long rest.' },
      { level: 12, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 13, name: 'Mystic Arcanum (7th)', description: 'Cast a 7th-level spell once per long rest.' },
      { level: 14, name: 'Otherworldly Patron Feature', description: 'Subclass feature.' },
      { level: 15, name: 'Mystic Arcanum (8th)', description: 'Cast an 8th-level spell once per long rest.' },
      { level: 16, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 17, name: 'Mystic Arcanum (9th)', description: 'Cast a 9th-level spell once per long rest.' },
      { level: 19, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 20, name: 'Eldritch Master', description: 'Spend 1 minute to regain all Pact Magic slots.' },
    ],
    choices: [
      {
        id: 'warlock-pact-boon',
        label: 'Pact Boon',
        type: 'select',
        level: 3,
        options: ['Pact of the Chain', 'Pact of the Blade', 'Pact of the Tome', 'Pact of the Talisman'],
      },
    ],
    subclasses: [
      {
        name: 'The Shinigami',
        description:
          'Pact with a spirit of death, wielding powers of shadow and possession.',
        features: [
          { level: 1, name: 'Expanded Spell List', description: 'see future death, sleep, blindness/deafness, lifesap aura, animate dead, speak with dead, death ward, greater invisibility, animate objects, dominate person.' },
          { level: 1, name: 'Grim Puppeteer', description: 'Bonus action: control a corpse or unconscious creature within 60 ft for 10 min. Uses = CHA mod per long rest.' },
          { level: 1, name: 'Shinigami Vision', description: 'Bonus action: learn one vulnerability and one resistance/immunity of a creature within 60 ft.' },
          { level: 6, name: 'Gift of the Psychopomp', description: 'Spells targeting only you can also target your puppet.' },
          { level: 10, name: 'Shinigami Domination', description: 'See/hear/speak through your puppet. Puppeteer for up to 1 hour. Puppet gains resistance to nonmagical attacks.' },
          { level: 14, name: 'Master of Death', description: 'When reduced to 0 HP, your spirit puppets your own body instead of falling unconscious.' },
        ],
      },
    ],
  },

  // ============================================================
  // WIZARD
  // ============================================================
  {
    name: 'Wizard',
    description:
      'A scholarly magic-user capable of manipulating the structures of reality.',
    hitDie: 6,
    primaryAbility: ['intelligence'],
    savingThrows: ['intelligence', 'wisdom'],
    armorProficiencies: [],
    weaponProficiencies: [
      'Daggers',
      'Darts',
      'Slings',
      'Quarterstaffs',
      'Light Crossbows',
    ],
    toolProficiencies: [],
    skillChoices: {
      count: 2,
      options: [
        'Arcana',
        'History',
        'Insight',
        'Investigation',
        'Medicine',
        'Religion',
      ],
    },
    subclassLevel: 2,
    subclassLabel: 'Arcane Tradition',
    martialTier: 'none',
    spellcasting: {
      type: 'full',
      ability: 'intelligence',
      ritual: true,
      focus: 'Arcane focus',
    },
    features: [
      { level: 1, name: 'Spellcasting', description: 'Cast wizard spells using Intelligence. Spellbook with prepared spells.' },
      { level: 1, name: 'Arcane Recovery', description: 'Recover spell slots on short rest (total = half wizard level, rounded up).' },
      { level: 2, name: 'Arcane Tradition', description: 'Choose a subclass.' },
      { level: 4, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 6, name: 'Arcane Tradition Feature', description: 'Subclass feature.' },
      { level: 8, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 10, name: 'Arcane Tradition Feature', description: 'Subclass feature.' },
      { level: 12, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 14, name: 'Arcane Tradition Feature', description: 'Subclass feature.' },
      { level: 16, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 18, name: 'Spell Mastery', description: 'Choose a 1st-level and a 2nd-level spell to cast at will.' },
      { level: 19, name: 'Ability Score Improvement', description: 'Increase one ability by 2, or two by 1. Or take a feat.' },
      { level: 20, name: 'Signature Spells', description: 'Choose two 3rd-level spells castable once per short rest.' },
    ],
    subclasses: [
      {
        name: 'Shinobi',
        description:
          'A wizard who blends shadow magic and blade, an assassin of illusion and steel.',
        features: [
          { level: 2, name: 'Shinobi Training', description: 'Proficiency in light armor, hand crossbows, thrown and Finesse weapons, Stealth. Weapon as spellcasting focus. Darkvision 60 ft.' },
          { level: 2, name: 'Shadow Striker', description: 'On a weapon hit: expend a spell slot to add 1d8 per slot level. Choose a technique (Duplicitous Strike, Rapid Strikes, Vanish, Enshadow, Enervating Touch, Shadow Vanishing, Shadow Ward, Cloud of Shadow).' },
          { level: 6, name: 'Extra Attack', description: 'Attack twice when you take the Attack action. Magical darkness doesn\'t impede your vision.' },
          { level: 10, name: 'Umbral Striker', description: 'Additional Shadow Striker options with 3rd+ level spell slots (Duplicitous Strike, Rapid Strikes, Vanish).' },
          { level: 14, name: 'Shadow Savant', description: 'Restrain creatures entering your magically created heavily obscured areas.' },
        ],
      },
    ],
  },
];

export function getClass(name: string): DnDClass | undefined {
  return CLASSES.find((c) => c.name === name);
}

export function getSubclass(
  className: string,
  subclassName: string
): Subclass | undefined {
  const cls = getClass(className);
  return cls?.subclasses.find((s) => s.name === subclassName);
}