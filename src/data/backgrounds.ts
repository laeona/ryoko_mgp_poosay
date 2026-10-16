import type { DnDBackground } from '../types/character';

export const BACKGROUNDS: DnDBackground[] = [
  // ============================================================
  // ELEMENTALIST
  // ============================================================
  {
    name: 'Elementalist',
    description:
      "From the soil beneath your feet to the clouds that roam the sky, every aspect of the natural world holds magic, and so do you. For some, it takes decades of exhausting study to earn this connection. Others, perhaps those with a wisp of yokai magic, are born able to connect with the natural forces around them, influencing the elements as effortlessly as breathing.",
    suggestedAbilityScores: ['strength', 'constitution', 'wisdom'],
    optionalLanguage: 'Primordial',
    featSuggestions: ['Elemental Fighting', 'Elemental Initiate'],
    skillProficiencies: ['Acrobatics', 'Nature'],
    toolProficiency: "One kind of artisan's tools",
    equipment:
      "Artisan's tools, a backpack, traveler's clothes, a healer's kit, 15 gp — OR — 50 gp",
    optionalFeature: {
      name: 'Primordial Sense',
      description:
        'Action: predict weather for 24 hours. Then a 10-minute ritual can influence it (50% chance to change to foggy, overcast, raining, snowing, sunny, or windy). Limited: cannot cause harm, cannot affect magically conjured weather. Once per dawn.',
    },
    personalityTraits: [
      'I am the life of the party! I love showing off my skills and power and do so at every opportunity—to rapturous applause, of course.',
      'I push myself endlessly. A moment not spent training is a moment wasted, and I allow myself little time for relaxation or friendship.',
      'I have vivid dreams and occasionally perform elemental magic while asleep.',
      'I am fascinated by magic of all kinds. I often let my curiosity get the best of me and ask endless questions of magic users and beings.',
      'I wear my emotions on my sleeves. Whether I\'m happy or sad, everyone will know about it.',
      'My body is a temple. I am extremely particular about what I eat and drink, and I have lengthy, intricate morning ablutions.',
    ],
    ideals: [
      'Perfection. I want to be the best version of me I can be. I will accept nothing less of myself and expect the same of others.',
      'Pacifism. I always seek a nonviolent solution and only fight when I see no other choice.',
      'Community. I want to use my power to help others. I seek a meaningful role in the world where I can do my part.',
      'Teacher. The lessons I\'ve learned have been painful—a long road of broken bones and bloodied fists. I want to share the wisdom I\'ve gained with others so the struggle was not in vain.',
      'Student. There is so much to discover in the world; I will never stop exploring and growing.',
      'Aggression. I worked hard for the power I have—damn right I want to use it. I throw myself into challenges and dangerous situations. If you think you can beat me, bring it on.',
    ],
    bonds: [
      'There is no law I won\'t break to protect those I care about.',
      'Although I do care for others, my duty is to myself. I come first in my book.',
      'The teacher who taught me the secrets of element bending remains a trusted friend and confidant. I make great efforts to keep in touch; they are family to me.',
      'I stole a treatise on bending and studied in secret. Now the people I took it from are looking for me.',
      'I struggle to feel like I belong. I pursue power in the hope it will keep me useful to those around me.',
      'I once lost control of my power and grievously wounded an innocent. I am still searching for a way to make it up to them.',
    ],
    flaws: [
      'I push myself too hard. Sometimes I leave myself weak and vulnerable in the pursuit of strength.',
      'I am not subtle. I am loud, flashy, and eager to fight.',
      'I am afraid of my own power. I second-guess myself and doubt my ability to wield it responsibly.',
      'Despite wielding elemental powers of earth, I don\'t like sand. It\'s coarse and rough and irritating, and it gets everywhere.',
      'I am noble to a fault, always play fair, and am seen as predictable and naive.',
      'I am forever changing my mind and struggle to focus on a single thing.',
    ],
  },

  // ============================================================
  // HANABI ENGINEER
  // ============================================================
  {
    name: 'Hanabi Engineer',
    description:
      'Behind every great adventurer is a greater engineer—a source of incredible prostheses, gleaming armour, and deadly magic items. You are an expert of your craft, a virtuoso of assembly and artifice, buoyed ever onward by restless intellectual curiosity and love of the job.',
    suggestedAbilityScores: ['dexterity', 'constitution', 'intelligence'],
    optionalLanguage: 'Common sign language',
    featSuggestions: ['Prosthesis Adept', 'Prosthesis Fighting'],
    skillProficiencies: ['Investigation', 'Sleight of Hand'],
    toolProficiency: "One kind of artisan's tools",
    equipment:
      "Artisan's tools, 2 pouches, traveler's clothes, a basic prosthesis with an integrated weapon, 5 gp — OR — 50 gp",
    optionalFeature: {
      name: 'Hanabi Apprentice',
      description:
        'Access to the College of Hanabi network of tinkerers, merchants, and manufacturers. Can procure "top shelf" components and magic items, or get in touch with affluent merchants.',
    },
    personalityTraits: [
      'Excessive verbosity is prized among my idiosyncrasies.',
      'I tend to get extremely excitable when discussing my passions.',
      'I love to blow stuff up.',
      'I am swiftly irritated by philistines who fail to appreciate my artistry.',
      'I articulate every word with wild gestures and movements.',
      'I sleep hanging upside down; the rush of blood to my head often sparks great ideas.',
    ],
    ideals: [
      'Ambition. I strive to be recognised as the best in the world at what I do.',
      'Altruism. I aim to make the world a better place using my gifts.',
      'Money. I intend to amass great wealth on the back of my talents.',
      'Teacher. I live to pass down knowledge, and I take great delight in teaching others all that I know.',
      'Progress. I aspire to wake up every day a little better than I was the day before.',
      'Chore Aversion. I am willing to work extremely hard to find a way to be lazy. If it takes a week to make a tool that handles a boring job that would have taken me 10 minutes, so be it.',
    ],
    bonds: [
      'I am deeply attached to my tools, giving them names and talking to them as I work.',
      'I count several famous inventors and merchants among my close friends.',
      'I blew up my first workshop at the age of nine and have gone through several more over the years. Numerous landlords have bounties on my head.',
      'I have dear friends who count on me for their prostheses and gear. I devote countless hours to caring for them at no charge.',
      'A rival engineer once stole an invention of mine and claimed credit. I will never forgive them and secretly seek revenge.',
      'I am under contract from a noble to produce an immensely complex and powerful item, reporting regular updates on its construction to them.',
    ],
    flaws: [
      'If anything I create is less than perfect, I throw it away in disgust.',
      'I often forget to charge for my work. The joy of creating is all I need.',
      'My eagerness to explosively solve my problems sometimes gets me into more trouble than it\'s worth.',
      'I put my trust wholeheartedly in technology, dismissing any potential magical or social solution to a problem.',
      'I get anxious when plans go awry, making it a struggle to adapt on the go.',
      'I spend every penny I earn immediately; there always seems to be something new to buy.',
    ],
  },

  // ============================================================
  // KAIJU TRACKER
  // ============================================================
  {
    name: 'Kaiju Tracker',
    description:
      'Across a twisted landscape uprooted by destruction and chaos, you follow the mighty footfalls of kaiju. You are a brazen traveller who tracks Gargantuan creatures over the realms, from icy mountain top to toxic swampland, ever seeking a glimpse of your primal quarry.',
    suggestedAbilityScores: ['dexterity', 'constitution', 'wisdom'],
    optionalLanguage: 'Draconic, Giant, or Primordial',
    featSuggestions: ['Kaiju Hunter'],
    skillProficiencies: ['Athletics', 'Survival'],
    toolProficiency: 'Herbalism Kit',
    equipment:
      "Herbalism kit, backpack, traveler's clothes, a hunting trap, a grappling hook prosthesis, 50 feet of hempen rope, 5 gp — OR — 50 gp",
    optionalFeature: {
      name: 'Trail of Destruction',
      description: 'Nonmagical difficult terrain doesn\'t impede your movement.',
    },
    personalityTraits: [
      'I live for the thrill of danger! Certainty of death? Small chance of success? What are we waiting for?',
      'I have seen devastation and loss that would break most people. I have survived by closing my heart to it.',
      'I will never settle down. I need to always be on the road, and I\'ll die on my feet.',
      'Every dawn, without fail, I take an hour to clean and sharpen my weapons.',
      'I love myths of heroes and villains. I constantly retell old folktales and draw parallels to real life.',
      'I try to conscript anyone I meet into joining me on foolhardy adventures.',
    ],
    ideals: [
      'Vengeance. Once wronged, I never let go. I am seeking a way to exact vengeance on those who have done me harm.',
      'Travel. I want to see everything and be the first to traverse every plane in existence.',
      'Harvester. I believe the secret to mythical elixirs and weapons lies in harvesting components from incredible creatures. I want to harvest the bodies of gods.',
      'Hasty. If something is worth doing, it\'s worth doing now. I have no time for debate or consideration.',
      'Guardian. I struggle to connect with people, but I want to keep them safe, even if they never know who I am.',
      'Legend. I want to be remembered and leave a legacy that bards will sing of for generations.',
    ],
    bonds: [
      'There are many monsters in this world. I will protect those who cannot protect themselves.',
      'A kaiju destroyed my home and people. It will die by my hand, or I will die trying.',
      'Those I travel with are closer than kin.',
      'I am enamoured with kaiju—their size, grace, and power. I wish only to observe and understand how such beings exist.',
      'My faith has been shaken upon seeing the devastation wrought by the evils in this world. I am struggling to overcome my doubt in the god I have long served.',
      'I make friends with animals quickly and loathe to harm beasts, even dangerous ones.',
    ],
    flaws: [
      'My obsession with killing monsters risks turning me into one.',
      'I judge myself harshly. A single failure is enough to send me spiralling into despair.',
      'My thrill-seeking behaviour puts me and others at risk.',
      'My word is absolute; I struggle to entertain other perspectives or ideas.',
      'My love for treasure and gold often leads my morals astray.',
      'Only the mission\'s success matters; the body count is irrelevant.',
    ],
  },

  // ============================================================
  // RAISED BY YOKAI
  // ============================================================
  {
    name: 'Raised by Yokai',
    description:
      'You were not raised among your kin. Yours was a childhood of magic, adventure, and isolation from others of your kind, for you were raised by a yokai spirit. It could be that you were abandoned by your parents, that your people were lost in a kaiju rampage, or that you followed a mesmerising creature deep into the jungle.',
    suggestedAbilityScores: ['dexterity', 'constitution', 'wisdom'],
    optionalLanguage: 'Abyssal, Infernal, or Sylvan',
    featSuggestions: ['Spirit Bonded'],
    skillProficiencies: ['Animal Handling', 'Perception'],
    toolProficiency: "Poisoner's kit",
    equipment:
      "A dagger, a poisoner's kit, 2 pouches, traveler's clothes, a lamp, a vial of basic poison, a rare gem worth 10 gp — OR — 50 gp",
    optionalFeature: {
      name: 'Natural Envoy',
      description:
        'You grew up surrounded by yokai and understand their ways and quirks better than most. Advantage on ability checks to peacefully interact with Beasts and Yokai.',
    },
    personalityTraits: [
      'I revere the natural world, finding tremendous delight in even the simplest aspects of nature.',
      'I care little for fancy foods or exuberance. I am baffled by the obsession with money shared by most Humanoids.',
      'I prefer the company of animals and spirits. I find other people tiresome and dull.',
      'Having grown up surrounded by magic, I am extremely difficult to impress. Even the most dazzling displays of power from great wizards and sorcerers seem utterly mundane.',
      'Having been raised outside of typical societies, I am acutely aware of my unfamiliarity with most customs and go to tremendous lengths to avoid offending people.',
      'I become anxious and fidgety if I spend too long sitting or lying down, especially while indoors.',
    ],
    ideals: [
      'Family. I want to reconnect with my kin; I am searching for my people and discovering my history.',
      'Unity. I have seen firsthand the patience and kindness of spirits. I wish to bring the material and spiritual realms closer together, creating a more harmonious world.',
      'Power. I grew up around powerful magic, and I\'m looking for more.',
      'Independence. I don\'t care what anyone else thinks or does. I didn\'t need them before, and I don\'t need them now. I\'m on my own incredible journey, and they\'re lucky to have a cameo in it.',
      'Kindness. I survived due to the nurture and protection of gentle yokai. I wish to extend that same gift of kindness to others.',
      'Mischief. I\'ve embraced my chaotic life, and I take great pleasure in spreading a little chaos wherever I go.',
    ],
    bonds: [
      'My familiar and I share a bond so deep that we can\'t survive without each other.',
      'Unbeknownst to me, my direct kin are famous, wealthy, and looking for me.',
      'I trust the yokai who raised me more than any Humanoid ally.',
      'The yokai who raised me departed this world when I came of age. Now I search for where they went.',
      'My true kin were killed by a mysterious organisation, leaving me an orphan. I\'m hunting them down to inflict retribution.',
      'I have strange dreams of kin I\'ve never known being snatched away. I love my yokai family, but I\'m secretly beginning to wonder if I was stolen by them as a child.',
    ],
    flaws: [
      'The letter of the law means absolutely nothing to me; I am guided solely by my own moral compass.',
      'I hide my past, fearing I\'ll never truly fit in with other people.',
      'I believe myself to be better than others; having been raised by yokai, I\'ve witnessed magical feats that most could never dream of.',
      'I am very slow to trust Humanoids and find it hard to take them at their word.',
      'I am extremely swift to anger when I believe someone has disrespected nature or the spirits that dwell therein.',
      'I put too much faith in my own abilities; I believe myself to be almost invincible.',
    ],
  },
];

export function getBackground(name: string): DnDBackground | undefined {
  return BACKGROUNDS.find((b) => b.name === name);
}