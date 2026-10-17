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
  // ============================================================
  // SHRINE KEEPER
  // ============================================================
  {
    name: "Shrine Keeper",
    description:
      "You grew up sweeping stone steps, trimming lanterns, and learning the small courtesies owed to the unseen. Whether you served a mountain shrine or a roadside altar, you know that kami and yokai alike notice who is respectful and who is not, and you have always tried to be the former.",
    suggestedAbilityScores: ["wisdom", "charisma", "constitution"],
    optionalLanguage: "Celestial",
    featSuggestions: ["Magic Initiate: Cleric", "Alert"],
    skillProficiencies: ["Insight", "Religion"],
    toolProficiency: "Calligrapher's supplies",
    equipment:
      "Calligrapher's supplies, a set of ceremonial robes, a small bell, a bundle of incense, a prayer-slip book, a belt pouch with 10 gp — OR — 50 gp",
    optionalFeature: {
      name: "Sanctuary Hospitality",
      description:
        "Shrines, temples, and holy sites will shelter you and your companions for a few nights, free of charge, in exchange for light chores or a small offering. You can also tell at a glance whether a shrine is tended, neglected, or desecrated.",
    },
    personalityTraits: [
      "I bow to everyone and everything, including doors, ladders, and the occasional startled wolf.",
      "I speak quietly and slowly, and I find silence a perfectly good answer.",
      "I leave small offerings wherever I stay, whether anyone asked me to or not.",
      "I am endlessly curious about other people's faiths and customs, and I ask a lot of respectful questions.",
      "I cannot walk past a dirty shrine without stopping to clean it.",
      "I tell fortune-slips for strangers, and I am always a little too honest about what they say.",
    ],
    ideals: [
      "Reverence. Every stone, stream, and tree may house a spirit, and all deserve respect.",
      "Service. A shrine exists for the people who come to it, and I exist to keep it open.",
      "Balance. The living world and the spirit world should never grow too far apart.",
      "Tradition. The old rites were kept for good reasons, and I will not let them fade.",
      "Compassion. Faith means nothing if it cannot feed a hungry traveller.",
      "Doubt. I keep my faith honest by questioning it often.",
    ],
    bonds: [
      "The shrine I grew up in was burned down, and I mean to see it rebuilt.",
      "A kami once answered a prayer of mine, and I have never stopped wondering why.",
      "My teacher, the old priest, vanished one night. I follow the clues they left behind.",
      "I carry a charm from my home shrine, and I will never let it be taken from me.",
      "A pilgrim I failed to protect is a weight on my heart, and I want to make it right.",
      "I owe a debt to a yokai that once spared my shrine.",
    ],
    flaws: [
      "I take every insult to a sacred place as a personal wound and act accordingly.",
      "I am rigid about ritual and cannot bring myself to improvise.",
      "I trust anyone who shows reverence, even when I should know better.",
      "I judge those who show no respect for the spirits more harshly than I should.",
      "I am afraid that my faith is hollow, and I overcompensate with piety.",
      "I will give away my last coin to a shrine before buying myself a meal.",
    ],
  },

  // ============================================================
  // WANDERING RONIN
  // ============================================================
  {
    name: "Wandering Ronin",
    description:
      "Once you swore to a lord, a clan, or a cause, and then it was gone. Now you walk the roads with blade and bedroll, doing odd work for coin and keeping to a code that only you still remember. The road has made you hard, but not so hard that you stopped looking for something worth swearing to again.",
    suggestedAbilityScores: ["strength", "dexterity", "constitution"],
    optionalLanguage: "Thieves' cant",
    featSuggestions: ["Weapon Master", "Tough"],
    skillProficiencies: ["Athletics", "Survival"],
    toolProficiency: "One type of gaming set",
    equipment:
      "A gaming set, a travel-worn cloak, a bedroll, a hooded lantern, a whetstone, a belt pouch with 8 gp — OR — 50 gp",
    optionalFeature: {
      name: "Road Reputation",
      description:
        "You are known, for good or ill, in small towns and along main roads. Innkeepers, guards, and ferrymen will often share news and rumours with you, and you can usually find temporary work as a bodyguard or caravan escort.",
    },
    personalityTraits: [
      "I say little and watch everything.",
      "I laugh loudly and drink deeply, because I know how short the road can be.",
      "I always sit with my back to the wall and my eyes on the door.",
      "I cannot resist a fair challenge, whether of blades, dice, or wits.",
      "I fix and clean my gear obsessively, and I judge others by the state of theirs.",
      "I take on stray animals and stray people with equal reluctance and equal loyalty.",
    ],
    ideals: [
      "Honour. Even without a lord, I keep my word.",
      "Freedom. I have been bound enough for one life, and I answer to no one.",
      "Redemption. I failed once, and I will not fail again.",
      "Protection. The strong should shield those who cannot defend themselves.",
      "Mastery. Every duel and every day on the road makes me better.",
      "Pragmatism. A code is a tool, not a cage, and I will bend it when I must.",
    ],
    bonds: [
      "I carry the broken sword of my fallen lord and mean to avenge them.",
      "A child from a village I once defended still writes to me, and I always write back.",
      "My former comrade became my enemy, and I am the only one who can stop them.",
      "I am searching for the clan that cast me out, to learn why.",
      "I owe my life to a stranger who bound my wounds, and I seek a way to repay them.",
      "I will protect the person who finally gives me a reason to put my sword down.",
    ],
    flaws: [
      "I would rather die than admit I need help.",
      "I hold a grudge for years and do not forget a slight.",
      "I drink to forget, and it works too well.",
      "I judge people by their skill with a blade before their character.",
      "I cannot walk away from a duel once it has been offered.",
      "I am more loyal to my memories than to the people alive today.",
    ],
  },

  // ============================================================
  // KABUKI PERFORMER
  // ============================================================
  {
    name: "Kabuki Performer",
    description:
      "You grew up under painted masks and stage lanterns, learning to cry on cue and fight in sweeping, practised arcs. On the stage you are a hero, a villain, a ghost, or a god. Off it, you carry those faces with you, and sometimes it is hard to tell which is the real one.",
    suggestedAbilityScores: ["charisma", "dexterity", "constitution"],
    optionalLanguage: "Sylvan",
    featSuggestions: ["Actor", "Performer"],
    skillProficiencies: ["Deception", "Performance"],
    toolProficiency: "Disguise kit",
    equipment:
      "A disguise kit, a stage costume, a painted mask, a folding fan, a set of face paints, a belt pouch with 12 gp — OR — 50 gp",
    optionalFeature: {
      name: "Stage Presence",
      description:
        "You can always find a place to perform in any settlement of size. Performing earns you a modest living and lodging, and audiences remember you. Strangers who have seen your show are inclined to hear you out.",
    },
    personalityTraits: [
      "I narrate my own life as if the audience is watching.",
      "I never leave a room without making an exit.",
      "I mimic the voices and mannerisms of everyone I meet, sometimes without noticing.",
      "I treat every conversation as a scene, and I get nervous when no one else knows their lines.",
      "I am shy and quiet until I put on a mask, and then I cannot be stopped.",
      "I flatter everyone, and I mean most of it.",
    ],
    ideals: [
      "Art. A great performance can change the world more than any blade.",
      "Fame. I want my name remembered long after I am gone.",
      "Truth. A mask can reveal what a bare face hides.",
      "Community. The troupe is my family, and I will do anything to keep it together.",
      "Freedom. The stage is the one place I can be anyone I like.",
      "Mischief. Nothing is more fun than a well-timed prank.",
    ],
    bonds: [
      "My troupe was scattered, and I want to gather them again.",
      "A cursed mask from my old theatre still whispers to me.",
      "A rival performer stole my best role and my name.",
      "I owe everything to the master who trained me, and I want to make them proud.",
      "I fell in love with someone in the audience and never learned their name.",
      "I am hunting the producer who left my troupe to burn in a fire.",
    ],
    flaws: [
      "I lie so smoothly that I sometimes forget which version is true.",
      "I cannot stand being upstaged.",
      "I am afraid that without my mask I am no one.",
      "I spend money as if the audience will always applaud.",
      "I exaggerate every story and make myself the hero.",
      "I do not trust anyone who will not tell me what they are really thinking.",
    ],
  },

  // ============================================================
  // FLOATING MARKET TRADER
  // ============================================================
  {
    name: "Floating Market Trader",
    description:
      "You were raised on a flat-bottomed boat in a market that never touches land, where silk, spices, and spirit-charms change hands from dawn until the lanterns burn out. You can haggle in six dialects, spot a counterfeit at forty paces, and always know what something is worth, down to the last copper.",
    suggestedAbilityScores: ["charisma", "intelligence", "dexterity"],
    optionalLanguage: "Aquan",
    featSuggestions: ["Skilled", "Lucky"],
    skillProficiencies: ["Persuasion", "Insight"],
    toolProficiency: "Navigator's tools",
    equipment:
      "Navigator's tools, a small abacus, a lacquered strongbox, a set of fine clothes, a sampling of trade goods, a belt pouch with 15 gp — OR — 50 gp",
    optionalFeature: {
      name: "Merchant's Network",
      description:
        "You have contacts among traders and boatmen in most port towns. You can usually learn the going price of any common good, arrange passage on a boat, or sell and buy goods at slightly better terms than a stranger would get.",
    },
    personalityTraits: [
      "I can price anything at a glance, including people.",
      "I never take the first offer, and I never make my last one.",
      "I give small gifts to everyone I meet, because goodwill is the best currency.",
      "I always know which direction the water is flowing.",
      "I keep a ledger of every favour I owe and every favour owed to me.",
      "I tell tall tales about the cargo I have carried, and I tell them well.",
    ],
    ideals: [
      "Prosperity. A rising tide lifts every boat, and I want to be the tide.",
      "Fairness. A good deal leaves both sides satisfied.",
      "Freedom. The river goes where it likes, and so do I.",
      "Curiosity. The best goods come from the strangest places.",
      "Ambition. I will one day own the biggest barge on the water.",
      "Generosity. What I earn I share, and it always comes back.",
    ],
    bonds: [
      "My family's boat was sunk by pirates, and I intend to find the culprits.",
      "I owe a huge debt to a crime lord and I am working to pay it off.",
      "A rare charm in my keeping belongs to someone, and I am searching for them.",
      "My apprentice vanished at the market, and I will not rest until I find them.",
      "I am the last person who knows the secret route to my family's hidden stall.",
      "A kappa saved my life once, and I trade only fair deals with its kin.",
    ],
    flaws: [
      "I cannot resist a bargain, even when I do not need it.",
      "I assume everyone is cheating me until proven otherwise.",
      "I tell small lies to close deals and big lies when I am cornered.",
      "I get seasick on dry land.",
      "I am too proud to admit when I have made a bad trade.",
      "I measure my worth by the size of my purse.",
    ],
  },

  // ============================================================
  // MOUNTAIN HERMIT
  // ============================================================
  {
    name: "Mountain Hermit",
    description:
      "You spent years alone among high peaks and cold streams, answering to no one but the weather. You learned which herbs soothe a fever and which kill, how to read the mood of a mountain, and how to be at peace in silence. Something finally drew you down from the heights, and you are still working out what.",
    suggestedAbilityScores: ["wisdom", "constitution", "intelligence"],
    optionalLanguage: "Druidic",
    featSuggestions: ["Durable", "Magic Initiate: Druid"],
    skillProficiencies: ["Nature", "Medicine"],
    toolProficiency: "Herbalism kit",
    equipment:
      "A herbalism kit, a walking staff, a sturdy cloak, a clay teapot, a scroll case of notes, a belt pouch with 5 gp — OR — 50 gp",
    optionalFeature: {
      name: "Quiet Revelation",
      description:
        "During your solitude you discovered something: a hidden spring, a forgotten hermitage, a cure, or a secret about the spirits of the mountain. Work with your GM to decide what it is. Once a day you can also find enough safe food and water for yourself in wild terrain.",
    },
    personalityTraits: [
      "I am comfortable with long silences and am puzzled by those who are not.",
      "I talk to animals, plants, and weather as if they were people.",
      "I brew tea at every opportunity and expect everyone to join me.",
      "I treat every injury I see, whether or not the patient has asked.",
      "I am gentle with the weak and unimpressed by the powerful.",
      "I sometimes forget what day it is and which language I am speaking.",
    ],
    ideals: [
      "Harmony. I belong to the mountain as much as it belongs to me.",
      "Wisdom. Solitude taught me what crowds never could.",
      "Healing. My knowledge is only worth something if it saves lives.",
      "Humility. The mountain does not care about titles, and neither do I.",
      "Detachment. I own nothing, and nothing owns me.",
      "Curiosity. The world below is strange and I want to understand it.",
    ],
    bonds: [
      "A traveller I once healed has become the only friend I have.",
      "My former teacher is lost somewhere in the mountains, and I mean to find them.",
      "I was driven off the peak by something I will not talk about.",
      "A sacred spring I protected has been poisoned, and I seek whoever did it.",
      "I carry a seed from the mountain's oldest tree to plant somewhere new.",
      "A mountain spirit asked me to deliver a message, and I have not found the recipient.",
    ],
    flaws: [
      "I find crowds exhausting and become irritable in them.",
      "I am blunt to the point of rudeness.",
      "I distrust anything made of metal and anyone who sells it.",
      "I refuse help when I clearly need it.",
      "I cannot tell when people are joking.",
      "I would sooner walk away from a problem than fight it.",
    ],
  },

  // ============================================================
  // YOKAI HUNTER
  // ============================================================
  {
    name: "Yokai Hunter",
    description:
      "You make your living tracking down troublesome spirits, whether to drive them off, bargain with them, or put them to rest. You know the signs of a kitsune's glamour, the habits of a hungry oni, and the quiet footprint of a haunting. You take the work seriously, because the difference between a hunter and a victim is preparation.",
    suggestedAbilityScores: ["wisdom", "dexterity", "intelligence"],
    optionalLanguage: "Abyssal",
    featSuggestions: ["Alert", "Mage Slayer"],
    skillProficiencies: ["Investigation", "Survival"],
    toolProficiency: "Poisoner's kit",
    equipment:
      "A poisoner's kit, a coil of rope, a set of paper wards, a notebook of sketched creatures, a hunter's cloak, a belt pouch with 10 gp — OR — 50 gp",
    optionalFeature: {
      name: "Hunter's Lore",
      description:
        "You know where to look for information on dangerous spirits. Villagers, priests, and old folk will often share local legends and sightings with you, and you can tell when a story about a creature rings true or false.",
    },
    personalityTraits: [
      "I sleep lightly and with one hand on my weapon.",
      "I carry a ward for every occasion and offer them to anyone who looks worried.",
      "I talk to monsters politely before trying anything else.",
      "I keep a trophy from every creature I have defeated.",
      "I never mock a ghost, but I will question one for hours.",
      "I cannot resist telling stories of past hunts, even when no one is asking.",
    ],
    ideals: [
      "Protection. Someone has to stand between the village and the dark.",
      "Understanding. Most spirits have reasons, and I try to learn them first.",
      "Glory. A hunter who brings down a legend earns a legend's name.",
      "Balance. Not every yokai is a monster, and I decide which are.",
      "Duty. My order trained me, and I carry on its work.",
      "Vengeance. The thing that took my family will answer to me.",
    ],
    bonds: [
      "A spirit I failed to stop destroyed my village, and I seek to end it.",
      "My mentor left me their journal and a list of creatures they never found.",
      "I befriended a yokai I was meant to slay and now keep it hidden.",
      "I carry the weapon of a hunter who fell, and I vow to finish their final hunt.",
      "I protect a child with a spirit's mark on them.",
      "I serve a lord who pays me well, though I suspect they ask too much.",
    ],
    flaws: [
      "I see monsters where there are only misunderstandings.",
      "I take unnecessary risks to prove I am the best.",
      "I get obsessed with a hunt and neglect everything else.",
      "I cannot trust anyone with spirit blood in them.",
      "I keep too many secrets and share too few.",
      "I leave traps in places where I should not.",
    ],
  },
];

export function getBackground(name: string): DnDBackground | undefined {
  return BACKGROUNDS.find((b) => b.name === name);
}