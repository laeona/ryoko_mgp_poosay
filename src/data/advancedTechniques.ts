import type { AdvancedTechnique, WeaponProperty } from '../types/character';

export interface TechniqueTree {
  property: WeaponProperty;
  description: string;
  techniques: AdvancedTechnique[];
}

export const TECHNIQUE_TREES: TechniqueTree[] = [
  // ============================================================
  // AMMUNITION
  // ============================================================
  {
    property: 'Ammunition',
    description:
      'Ammunition weapons (bows, crossbows, slings, firearms). Modify your ammo and fire more shots.',
    techniques: [
      { id: 'ammunition-t1-aerodynamic', name: 'Aerodynamic Ammunition', tier: 1, tree: 'Ammunition',
        description: 'After a short or long rest, modify a number of pieces of ammunition equal to twice your proficiency bonus. Modified ammo doubles its normal range and increases long range by half. Ammo deteriorates in 24 hours.' },
      { id: 'ammunition-t1-tinkered', name: 'Tinkered Artillery', tier: 1, tree: 'Ammunition',
        description: 'After a short or long rest, modify a number of pieces of ammo equal to your proficiency bonus. Choose Poisonous (+1d6 poison and CON save or poisoned until end of your next turn) or Whomping (STR save or knocked prone).' },
      { id: 'ammunition-t2-superior', name: 'Superior Strike: Ammunition', tier: 2, tree: 'Ammunition',
        prerequisite: 'Tier 1 Ammunition technique',
        description: 'You can perform a superior strike with any weapon that has the Ammunition property.' },
      { id: 'ammunition-t3-double-load', name: 'Double Load', tier: 3, tree: 'Ammunition',
        prerequisite: 'Tier 2 Ammunition technique',
        description: 'Once per turn, load two pieces of ammo in one weapon. If the attack hits, deals one extra die of weapon damage. Doesn\'t stack with Loading\'s Twin Load.' },
      { id: 'ammunition-t3-tooled', name: 'Tooled Artillery', tier: 3, tree: 'Ammunition',
        prerequisite: 'Tier 2 Ammunition technique',
        description: 'Modify ammo after a rest. Choose Explosive (DEX save, 1d8 thunder) or Smoke Bomb (10-ft heavily obscured cloud).' },
      { id: 'ammunition-t4-rapid-fire', name: 'Rapid Fire', tier: 4, tree: 'Ammunition',
        prerequisite: 'Tier 3 Ammunition technique',
        description: 'Once per turn, after your Attack action with an Ammunition weapon, DC 15 DEX check. On success, make one additional attack with that weapon.' },
      { id: 'ammunition-t4-runed', name: 'Runed Artillery', tier: 4, tree: 'Ammunition',
        prerequisite: 'Tier 3 Ammunition technique',
        description: 'Modify ammo after a rest. Choose Razored (advantage on attack roll, crit threshold -1) or Phosphorous (extra 3d6 fire, sheds light, can\'t hide, lasts 1 min).' },
    ],
  },

  // ============================================================
  // FINESSE
  // ============================================================
  {
    property: 'Finesse',
    description:
      'Finesse weapons (rapiers, daggers, scimitars, shortswords). Speed, precision, and dual wielding.',
    techniques: [
      { id: 'finesse-t1-ambidextrous', name: 'Ambidextrous', tier: 1, tree: 'Finesse',
        description: 'When you take the Attack action and attack with a Finesse melee weapon in one hand, use a bonus action to attack with a different Finesse melee weapon in the other. No ability modifier to damage.' },
      { id: 'finesse-t1-nimble', name: 'Nimble Duelist', tier: 1, tree: 'Finesse',
        description: 'When you hit a creature with a melee attack using a Finesse weapon, that creature can\'t make opportunity attacks against you until the end of that turn.' },
      { id: 'finesse-t2-superior', name: 'Superior Strike: Finesse', tier: 2, tree: 'Finesse',
        prerequisite: 'Tier 1 Finesse technique',
        description: 'You can perform a superior strike with any weapon that has the Finesse property.' },
      { id: 'finesse-t3-jink', name: 'Jink', tier: 3, tree: 'Finesse',
        prerequisite: 'Tier 2 Finesse technique',
        description: 'When you take the Dodge action, make one melee attack with a Finesse weapon as a part of that action, but with -4 penalty to the attack roll.' },
      { id: 'finesse-t3-weak-spot', name: 'Weak Spot', tier: 3, tree: 'Finesse',
        prerequisite: 'Tier 2 Finesse technique',
        description: 'When you make an attack with a Finesse weapon with advantage, on a hit you deal extra damage equal to your proficiency bonus. Once per turn.' },
      { id: 'finesse-t4-elegance', name: 'Fighting Elegance', tier: 4, tree: 'Finesse',
        prerequisite: 'Tier 3 Finesse technique',
        description: 'Your AC increases by 2 while wielding a Finesse weapon and not wielding a non-Finesse weapon or shield in your other hand.' },
      { id: 'finesse-t4-opportunist', name: 'Opportunist', tier: 4, tree: 'Finesse',
        prerequisite: 'Tier 3 Finesse technique',
        description: 'When a creature within 5 ft of you attacks a creature other than you, use your reaction to make a melee attack against it with a Finesse weapon.' },
    ],
  },

  // ============================================================
  // HEAVY
  // ============================================================
  {
    property: 'Heavy',
    description:
      'Heavy weapons (greatswords, greataxes, mauls, glaives). Raw force and knockdown power.',
    techniques: [
      { id: 'heavy-t1-hammering', name: 'Hammering Blow', tier: 1, tree: 'Heavy',
        description: 'When you hit a creature no more than one size larger than you with a Heavy weapon and roll the highest result on the weapon\'s damage dice, you can knock the target prone.' },
      { id: 'heavy-t2-superior', name: 'Superior Strike: Heavy', tier: 2, tree: 'Heavy',
        prerequisite: 'Tier 1 Heavy technique',
        description: 'You can perform a superior strike with any weapon that has the Heavy property.' },
      { id: 'heavy-t3-cleave', name: 'Cleave', tier: 3, tree: 'Heavy',
        prerequisite: 'Tier 2 Heavy technique',
        description: 'When you reduce a creature to 0 HP with a melee Heavy weapon attack, carry excess damage to another creature within reach (if the roll would hit). Can chain multiple times.' },
      { id: 'heavy-t3-dauntless', name: 'Dauntless', tier: 3, tree: 'Heavy',
        prerequisite: 'Tier 2 Heavy technique',
        description: 'When you roll a 1 on a bludgeoning, piercing, or slashing damage die with a Heavy weapon melee attack, treat it as the maximum roll for that die.' },
      { id: 'heavy-t4-concussive', name: 'Concussive Blow', tier: 4, tree: 'Heavy',
        prerequisite: 'Tier 3 Heavy technique',
        description: 'When you score a critical hit with a Heavy weapon, the target is affected by the confusion spell until the end of its next turn.' },
      { id: 'heavy-t4-staggering', name: 'Staggering Blow', tier: 4, tree: 'Heavy',
        prerequisite: 'Tier 3 Heavy technique',
        description: 'When you hit a creature no more than one size larger than you with a Heavy weapon, push it 10 ft directly away. Creatures immune to grappled are immune to this.' },
    ],
  },

  // ============================================================
  // IMPACT
  // ============================================================
  {
    property: 'Impact',
    description:
      'Impact weapons (maces, mauls, greatclubs, morningstars). Deal double damage to objects and structures.',
    techniques: [
      { id: 'impact-t1-direct', name: 'Direct Damage', tier: 1, tree: 'Impact',
        description: 'Your Impact weapon attacks ignore temporary HP, striking at normal HP directly. If your attack forces a CON save to maintain concentration, the target has disadvantage.' },
      { id: 'impact-t1-dizzying', name: 'Dizzying Strike', tier: 1, tree: 'Impact',
        description: 'Once per turn, when you hit a creature with an Impact weapon, its speed is reduced by 10 ft until end of its next turn. Stacks.' },
      { id: 'impact-t2-superior', name: 'Superior Strike: Impact', tier: 2, tree: 'Impact',
        prerequisite: 'Tier 1 Impact technique',
        description: 'You can perform a superior strike with any weapon that has the Impact property.' },
      { id: 'impact-t3-momentum', name: 'Momentum Swing', tier: 3, tree: 'Impact',
        prerequisite: 'Tier 2 Impact technique',
        description: 'When you take the Attack action and miss with an Impact weapon, use a bonus action to make another attack with that weapon. No ability modifier to damage unless negative.' },
      { id: 'impact-t3-staggering', name: 'Staggering Strike', tier: 3, tree: 'Impact',
        prerequisite: 'Tier 2 Impact technique',
        description: 'When you hit with an Impact weapon and roll max damage or crit, CON save or target is staggered (disadvantage on attacks, DEX/INT checks and saves, no reactions) until end of its next turn.' },
      { id: 'impact-t4-crushing', name: 'Crushing Force', tier: 4, tree: 'Impact',
        prerequisite: 'Tier 3 Impact technique',
        description: 'Advantage on melee attack rolls with Impact weapons against creatures at least one size smaller than you.' },
      { id: 'impact-t4-shattered', name: 'Shattered Steel', tier: 4, tree: 'Impact',
        prerequisite: 'Tier 3 Impact technique',
        description: 'When you roll max damage with an Impact weapon, the target makes a STR (Athletics) check vs your martial save DC: on a fail, the object it\'s holding shatters (magic items of equal/higher rarity auto-succeed).' },
    ],
  },

  // ============================================================
  // LIGHT
  // ============================================================
  {
    property: 'Light',
    description:
      'Light weapons (daggers, shortswords, handaxes, chakrams). Mobility and dual wielding.',
    techniques: [
      { id: 'light-t1-lightweight', name: 'Lightweight', tier: 1, tree: 'Light',
        description: 'While only wielding Light weapons and no shield/heavy armor, your speed increases by 10 ft.' },
      { id: 'light-t1-multi', name: 'Multi-Weapon Fighting', tier: 1, tree: 'Light',
        description: 'When you engage in two-weapon fighting, add your ability modifier to the damage of the bonus action attack if the weapon is Light.' },
      { id: 'light-t2-superior', name: 'Superior Strike: Light', tier: 2, tree: 'Light',
        prerequisite: 'Tier 1 Light technique',
        description: 'You can perform a superior strike with any weapon that has the Light property.' },
      { id: 'light-t3-combination', name: 'Combination Strike', tier: 3, tree: 'Light',
        prerequisite: 'Tier 2 Light technique',
        description: 'When you take the Attack action and attack with a Light weapon, any attack roll you make as a bonus action this turn with a Light weapon has advantage.' },
      { id: 'light-t3-riposte', name: 'Riposte', tier: 3, tree: 'Light',
        prerequisite: 'Tier 2 Light technique',
        description: 'When wielding two Light weapons and a creature within reach misses you with a melee attack, use your reaction to make an attack against that creature with one of the weapons.' },
      { id: 'light-t4-featherweight', name: 'Featherweight', tier: 4, tree: 'Light',
        prerequisite: 'Tier 3 Light technique',
        description: 'While only wielding Light weapons and no shield/heavy armor, +1 AC and advantage on DEX saves.' },
      { id: 'light-t4-swift', name: 'Swift Striker', tier: 4, tree: 'Light',
        prerequisite: 'Tier 3 Light technique',
        description: 'When you take the Attack action and only wield Light weapons, make one additional attack with a Light weapon. No ability modifier to damage unless negative.' },
    ],
  },

  // ============================================================
  // LOADING
  // ============================================================
  {
    property: 'Loading',
    description:
      'Loading and Reload weapons (crossbows, firearms, ödzutsu). Fire more often and harder.',
    techniques: [
      { id: 'loading-t1-flexible', name: 'Flexible Weaponry', tier: 1, tree: 'Loading',
        description: 'You can use a Loading or Reload weapon as a crude club (1d4 bludgeoning, Finesse, simple melee). Hit target can\'t make opportunity attacks against you until start of its next turn.' },
      { id: 'loading-t1-hyper', name: 'Hyper Focus', tier: 1, tree: 'Loading',
        description: 'As a bonus action, give yourself advantage on the next attack roll you make with a Loading or Reload weapon this turn.' },
      { id: 'loading-t1-speed', name: 'Speed Loader', tier: 1, tree: 'Loading',
        description: 'You ignore the Loading property of weapons. You can reload a Reload weapon using an action OR bonus action.' },
      { id: 'loading-t2-superior', name: 'Superior Strike: Loading', tier: 2, tree: 'Loading',
        prerequisite: 'Tier 1 Loading technique',
        description: 'You can perform a superior strike with any weapon that has the Loading or Reload property.' },
      { id: 'loading-t3-steady', name: 'Steady Loader', tier: 3, tree: 'Loading',
        prerequisite: 'Tier 2 Loading technique',
        description: 'Make only one attack with a Loading or Reload weapon as your Attack action. Crit threshold is reduced by 1 for each attack you could have made with that action.' },
      { id: 'loading-t3-twin', name: 'Twin Load', tier: 3, tree: 'Loading',
        prerequisite: 'Tier 2 Loading technique',
        description: 'Once per turn when you take the Attack action, forgo one attack to load two ammo. Next attack deals extra damage equal to weapon die + prof bonus. Doesn\'t stack with Ammunition\'s Double Load.' },
      { id: 'loading-t4-deadeye', name: 'Dead-Eye', tier: 4, tree: 'Loading',
        prerequisite: 'Tier 3 Loading technique',
        description: 'Crit threshold on Loading or Reload weapon attacks is reduced by 1.' },
      { id: 'loading-t4-quick', name: 'Quick Shot', tier: 4, tree: 'Loading',
        prerequisite: 'Tier 3 Loading technique',
        description: 'After your Attack action with only a Loading or Reload weapon, make one attack with it as a bonus action. No ability modifier to damage unless negative.' },
    ],
  },

  // ============================================================
  // PUGILIST
  // ============================================================
  {
    property: 'Pugilist',
    description:
      'Unarmed strikes and Pugilist weapons (knuckle dusters, spiked cestus, spiked knuckle duster). Fists only.',
    techniques: [
      { id: 'pugilist-t1-combination', name: 'Combination', tier: 1, tree: 'Pugilist',
        description: 'The second time on your turn you hit the same creature with an unarmed strike or Pugilist weapon, deal extra damage equal to your proficiency bonus.' },
      { id: 'pugilist-t1-trained', name: 'Trained Pugilist', tier: 1, tree: 'Pugilist',
        description: 'You can roll a d6 in place of the normal damage of unarmed strikes. Pugilist weapons increase this to d8. Unarmed strikes and Pugilist weapon attacks count as magical for overcoming resistances and immunities.' },
      { id: 'pugilist-t1-uppercut', name: 'Uppercut Specialist', tier: 1, tree: 'Pugilist',
        description: 'When you attack a creature at least one size larger than you with an unarmed strike or Pugilist weapon, your critical hit threshold is reduced by 1.' },
      { id: 'pugilist-t1-welterweight', name: 'Welterweight', tier: 1, tree: 'Pugilist',
        description: 'You can use Dexterity instead of Strength for the attack and damage rolls of unarmed strikes or Pugilist weapons.' },
      { id: 'pugilist-t2-superior', name: 'Superior Strike: Pugilist', tier: 2, tree: 'Pugilist',
        prerequisite: 'Tier 1 Pugilist technique',
        description: 'You can perform a superior strike with any weapon that has the Pugilist property, and can perform the Flurry superior strike if you attack with an unarmed strike.' },
      { id: 'pugilist-t3-blitzer', name: 'Blitzer', tier: 3, tree: 'Pugilist',
        prerequisite: 'Tier 2 Pugilist technique',
        description: 'After your Attack action with only unarmed strikes or Pugilist weapons, make one attack as a bonus action (can replace with grapple or shove).' },
      { id: 'pugilist-t3-expert', name: 'Expert Pugilist', tier: 3, tree: 'Pugilist',
        prerequisite: 'Tier 2 Pugilist technique',
        description: 'Roll a d8 in place of normal unarmed strike damage. Pugilist weapons increase this to d10. Attacks count as magical.' },
      { id: 'pugilist-t3-finisher', name: 'Finisher', tier: 3, tree: 'Pugilist',
        prerequisite: 'Tier 2 Pugilist technique',
        description: 'The third time on your turn you hit the same creature with an unarmed strike or Pugilist weapon, deal extra damage equal to your attack ability modifier.' },
      { id: 'pugilist-t3-gotem', name: "Got 'Em", tier: 3, tree: 'Pugilist',
        prerequisite: 'Tier 2 Pugilist technique',
        description: 'Advantage on opportunity attacks with unarmed strikes or Pugilist weapons. When a creature provokes an OA from you, you can attempt to grapple it as the OA.' },
      { id: 'pugilist-t4-fair', name: 'Fair Fighter', tier: 4, tree: 'Pugilist',
        prerequisite: 'Tier 3 Pugilist technique',
        description: 'Once per turn, when you hit with an unarmed strike or Pugilist weapon, force a STR save vs martial save DC. On fail, target drops one weapon/object (your choice), landing in your space.' },
      { id: 'pugilist-t4-master', name: 'Master Pugilist', tier: 4, tree: 'Pugilist',
        prerequisite: 'Tier 3 Pugilist technique',
        description: 'Roll a d10 in place of normal unarmed strike damage. Pugilist weapons increase to d12. Attacks count as magical.' },
      { id: 'pugilist-t4-suplex', name: 'Suplex King', tier: 4, tree: 'Pugilist',
        prerequisite: 'Tier 3 Pugilist technique',
        description: 'When a creature no more than one size larger makes a melee attack against you, use your reaction: +prof bonus to AC vs that attack. If it misses, you suplex it (swap spaces, target falls prone).' },
      { id: 'pugilist-t4-tough', name: 'Tough Mother', tier: 4, tree: 'Pugilist',
        prerequisite: 'Tier 3 Pugilist technique',
        description: 'While only wielding Pugilist weapons, no shield, no armor: bludgeoning/piercing/slashing damage you take is reduced by your proficiency bonus.' },
    ],
  },

  // ============================================================
  // REACH
  // ============================================================
  {
    property: 'Reach',
    description:
      'Reach weapons (glaives, halberds, lances, pikes, whips replaced by Scourge). Control the battlefield.',
    techniques: [
      { id: 'reach-t1-fortified', name: 'Fortified Position', tier: 1, tree: 'Reach',
        description: 'While wielding a Reach weapon and not restrained/incapacitated, the area within 10 ft of you is difficult terrain for creatures of your choice.' },
      { id: 'reach-t1-pole', name: 'Pole Vaulter', tier: 1, tree: 'Reach',
        description: 'With a running start, jumping distance is tripled. Wielding a Reach weapon, subtract up to 50 ft from fall damage.' },
      { id: 'reach-t2-superior', name: 'Superior Strike: Reach', tier: 2, tree: 'Reach',
        prerequisite: 'Tier 1 Reach technique',
        description: 'You can perform a superior strike with any weapon that has the Reach property.' },
      { id: 'reach-t3-constant', name: 'Constant Vigilance', tier: 3, tree: 'Reach',
        prerequisite: 'Tier 2 Reach technique',
        description: 'When a creature enters your reach while wielding a Reach weapon, use your reaction to make an attack against it.' },
      { id: 'reach-t3-lunging', name: 'Lunging Strikes', tier: 3, tree: 'Reach',
        prerequisite: 'Tier 2 Reach technique',
        description: 'When you take the Attack action, Reach weapon reach increases by 5 ft until end of your turn.' },
      { id: 'reach-t4-crowd', name: 'Crowd Control', tier: 4, tree: 'Reach',
        prerequisite: 'Tier 3 Reach technique',
        description: 'When you hit a creature no more than one size larger with a Reach weapon, move it up to 10 ft horizontally to an unoccupied space.' },
      { id: 'reach-t4-pike', name: 'Pike Wall', tier: 4, tree: 'Reach',
        prerequisite: 'Tier 3 Reach technique',
        description: '+2 AC while wielding a Reach weapon and within reach of an allied creature who is also wielding a proficient Reach weapon. Doesn\'t stack.' },
    ],
  },

  // ============================================================
  // SCOURGE
  // ============================================================
  {
    property: 'Scourge',
    description:
      'Scourge weapons (whips, meteor hammers, rope darts, kusarigama). Flexible reach and control.',
    techniques: [
      { id: 'scourge-t1-day', name: 'Day Tripper', tier: 1, tree: 'Scourge',
        description: 'When you hit a creature no more than one size larger with a Scourge weapon on your turn, use a bonus action: DEX save or fall prone.' },
      { id: 'scourge-t1-get-over', name: 'Get Over Here!', tier: 1, tree: 'Scourge',
        description: 'When you hit a creature no more than one size larger with a Scourge weapon on your turn, use a bonus action: STR save or pull it up to 10 ft toward you.' },
      { id: 'scourge-t2-superior', name: 'Superior Strike: Scourge', tier: 2, tree: 'Scourge',
        prerequisite: 'Tier 1 Scourge technique',
        description: 'You can perform a superior strike with any weapon that has the Scourge property.' },
      { id: 'scourge-t3-disarming', name: 'Disarming Strike', tier: 3, tree: 'Scourge',
        prerequisite: 'Tier 2 Scourge technique',
        description: 'When you hit with a Scourge weapon, force a STR save. On fail, the target drops an object of your choice, and you pull that object 10 ft toward you.' },
      { id: 'scourge-t3-long', name: 'Long Tether', tier: 3, tree: 'Scourge',
        prerequisite: 'Tier 2 Scourge technique',
        description: 'When you take the Attack action, your reach with Scourge weapons increases by 5 ft until end of turn.' },
      { id: 'scourge-t4-vicious', name: 'Vicious Strikes', tier: 4, tree: 'Scourge',
        prerequisite: 'Tier 3 Scourge technique',
        description: 'The damage die of your Scourge weapons increases to a d10.' },
      { id: 'scourge-t4-wrap', name: 'Wrap', tier: 4, tree: 'Scourge',
        prerequisite: 'Tier 3 Scourge technique',
        description: 'When you take the Attack action, forgo one attack to attempt a grapple with your Scourge (DEX save vs martial save DC). Target is grappled and restrained. STR check to escape.' },
    ],
  },

  // ============================================================
  // SHIELD
  // ============================================================
  {
    property: 'Shield',
    description:
      'Shields. Turn defence into offence and protect your allies.',
    techniques: [
      { id: 'shield-t1-reinforcement', name: 'Reinforcement', tier: 1, tree: 'Shield',
        description: 'While wielding a shield, when you take damage from an attack, reduce it by your proficiency bonus (no action required). Once per turn.' },
      { id: 'shield-t1-wall', name: 'Shield Wall', tier: 1, tree: 'Shield',
        description: 'While wielding a shield and within 5 ft of an allied shield-wielder, your AC increases by 2. Doesn\'t stack.' },
      { id: 'shield-t2-superior', name: 'Superior Strike: Shield', tier: 2, tree: 'Shield',
        prerequisite: 'Tier 1 Shield technique',
        description: 'You can perform a superior strike with any shield.' },
      { id: 'shield-t3-cover', name: 'Cover', tier: 3, tree: 'Shield',
        prerequisite: 'Tier 2 Shield technique',
        description: 'Bonus action while wielding a shield: grant +2 AC to an allied creature within 5 ft that isn\'t wielding a shield. Ends if the creature is ever more than 5 ft away.' },
      { id: 'shield-t3-numbing', name: 'Numbing Collision', tier: 3, tree: 'Shield',
        prerequisite: 'Tier 2 Shield technique',
        description: 'When a creature misses you with a melee attack while you wield a shield, use your reaction: CON save or drop its weapon at your feet. Until end of its next turn: disadvantage on attacks, can\'t pick up the weapon while you occupy the space.' },
      { id: 'shield-t4-bulwark', name: 'Bulwark', tier: 4, tree: 'Shield',
        prerequisite: 'Tier 3 Shield technique',
        description: 'Reduce attack damage by your proficiency bonus (no action required). Stacks with Reinforcement (total 2× prof). Once per turn.' },
      { id: 'shield-t4-redirect', name: 'Redirect Strike', tier: 4, tree: 'Shield',
        prerequisite: 'Tier 3 Shield technique',
        description: 'Reaction when targeted by a melee attack you can see: +half prof bonus to AC. If the attack misses, force the attacker to target a different creature within 5 ft of both of you (uses original roll).' },
    ],
  },

  // ============================================================
  // THROWN
  // ============================================================
  {
    property: 'Thrown',
    description:
      'Thrown weapons (daggers, javelins, handaxes, chakrams). Range and flexibility.',
    techniques: [
      { id: 'thrown-t1-close', name: 'Close-Quarters Combat', tier: 1, tree: 'Thrown',
        description: 'Being within 5 ft of a hostile creature doesn\'t impose disadvantage on your ranged Thrown weapon attack rolls.' },
      { id: 'thrown-t1-distant', name: 'Distant Striker', tier: 1, tree: 'Thrown',
        description: 'Normal and long ranges of Thrown weapon attacks are doubled. Missing with a Thrown weapon while hidden doesn\'t reveal your position.' },
      { id: 'thrown-t2-superior', name: 'Superior Strike: Thrown', tier: 2, tree: 'Thrown',
        prerequisite: 'Tier 1 Thrown technique',
        description: 'You can perform a superior strike with any weapon that has the Thrown property.' },
      { id: 'thrown-t3-flexible', name: 'Flexible Attacker', tier: 3, tree: 'Thrown',
        prerequisite: 'Tier 2 Thrown technique',
        description: 'If you make a melee attack with a Thrown weapon on your turn, make a ranged weapon attack with the same weapon as a bonus action that turn.' },
      { id: 'thrown-t3-focused', name: 'Focused Strike', tier: 3, tree: 'Thrown',
        prerequisite: 'Tier 2 Thrown technique',
        description: 'Bonus action: advantage on the next Thrown weapon attack roll this turn.' },
      { id: 'thrown-t4-bullseye', name: 'Bullseye', tier: 4, tree: 'Thrown',
        prerequisite: 'Tier 3 Thrown technique',
        description: 'Crit threshold on Thrown weapon attacks is reduced by 1. On a critical hit, target is also blinded until start of its next turn OR drops an object OR has its speed halved until end of its next turn (your choice).' },
      { id: 'thrown-t4-whirling', name: 'Whirling Melee', tier: 4, tree: 'Thrown',
        prerequisite: 'Tier 3 Thrown technique',
        description: 'After you take the Attack action and make a melee attack against a creature, you gain advantage on Thrown weapon attacks against other creatures until end of turn.' },
    ],
  },

  // ============================================================
  // VERSATILE
  // ============================================================
  {
    property: 'Versatile',
    description:
      'Versatile weapons (longswords, battleaxes, quarterstaffs, warhammers). One hand or two.',
    techniques: [
      { id: 'versatile-t1-parry', name: 'Quick Parry', tier: 1, tree: 'Versatile',
        description: 'When a creature makes a melee attack against you while you wield a Versatile weapon, use your reaction: +prof bonus to AC vs that attack.' },
      { id: 'versatile-t1-focus', name: 'Weapon Focus', tier: 1, tree: 'Versatile',
        description: 'You can use a Versatile weapon as a spellcasting focus, and can perform somatic components with the hand holding it.' },
      { id: 'versatile-t2-superior', name: 'Superior Strike: Versatile', tier: 2, tree: 'Versatile',
        prerequisite: 'Tier 1 Versatile technique',
        description: 'You can perform a superior strike with any weapon that has the Versatile property.' },
      { id: 'versatile-t3-heavy', name: 'Heavy Striker', tier: 3, tree: 'Versatile',
        prerequisite: 'Tier 2 Versatile technique',
        description: 'When you attack with a Versatile weapon using both hands, the damage die increases by two steps instead of one (max 1d12).' },
      { id: 'versatile-t3-bash', name: 'Shield Bash', tier: 3, tree: 'Versatile',
        prerequisite: 'Tier 2 Versatile technique',
        description: 'When you take the Attack action and hit with a Versatile weapon while wielding a shield, use a bonus action to bash with the shield: 1d4 bludgeoning and STR save or prone. Creatures more than one size larger auto-succeed.' },
      { id: 'versatile-t3-swift', name: 'Swift Striker', tier: 3, tree: 'Versatile',
        prerequisite: 'Tier 2 Versatile technique',
        description: 'Take the Attack action with only a Versatile weapon in one hand. Bonus action to attack with it one-handed again. No ability modifier to damage unless negative.' },
      { id: 'versatile-t4-dual', name: 'Dual Maneuver', tier: 4, tree: 'Versatile',
        prerequisite: 'Tier 3 Versatile technique',
        description: 'When you take the Attack action, hit a creature with a Versatile weapon in one hand, and your other hand is free, attempt to grapple that target as part of the same action.' },
      { id: 'versatile-t4-guard', name: 'Guard', tier: 4, tree: 'Versatile',
        prerequisite: 'Tier 3 Versatile technique',
        description: 'Bonus action: +1 AC until start of your next turn, and opportunity attacks against you have disadvantage until then.' },
      { id: 'versatile-t4-very-heavy', name: 'Very Heavy Striker', tier: 4, tree: 'Versatile',
        prerequisite: 'Tier 3 Versatile technique',
        description: 'When you attack with a Versatile weapon using both hands, your critical hit threshold is reduced by 2.' },
    ],
  },
];

/* ---------- Utilities ---------- */

export const FULL_MARTIAL_CLASSES = ['Barbarian', 'Fighter', 'Monk', 'Rogue'];
export const HALF_MARTIAL_CLASSES = ['Bender', 'Paladin', 'Ranger'];
// Non-martial: Bard, Cleric, Druid, Sorcerer, Tamer, Warlock, Wizard

export function computeMartialLevel(classes: Array<{ className: string; level: number }>): number {
  let total = 0;
  for (const c of classes) {
    if (FULL_MARTIAL_CLASSES.includes(c.className)) total += c.level;
    else if (HALF_MARTIAL_CLASSES.includes(c.className)) total += Math.floor(c.level / 2);
  }
  return total;
}

export interface MartialProgression {
  techniquesKnown: number;
  maxTier: number;
}

export function getMartialProgression(martialLevel: number): MartialProgression {
  if (martialLevel < 2) return { techniquesKnown: 0, maxTier: 0 };
  if (martialLevel < 4) return { techniquesKnown: 1, maxTier: 1 };
  if (martialLevel < 6) return { techniquesKnown: 2, maxTier: 1 };
  if (martialLevel < 8) return { techniquesKnown: 3, maxTier: 2 };
  if (martialLevel < 10) return { techniquesKnown: 4, maxTier: 2 };
  if (martialLevel < 12) return { techniquesKnown: 5, maxTier: 3 };
  if (martialLevel < 14) return { techniquesKnown: 6, maxTier: 3 };
  if (martialLevel < 16) return { techniquesKnown: 7, maxTier: 4 };
  if (martialLevel < 18) return { techniquesKnown: 8, maxTier: 4 };
  if (martialLevel < 20) return { techniquesKnown: 9, maxTier: 4 };
  return { techniquesKnown: 10, maxTier: 4 };
}

export function getTechnique(id: string): AdvancedTechnique | undefined {
  for (const tree of TECHNIQUE_TREES) {
    const found = tree.techniques.find((t) => t.id === id);
    if (found) return found;
  }
  return undefined;
}

export function isTechniqueLegal(
  techniqueId: string,
  knownIds: string[]
): boolean {
  const tech = getTechnique(techniqueId);
  if (!tech) return false;
  if (tech.tier === 1) return true;
  // For tier 2+: must know a lower-tier technique from same tree
  return knownIds.some((id) => {
    const known = getTechnique(id);
    return known && known.tree === tech.tree && known.tier < tech.tier;
  });
}