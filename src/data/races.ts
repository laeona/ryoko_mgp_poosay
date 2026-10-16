import type { Race } from '../types/character';

export const RACES: Race[] = [
  // ============================================================
  // ENKOH
  // ============================================================
  {
    name: 'Enkoh',
    description:
      'Beneath snow-capped peaks, the formidable enkoh make cities of ice and snow. Thick-furred simian folk with an innate skill for survival and a piercing intelligence.',
    abilityScoreIncrease: { intelligence: 2 },
    age: 'An enkoh reaches maturity at 15 years of age and can live up to 80 years.',
    anatomy: 'You have two arms, two legs, and a tail.',
    size: 'Varies by subrace',
    speed: 30,
    creatureType: 'Humanoid',
    languages:
      'You can speak, read, and write Common and one other language that you and your GM agree is appropriate.',
    traits: [
      {
        name: 'Thick Fur',
        description: 'You have resistance to cold damage.',
      },
      {
        name: 'Ice Craft',
        description:
          "You gain proficiency with one of the following artisan's tools: carpenter's tools, glassblower's tools, jeweller's tools, mason's tools, potter's tools, or smith's tools. You have advantage on ability checks to use these tools to shape ice.",
      },
    ],
    choices: [
      {
        id: 'enkoh-tool',
        label: "Artisan's Tool Proficiency",
        type: 'select',
        options: [
          "Carpenter's Tools",
          "Glassblower's Tools",
          "Jeweller's Tools",
          "Mason's Tools",
          "Potter's Tools",
          "Smith's Tools",
        ],
      },
    ],
    subraces: [
      {
        name: 'Hulking',
        abilityScoreIncrease: { constitution: 1 },
        size: 'Medium',
        speed: 30,
        speedDescription:
          'Your walking speed is 30 feet, and you have a climbing speed equal to your walking speed.',
        traits: [
          {
            name: 'Chest Beating',
            description:
              'As a bonus action, you can pound your fists to your chest, causing a surge of adrenaline. Until the start of your next turn, you have resistance to bludgeoning, piercing, and slashing damage, and advantage on Intimidation checks. Uses equal to your proficiency bonus, recharging on a long rest.',
          },
          {
            name: 'Natural Cooks',
            description:
              'With ingredients worth at least 1 sp, you can prepare a meal for 2 + your proficiency bonus creatures over a short or long rest. A creature who eats it regains one spent Hit Die and gains temporary HP equal to 1d6 + your proficiency bonus.',
          },
          {
            name: 'Powerful Build',
            description:
              'You count as one size larger for carrying capacity and weight you can push, drag, or lift.',
          },
        ],
      },
      {
        name: 'Springtail',
        abilityScoreIncrease: { dexterity: 1 },
        size: 'Small',
        speed: 35,
        speedDescription:
          'Your walking speed is 35 feet, and you have a climbing speed equal to your walking speed. Climbing on a creature larger than you doesn\'t count as difficult terrain.',
        traits: [
          {
            name: 'Beast Wardens',
            description: 'Advantage on ability checks to tame or influence Beasts.',
          },
          {
            name: 'Skillful',
            description:
              'You gain proficiency in your choice of two of: Acrobatics, Animal Handling, Nature, Performance, or Survival.',
          },
          {
            name: 'Springing Leap',
            description:
              'Add your Dexterity score to your long jump distance, and your Dexterity modifier to your high jump height. You can jump your maximum distance with or without a running start.',
          },
          {
            name: 'Sturdy Tail',
            description:
              'When you make a check or save to avoid being forcibly moved, you can use your reaction to curl your tail around an object within 5 feet of you that is attached to the ground. You have advantage on that check or save.',
          },
        ],
        choices: [
          {
            id: 'springtail-skills',
            label: 'Skill Proficiencies (choose 2)',
            type: 'multi-select',
            count: 2,
            options: ['Acrobatics', 'Animal Handling', 'Nature', 'Performance', 'Survival'],
          },
        ],
      },
    ],
  },

  // ============================================================
  // FUYOREN
  // ============================================================
  {
    name: 'Fuyoren',
    description:
      'Sentient, mobile plants born of gentle rivers and tranquil ponds, innately harmonious with the natural world.',
    abilityScoreIncrease: { dexterity: 2, wisdom: 1 },
    age: 'Reach adulthood around 18 years old and can live up to 150.',
    anatomy: 'You have two arms and two legs.',
    size: 'Medium. Grown fuyoren can reach 6 feet tall.',
    speed: 35,
    creatureType: 'Plant',
    languages: 'Common and one other language of your choice.',
    traits: [
      {
        name: 'Fluid Motion',
        description:
          'Advantage on saving throws to avoid or end the restrained, paralysed, or petrified condition on yourself.',
      },
      {
        name: 'Graceful Step',
        description:
          'You can move across any liquid surface (water, mud, snow, quicksand) as if it were solid ground. You do not sink if you end your movement on it. You are not protected from lava or acid.',
      },
      {
        name: 'Water Magic',
        description:
          'Through a 10-minute ritual, you imbue a vial of water with one of four effects: holy water, antidote (ends poisoned), hydration (Larges for 24h), or healing (1d4 HP). Lasts 24 hours. Uses equal to proficiency bonus per long rest.',
      },
      {
        name: 'Nature Warden',
        description:
          'Proficiency in one of: Acrobatics, Animal Handling, Nature, Survival, or Performance.',
      },
    ],
    choices: [
      {
        id: 'fuyoren-skill',
        label: 'Skill Proficiency',
        type: 'select',
        options: ['Acrobatics', 'Animal Handling', 'Nature', 'Survival', 'Performance'],
      },
    ],
  },

  // ============================================================
  // HANAMORI
  // ============================================================
  {
    name: 'Hanamori',
    description:
      'Gaunt-faced, charcoal-skinned sentient Plants with coarse crimson petals. Their bodies resonate with the spirit of creatures that die nearby.',
    abilityScoreIncrease: { charisma: 2, wisdom: 1 },
    age: 'Reach adulthood at the same rate as humans, live up to 60 years.',
    anatomy: 'You have two arms and two legs.',
    size: 'Medium or Small (your choice when you select this race).',
    speed: 30,
    creatureType: 'Plant',
    languages: 'Common and one other language of your choice.',
    traits: [
      {
        name: 'Essence Capture',
        description:
          "As a reaction when a creature with CR ≤ your level dies within 10 feet, you capture a fragment of its essence. Choose one: replace one of your ability scores with theirs, gain one special sense, gain resistance to one damage type they had, or gain immunity to one condition they had. Lasts until a long rest. Once per long rest.",
      },
      {
        name: 'Fiery Countenance',
        description:
          'Advantage on saving throws to avoid or end the frightened or stunned condition on yourself.',
      },
      {
        name: 'Gaze of Death',
        description:
          'Proficiency in one of: Intimidation, Medicine, Nature, or Survival.',
      },
      {
        name: 'Rugged',
        description:
          'When you aren\'t wearing armour, your AC is 12 + your Constitution modifier. You can use a shield and still get this benefit.',
      },
    ],
    choices: [
      {
        id: 'hanamori-size',
        label: 'Size',
        type: 'select',
        options: ['Medium', 'Small'],
      },
      {
        id: 'hanamori-skill',
        label: 'Skill Proficiency',
        type: 'select',
        options: ['Intimidation', 'Medicine', 'Nature', 'Survival'],
      },
    ],
  },

  // ============================================================
  // HANIWA
  // ============================================================
  {
    name: 'Haniwa',
    description:
      'Sentient clay guardians, once entombed spirits reborn from ancient vessels. Many retain no memory of their former lives, seeking new purpose in an alien world.',
    abilityScoreIncrease: { constitution: 2, wisdom: 1 },
    age: 'Created fully formed and do not age. Cannot be magically aged.',
    anatomy: 'You have two arms and two legs.',
    size: 'Medium or Small (your choice when you select this race).',
    speed: 30,
    creatureType: 'Construct',
    languages: 'Common and one other language of your choice.',
    traits: [
      {
        name: 'Clay Companion',
        description:
          'Over a long rest, you can fashion a quasi-sentient clay companion. Choose giant weasel, hawk, mastiff, or mule stat block, with Construct type and your Soul Shell trait. Command as bonus action; disintegrates at 0 HP or when recreated.',
      },
      {
        name: 'Grave Guardian',
        description:
          'You can cast earthen uppercut and sanctuary with this trait. Once each per long rest, or via spell slots. Choose Intelligence, Wisdom, or Charisma as spellcasting ability.',
      },
      {
        name: 'Soul Shell',
        description:
          'You don\'t need to eat, drink, or breathe. Advantage on saves vs disease and to avoid/end poisoned. You can benefit from healing spells that don\'t usually affect Constructs.',
      },
      {
        name: 'Spirit Ward',
        description:
          'Your weapon attacks are considered magical for overcoming resistances and immunities.',
      },
      {
        name: 'Tombkeeper',
        description: 'Proficiency in Religion and Perception skills.',
      },
    ],
    choices: [
      {
        id: 'haniwa-size',
        label: 'Size',
        type: 'select',
        options: ['Medium', 'Small'],
      },
      {
        id: 'haniwa-spellcasting',
        label: 'Spellcasting Ability',
        type: 'select',
        options: ['Intelligence', 'Wisdom', 'Charisma'],
      },
    ],
  },

  // ============================================================
  // ISETSU
  // ============================================================
  {
    name: 'Isetsu',
    description:
      'Large, crustacean-like Humanoids from the coastal cliffs. The first line of defence against threats from the sea, and masters of fortune.',
    abilityScoreIncrease: { strength: 2, constitution: 1 },
    age: 'Reach adulthood in under a decade, live up to a century.',
    anatomy: 'You have two arms, two legs, and four vestigial appendages.',
    size: 'Medium. Average around 7 feet tall.',
    speed: 30,
    creatureType: 'Humanoid',
    languages: 'Common and one other language of your choice.',
    traits: [
      {
        name: 'Brittle Shell',
        description:
          "After a short or long rest, you gain a +2 bonus to AC if you don't already have it. Ends after you're hit by an attack roll.",
      },
      {
        name: 'Crustacean Physiology',
        description: 'Proficiency in Athletics and Perception skills.',
      },
      {
        name: 'Claws',
        description:
          'Unarmed strikes deal 1d6 + Strength piercing damage. Starting at 5th level, after hitting with an unarmed strike, you can use a bonus action to attempt to grapple.',
      },
      {
        name: 'Darkvision',
        description:
          'You can see in dim light within 60 feet as if it were bright light, and in darkness as if it were dim light.',
      },
      {
        name: 'Fortune Favoured',
        description:
          'When you miss an attack or fail a check or save, you can reroll. Uses equal to half your proficiency bonus (rounded down) per long rest.',
      },
      {
        name: 'Natural Armour',
        description:
          'When you aren\'t wearing armour, your base AC is 12 + your Constitution modifier. A shield\'s benefits apply as normal.',
      },
      {
        name: 'Waterborne',
        description:
          'You can breathe in air and water. Being underwater doesn\'t impose disadvantage on weapon attack rolls.',
      },
    ],
  },

  // ============================================================
  // KITSUNE
  // ============================================================
  {
    name: 'Kitsune',
    description:
      'Fox-folk with legendary transformation powers and long lives. Masters of nonverbal communication, revered for their wisdom.',
    abilityScoreIncrease: { charisma: 2, dexterity: 1 },
    age: 'Reach adulthood at around 20, can live up to a millennium.',
    anatomy: 'You have two arms, two legs, and between one and nine tails.',
    size: 'Medium. Fully grown kitsune stand between 5 and 7 feet tall.',
    speed: 35,
    creatureType: 'Fey',
    languages: 'Common, Kitsune, and one other language of your choice.',
    traits: [
      {
        name: 'Ascendant Form',
        description:
          'As an action, radiate bright white light for 1 hour. This light penetrates magical darkness, shedding bright light in a 10-ft radius and dim for another 10 ft. Creatures of your choice in the light add 1d4 to Intimidation, Perception, and Persuasion checks. Reaction: when a creature within 10 ft misses an attack or fails a save, add 1d4 to the result. Once per long rest.',
      },
      {
        name: 'Darkvision',
        description:
          'You can see in dim light within 60 feet as if it were bright light, and in darkness as if it were dim light.',
      },
      {
        name: "Fox's Wedding",
        description:
          'You know druidcraft and produce flame. At 3rd level, you can cast disguise self once per long rest, or via spell slots. Choose Intelligence, Wisdom, or Charisma as spellcasting ability.',
      },
      {
        name: 'Kitsune Guile',
        description: 'Proficiency in one of: Deception, Persuasion, or Stealth.',
      },
      {
        name: 'Language of Motion',
        description:
          'Spend 1 minute moving your tails and ears to communicate a simple message undetectable to any creature that doesn\'t speak Kitsune. A creature within 60 ft that can see you and speaks Kitsune understands it.',
      },
      {
        name: 'Shapeshifter',
        description:
          'As an action, transform into the shape of a fox (Tiny or Small). Stats remain the same, no material/somatic spells. Lasts until you revert as an action or die.',
      },
    ],
    choices: [
      {
        id: 'kitsune-skill',
        label: 'Kitsune Guile Skill',
        type: 'select',
        options: ['Deception', 'Persuasion', 'Stealth'],
      },
      {
        id: 'kitsune-spellcasting',
        label: 'Spellcasting Ability',
        type: 'select',
        options: ['Intelligence', 'Wisdom', 'Charisma'],
      },
    ],
  },

  // ============================================================
  // ONIBORNE
  // ============================================================
  {
    name: 'Oniborne',
    description:
      'Descendants of oni, vessels of impetuous, simmering power. Innately magical, with instinctive spellcasting in moments of high emotion.',
    abilityScoreIncrease: { constitution: 2 },
    age: 'Reach maturity at around 21, live up to 400 years.',
    anatomy: 'You have two arms and two legs.',
    size: 'Medium. Stand between 5 and 7 feet tall.',
    speed: 30,
    creatureType: 'Humanoid',
    languages: 'Common and one other language of your choice.',
    traits: [
      {
        name: 'Powerful Build',
        description:
          'You count as one size larger for carrying capacity and weight you can push, drag, or lift.',
      },
    ],
    subraces: [
      {
        name: 'Red Oniborne',
        abilityScoreIncrease: { wisdom: 1 },
        traits: [
          {
            name: 'Daunting Stature',
            description: 'Proficiency in Intimidation.',
          },
          {
            name: 'Magical Scavenger',
            description:
              'Over 1 minute (or as part of a Harvesting check), you fashion a magic weapon from a corpse. +1 to attack/damage (+2 at 9th, +3 at 17th). Only magic in your hands. Only one such weapon at a time.',
          },
          {
            name: 'Weeping Magic',
            description:
              'Know prestidigitation. At 3rd level, cure wounds once per long rest. At 5th level, enhance ability once per long rest. Choose Intelligence, Wisdom, or Charisma as spellcasting ability.',
          },
        ],
        choices: [
          {
            id: 'red-oniborne-spellcasting',
            label: 'Spellcasting Ability',
            type: 'select',
            options: ['Intelligence', 'Wisdom', 'Charisma'],
          },
        ],
      },
      {
        name: 'Blue Oniborne',
        abilityScoreIncrease: { strength: 1 },
        traits: [
          {
            name: 'Compassionate Heart',
            description:
              'You can take the Help action as a bonus action a number of times equal to your proficiency bonus per long rest. When you take the Help action, you can expend one Hit Die to give an ally within 5 ft temporary HP equal to the roll + your Constitution modifier (minimum 1).',
          },
          {
            name: 'Crunching Maw',
            description:
              'Unarmed strikes deal 1d6 + Strength piercing damage instead of bludgeoning.',
          },
          {
            name: 'Gift of Empathy',
            description: 'Proficiency in Insight and Persuasion skills.',
          },
          {
            name: 'Savage Bite',
            description:
              'As a reaction when you take damage from a creature within 5 ft, make an unarmed strike with your Crunching Maw. Critical hit on 18-20. Uses equal to proficiency bonus per long rest.',
          },
        ],
      },
      {
        name: 'Green Oniborne',
        abilityScoreIncrease: { charisma: 1 },
        traits: [
          {
            name: 'Captivating Quality',
            description: 'Proficiency in Performance.',
          },
          {
            name: 'Fierce Magic',
            description:
              'Know thaumaturgy. At 3rd level, hellish rebuke once per long rest. At 5th level, enlarge/reduce once per long rest. Choose Intelligence, Wisdom, or Charisma as spellcasting ability.',
          },
          {
            name: 'Ghastly Visage',
            description:
              'After you take the Attack action, you can use a bonus action to frighten a creature within 5 ft (DC = 8 + your Constitution modifier + proficiency bonus). Uses equal to proficiency bonus per long rest.',
          },
        ],
        choices: [
          {
            id: 'green-oniborne-spellcasting',
            label: 'Spellcasting Ability',
            type: 'select',
            options: ['Intelligence', 'Wisdom', 'Charisma'],
          },
        ],
      },
    ],
  },

  // ============================================================
  // RYOKIDO
  // ============================================================
  {
    name: 'Ryokido',
    description:
      'Turtle-folk with moss-like manes who value family and community above all. Telepathic, long-lived, and sturdy.',
    abilityScoreIncrease: { strength: 1, wisdom: 1, charisma: 1 },
    age: 'Young until 80, live up to 600 years.',
    anatomy: 'You have two arms, two legs, and a tail.',
    size: 'Medium. Stand between 5 and 7 feet tall.',
    speed: 30,
    creatureType: 'Humanoid',
    languages: 'Common and one other language of your choice.',
    traits: [
      {
        name: 'Darkvision',
        description:
          'You can see in dim light within 60 feet as if it were bright light, and in darkness as if it were dim light.',
      },
      {
        name: 'Heavy Shell',
        description:
          'Advantage on checks and saves to avoid being knocked prone. Standing up from prone costs a bonus action in addition to movement.',
      },
      {
        name: 'Lionheart',
        description:
          'Proficiency in one of: Acrobatics, Athletics, Insight, or Intimidation.',
      },
      {
        name: 'Slashing Claws',
        description:
          'Unarmed strikes deal 1d6 + Strength slashing damage instead of bludgeoning.',
      },
      {
        name: 'Telepathic Bond',
        description:
          'As an action, form a telepathic bond with a willing creature within 100 ft for 1 hour. Communicate telepathically regardless of language. Ends if you use it again or are more than 100 ft apart.',
      },
      {
        name: 'Tough Shell',
        description:
          'While not wearing armour, your base AC is 12 + your Constitution modifier. You can use a shield and still benefit. When you fall, use a reaction to subtract up to 100 feet from the fall for damage (once per long rest).',
      },
    ],
    choices: [
      {
        id: 'ryokido-skill',
        label: 'Lionheart Skill',
        type: 'select',
        options: ['Acrobatics', 'Athletics', 'Insight', 'Intimidation'],
      },
    ],
  },

  // ============================================================
  // TATSUMI
  // ============================================================
  {
    name: 'Tatsumi',
    description:
      'Twin peoples of fish-folk and dragon-folk. Nishikin can metamorphose into Ryujin upon a moment of great significance.',
    abilityScoreIncrease: { dexterity: 1, constitution: 1, wisdom: 1 },
    age: 'Reach adulthood at 14, live about two centuries.',
    anatomy: 'You have two arms, two legs, and a tail.',
    size: 'Medium. Stand between 5 and 7 feet tall.',
    speed: 30,
    speedDescription:
      'Your walking speed is 30 feet, and you have a swimming speed equal to your walking speed.',
    creatureType: 'Humanoid',
    languages: 'Common and Aquan.',
    traits: [
      {
        name: 'Amphibious',
        description: 'You can breathe in both air and water.',
      },
    ],
    preSubraceChoice: {
      id: 'tatsumi-colour',
      label: 'Koi Dragon Colour',
      type: 'select',
      options: ['Red', 'Gold', 'Black', 'Silver', 'White', 'Blue'],
    },
    subraces: [
      {
        name: 'Nishikin',
        abilityScoreIncrease: {},
        traits: [
          {
            name: 'Moonblessed',
            description:
              'While bathed in moonlight, use a bonus action to spend Hit Dice equal to your proficiency bonus. Regain HP equal to the total + CON mod. Surplus becomes temporary HP. Once per long rest.',
          },
          {
            name: 'Powerful Build',
            description:
              'You count as one size larger for carrying capacity and weight you can push, drag, or lift.',
          },
          {
            name: 'Slippery',
            description:
              'Advantage on checks and saves to avoid or end the grappled condition.',
          },
          {
            name: 'Slumbering Dragon',
            description:
              'When you make an attack, check, or save using the ability associated with your Koi Dragon Colour, you can use your reaction to add 1d6. Uses equal to proficiency bonus per short or long rest.',
          },
          {
            name: 'Draconic Metamorphosis',
            description:
              'At 7th level (or at a significant moment, GM discretion), you can metamorphose into a Ryujin. Your colour stays the same. One-way transformation.',
          },
        ],
      },
      {
        name: 'Ryujin',
        abilityScoreIncrease: {},
        traits: [
          {
            name: 'Cloudstep',
            description:
              'As a bonus action, conjure a small cloud under your feet. Gain a flying speed equal to half your walking speed for 10 minutes. Once per long rest.',
          },
          {
            name: 'Heartening Breath',
            description:
              'As an action, exhale a 30-ft cone of energy. You and creatures of your choice (up to your proficiency bonus) can add 1d4 to attack rolls and ability checks/saves using your colour\'s ability, for 1 minute (concentration). Uses equal to proficiency bonus per long rest.',
          },
          {
            name: 'Innate Magic',
            description:
              'Learn one cantrip from the spell list of the class associated with your Koi Dragon Colour.',
          },
          {
            name: 'Sunblessed',
            description:
              'While in sunlight, advantage on saves vs frightened, paralysed, stunned, or being put to sleep.',
          },
        ],
      },
    ],
  },

  // ============================================================
  // TENGU
  // ============================================================
  {
    name: 'Tengu',
    description:
      'Aloof guardians of the forest with a proud warrior tradition. Long-lived yokai with innate illusion magic.',
    abilityScoreIncrease: { dexterity: 2 },
    age: 'Reach maturity at around 16, live up to 400 years.',
    anatomy: 'You have two arms and two legs.',
    size: 'Medium. Typically between 6 and 7 feet tall.',
    speed: 30,
    creatureType: 'Humanoid',
    languages: 'Common and one other language of your choice.',
    traits: [
      {
        name: 'Lethal Masters',
        description:
          'Proficiency with one simple or martial weapon of your choice.',
      },
    ],
    choices: [
      {
        id: 'tengu-weapon',
        label: 'Weapon Proficiency',
        type: 'select',
        options: [
          'Simple Weapon',
          'Martial Weapon',
        ],
      },
    ],
    subraces: [
      {
        name: 'Hanataka Tengu',
        abilityScoreIncrease: { charisma: 1 },
        traits: [
          {
            name: 'Master of Craft',
            description:
              "Proficiency with one kind of artisan's tools. When you make a Crafting check using this tool, add 1d4 to the result.",
          },
          {
            name: 'Nature Guardian',
            description:
              'Proficiency in one of: Arcana, Nature, Religion, Stealth, or Survival.',
          },
          {
            name: 'Shadowcaster',
            description:
              'Know prestidigitation and thaumaturgy. Cast them without components in dim light or darkness. Choose Intelligence, Wisdom, or Charisma as spellcasting ability.',
          },
          {
            name: 'Whirlwind Onslaught',
            description:
              'After you take the Attack action, use a bonus action to cast a cantrip (1 action) or make a number of melee attacks equal to half your proficiency bonus (rounded up), each against a different creature. Once per short or long rest.',
          },
        ],
        choices: [
          {
            id: 'hanataka-skill',
            label: 'Nature Guardian Skill',
            type: 'select',
            options: ['Arcana', 'Nature', 'Religion', 'Stealth', 'Survival'],
          },
          {
            id: 'hanataka-spellcasting',
            label: 'Spellcasting Ability',
            type: 'select',
            options: ['Intelligence', 'Wisdom', 'Charisma'],
          },
        ],
      },
      {
        name: 'Karasu Tengu',
        abilityScoreIncrease: { wisdom: 1 },
        traits: [
          {
            name: 'Fortified Mind',
            description: 'Resistance to psychic damage.',
          },
          {
            name: 'Prankster',
            description: 'Proficiency in Deception and Stealth skills.',
          },
          {
            name: 'Psychic Battery',
            description:
              'When you take the Attack action, you can replace one attack with a psychic assault against a creature within 15 ft. DC = 8 + your Constitution modifier + proficiency bonus. On fail, confusion until end of its next turn. Once per short or long rest.',
          },
          {
            name: 'Skyrider',
            description:
              'When you fall at least 10 feet, use a reaction to extend vestigial wings and glide. Take no damage, move 2 ft horizontally per 1 ft fallen, max 100 vertical ft per turn.',
          },
        ],
      },
    ],
  },
];

export function getRace(name: string): Race | undefined {
  return RACES.find((r) => r.name === name);
}