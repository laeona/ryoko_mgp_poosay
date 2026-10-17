import type { DnDFeat } from '../types/character';

export const FEATS: DnDFeat[] = [
  // ============================================================
  // GENERAL FEATS
  // ============================================================
  {
    name: 'Boon of Ashura',
    type: 'general',
    abilityIncrease: ['strength', 'constitution'],
    description:
      'You have come to possess a fragment of the power of Ashura, the mighty three-headed demon god of passion and fury. Increase your Strength or Constitution score by 1, to a maximum of 20. You can take one additional reaction in a round, but only one reaction on a turn. Uses equal to your proficiency bonus, recharging on a long rest.',
  },
  {
    name: 'Boon of the Jorōgumo',
    type: 'general',
    skillChoices: { count: 1, options: ['Deception', 'Persuasion'] },
    description:
      "You possess a fragment of the jorōgumo's shapeshifting power. You gain proficiency in Deception or Persuasion. You can cast disguise self a number of times equal to your proficiency bonus per long rest. You have a climbing speed equal to your walking speed and can move up, down, across vertical surfaces and upside down along ceilings, hands free. You ignore difficult terrain caused by webbing.",
  },
  {
    name: 'Boon of the Komainu',
    type: 'general',
    description:
      'You have come to possess a fragment of the komainu\'s power. As an action, you can ignite a glowing mane of radiant energy, lasting until dismissed or unconscious. While ignited, you shed dim light in a 10-foot radius, and a creature you are grappling takes 2d4 radiant damage at the start of its turn. As a bonus action, you can harden your body to stone: +2 AC (if not wearing heavy armour), advantage on CON saves, disadvantage on DEX saves until the start of your next turn. Uses equal to proficiency bonus per long rest.',
  },
  {
    name: 'Boon of the Nue',
    type: 'general',
    description:
      "A spark of the nue's chaos resides in you. At the start of your turn, you can roll a d6. Even → bonus to next attack/check/save equal to the result. Odd → poison damage equal to the result (can't be reduced). Uses equal to proficiency bonus per short or long rest. As a bonus action, you can grant yourself a flying speed equal to your walking speed until the end of your turn. Uses equal to proficiency bonus per short or long rest.",
  },
  {
    name: 'Boon of the Ōmukade',
    type: 'general',
    abilityIncrease: ['constitution'],
    description:
      "Increase your Constitution score by 1, to a maximum of 20. Choose one damage type from acid, cold, fire, lightning, poison, or thunder. You gain resistance to that type and, when you take damage of that type, you can use a reaction to become empowered: your next damage roll within 1 minute deals an extra 1d8 of that type (2d8 at 5th, 3d8 at 11th, 4d8 at 17th). Uses equal to proficiency bonus per long rest.",
  },
  {
    name: 'Boon of the Wanyūdō',
    type: 'general',
    description:
      'Your connection to the wanyūdō grants you: +10 ft. speed. Standing up from prone costs only 5 ft. If you move at least 10 feet in a straight line toward a creature and are within reach, you can bonus-action a charging slam (contested STR Athletics check). Loser falls prone. Uses equal to proficiency bonus per short or long rest.',
  },
  {
    name: 'Cantrip Combatant',
    type: 'general',
    abilityIncrease: ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'],
    prerequisite:
      'A class feature that allows you to attack more than once when you take the Attack action, and the ability to cast at least one cantrip',
    description:
      'Increase one ability score of your choice by 1, to a maximum of 20. When you use an action to cast a cantrip that requires an unarmed strike or melee weapon attack as part of casting the spell, you can make one weapon attack as a bonus action on that turn.',
  },
  {
    name: 'Combo Striker',
    type: 'general',
    abilityIncrease: ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'],
    description:
      'Increase one ability score of your choice by 1, to a maximum of 20. You can collaborate in a combo attack even if you have already collaborated in one since your last long rest (once per long rest). When you initiate a combo attack, one willing creature of your choice can collaborate without using up their combo for the rest (once per long rest).',
  },
  {
    name: 'Dedicated Combatant',
    type: 'general',
    description:
      'Your fervent commitment to combat training puts your advanced weapon mastery on par with the most dedicated specialists. You can calculate your martial level using your full level in any class that is considered a half-martial, and half your levels in any class that is considered a non-martial.',
  },
  {
    name: 'Double Throw',
    type: 'general',
    abilityIncrease: ['strength', 'dexterity'],
    description:
      'Increase your Strength or Dexterity score by 1, to a maximum of 20. Once per turn, when you make a ranged attack with a weapon that has both the Light and Thrown properties, and you don\'t have disadvantage, you can throw two weapons with a single flick. Make a separate attack roll with disadvantage for each weapon. If you had advantage on the original attack, you don\'t suffer disadvantage. Each attack can target different creatures.',
  },
  {
    name: 'Elemental Fighting',
    type: 'general',
    description:
      'Choose one damage type from acid, cold, fire, lightning, or thunder. When you make an unarmed strike, you can deal damage of that type equal to 1d8 + your Strength modifier instead of bludgeoning. Damage you deal in this way ignores resistance.',
  },
  {
    name: 'Elemental Initiate',
    type: 'general',
    description:
      "Choose one element (air, earth, fire, water). You learn one cantrip and one 1st-level spell from that element's spell list. You can cast the 1st-level spell without a spell slot once per long rest, or via spell slots. Choose INT, WIS, or CHA as the spellcasting ability. When you take damage of a type associated with that element, you can use a reaction to gain resistance to it (including the triggering damage) until the start of your next turn. Can be taken multiple times.",
  },
  {
    name: 'Extra Attack Tactician',
    type: 'general',
    abilityIncrease: ['strength', 'dexterity'],
    prerequisite: 'Improved Extra Attack feature',
    description:
      'Increase your Strength or Dexterity score by 1, to a maximum of 20. Choose one class from barbarian, bender, fighter, monk, paladin, or ranger. You can use the 7th-level benefit of the Improved Extra Attack feature from that class a number of times equal to your proficiency bonus, recharging on a long rest. Only one Improved Extra Attack feature per turn. Can be taken multiple times.',
  },
  {
    name: 'Fearsome Flourisher',
    type: 'general',
    prerequisite: 'Proficiency with nunchaku',
    description:
      'When you take the Attack action and attack with a nunchaku, you can use a bonus action to make one additional nunchaku attack (d4 damage die). When you take the Flourish special action with nunchaku, you can use a bonus action to make it especially intimidating toward one creature within your reach. If you don\'t fail on your DEX check to flourish, your target must succeed on a WIS save (DC = 8 + DEX mod, or add proficiency if Intimidation is proficient) or be frightened until the start of your next turn.',
  },
  {
    name: 'Focused Discipline',
    type: 'general',
    skillChoices: { count: 1 }, skillExpertise: true,
    prerequisite: '4th level, not a multiclass character',
    description:
      'Choose one skill proficiency granted to you by your class. Your proficiency bonus is doubled for ability checks made using that skill. Choose one saving throw proficiency granted by your class. Whenever you make that save, you can treat a d20 roll of 9 or lower as a 10. If you lose this feat because you don\'t meet its prerequisite, you gain Multidisciplinary instead.',
  },
  {
    name: 'Kaiju Hunter',
    type: 'general',
    description:
      'Mounting a creature costs 5 ft. (not half your speed). Bracing costs 5 ft. (not half your speed). Advantage on ability checks to identify vulnerable areas. You ignore difficult terrain caused by moving on a creature more than two sizes larger. Immediately after a creature at least one size larger hits or misses you with a melee attack, you can use a reaction to make a weapon attack against it.',
  },
  {
    name: 'Kusarigama Master',
    type: 'general',
    prerequisite: 'Proficiency with kusarigama',
    description:
      "You add your ability modifier to the damage of a kusarigama's counterweight attack. Against a Medium or smaller target, you can choose to deal no damage to instead force a STR (Athletics) or DEX (Acrobatics) check contested by your attack roll. On a failure, choose one: the target is disarmed (object pulled to you), knocked prone, or pulled 5 ft toward you (grappled if within reach).",
  },
  {
    name: 'Magic of the Blade',
    type: 'general',
    abilityIncrease: ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'],
    description:
      'Increase one ability score of your choice by 1, to a maximum of 20. You learn two cantrips that require you to make an unarmed strike or melee weapon attack as part of casting the spell. Choose INT, WIS, or CHA as the spellcasting ability for these cantrips.',
  },
  {
    name: 'Martial Initiate',
    type: 'general',
    abilityIncrease: ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'],
    prerequisite: '4th level',
    description:
      'Increase one ability score of your choice by 1, to a maximum of 20. You learn two tier 1 advanced techniques of your choice from any technique tree. You must meet the prerequisites for those techniques.',
  },
  {
    name: 'Multidisciplinary',
    type: 'general',
    skillChoices: { count: 1 }, savingThrowChoice: true,
    prerequisite: 'You are a multiclass character',
    description:
      'When you take this feat, and each time you gain your 1st level in a new class, choose one: gain proficiency in one skill and one type of artisan\'s tools, OR choose one saving throw proficiency that the newly multiclassed class provides at 1st level (you become proficient in it).',
  },
  {
    name: 'Prosthesis Adept',
    type: 'general',
    description:
      'You can tinker with your prosthesis over the course of an hour (as part of a short or long rest) to add one of these properties: Blast (1d6 thunder, 20 ft., Piercing Shot), Hookshot (30 ft.), Integrated (any), Launch (1d6, 30 ft., Battery Strike), Melee (1d8, 5 ft., Reeling Blow), or Mobility (climb or swim, 30 ft.). Lasts until you tinker again.',
  },
  {
    name: 'Prosthesis Fighting',
    type: 'general',
    description:
      "The range of attacks you make using a prosthesis' Blast or Launch property increases by 10 feet. The reach of melee attacks using prostheses with the Melee property increases by 5 feet. You deal one extra die of damage when you hit using a prosthesis' Blast, Launch, or Melee property.",
  },
  {
    name: 'Prosthesis Master',
    type: 'general',
    prerequisite: '8th level',
    description:
      'You are considered proficient with any attacks made using a prosthesis. You can attune to one magical prosthesis without counting against the number of magic items you can attune to.',
  },
  {
    name: 'Spirit Bonded',
    type: 'general',
    description:
      'You learn the find familiar spell and can cast it without components or a spell slot. Your familiar ignores the restriction on attacking. Recharges on a long rest. Choose a familiar form: bancho-gama, betobeto-kun, kawawappa, ko-inari, or senryōka. When summoned in that form, it gains temp HP equal to your level and the 1st-level improvement on its tree. At 5th level, those temp HP double and it can also gain a 3rd-level improvement.',
  },
  {
    name: 'Tengu Training',
    type: 'general',
    abilityIncrease: ['dexterity', 'wisdom'],
    description:
      'You gain the following benefits from hanataka tengu tutelage: Increase your Dexterity or Wisdom score by 1, to a maximum of 20. You gain proficiency with one Finesse weapon of your choice. As a reaction when a creature misses you with a melee attack while you hold a Finesse weapon, you can make one weapon attack with that weapon against the creature. Uses equal to proficiency bonus per long rest.',
  },
  {
    name: 'Tessen Master',
    type: 'general',
    abilityIncrease: ['strength', 'dexterity'],
    prerequisite: 'Proficiency with tessen',
    description:
      'Increase your Strength or Dexterity score by 1, to a maximum of 20. For you, a tessen has the Adaptable (Piercing) and Thrown (range 20/60) properties. While wielding a tessen, you gain an extra reaction each round (usable only for the Fan Shield deflection, and not on the same turn as your normal reaction).',
  },

    // ============================================================
  // ADDITIONAL GENERAL FEATS
  // ============================================================
  {
    name: 'Actor',
    type: 'general',
    abilityIncrease: ['charisma'],
    description:
      "Increase your Charisma score by 1, to a maximum of 20. You gain expertise in Deception and Performance (you also gain proficiency in them if you lack it).",
  },
  {
    name: 'Alert',
    type: 'general',
    description: "You gain a +5 bonus to initiative and cannot be surprised.",
  },
  {
    name: 'Athlete',
    type: 'general',
    abilityIncrease: ['strength', 'dexterity'],
    description:
      "Increase your Strength or Dexterity score by 1, to a maximum of 20. Standing up from prone costs far less movement, and your jump distance increases by 50%.",
  },
  {
    name: 'Charger',
    type: 'general',
    description:
      "Charge in a straight line toward the first enemy in your way without provoking opportunity attacks, then either make a melee weapon attack or shove them. The weapon attack uses your action and bonus action, moves you up to 30 ft, and deals +5 damage; it counts as a single weapon attack, so Extra Attack applies. Shove distance depends on your Strength and the target's weight.",
  },
  {
    name: 'Crossbow Expert',
    type: 'general',
    description:
      "Crossbow attacks made within melee range no longer have disadvantage. The wounds your piercing crossbow shots inflict last twice as long.",
  },
  {
    name: 'Defensive Duellist',
    type: 'general',
    prerequisite: 'Dexterity 13 or higher',
    description:
      "While wielding a finesse weapon you are proficient with in your main hand, you can use your reaction when a creature makes a melee attack against you to add your proficiency bonus to your Armour Class against that attack, possibly causing it to miss.",
  },
  {
    name: 'Dual Wielder',
    type: 'general',
    description:
      "You can fight with two melee weapons even if they are not Light, as long as neither is Two-Handed. You gain a +1 bonus to Armour Class while wielding a melee weapon in each hand. This feat does not grant the Two-Weapon Fighting style, so without that style you still do not add your ability modifier to off-hand damage.",
  },
  {
    name: 'Dungeon Delver',
    type: 'general',
    description:
      "You have advantage on Perception checks to detect hidden objects and on saving throws to avoid or resist traps, and you have resistance to damage dealt by traps.",
  },
  {
    name: 'Durable',
    type: 'general',
    abilityIncrease: ['constitution'],
    description:
      "Increase your Constitution score by 1, to a maximum of 20. You regain all of your hit points whenever you finish a short rest.",
  },
  {
    name: 'Elemental Adept',
    type: 'general',
    description:
      "Choose one damage type: acid, cold, lightning, fire or thunder. Your spells and attacks ignore resistance to that damage type, and when you roll a 1 on a damage die for a spell of that type, you treat it as a 2.",
  },
  {
    name: 'Great Weapon Master',
    type: 'general',
    description:
      "When you score a critical hit with a melee weapon or reduce a creature to 0 hit points with one, you can make another melee weapon attack as a bonus action. When you attack with a two-handed or versatile melee weapon held in both hands that you are proficient with, you can take a -5 penalty to the attack roll to deal an extra 10 damage (toggleable).",
  },
  {
    name: 'Heavily Armoured',
    type: 'general',
    abilityIncrease: ['strength'],
    prerequisite: 'Proficiency with medium armour',
    description:
      "Increase your Strength score by 1, to a maximum of 20. You gain proficiency with heavy armour.",
  },
  {
    name: 'Heavy Armour Master',
    type: 'general',
    abilityIncrease: ['strength'],
    prerequisite: 'Proficiency with heavy armour',
    description:
      "Increase your Strength score by 1, to a maximum of 20. While you wear heavy armour, damage you take from non-magical attacks is reduced by 3.",
  },
  {
    name: 'Lightly Armoured',
    type: 'general',
    abilityIncrease: ['strength', 'dexterity'],
    description:
      "Increase your Strength or Dexterity score by 1, to a maximum of 20. You gain proficiency with light armour.",
  },
  {
    name: 'Lucky',
    type: 'general',
    description:
      "You have 3 luck points, which you regain on a long rest. You can spend a luck point to gain advantage on your next ability check, to gain advantage on your next attack roll or saving throw, or to force an enemy to reroll an attack roll against you.",
  },
  {
    name: 'Mage Slayer',
    type: 'general',
    description:
      "When a creature casts a spell within melee range of you, you have advantage on saving throws against it, and you can use your reaction to immediately make an attack against the caster if it is within 5 ft of you. Enemies you hit have disadvantage on saving throws to maintain concentration.",
  },
  {
    name: 'Magic Initiate: Bard',
    type: 'general',
    description:
      "Learn two cantrips and one 1st-level spell from the bard spell list. You can cast the 1st-level spell once per long rest. Charisma is your spellcasting ability for these spells.",
  },
  {
    name: 'Magic Initiate: Cleric',
    type: 'general',
    description:
      "Learn two cantrips and one 1st-level spell from the cleric spell list. You can cast the 1st-level spell once per long rest. Wisdom is your spellcasting ability for these spells.",
  },
  {
    name: 'Magic Initiate: Druid',
    type: 'general',
    description:
      "Learn two cantrips and one 1st-level spell from the druid spell list. You can cast the 1st-level spell once per long rest. Wisdom is your spellcasting ability for these spells.",
  },
  {
    name: 'Magic Initiate: Sorcerer',
    type: 'general',
    description:
      "Learn two cantrips and one 1st-level spell from the sorcerer spell list. You can cast the 1st-level spell once per long rest. Charisma is your spellcasting ability for these spells.",
  },
  {
    name: 'Magic Initiate: Warlock',
    type: 'general',
    description:
      "Learn two cantrips and one 1st-level spell from the warlock spell list. You can cast the 1st-level spell once per long rest. Charisma is your spellcasting ability for these spells.",
  },
  {
    name: 'Magic Initiate: Wizard',
    type: 'general',
    description:
      "Learn two cantrips and one 1st-level spell from the wizard spell list. You can cast the 1st-level spell once per long rest. Intelligence is your spellcasting ability for these spells.",
  },
  {
    name: 'Martial Adept',
    type: 'general',
    description:
      "Learn two manoeuvres from the Battle Master archetype and gain one superiority die to fuel them. You regain expended superiority dice after a short or long rest.",
  },
  {
    name: 'Medium Armour Master',
    type: 'general',
    prerequisite: 'Proficiency with medium armour',
    description:
      "Wearing medium armour does not impose disadvantage on Stealth checks, and the Dexterity bonus to your Armour Class from medium armour can be +3 instead of +2.",
  },
  {
    name: 'Mobile',
    type: 'general',
    description:
      "Your speed increases by 10 ft. When you take the Dash action, difficult terrain does not slow you. If you make a melee attack against a creature, you do not provoke opportunity attacks from that creature for the rest of the turn.",
  },
  {
    name: 'Moderately Armoured',
    type: 'general',
    abilityIncrease: ['strength', 'dexterity'],
    prerequisite: 'Proficiency with light armour',
    description:
      "Increase your Strength or Dexterity score by 1, to a maximum of 20. You gain proficiency with medium armour and shields.",
  },
  {
    name: 'Performer',
    type: 'general',
    abilityIncrease: ['charisma'],
    description:
      "Increase your Charisma score by 1, to a maximum of 20. You gain proficiency with a musical instrument of your choice.",
  },
  {
    name: 'Polearm Master',
    type: 'general',
    description:
      "When you attack with a glaive, halberd, pike, quarterstaff or spear, you can use a bonus action to make an attack with the butt end of the weapon. You can also make an opportunity attack against a creature that enters your reach.",
  },
  {
    name: 'Resilient',
    type: 'general',
    abilityIncrease: ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'],
    description:
      "Choose one ability score. Increase it by 1, to a maximum of 20, and gain proficiency in saving throws with that ability.",
  },
  {
    name: 'Ritual Caster',
    type: 'general',
    description:
      "You learn two ritual spells of your choice, such as Speak with Dead, Find Familiar, Longstrider, Enhance Leap, Disguise Self or Speak with Animals.",
  },
  {
    name: 'Savage Attacker',
    type: 'general',
    description:
      "When you make a melee weapon attack, you can roll the damage dice twice and use the higher result.",
  },
  {
    name: 'Sentinel',
    type: 'general',
    description:
      "When an enemy within melee range attacks one of your allies who does not have this feat, you can use your reaction to make a weapon attack against that enemy. When you hit a creature with an opportunity attack, it cannot move for the rest of its turn. You also have advantage on opportunity attacks.",
  },
  {
    name: 'Sharpshooter',
    type: 'general',
    description:
      "Your ranged weapon attacks are not penalised for attacking from low ground. When you attack with a ranged weapon you are proficient with, you can take a -5 penalty to the attack roll to deal an extra 10 damage (toggleable).",
  },
  {
    name: 'Shield Master',
    type: 'general',
    description:
      "While wielding a shield, you gain a +2 bonus to Dexterity saving throws. When a spell forces you to make a Dexterity saving throw, you can use your reaction to shield yourself: you take half damage on a failed save and no damage on a successful one.",
  },
  {
    name: 'Skilled',
    type: 'general',
    skillChoices: { count: 3 },
    description: "You gain proficiency in 3 skills of your choice.",
  },
  {
    name: 'Spell Sniper',
    type: 'general',
    description:
      "You learn one cantrip of your choice from Bone Chill, Eldritch Blast, Fire Bolt, Ray of Frost, Shocking Grasp or Thorn Whip, using your normal spellcasting ability. The roll needed to score a critical hit with a spell attack is reduced by 1; this can stack with other effects.",
  },
  {
    name: 'Tavern Brawler',
    type: 'general',
    abilityIncrease: ['strength', 'constitution'],
    description:
      "Increase your Strength or Constitution score by 1, to a maximum of 20. When you make an unarmed attack, use an improvised weapon, or throw something, you add your Strength modifier twice to the attack and damage rolls.",
  },
  {
    name: 'Tough',
    type: 'general',
    description: "Your hit point maximum increases by 2 for each level you have.",
  },
  {
    name: 'War Caster',
    type: 'general',
    description:
      "You have advantage on saving throws to maintain concentration on a spell. You can also use your reaction to cast Shocking Grasp on a creature moving out of your melee range (this does not let you cast Shocking Grasp at will).",
  },
  {
    name: 'Weapon Master',
    type: 'general',
    abilityIncrease: ['strength', 'dexterity'],
    description:
      "Increase your Strength or Dexterity score by 1, to a maximum of 20. You gain proficiency with four weapon types of your choice.",
  },

  // ============================================================
  // RACIAL FEATS
  // ============================================================
  {
    name: 'Adaptive Colouration',
    type: 'racial',
    prerequisite: 'Tatsumi',
    racialRequirement: { race: 'Tatsumi' },
    description:
      'You have advantage on Stealth checks made to avoid being seen. Choose one additional colour from your Koi Dragon Colour trait. When you use your Slumbering Dragon or Heartening Breath trait, you can choose to empower ability checks, attack rolls, and saving throws associated with either your primary colouration or the chosen colour.',
  },
  {
    name: 'Draconic Fury',
    type: 'racial',
    abilityIncrease: ['constitution'],
    prerequisite: 'Tatsumi (Ryujin)',
    racialRequirement: { race: 'Tatsumi', subrace: 'Ryujin' },
    description:
      'Increase your Constitution score by 1, to a maximum of 20. When you use your Heartening Breath trait, you can instead expel a 30-foot cone of destructive energy. Each creature in the area makes a DEX save (DC = 8 + CON mod + prof), taking 1d12 damage of a chosen type (acid, cold, fire, lightning, poison, or thunder) on a failure, or half as much on a success. Damage increases to 2d12 at 5th, 3d12 at 11th, 4d12 at 17th.',
  },
  {
    name: "Enkoh's Might",
    type: 'racial',
    abilityIncrease: ['strength'],
    prerequisite: 'Enkoh (Hulking)',
    racialRequirement: { race: 'Enkoh', subrace: 'Hulking' },
    description:
      'Increase your Strength score by 1, to a maximum of 20. As a bonus action, attempt to shove a creature no more than one size larger within reach (contested STR check). On a win, knock prone or push up to 15 ft. Uses equal to proficiency bonus per long rest.',
  },
  {
    name: 'Gift of the Lion Turtle',
    type: 'racial',
    abilityIncrease: ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'],
    prerequisite: 'Ryokido',
    racialRequirement: { race: 'Ryokido' },
    description:
      'Increase one ability score of your choice by 1, to a maximum of 20. You can cast detect thoughts and suggestion without expending a spell slot. Once each per long rest, or via spell slots. Choose INT, WIS, or CHA as the spellcasting ability.',
  },
  {
    name: 'Hanamori Physiology',
    type: 'racial',
    prerequisite: 'Hanamori',
    racialRequirement: { race: 'Hanamori' },
    description:
      'Advantage on saving throws to avoid exhaustion from environmental sources (extreme heat or cold). When you take acid, cold, fire, lightning, or thunder damage, you can use a reaction to gain resistance to that type (including the triggering damage) until the end of your next turn. Uses equal to proficiency bonus per long rest.',
  },
  {
    name: 'Haniwa Soulbinding',
    type: 'racial',
    prerequisite: 'Haniwa',
    racialRequirement: { race: 'Haniwa' },
    description:
      'When you create a Clay Companion, it can use one of these stat blocks instead: black bear, giant goat, giant octopus, or warhorse. At 5th level, you can also use dire wolf, giant spider, or giant toad.',
  },
  {
    name: 'Isetsu Magic',
    type: 'racial',
    abilityIncrease: ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'],
    prerequisite: 'Isetsu',
    racialRequirement: { race: 'Isetsu' },
    description:
      'Increase one ability score of your choice by 1, to a maximum of 20. You learn the water whip cantrip. You can cast riptide and water breathing without expending a spell slot. Once each per long rest, or via spell slots. Choose INT, WIS, or CHA as the spellcasting ability.',
  },
  {
    name: 'Karasu Trickery',
    type: 'racial',
    abilityIncrease: ['charisma'],
    prerequisite: 'Tengu (Karasu)',
    racialRequirement: { race: 'Tengu', subrace: 'Karasu' },
    description:
      'Increase your Charisma score by 1, to a maximum of 20. Whenever you and at least one other creature make an ability check or save at the same time (e.g., initiative, contested check, area save), you can swap your d20 result with theirs. Once per short or long rest.',
  },
  {
    name: "Kitsune's Blessing",
    type: 'racial',
    prerequisite: 'Kitsune',
    racialRequirement: { race: 'Kitsune' },
    description:
      "You can cast spells while transformed via Shapeshifter without material components (unless they have a gold cost). While transformed, you can use your fox's bite as unarmed strikes (1d6 + STR/DEX). You gain the Multiattack action: while transformed, use an action to make a number of unarmed strikes equal to half your proficiency bonus (rounded up). While transformed, your AC equals 12 + DEX mod.",
  },
  {
    name: 'Oni Regeneration',
    type: 'racial',
    abilityIncrease: ['constitution'],
    prerequisite: 'Oniborne',
    racialRequirement: { race: 'Oniborne' },
    description:
      'Increase your Constitution score by 1, to a maximum of 20. As a reaction when you take damage, spend a number of Hit Dice up to your proficiency bonus to heal yourself. Roll the dice, add CON mod, regain HP equal to the total (min 1). Uses equal to proficiency bonus per long rest.',
  },
  {
    name: 'Seasonal Determinism',
    type: 'racial',
    abilityIncrease: ['dexterity', 'charisma', 'wisdom', 'constitution'],
    prerequisite: 'Fuyoren',
    racialRequirement: { race: 'Fuyoren' },
    description:
      'Choose the season you were born in. Spring: +1 DEX (max 20), +5 ft. speed, bonus action for disadvantage on next attack vs you. Summer: +1 CHA (max 20), bonus action for advantage on next attack/check (uses = prof, long rest). Autumn: +1 WIS (max 20), darkvision 30 ft. (or +30 if you already have it), Hide as bonus action in dim/dark. Winter: +1 CON (max 20), a new Water Magic option (1d8 cold damage vial that also reduces speed by 10 ft., scaling at 5th/11th/17th).',
  },
  {
    name: 'Shadowmage',
    type: 'racial',
    abilityIncrease: ['intelligence', 'wisdom', 'charisma'],
    prerequisite: 'Tengu (Hanataka)',
    racialRequirement: { race: 'Tengu', subrace: 'Hanataka' },
    description:
      'Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20. You learn two cantrips of your choice from the druid or sorcerer spell list. You can cast these cantrips without components while in dim light or darkness. Spellcasting ability is the ability you increased with this feat.',
  },
  {
    name: 'Springtail Agility',
    type: 'racial',
    abilityIncrease: ['dexterity'],
    prerequisite: 'Enkoh (Springtail)',
    racialRequirement: { race: 'Enkoh', subrace: 'Springtail' },
    description:
      'Increase your Dexterity score by 1, to a maximum of 20. As a bonus action, you can leap a number of feet equal to five times your proficiency bonus. This leap doesn\'t cost movement (speed must be >0) and doesn\'t provoke opportunity attacks. Uses equal to proficiency bonus per long rest.',
  },
];

export function getFeat(name: string): DnDFeat | undefined {
  return FEATS.find((f) => f.name === name);
}