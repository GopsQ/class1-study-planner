import { useState, useEffect, useCallback } from "react";

const C = {
  bg: "#FFF9F0", card: "#FFFFFF", dark: "#1A1A2E", mid: "#555770", light: "#9295A5",
  border: "#E8E4DF", purple: "#7C3AED", purpleBg: "#F3F0FF", teal: "#0D9488", tealBg: "#E6FFFA",
  orange: "#E8590C", orangeBg: "#FFF4EC", red: "#E03131", redBg: "#FFF0F0", blue: "#1C7ED6",
  blueBg: "#E7F5FF", green: "#2B8A3E", greenBg: "#E6FCF5", yellow: "#E67700", yellowBg: "#FFF9DB",
  pink: "#C2255C", pinkBg: "#FFF0F6", gold: "#F59F00",
};

// ─── CHAPTER DATA ───
const CHAPTERS = [
  {
    id: 1, title: "The Sentence", icon: "📝", color: C.purple,
    tip: "A sentence is a group of words that makes complete sense. It always starts with a capital letter and ends with a full stop.\n\n**How to improve:** Read sentences aloud — if it sounds complete and makes sense, it's a sentence! If it feels incomplete (like 'The big'), it's not.\n\n**Daily practice:** Pick any picture and say one full sentence about it. Then write it down.\n\n**Common mistake:** Kids often write phrases like 'The red ball' thinking it's a sentence. Ask: 'What about the red ball? What did it do?' That turns it into 'The red ball bounced.'",
    exercises: [
      { type: "yesno", q: "Is this a sentence? — 'The cat is sleeping.'", a: "yes", explain: "'The cat is sleeping' makes complete sense. It tells us WHO (the cat) and WHAT it's doing (sleeping). ✓ Sentence!" },
      { type: "yesno", q: "Is this a sentence? — 'Under the big'", a: "no", explain: "'Under the big' doesn't make complete sense. Under the big WHAT? It's just a group of words, not a sentence." },
      { type: "yesno", q: "Is this a sentence? — 'Birds fly in the sky.'", a: "yes", explain: "'Birds fly in the sky' tells us WHO (birds) and WHAT they do (fly in the sky). Complete sense! ✓" },
      { type: "yesno", q: "Is this a sentence? — 'Very happy and'", a: "no", explain: "'Very happy and' is incomplete. Who is happy? And what? It doesn't make complete sense." },
      { type: "unscramble", q: "Arrange into a sentence: fruit / a / is / Mango", a: "Mango is a fruit.", explain: "Put the naming word first, then the doing/being word, then the rest. Remember capital letter at start, full stop at end!" },
      { type: "unscramble", q: "Arrange into a sentence: play / we / outside", a: "We play outside.", explain: "We (who) + play (what we do) + outside (where) = a complete sentence!" },
      { type: "unscramble", q: "Arrange into a sentence: shines / the / brightly / sun", a: "The sun shines brightly.", explain: "The sun (who) + shines (what it does) + brightly (how) = complete sentence!" },
      { type: "yesno", q: "Is this a sentence? — 'Please close the door.'", a: "yes", explain: "Yes! This makes complete sense and tells someone to do something. Sentences can be requests too!" },
      { type: "unscramble", q: "Arrange: blue / the / is / sky", a: "The sky is blue.", explain: "The sky (what we're talking about) + is blue (what we're saying about it) = sentence!" },
      { type: "yesno", q: "Is this a sentence? — 'Running fast the'", a: "no", explain: "'Running fast the' doesn't tell us who is running or make complete sense." },
    ]
  },
  {
    id: 2, title: "Two Parts of a Sentence", icon: "✂️", color: C.teal,
    tip: "Every sentence has two parts:\n• **Naming Part (Subject):** Who or what the sentence is about\n• **Doing Part (Predicate):** What is said about the naming part\n\n**How to improve:** Ask two questions: 'WHO is this about?' (= naming part) and 'WHAT about them?' (= doing part).\n\n**Daily practice:** Say any sentence and clap between the two parts: 'The dog [CLAP] runs fast.'\n\n**Common mistake:** Kids sometimes put just the name as the naming part and forget 'The' or 'A'. 'The tall boy' is the full naming part, not just 'boy'.",
    exercises: [
      { type: "mcq", q: "In 'The dog barks loudly', what is the NAMING part?", options: ["barks loudly", "The dog", "loudly", "dog barks"], a: 1, explain: "'The dog' is WHO we are talking about = naming part. 'Barks loudly' is what the dog does = doing part." },
      { type: "mcq", q: "In 'My mother cooks food', what is the DOING part?", options: ["My mother", "cooks food", "My", "food"], a: 1, explain: "'My mother' = naming part (who). 'Cooks food' = doing part (what she does)." },
      { type: "match", q: "Match the naming part with the correct doing part:", pairs: [["The sun", "shines brightly"], ["Birds", "fly in the sky"], ["My father", "reads the newspaper"]], explain: "Each naming part (who/what) connects to a doing part (what they do)." },
      { type: "mcq", q: "In 'Riya plays with her friends', the naming part is:", options: ["plays with her friends", "Riya", "her friends", "plays"], a: 1, explain: "Riya is the person we're talking about = naming part." },
      { type: "mcq", q: "In 'The tall tree gives us shade', the naming part is:", options: ["The tall tree", "gives us shade", "tall tree", "shade"], a: 0, explain: "'The tall tree' is the complete naming part — including 'The' and 'tall'!" },
      { type: "match", q: "Match naming and doing parts:", pairs: [["The children", "play in the park"], ["Our teacher", "teaches us English"], ["The baby", "is crying"]], explain: "Always find WHO first (naming part), then WHAT about them (doing part)." },
      { type: "mcq", q: "In 'The red bus stops here', the doing part is:", options: ["The red bus", "stops here", "red bus", "here"], a: 1, explain: "'Stops here' tells us what the red bus does = doing part." },
      { type: "mcq", q: "Which is a correct sentence?", options: ["The cat on mat.", "The cat sits on the mat.", "Sits on the mat.", "Cat mat sits."], a: 1, explain: "A complete sentence needs both parts: naming (The cat) + doing (sits on the mat)." },
    ]
  },
  {
    id: 3, title: "Naming Words (Nouns)", icon: "🏷️", color: C.orange,
    tip: "Naming words (nouns) are names of people, animals, places, or things.\n\n**How to improve:** Play the 'I Spy' game — 'I spy something that is a naming word!' Point at objects and name them.\n\n**4 types to know:**\n• People: teacher, mother, doctor\n• Animals: cat, elephant, parrot\n• Places: school, park, market\n• Things: table, book, ball\n\n**Daily practice:** Before bed, name 5 things you saw today. Write them in a 'noun diary'!\n\n**Fun trick:** If you can put 'a' or 'the' before it, it's probably a noun! (a book, the park, a doctor)",
    exercises: [
      { type: "mcq", q: "Which of these is a NAMING word?", options: ["run", "beautiful", "elephant", "quickly"], a: 2, explain: "'Elephant' is a naming word (noun) — it's the name of an animal!" },
      { type: "category", q: "Sort these into People, Animals, Places, or Things:", words: [{ w: "doctor", cat: "People" }, { w: "tiger", cat: "Animals" }, { w: "school", cat: "Places" }, { w: "pencil", cat: "Things" }, { w: "mother", cat: "People" }, { w: "garden", cat: "Places" }], explain: "Nouns can be names of people, animals, places, or things!" },
      { type: "mcq", q: "Find the naming word: 'The girl reads a book.'", options: ["reads", "The", "girl", "a"], a: 2, explain: "'Girl' and 'book' are both naming words! 'Girl' is a person, 'book' is a thing." },
      { type: "mcq", q: "Which is NOT a naming word?", options: ["table", "happy", "river", "cat"], a: 1, explain: "'Happy' is a describing word (adjective), not a naming word. It tells us how something is, not what it is." },
      { type: "yesno", q: "Is 'Mumbai' a naming word?", a: "yes", explain: "Yes! Mumbai is the name of a place (city). It's a naming word!" },
      { type: "mcq", q: "How many naming words in: 'The boy and his dog went to the park.'?", options: ["2", "3", "4", "1"], a: 1, explain: "Boy (person) + dog (animal) + park (place) = 3 naming words!" },
      { type: "mcq", q: "Which group has ALL naming words?", options: ["cat, run, big", "book, school, teacher", "happy, blue, tall", "eat, sleep, play"], a: 1, explain: "Book (thing), school (place), teacher (person) — all naming words!" },
      { type: "yesno", q: "Is 'running' a naming word?", a: "no", explain: "'Running' is a doing word (verb), not a naming word. It tells what someone is doing." },
    ]
  },
  {
    id: 4, title: "Common & Special Names", icon: "👑", color: C.pink,
    tip: "**Common names:** General names for any person, place, animal, or thing (boy, city, river)\n**Special names (Proper nouns):** Specific names — always start with a CAPITAL letter (Rahul, Delhi, Ganga)\n\n**How to improve:** The capital letter is the clue! If it needs a capital letter, it's a special name.\n\n**Daily practice:** 'I say common, you say special!' Parent: 'city' → Child: 'Mumbai'. Parent: 'boy' → Child: 'Arjun'.\n\n**Common mistake:** Forgetting capitals for special names. Make a rule: Special names = Special first letter (capital)!",
    exercises: [
      { type: "mcq", q: "Which is a SPECIAL name (proper noun)?", options: ["boy", "Delhi", "river", "school"], a: 1, explain: "'Delhi' is a special name — it's the specific name of a city. It starts with a capital letter!" },
      { type: "yesno", q: "Is 'girl' a special name?", a: "no", explain: "'Girl' is a common name — it could be any girl. A special name would be 'Priya' or 'Anita'." },
      { type: "mcq", q: "'Ganga' is a special name for a ___", options: ["mountain", "river", "city", "country"], a: 1, explain: "Ganga is the special/specific name of a river. 'River' is the common name." },
      { type: "yesno", q: "Should 'january' be written as 'January'?", a: "yes", explain: "Months are special names and must always start with a capital letter: January, February, March..." },
      { type: "mcq", q: "Which pair is correct?", options: ["common: dog, special: Tommy", "common: Raj, special: boy", "common: India, special: country", "common: Ganga, special: river"], a: 0, explain: "'Dog' is a common name (any dog), 'Tommy' is a special name (one specific dog)!" },
      { type: "mcq", q: "Find the common name: 'Sita goes to Rose Valley School.'", options: ["Sita", "Rose Valley School", "goes", "None — all are special"], a: 2, explain: "Tricky! 'Sita' and 'Rose Valley School' are special names. 'Goes' is a doing word, not a naming word at all." },
      { type: "yesno", q: "Is 'Sunday' a special name?", a: "yes", explain: "Yes! Days of the week are special names: Sunday, Monday, Tuesday... all need capital letters!" },
      { type: "mcq", q: "Which needs a capital letter?", options: ["table", "mumbai", "animal", "flower"], a: 1, explain: "'Mumbai' is a special name (specific city) and should be written as 'Mumbai' with capital M." },
    ]
  },
  {
    id: 5, title: "One and Many", icon: "🐱🐱", color: C.blue,
    tip: "**Singular** = one (cat, box, baby)\n**Plural** = more than one (cats, boxes, babies)\n\n**Rules to remember:**\n• Most words: add -s (cat→cats, book→books)\n• Words ending in s, sh, ch, x: add -es (bus→buses, box→boxes)\n• Words ending in y (after consonant): change y to -ies (baby→babies)\n• Some words change completely: man→men, child→children, tooth→teeth\n\n**Daily practice:** At mealtime — 'one roti, two rotis; one glass, three glasses'\n\n**Fun trick:** If you can count it (1, 2, 3...), you can make it plural!",
    exercises: [
      { type: "mcq", q: "What is the plural of 'cat'?", options: ["cats", "cates", "caties", "cat"], a: 0, explain: "Just add -s! Cat → Cats. Simple rule for most words." },
      { type: "mcq", q: "What is the plural of 'box'?", options: ["boxs", "boxes", "boxies", "boxing"], a: 1, explain: "Words ending in x get -es. Box → Boxes. (Same for bus→buses, dish→dishes)" },
      { type: "mcq", q: "What is the plural of 'baby'?", options: ["babys", "babyes", "babies", "baby"], a: 2, explain: "Words ending in y (after a consonant) — change y to i, add -es. Baby → Babies." },
      { type: "mcq", q: "What is the plural of 'man'?", options: ["mans", "men", "manes", "manies"], a: 1, explain: "'Man' is a special word — its plural is 'men'. Not mans! Some words change completely." },
      { type: "mcq", q: "What is the plural of 'leaf'?", options: ["leafs", "leaves", "leafes", "leafies"], a: 1, explain: "Words ending in -f or -fe often change to -ves. Leaf → Leaves. (Also: knife→knives)" },
      { type: "yesno", q: "Is 'children' the plural of 'child'?", a: "yes", explain: "Yes! Child → Children. This is a special/irregular plural." },
      { type: "mcq", q: "Which plural is WRONG?", options: ["dogs", "churchs", "trees", "pens"], a: 1, explain: "'Church' ends in -ch, so we add -es: churches (not churchs)." },
      { type: "mcq", q: "What is the plural of 'tooth'?", options: ["tooths", "toothes", "teeth", "teeths"], a: 2, explain: "Tooth → Teeth. Another special word that changes completely!" },
    ]
  },
  {
    id: 6, title: "He or She (Gender)", icon: "👦👧", color: C.green,
    tip: "**Masculine** = male (boy, father, king, lion)\n**Feminine** = female (girl, mother, queen, lioness)\n\n**Common patterns:**\n• Add -ess: lion→lioness, prince→princess\n• Completely different: boy→girl, uncle→aunt, brother→sister\n• husband→wife, king→queen, sir→madam\n\n**Daily practice:** Family game — 'Papa is masculine, Mummy is feminine. Dada? Dadi?'\n\n**Tip:** Not all words have a gender pair. 'Table' and 'book' are neither he nor she!",
    exercises: [
      { type: "mcq", q: "What is the feminine of 'king'?", options: ["kingess", "queen", "kings", "princess"], a: 1, explain: "King (masculine) → Queen (feminine). A completely different word!" },
      { type: "match", q: "Match masculine with feminine:", pairs: [["boy", "girl"], ["uncle", "aunt"], ["lion", "lioness"]], explain: "Some pairs are completely different words (boy-girl), some add -ess (lion-lioness)." },
      { type: "mcq", q: "The feminine of 'brother' is:", options: ["brothress", "sister", "brothers", "mother"], a: 1, explain: "Brother → Sister. Different words for the masculine and feminine." },
      { type: "mcq", q: "The masculine of 'hen' is:", options: ["cock", "rooster", "he-hen", "Both A and B"], a: 3, explain: "Hen (feminine) → Cock or Rooster (masculine). Both are correct!" },
      { type: "yesno", q: "Is 'actress' the feminine of 'actor'?", a: "yes", explain: "Yes! Actor (masculine) + ess = Actress (feminine)." },
      { type: "mcq", q: "The feminine of 'prince' is:", options: ["princes", "princess", "princese", "princesss"], a: 1, explain: "Prince → Princess. Add -ss (because prince already ends in -e, we add -ss)." },
      { type: "match", q: "Match the pairs:", pairs: [["father", "mother"], ["husband", "wife"], ["grandfather", "grandmother"]], explain: "These are family pairs. Father-mother, husband-wife, grandfather-grandmother." },
      { type: "mcq", q: "Which word can be used for BOTH he and she?", options: ["king", "doctor", "sister", "uncle"], a: 1, explain: "'Doctor' can be male or female! Some job words work for both genders." },
    ]
  },
  {
    id: 7, title: "Pronouns (We, You, He, She, It, They)", icon: "👈", color: C.purple,
    tip: "**Pronouns** are words used instead of naming words (nouns) to avoid repeating the same name.\n\n**Quick guide:**\n• I = when talking about yourself\n• He = a boy/man, She = a girl/woman\n• It = an animal or thing\n• We = yourself + others, They = other people/things\n• You = the person you're talking to\n\n**Daily practice:** Read a paragraph and spot where a name is repeated. Replace the second one with a pronoun.\n\n**Common mistake:** Using 'he' for a girl or 'she' for a boy. Practice with family members!",
    exercises: [
      { type: "mcq", q: "Riya is my friend. ___ is very kind.", options: ["He", "She", "It", "They"], a: 1, explain: "Riya is a girl's name, so we use 'She'. She is very kind." },
      { type: "mcq", q: "The book is on the table. ___ is red.", options: ["He", "She", "It", "They"], a: 2, explain: "A book is a thing, so we use 'It'. It is red." },
      { type: "mcq", q: "Ram and Shyam are brothers. ___ play together.", options: ["He", "She", "It", "They"], a: 3, explain: "Ram AND Shyam = two people, so we use 'They'. They play together." },
      { type: "mcq", q: "My father is a teacher. ___ teaches science.", options: ["He", "She", "It", "They"], a: 0, explain: "Father is a man, so we use 'He'. He teaches science." },
      { type: "mcq", q: "I have a dog. ___ is very playful.", options: ["He", "She", "It", "They"], a: 2, explain: "For animals (when we don't know or specify gender), we use 'It'. It is very playful." },
      { type: "mcq", q: "Meera and I went to the park. ___ had fun.", options: ["I", "She", "We", "They"], a: 2, explain: "Meera and I = me + another person = 'We'. We had fun." },
      { type: "mcq", q: "___ am a student.", options: ["I", "He", "She", "You"], a: 0, explain: "When talking about yourself, always use 'I'. I am a student." },
      { type: "mcq", q: "The stars are bright. ___ twinkle at night.", options: ["It", "He", "She", "They"], a: 3, explain: "Stars = many things = 'They'. They twinkle at night." },
    ]
  },
  {
    id: 8, title: "Articles (A, An, The)", icon: "📰", color: C.teal,
    tip: "**A** = before words starting with consonant SOUNDS (a cat, a dog, a university)\n**An** = before words starting with vowel SOUNDS (an apple, an egg, an hour)\n**The** = for something specific or already mentioned\n\n**The SOUND trick:** It's about the SOUND, not the letter!\n• 'Hour' starts with 'h' but sounds like 'our' → AN hour\n• 'University' starts with 'u' but sounds like 'yoo' → A university\n\n**Daily practice:** Point at things: 'A table, AN orange, THE sun (only one!)'",
    exercises: [
      { type: "mcq", q: "___ apple a day keeps the doctor away.", options: ["A", "An", "The"], a: 1, explain: "Apple starts with the vowel sound 'a' → AN apple." },
      { type: "mcq", q: "I saw ___ elephant at the zoo.", options: ["a", "an", "the"], a: 1, explain: "Elephant starts with vowel sound 'e' → AN elephant." },
      { type: "mcq", q: "She is ___ good girl.", options: ["a", "an", "the"], a: 0, explain: "Good starts with consonant sound 'g' → A good girl." },
      { type: "mcq", q: "___ sun rises in the east.", options: ["A", "An", "The"], a: 2, explain: "There is only ONE sun — when something is unique or specific, we use 'The'. THE sun." },
      { type: "mcq", q: "He ate ___ orange.", options: ["a", "an", "the"], a: 1, explain: "Orange starts with vowel sound 'o' → AN orange." },
      { type: "mcq", q: "I read ___ book yesterday.", options: ["a", "an", "the"], a: 0, explain: "Book starts with consonant sound 'b' → A book." },
      { type: "yesno", q: "Is 'an umbrella' correct?", a: "yes", explain: "Yes! Umbrella starts with vowel sound 'u' (uh-mbrella) → AN umbrella. ✓" },
      { type: "mcq", q: "___ moon is beautiful tonight.", options: ["A", "An", "The"], a: 2, explain: "There is only ONE moon — unique things use 'The'. THE moon." },
    ]
  },
  {
    id: 9, title: "Describing Words (Adjectives)", icon: "🌈", color: C.orange,
    tip: "**Describing words (Adjectives)** tell us more about a naming word — how it looks, feels, sounds, or how many.\n\n**Types:**\n• Size: big, small, tall, short\n• Color: red, blue, green\n• Shape: round, square, long\n• Feel: soft, hard, smooth, rough\n• Number: one, two, many, few\n• Quality: beautiful, clever, kind, old\n\n**Daily practice:** Pick any object — child says 3 describing words for it. ('This ball is round, red, and big!')\n\n**Fun game:** Describe something without naming it. Others guess what it is!",
    exercises: [
      { type: "mcq", q: "Find the describing word: 'The tall boy runs fast.'", options: ["The", "tall", "boy", "runs"], a: 1, explain: "'Tall' describes the boy — it tells us about his height. It's an adjective!" },
      { type: "mcq", q: "Which is a describing word?", options: ["run", "beautiful", "table", "she"], a: 1, explain: "'Beautiful' describes how something looks. It's an adjective!" },
      { type: "mcq", q: "Fill in: 'The ___ sun is shining.' (which describes the sun?)", options: ["bright", "quickly", "running", "and"], a: 0, explain: "'Bright' describes the sun — how it looks. The bright sun is shining." },
      { type: "mcq", q: "How many describing words in: 'The small, white cat sat on the old mat.'?", options: ["1", "2", "3", "4"], a: 2, explain: "Small (size), white (color), old (age) — three describing words!" },
      { type: "yesno", q: "Is 'quickly' a describing word for a noun?", a: "no", explain: "'Quickly' describes HOW someone does something (a verb), not a noun. 'Quick' would be the adjective." },
      { type: "mcq", q: "Choose the best describing word: 'The ___ ice cream melted.'", options: ["cold", "run", "she", "under"], a: 0, explain: "'Cold' describes the ice cream. Cold is an adjective (how it feels)." },
      { type: "mcq", q: "Which sentence has a describing word?", options: ["The cat sat.", "She runs fast.", "I ate a sweet mango.", "They play."], a: 2, explain: "'Sweet' describes the mango — what it tastes like. That's an adjective!" },
      { type: "mcq", q: "'The lazy fox slept all day.' The describing word is:", options: ["fox", "lazy", "slept", "day"], a: 1, explain: "'Lazy' describes the fox — what kind of fox. Adjective!" },
    ]
  },
  {
    id: 10, title: "Comparisons (-er, -est)", icon: "📏", color: C.pink,
    tip: "We compare things using adjectives:\n• **Two things:** add -er (tall → taller)\n• **Three or more:** add -est (tall → tallest)\n\n**Rules:**\n• Short words: add -er/-est (small→smaller→smallest)\n• Words ending in 'e': add -r/-st (large→larger→largest)\n• Words ending in 'y': change y to i, add -er/-est (happy→happier→happiest)\n• Double last letter: big→bigger→biggest, hot→hotter→hottest\n\n**Daily practice:** Compare 3 family members: 'Papa is tall. Mummy is taller. Dadu is the tallest!'",
    exercises: [
      { type: "mcq", q: "Ram is ___ than Shyam. (tall)", options: ["taller", "tallest", "more tall", "tall"], a: 0, explain: "Comparing TWO people = use -er. Ram is TALLER than Shyam." },
      { type: "mcq", q: "Mt. Everest is the ___ mountain. (high)", options: ["higher", "highest", "more high", "high"], a: 1, explain: "The MOST of all = use -est. Mt. Everest is the HIGHEST mountain." },
      { type: "mcq", q: "This book is ___ than that one. (big)", options: ["biger", "bigger", "biggest", "more big"], a: 1, explain: "Big → double the 'g' → bigger. (Short words with one vowel + one consonant double the last letter)" },
      { type: "mcq", q: "She is the ___ girl in class. (happy)", options: ["happyer", "happiest", "most happy", "happier"], a: 1, explain: "Happy → change y to i → happiest. (The most happy of ALL in class)" },
      { type: "mcq", q: "An elephant is ___ than a dog. (heavy)", options: ["heavier", "heaviest", "more heavy", "heavyer"], a: 0, explain: "Heavy → change y to i → heavier. Comparing two animals = -er form." },
      { type: "mcq", q: "Today is ___ than yesterday. (cold)", options: ["colder", "coldest", "more cold", "cold"], a: 0, explain: "Comparing two days = -er. Today is COLDER than yesterday." },
      { type: "yesno", q: "Is 'gooder' the correct form of 'good'?", a: "no", explain: "'Good' is special! Good → Better → Best. Not gooder/goodest!" },
      { type: "mcq", q: "The cheetah is the ___ animal. (fast)", options: ["faster", "fastest", "most fast", "more fast"], a: 1, explain: "The MOST of all animals = -est. The cheetah is the FASTEST animal." },
    ]
  },
  {
    id: 11, title: "Doing Words (Verbs)", icon: "🏃", color: C.blue,
    tip: "**Doing words (Verbs)** tell us what someone or something DOES.\n• Action verbs: run, eat, jump, write, play, sleep, read\n• Being verbs: is, am, are, was, were\n\n**How to improve:** If you can ACT it out, it's a doing word! Jump, clap, smile — these are all verbs.\n\n**Daily practice:** Play 'Verb Charades' — act out a verb, others guess it!\n\n**Fun trick:** Ask 'Can I ___?' If it makes sense (Can I run? Can I eat?), it's probably a verb!",
    exercises: [
      { type: "mcq", q: "Find the doing word: 'The boy eats an apple.'", options: ["boy", "eats", "apple", "The"], a: 1, explain: "'Eats' is the doing word — it tells what the boy DOES." },
      { type: "mcq", q: "Which is a doing word?", options: ["beautiful", "table", "singing", "blue"], a: 2, explain: "'Singing' is something you DO — it's a verb! Can I sing? Yes!" },
      { type: "yesno", q: "Is 'sleeps' a doing word?", a: "yes", explain: "Yes! Sleeping is something you DO (even though you're not moving much). It's a verb!" },
      { type: "mcq", q: "How many doing words: 'She runs and jumps every day.'?", options: ["1", "2", "3", "0"], a: 1, explain: "Runs and jumps — two doing words! Both are actions she does." },
      { type: "mcq", q: "Choose the doing word: 'The bird flies high.'", options: ["bird", "flies", "high", "The"], a: 1, explain: "'Flies' is what the bird does = doing word/verb." },
      { type: "yesno", q: "Is 'happy' a doing word?", a: "no", explain: "'Happy' is a describing word (adjective), not a doing word. You can't DO happy!" },
      { type: "mcq", q: "Fill in the doing word: 'The dog ___ loudly.'", options: ["big", "barks", "brown", "the"], a: 1, explain: "'Barks' is what the dog does — it's the verb/doing word." },
      { type: "mcq", q: "Which group has ALL doing words?", options: ["run, blue, cat", "eat, sleep, drink", "big, tall, fast", "he, she, they"], a: 1, explain: "Eat, sleep, drink — all things you can DO! All verbs." },
    ]
  },
  {
    id: 12, title: "Am, Is, Are", icon: "✅", color: C.green,
    tip: "**Am, Is, Are** are 'being' verbs (present tense).\n\n**Rules — learn this by heart:**\n• I → AM ('I am happy')\n• He/She/It → IS ('She is tall')\n• You/We/They → ARE ('They are playing')\n\n**Memory chant:** 'I AM, You ARE, He IS, She IS, It IS, We ARE, They ARE!'\n\n**Daily practice:** Describe family: 'I am hungry. Papa is tired. We are happy.'\n\n**Common mistake:** 'He are' or 'They is' — always check: He=IS, They=ARE.",
    exercises: [
      { type: "mcq", q: "I ___ a good student.", options: ["am", "is", "are"], a: 0, explain: "I → AM. Always! 'I am a good student.'" },
      { type: "mcq", q: "She ___ my best friend.", options: ["am", "is", "are"], a: 1, explain: "She → IS. 'She is my best friend.'" },
      { type: "mcq", q: "They ___ playing in the park.", options: ["am", "is", "are"], a: 2, explain: "They → ARE. 'They are playing in the park.'" },
      { type: "mcq", q: "The cat ___ sleeping.", options: ["am", "is", "are"], a: 1, explain: "The cat = It → IS. 'The cat is sleeping.'" },
      { type: "mcq", q: "We ___ going to school.", options: ["am", "is", "are"], a: 2, explain: "We → ARE. 'We are going to school.'" },
      { type: "mcq", q: "Rahul ___ my brother.", options: ["am", "is", "are"], a: 1, explain: "Rahul = He → IS. 'Rahul is my brother.'" },
      { type: "mcq", q: "The flowers ___ beautiful.", options: ["am", "is", "are"], a: 2, explain: "Flowers = They (many) → ARE. 'The flowers are beautiful.'" },
      { type: "mcq", q: "You ___ very smart!", options: ["am", "is", "are"], a: 2, explain: "You → ARE. 'You are very smart!'" },
    ]
  },
  {
    id: 13, title: "Was, Were", icon: "⏪", color: C.purple,
    tip: "**Was/Were** = past tense of am/is/are (things that already happened).\n\n**Rules:**\n• I → WAS, He/She/It → WAS\n• You/We/They → WERE\n\n**Simple trick:** If IS changes to WAS, and ARE changes to WERE.\n• 'She IS happy' (now) → 'She WAS happy' (yesterday)\n• 'They ARE here' (now) → 'They WERE here' (yesterday)\n\n**Daily practice:** Talk about yesterday: 'Yesterday I WAS at school. My friends WERE there too.'",
    exercises: [
      { type: "mcq", q: "I ___ at the park yesterday.", options: ["was", "were", "am"], a: 0, explain: "I → WAS (past tense). 'I was at the park yesterday.'" },
      { type: "mcq", q: "They ___ very happy.", options: ["was", "were", "is"], a: 1, explain: "They → WERE. 'They were very happy.'" },
      { type: "mcq", q: "She ___ a little girl then.", options: ["was", "were", "are"], a: 0, explain: "She → WAS. 'She was a little girl then.'" },
      { type: "mcq", q: "The boys ___ playing cricket.", options: ["was", "were", "is"], a: 1, explain: "The boys = They → WERE. 'The boys were playing cricket.'" },
      { type: "mcq", q: "It ___ a rainy day.", options: ["was", "were", "are"], a: 0, explain: "It → WAS. 'It was a rainy day.'" },
      { type: "mcq", q: "We ___ in Class 1 last year.", options: ["was", "were", "am"], a: 1, explain: "We → WERE. 'We were in Class 1 last year.'" },
      { type: "yesno", q: "Is 'You was late' correct?", a: "no", explain: "No! You → WERE (not was). Correct: 'You were late.'" },
      { type: "mcq", q: "The dog ___ barking last night.", options: ["was", "were", "is"], a: 0, explain: "The dog = It → WAS. 'The dog was barking last night.'" },
    ]
  },
  {
    id: 14, title: "Has, Have", icon: "🎒", color: C.teal,
    tip: "**Has/Have** show possession (owning something) or something completed.\n\n**Rules:**\n• He/She/It → HAS ('She has a doll')\n• I/You/We/They → HAVE ('I have a book')\n\n**Memory trick:** 'He HAS, She HAS, It HAS — everyone else HAVE!'\n\n**Daily practice:** Describe what everyone has: 'I have a pencil. She has a red bag. They have two dogs.'\n\n**Common mistake:** 'He have' → WRONG! Always 'He HAS.'",
    exercises: [
      { type: "mcq", q: "She ___ a beautiful dress.", options: ["has", "have", "had"], a: 0, explain: "She → HAS. 'She has a beautiful dress.'" },
      { type: "mcq", q: "I ___ two brothers.", options: ["has", "have", "had"], a: 1, explain: "I → HAVE. 'I have two brothers.'" },
      { type: "mcq", q: "They ___ a big house.", options: ["has", "have", "had"], a: 1, explain: "They → HAVE. 'They have a big house.'" },
      { type: "mcq", q: "The bird ___ colourful feathers.", options: ["has", "have", "had"], a: 0, explain: "The bird = It → HAS. 'The bird has colourful feathers.'" },
      { type: "mcq", q: "We ___ a holiday tomorrow.", options: ["has", "have", "had"], a: 1, explain: "We → HAVE. 'We have a holiday tomorrow.'" },
      { type: "mcq", q: "Rahul ___ a new bicycle.", options: ["has", "have", "had"], a: 0, explain: "Rahul = He → HAS. 'Rahul has a new bicycle.'" },
      { type: "yesno", q: "Is 'He have a pen' correct?", a: "no", explain: "No! He → HAS. Correct: 'He has a pen.'" },
      { type: "mcq", q: "You ___ pretty eyes.", options: ["has", "have", "had"], a: 1, explain: "You → HAVE. 'You have pretty eyes.'" },
    ]
  },
  {
    id: 15, title: "Do, Does, Go, Goes", icon: "🚶", color: C.orange,
    tip: "**Do/Does** and **Go/Goes** follow the same pattern:\n\n• I/You/We/They → DO, GO\n• He/She/It → DOES, GOES\n\n**Memory trick:** He/She/It gets the 'S' sound — DOES, GOES.\n\n**Daily practice:** 'I go to school. She goes to school. We do homework. He does homework.'\n\n**Fun chant:** 'I DO, you DO, we DO, they DO — but he DOES and she DOES too!'",
    exercises: [
      { type: "mcq", q: "She ___ to school by bus.", options: ["go", "goes", "going"], a: 1, explain: "She → GOES. 'She goes to school by bus.'" },
      { type: "mcq", q: "They ___ their homework daily.", options: ["do", "does", "did"], a: 0, explain: "They → DO. 'They do their homework daily.'" },
      { type: "mcq", q: "He ___ to the park every evening.", options: ["go", "goes", "going"], a: 1, explain: "He → GOES. 'He goes to the park every evening.'" },
      { type: "mcq", q: "I ___ not like cold coffee.", options: ["do", "does", "did"], a: 0, explain: "I → DO. 'I do not like cold coffee.'" },
      { type: "mcq", q: "The train ___ fast.", options: ["go", "goes", "going"], a: 1, explain: "The train = It → GOES. 'The train goes fast.'" },
      { type: "mcq", q: "We ___ to the temple on Tuesdays.", options: ["go", "goes", "going"], a: 0, explain: "We → GO. 'We go to the temple on Tuesdays.'" },
      { type: "yesno", q: "Is 'She do her work' correct?", a: "no", explain: "No! She → DOES. Correct: 'She does her work.'" },
      { type: "mcq", q: "___ Riya go to dance class?", options: ["Do", "Does", "Is"], a: 1, explain: "Riya = She → DOES. 'Does Riya go to dance class?'" },
    ]
  },
  {
    id: 16, title: "Am/Is/Are + -ing", icon: "🔄", color: C.blue,
    tip: "When something is happening RIGHT NOW, we use: am/is/are + verb + ing\n\n**Pattern:**\n• I am eating. She is reading. They are playing.\n\n**Rules for adding -ing:**\n• Most words: just add -ing (eat→eating, play→playing)\n• Words ending in 'e': drop the e, add -ing (make→making, write→writing)\n• Short words (CVC): double last letter (run→running, sit→sitting)\n\n**Daily practice:** Look around and describe: 'The fan IS spinning. I AM sitting. Birds ARE flying.'",
    exercises: [
      { type: "mcq", q: "She is ___ a book. (read)", options: ["reading", "readin", "readding", "read"], a: 0, explain: "Read + ing = reading. She is reading a book." },
      { type: "mcq", q: "They are ___ in the garden. (play)", options: ["playing", "plaing", "playying", "plays"], a: 0, explain: "Play + ing = playing. They are playing in the garden." },
      { type: "mcq", q: "The baby is ___. (sleep)", options: ["sleepping", "sleeping", "sleping", "sleep"], a: 1, explain: "Sleep + ing = sleeping. The baby is sleeping." },
      { type: "mcq", q: "I am ___ a letter. (write)", options: ["writeing", "writing", "writting", "writng"], a: 1, explain: "Write ends in 'e' → drop e, add -ing = writing!" },
      { type: "mcq", q: "He is ___ fast. (run)", options: ["runing", "running", "runing", "runnnig"], a: 1, explain: "Run → double the 'n' → running. (Short CVC word rule)" },
      { type: "mcq", q: "We are ___ our lunch. (eat)", options: ["eating", "eatting", "eatin", "eats"], a: 0, explain: "Eat + ing = eating. We are eating our lunch." },
      { type: "mcq", q: "The dog is ___ at the cat. (bark)", options: ["barking", "barkking", "barkin", "barkes"], a: 0, explain: "Bark + ing = barking. The dog is barking at the cat." },
      { type: "mcq", q: "She is ___ a cake. (make)", options: ["makeing", "making", "makking", "macking"], a: 1, explain: "Make ends in 'e' → drop e, add -ing = making!" },
    ]
  },
  {
    id: 17, title: "Position Words (Prepositions)", icon: "📦", color: C.green,
    tip: "**Position words** tell us WHERE something is.\n\n**Common ones:** in, on, under, behind, in front of, between, near, beside, above, below\n\n**How to remember:** Use a toy and a box!\n• Put the toy IN the box, ON the box, UNDER the box, BEHIND the box...\n\n**Daily practice:** 'Treasure Hunt' — 'The chocolate is UNDER the pillow, BEHIND the cushion!'\n\n**Fun game:** Give instructions using position words: 'Put your hand ON your head, BEHIND your back!'",
    exercises: [
      { type: "mcq", q: "The cat is ___ the table. (below the surface)", options: ["on", "under", "behind", "above"], a: 1, explain: "Under = below something. The cat is UNDER the table." },
      { type: "mcq", q: "The book is ___ the bag. (inside it)", options: ["on", "in", "under", "near"], a: 1, explain: "In = inside something. The book is IN the bag." },
      { type: "mcq", q: "The bird is sitting ___ the tree.", options: ["under", "on", "in", "behind"], a: 1, explain: "The bird sits ON the branch of the tree." },
      { type: "mcq", q: "She is hiding ___ the door.", options: ["on", "in", "behind", "under"], a: 2, explain: "Behind = at the back of something. She is hiding BEHIND the door." },
      { type: "mcq", q: "The lamp is ___ the table.", options: ["under", "between", "on", "in"], a: 2, explain: "On = on top of/on the surface. The lamp is ON the table." },
      { type: "mcq", q: "My house is ___ the school. (not far)", options: ["near", "under", "on", "in"], a: 0, explain: "Near = close to. My house is NEAR the school." },
      { type: "mcq", q: "The ball is ___ the two chairs.", options: ["on", "under", "between", "behind"], a: 2, explain: "Between = in the middle of two things. The ball is BETWEEN the two chairs." },
      { type: "mcq", q: "The picture is ___ the wall.", options: ["in", "on", "under", "between"], a: 1, explain: "On = attached to/on the surface of. The picture is ON the wall." },
    ]
  },
  {
    id: 18, title: "Joining Words (Conjunctions)", icon: "🔗", color: C.purple,
    tip: "**Joining words** connect two sentences or ideas.\n\n**Key words:**\n• **and** = adds information ('I like tea AND coffee')\n• **but** = shows contrast ('I like tea BUT not coffee')\n• **or** = gives a choice ('Tea OR coffee?')\n• **because** = gives a reason ('I like tea BECAUSE it's warm')\n\n**Daily practice:** At dinner, use all four: 'I want roti AND sabzi. I like roti BUT not paratha. Do you want rice OR roti? I'm eating fast BECAUSE I'm hungry.'",
    exercises: [
      { type: "mcq", q: "I like mangoes ___ oranges.", options: ["and", "but", "or", "because"], a: 0, explain: "'And' adds two things together. I like BOTH mangoes AND oranges." },
      { type: "mcq", q: "She is small ___ very brave.", options: ["and", "but", "or", "because"], a: 1, explain: "'But' shows contrast/surprise. She is small BUT (surprisingly) very brave." },
      { type: "mcq", q: "Do you want milk ___ juice?", options: ["and", "but", "or", "because"], a: 2, explain: "'Or' gives a choice between two things. Milk OR juice — pick one!" },
      { type: "mcq", q: "I took an umbrella ___ it was raining.", options: ["and", "but", "or", "because"], a: 3, explain: "'Because' gives a reason. WHY did I take an umbrella? BECAUSE it was raining." },
      { type: "mcq", q: "Ram ___ Shyam are friends.", options: ["and", "but", "or", "because"], a: 0, explain: "'And' joins two names together. Ram AND Shyam." },
      { type: "mcq", q: "Hurry up ___ you will be late!", options: ["and", "but", "or", "because"], a: 2, explain: "'Or' here shows a consequence/alternative. Hurry up OR (else) you will be late!" },
      { type: "mcq", q: "I was tired ___ I still finished my work.", options: ["and", "but", "or", "because"], a: 1, explain: "'But' shows contrast. I was tired (expected to stop) BUT I still finished (surprise!)." },
      { type: "mcq", q: "She cried ___ she lost her toy.", options: ["and", "but", "or", "because"], a: 3, explain: "'Because' gives the reason. Why did she cry? BECAUSE she lost her toy." },
    ]
  },
  {
    id: 19, title: "Statements & Questions", icon: "❓", color: C.teal,
    tip: "**Statement** = tells something. Ends with a full stop (.)\n**Question** = asks something. Ends with a question mark (?)\n\n**How to spot:**\n• Statements usually start with: I, He, She, They, The...\n• Questions usually start with: Is, Are, Do, Does, Can, Will, What, Who, Where, When, Why, How\n\n**Daily practice:** Parent says a sentence, child holds up a '.' card or '?' card!\n\n**Fun trick:** If your voice goes UP at the end, it's probably a question!",
    exercises: [
      { type: "mcq", q: "'The sun is bright' — this is a:", options: ["Statement (.)", "Question (?)"], a: 0, explain: "It tells us something about the sun. It's a statement and ends with a full stop (.)" },
      { type: "mcq", q: "'Where is my book' — this needs a:", options: ["Full stop (.)", "Question mark (?)"], a: 1, explain: "It asks something! 'Where is my book?' needs a question mark (?)." },
      { type: "mcq", q: "'Can you help me' — this is a:", options: ["Statement", "Question"], a: 1, explain: "It starts with 'Can' and asks for help. It's a question: 'Can you help me?'" },
      { type: "mcq", q: "'She likes ice cream' — this needs a:", options: ["Question mark (?)", "Full stop (.)"], a: 1, explain: "It tells us what she likes. Statement! 'She likes ice cream.'" },
      { type: "mcq", q: "'Do you have a pen' — this is a:", options: ["Statement", "Question"], a: 1, explain: "Starts with 'Do' and asks something. Question: 'Do you have a pen?'" },
      { type: "yesno", q: "Does a statement end with a question mark?", a: "no", explain: "No! Statements end with a full stop (.). Questions end with a question mark (?)." },
      { type: "mcq", q: "Which is a question?", options: ["I am hungry.", "Are you hungry?", "She is happy.", "We play daily."], a: 1, explain: "'Are you hungry?' asks something and starts with 'Are' — it's a question!" },
      { type: "mcq", q: "'Birds fly in the sky' is a:", options: ["Question", "Statement"], a: 1, explain: "It tells a fact. Statement! 'Birds fly in the sky.' (full stop)" },
    ]
  },
  {
    id: 20, title: "WH Questions", icon: "🤔", color: C.orange,
    tip: "**WH Question words** help us ask different types of questions:\n\n• **Who** = asks about a PERSON (Who is she?)\n• **What** = asks about a THING or ACTION (What is this?)\n• **Where** = asks about a PLACE (Where do you live?)\n• **When** = asks about TIME (When is your birthday?)\n• **Why** = asks for a REASON (Why are you crying?)\n• **Which** = asks for a CHOICE (Which one do you want?)\n• **How** = asks about MANNER/WAY (How do you go to school?)\n\n**Daily game:** 'Question of the Day' at dinner — child asks one WH question, family answers!",
    exercises: [
      { type: "mcq", q: "___ is your name?", options: ["Who", "What", "Where", "When"], a: 1, explain: "Name is a THING — use 'What'. 'What is your name?'" },
      { type: "mcq", q: "___ do you live?", options: ["Who", "What", "Where", "When"], a: 2, explain: "Asking about a PLACE — use 'Where'. 'Where do you live?'" },
      { type: "mcq", q: "___ is your best friend?", options: ["Who", "What", "Where", "When"], a: 0, explain: "Asking about a PERSON — use 'Who'. 'Who is your best friend?'" },
      { type: "mcq", q: "___ is your birthday?", options: ["Who", "What", "Where", "When"], a: 3, explain: "Asking about TIME — use 'When'. 'When is your birthday?'" },
      { type: "mcq", q: "___ are you sad?", options: ["Who", "What", "Why", "Where"], a: 2, explain: "Asking for a REASON — use 'Why'. 'Why are you sad?'" },
      { type: "mcq", q: "___ colour do you like — red or blue?", options: ["Who", "Which", "Where", "When"], a: 1, explain: "Choosing between options — use 'Which'. 'Which colour do you like?'" },
      { type: "mcq", q: "___ do you go to school?", options: ["Who", "What", "Where", "How"], a: 3, explain: "Asking about the WAY/METHOD — use 'How'. 'How do you go to school?' (By bus!)" },
      { type: "mcq", q: "___ is the capital of India?", options: ["Who", "What", "Where", "How"], a: 1, explain: "Asking about a THING/FACT — use 'What'. 'What is the capital of India?'" },
    ]
  },
];

// ─── COMPONENTS ───

function ChapterCard({ ch, onStart, stars }) {
  return (
    <div onClick={onStart} style={{
      padding: 14, borderRadius: 14, cursor: "pointer", transition: "all 0.2s",
      background: C.card, border: `1.5px solid ${C.border}`,
      borderLeft: `5px solid ${ch.color}`,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 28 }}>{ch.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: C.dark }}>
            Ch {ch.id}. {ch.title}
          </div>
          <div style={{ fontSize: 11, color: C.light }}>{ch.exercises.length} exercises</div>
        </div>
        <div style={{ display: "flex", gap: 2, flexShrink: 0 }}>
          {[1,2,3].map(s => (
            <span key={s} style={{ fontSize: 16, opacity: stars >= s ? 1 : 0.2 }}>⭐</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function TipView({ chapter, onBack }) {
  const sections = chapter.tip.split("\n\n");
  return (
    <div>
      <button onClick={onBack} style={{
        background: "none", border: "none", cursor: "pointer", fontSize: 13,
        color: C.purple, fontWeight: 700, marginBottom: 12, padding: 0, fontFamily: "inherit",
      }}>← Back to chapters</button>
      <div style={{
        padding: 16, borderRadius: 14, background: C.yellowBg,
        border: `1px solid #FDE68A`, marginBottom: 16,
      }}>
        <div style={{ fontSize: 20, marginBottom: 4 }}>{chapter.icon}</div>
        <h3 style={{ fontSize: 16, fontWeight: 900, color: C.dark, margin: "0 0 2px" }}>
          Tips: {chapter.title}
        </h3>
        <div style={{ fontSize: 12, color: C.mid, lineHeight: 1.8 }}>
          {sections.map((s, i) => {
            const rendered = s.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>');
            return (
              <div key={i} style={{
                marginBottom: 10, padding: i > 0 ? "8px 10px" : 0,
                background: i > 0 ? "rgba(255,255,255,0.6)" : "transparent",
                borderRadius: 8,
              }} dangerouslySetInnerHTML={{ __html: rendered }} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ExerciseView({ chapter, onBack, onComplete }) {
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [streak, setStreak] = useState(0);
  const [matchState, setMatchState] = useState({ selected: null, matched: [] });
  const [textInput, setTextInput] = useState("");

  const ex = chapter.exercises[qIndex];
  const total = chapter.exercises.length;

  const checkAnswer = (answer) => {
    setSelected(answer);
    setShowResult(true);
    let correct = false;
    if (ex.type === "mcq") correct = answer === ex.a;
    else if (ex.type === "yesno") correct = answer === ex.a;
    else if (ex.type === "unscramble") {
      correct = textInput.trim().toLowerCase().replace(/[.\s]+$/g, "") === ex.a.toLowerCase().replace(/[.\s]+$/g, "");
    }
    if (correct) {
      setScore(s => s + 1);
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }
  };

  const next = () => {
    if (qIndex + 1 >= total) {
      setFinished(true);
      onComplete(score + (showResult && selected === ex.a ? 0 : 0));
    } else {
      setQIndex(qIndex + 1);
      setSelected(null);
      setShowResult(false);
      setMatchState({ selected: null, matched: [] });
      setTextInput("");
    }
  };

  const handleMatch = (side, index) => {
    if (matchState.matched.includes(index) && side === "left") return;
    if (side === "left") {
      setMatchState({ ...matchState, selected: index });
    } else if (matchState.selected !== null) {
      if (matchState.selected === index) {
        const newMatched = [...matchState.matched, index];
        setMatchState({ selected: null, matched: newMatched });
        if (newMatched.length === ex.pairs.length) {
          setScore(s => s + 1);
          setStreak(s => s + 1);
          setShowResult(true);
        }
      } else {
        setMatchState({ ...matchState, selected: null });
        setStreak(0);
      }
    }
  };

  if (finished) {
    const stars = score >= total * 0.9 ? 3 : score >= total * 0.6 ? 2 : score >= total * 0.3 ? 1 : 0;
    const messages = [
      "Keep practicing! You'll get better! 💪",
      "Good effort! Practice the tips and try again! 🌟",
      "Great job! You're learning well! 🎉",
      "AMAZING! You're a grammar star! 🏆",
    ];
    return (
      <div style={{ textAlign: "center", padding: 20 }}>
        <div style={{ fontSize: 60, marginBottom: 8 }}>{stars >= 3 ? "🏆" : stars >= 2 ? "🎉" : "💪"}</div>
        <h3 style={{ fontSize: 20, fontWeight: 900, color: C.dark, margin: "0 0 4px" }}>
          {messages[stars]}
        </h3>
        <div style={{ fontSize: 28, margin: "8px 0" }}>
          {[1,2,3].map(s => <span key={s} style={{ opacity: stars >= s ? 1 : 0.2 }}>⭐</span>)}
        </div>
        <div style={{ fontSize: 15, color: C.mid, marginBottom: 16 }}>
          Score: <strong style={{ color: C.green }}>{score}</strong> / {total}
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={onBack} style={{
            padding: "10px 20px", borderRadius: 10, border: "none", cursor: "pointer",
            fontWeight: 700, fontSize: 13, background: C.purple, color: "#FFF", fontFamily: "inherit",
          }}>Back to Chapters</button>
          <button onClick={() => { setQIndex(0); setScore(0); setFinished(false); setSelected(null); setShowResult(false); setStreak(0); setTextInput(""); }} style={{
            padding: "10px 20px", borderRadius: 10, border: `2px solid ${C.purple}`, cursor: "pointer",
            fontWeight: 700, fontSize: 13, background: "transparent", color: C.purple, fontFamily: "inherit",
          }}>Try Again</button>
        </div>
      </div>
    );
  }

  const isCorrect = ex.type === "mcq" ? selected === ex.a :
    ex.type === "yesno" ? selected === ex.a :
    ex.type === "unscramble" ? textInput.trim().toLowerCase().replace(/[.\s]+$/g, "") === ex.a.toLowerCase().replace(/[.\s]+$/g, "") :
    ex.type === "match" ? matchState.matched.length === ex.pairs?.length : false;

  return (
    <div>
      <button onClick={onBack} style={{
        background: "none", border: "none", cursor: "pointer", fontSize: 13,
        color: C.purple, fontWeight: 700, marginBottom: 8, padding: 0, fontFamily: "inherit",
      }}>← Back</button>

      {/* Progress bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <div style={{ flex: 1, height: 6, background: "#F1F5F9", borderRadius: 6, overflow: "hidden" }}>
          <div style={{
            height: "100%", borderRadius: 6, transition: "width 0.3s",
            width: `${((qIndex + 1) / total) * 100}%`, background: C.teal,
          }} />
        </div>
        <span style={{ fontSize: 11, fontWeight: 700, color: C.mid }}>{qIndex + 1}/{total}</span>
        {streak >= 2 && <span style={{ fontSize: 12, fontWeight: 800, color: C.gold }}>🔥{streak}</span>}
      </div>

      {/* Question */}
      <div style={{
        padding: 16, borderRadius: 14, marginBottom: 12,
        background: C.purpleBg, border: `1px solid #C4B5FD`,
      }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.purple, marginBottom: 4, textTransform: "uppercase" }}>
          {ex.type === "mcq" ? "Choose the correct answer" : ex.type === "yesno" ? "Yes or No?" : ex.type === "unscramble" ? "Unscramble the words" : "Match the pairs"}
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.dark, lineHeight: 1.6 }}>{ex.q}</div>
      </div>

      {/* Answer area */}
      {ex.type === "mcq" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {ex.options.map((opt, i) => {
            let bg = C.card, border = C.border, tc = C.dark;
            if (showResult) {
              if (i === ex.a) { bg = C.greenBg; border = C.green; tc = C.green; }
              else if (i === selected && i !== ex.a) { bg = C.redBg; border = C.red; tc = C.red; }
            } else if (selected === i) { bg = C.blueBg; border = C.blue; }
            return (
              <button key={i} onClick={() => !showResult && checkAnswer(i)} disabled={showResult} style={{
                padding: "10px 14px", borderRadius: 10, cursor: showResult ? "default" : "pointer",
                border: `2px solid ${border}`, background: bg, fontSize: 13,
                fontWeight: 700, color: tc, textAlign: "left", fontFamily: "inherit",
                transition: "all 0.15s",
              }}>
                {String.fromCharCode(65 + i)}. {opt}
                {showResult && i === ex.a && " ✓"}
                {showResult && i === selected && i !== ex.a && " ✗"}
              </button>
            );
          })}
        </div>
      )}

      {ex.type === "yesno" && (
        <div style={{ display: "flex", gap: 10 }}>
          {["yes", "no"].map(opt => {
            let bg = C.card, border = C.border, tc = C.dark;
            if (showResult) {
              if (opt === ex.a) { bg = C.greenBg; border = C.green; tc = C.green; }
              else if (opt === selected && opt !== ex.a) { bg = C.redBg; border = C.red; tc = C.red; }
            } else if (selected === opt) { bg = C.blueBg; border = C.blue; }
            return (
              <button key={opt} onClick={() => !showResult && checkAnswer(opt)} disabled={showResult} style={{
                flex: 1, padding: "12px", borderRadius: 12, cursor: showResult ? "default" : "pointer",
                border: `2px solid ${border}`, background: bg, fontSize: 16,
                fontWeight: 800, color: tc, fontFamily: "inherit",
              }}>
                {opt === "yes" ? "👍 Yes" : "👎 No"}
              </button>
            );
          })}
        </div>
      )}

      {ex.type === "unscramble" && (
        <div>
          <input value={textInput} onChange={e => setTextInput(e.target.value)} disabled={showResult}
            placeholder="Type the sentence here..."
            style={{
              width: "100%", padding: "12px 14px", borderRadius: 10, fontSize: 14,
              border: `2px solid ${showResult ? (isCorrect ? C.green : C.red) : C.border}`,
              outline: "none", fontFamily: "inherit", boxSizing: "border-box",
              background: showResult ? (isCorrect ? C.greenBg : C.redBg) : C.card,
            }} />
          {!showResult && (
            <button onClick={() => checkAnswer(textInput)} style={{
              marginTop: 8, padding: "10px 24px", borderRadius: 10, border: "none",
              cursor: "pointer", fontWeight: 700, fontSize: 13, background: C.teal,
              color: "#FFF", fontFamily: "inherit",
            }}>Check Answer</button>
          )}
          {showResult && !isCorrect && (
            <div style={{ fontSize: 12, color: C.green, marginTop: 6, fontWeight: 700 }}>
              Correct answer: {ex.a}
            </div>
          )}
        </div>
      )}

      {ex.type === "match" && (
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {ex.pairs.map((pair, i) => {
              const isMatched = matchState.matched.includes(i);
              const isSelected = matchState.selected === i;
              return (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <button onClick={() => handleMatch("left", i)} disabled={isMatched || showResult} style={{
                    flex: 1, padding: "8px 12px", borderRadius: 8, border: `2px solid ${isMatched ? C.green : isSelected ? C.blue : C.border}`,
                    background: isMatched ? C.greenBg : isSelected ? C.blueBg : C.card,
                    fontSize: 12, fontWeight: 700, color: C.dark, cursor: isMatched ? "default" : "pointer", fontFamily: "inherit",
                  }}>{pair[0]} {isMatched && "✓"}</button>
                  <span style={{ color: C.light }}>→</span>
                  <button onClick={() => handleMatch("right", i)} disabled={isMatched || showResult} style={{
                    flex: 1, padding: "8px 12px", borderRadius: 8, border: `2px solid ${isMatched ? C.green : C.border}`,
                    background: isMatched ? C.greenBg : C.card,
                    fontSize: 12, fontWeight: 700, color: C.dark, cursor: isMatched ? "default" : "pointer", fontFamily: "inherit",
                  }}>{pair[1]} {isMatched && "✓"}</button>
                </div>
              );
            })}
          </div>
          {!showResult && <p style={{ fontSize: 11, color: C.light, marginTop: 6 }}>Tap a left item, then tap its matching right item</p>}
        </div>
      )}

      {/* Explanation */}
      {showResult && (
        <div style={{
          marginTop: 12, padding: 14, borderRadius: 12,
          background: isCorrect ? C.greenBg : C.orangeBg,
          border: `1px solid ${isCorrect ? "#A7F3D0" : "#FED7AA"}`,
        }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: isCorrect ? C.green : C.orange, marginBottom: 4 }}>
            {isCorrect ? "🎉 Correct!" : "💡 Let's learn!"}
          </div>
          <div style={{ fontSize: 12, color: C.dark, lineHeight: 1.6 }}>{ex.explain}</div>
        </div>
      )}

      {/* Next button */}
      {showResult && (
        <button onClick={next} style={{
          marginTop: 12, width: "100%", padding: "12px", borderRadius: 12,
          border: "none", cursor: "pointer", fontWeight: 800, fontSize: 14,
          background: C.purple, color: "#FFF", fontFamily: "inherit",
        }}>
          {qIndex + 1 >= total ? "See Results →" : "Next Question →"}
        </button>
      )}
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("home");
  const [selectedCh, setSelectedCh] = useState(null);
  const [chapterStars, setChapterStars] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get("grammar-stars");
        if (res?.value) setChapterStars(JSON.parse(res.value));
      } catch (e) {}
    })();
  }, []);

  const saveStars = async (chId, score, total) => {
    const stars = score >= total * 0.9 ? 3 : score >= total * 0.6 ? 2 : score >= total * 0.3 ? 1 : 0;
    const prev = chapterStars[chId] || 0;
    if (stars > prev) {
      const next = { ...chapterStars, [chId]: stars };
      setChapterStars(next);
      try { await window.storage.set("grammar-stars", JSON.stringify(next)); } catch (e) {}
    }
  };

  const totalStars = Object.values(chapterStars).reduce((a, b) => a + b, 0);
  const maxStars = CHAPTERS.length * 3;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Nunito', 'Segoe UI', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "16px 14px" }}>

        {view === "home" && (
          <>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 36 }}>🎓</div>
              <h1 style={{ fontSize: 20, fontWeight: 900, color: C.dark, margin: "4px 0 2px" }}>
                Grammar Fun Zone
              </h1>
              <p style={{ fontSize: 12, color: C.mid, margin: "0 0 8px" }}>
                Interactive exercises for all 20 chapters • Learn with fun!
              </p>
              <div style={{
                display: "inline-block", padding: "6px 16px", borderRadius: 20,
                background: C.yellowBg, border: "1px solid #FDE68A",
                fontSize: 13, fontWeight: 800, color: C.yellow,
              }}>
                ⭐ {totalStars} / {maxStars} Stars Collected
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {CHAPTERS.map(ch => (
                <div key={ch.id}>
                  <ChapterCard
                    ch={ch}
                    stars={chapterStars[ch.id] || 0}
                    onStart={() => { setSelectedCh(ch); setView("choose"); }}
                  />
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 16, padding: 14, borderRadius: 14, textAlign: "center",
              background: C.purpleBg, border: `1px solid #C4B5FD`,
              fontSize: 12, color: "#5B21B6", lineHeight: 1.6,
            }}>
              <strong>Chapters 21-25</strong> (Had, Vocabulary, Comprehension, Composition) are skill-based chapters best practiced with actual reading and writing exercises. Ask me anytime to create worksheets for those!
            </div>
          </>
        )}

        {view === "choose" && selectedCh && (
          <div>
            <button onClick={() => setView("home")} style={{
              background: "none", border: "none", cursor: "pointer", fontSize: 13,
              color: C.purple, fontWeight: 700, marginBottom: 12, padding: 0, fontFamily: "inherit",
            }}>← All Chapters</button>

            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 40 }}>{selectedCh.icon}</div>
              <h2 style={{ fontSize: 18, fontWeight: 900, color: C.dark, margin: "4px 0" }}>
                Ch {selectedCh.id}: {selectedCh.title}
              </h2>
              <div style={{ display: "flex", gap: 2, justifyContent: "center", margin: "4px 0 12px" }}>
                {[1,2,3].map(s => <span key={s} style={{ fontSize: 20, opacity: (chapterStars[selectedCh.id] || 0) >= s ? 1 : 0.2 }}>⭐</span>)}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button onClick={() => setView("tips")} style={{
                padding: 16, borderRadius: 14, border: `2px solid ${C.yellow}`, cursor: "pointer",
                background: C.yellowBg, fontSize: 14, fontWeight: 800, color: C.yellow,
                fontFamily: "inherit", textAlign: "left",
              }}>
                💡 Read Tips & How to Improve<br/>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#92400E" }}>Understand the concept + parent tips + daily practice ideas</span>
              </button>

              <button onClick={() => setView("exercise")} style={{
                padding: 16, borderRadius: 14, border: `2px solid ${C.purple}`, cursor: "pointer",
                background: C.purpleBg, fontSize: 14, fontWeight: 800, color: C.purple,
                fontFamily: "inherit", textAlign: "left",
              }}>
                🎮 Start Exercises ({selectedCh.exercises.length} questions)<br/>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#5B21B6" }}>Interactive quiz with explanations • Earn up to 3 stars!</span>
              </button>
            </div>
          </div>
        )}

        {view === "tips" && selectedCh && (
          <TipView chapter={selectedCh} onBack={() => setView("choose")} />
        )}

        {view === "exercise" && selectedCh && (
          <ExerciseView
            chapter={selectedCh}
            onBack={() => setView("choose")}
            onComplete={(score) => {
              saveStars(selectedCh.id, score, selectedCh.exercises.length);
            }}
          />
        )}
      </div>
    </div>
  );
}
