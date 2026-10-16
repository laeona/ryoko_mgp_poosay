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