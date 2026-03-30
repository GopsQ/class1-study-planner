import { useState, useEffect } from "react";

const COLORS = {
  bg: "#FFFBF5",
  card: "#FFFFFF",
  dark: "#1E293B",
  mid: "#64748B",
  light: "#94A3B8",
  border: "#E2E8F0",
  purple: "#7C3AED",
  purpleBg: "#EDE9FE",
  teal: "#0D9488",
  tealBg: "#CCFBF1",
  orange: "#EA580C",
  orangeBg: "#FFF7ED",
  red: "#DC2626",
  redBg: "#FEF2F2",
  blue: "#2563EB",
  blueBg: "#EFF6FF",
  green: "#059669",
  greenBg: "#ECFDF5",
  yellow: "#D97706",
  yellowBg: "#FFFBEB",
  pink: "#DB2777",
  pinkBg: "#FDF2F8",
};

const WEEKS = [
  // TERM 1: Weeks 1-13 (Ch 1-11 + 2 revision weeks)
  { week: 1, chapter: 1, title: "The Sentence", focus: "What is a sentence, capital letter, full stop", activities: "Tick/cross complete sentences, unjumble words", homework: "Ex 1: Tick complete sentences\nEx 2: Unjumble words into sentences", parentTip: "Use fridge magnets to make silly sentences together!", term: 1, type: "learn" },
  { week: 2, chapter: 2, title: "Two Parts of a Sentence", focus: "Subject (naming part) and predicate (doing part)", activities: "Divide sentences into two parts, match subject-predicate", homework: "Ex 1: Divide sentences into (a) and (b) parts\nPicture-based sentence making", parentTip: "Play 'Who did what?' — you say a name, child adds what they did.", term: 1, type: "learn" },
  { week: 3, chapter: 3, title: "Naming Words", focus: "Nouns — names of people, animals, places, things", activities: "Circle naming words, sort into categories", homework: "Identify nouns in sentences\nDraw & label 5 things in your room", parentTip: "Go on a 'noun hunt' — point at things, child names them!", term: 1, type: "learn" },
  { week: 4, chapter: 4, title: "Common Names and Special Names", focus: "Common nouns vs proper nouns, capital letters for special names", activities: "Sort words into common/special, add capital letters", homework: "Underline common nouns, circle proper nouns\nWrite 5 special names (people, cities)", parentTip: "Ask: 'Is your name a common name or special name? What about dog vs Tommy?'", term: 1, type: "learn" },
  { week: 5, chapter: 5, title: "One and Many", focus: "Singular and plural — adding s, es, ies", activities: "Write plurals, match one-many pairs", homework: "Write plurals of given words\nDraw one vs many (1 cat / 3 cats)", parentTip: "At meals: 'one roti or two rotis?' — make plurals part of daily talk.", term: 1, type: "learn" },
  { week: 6, chapter: 6, title: "He or She", focus: "Gender — masculine and feminine words", activities: "Match he/she pairs (boy-girl, king-queen)", homework: "Write he or she for each word\nMatch masculine-feminine pairs", parentTip: "Use family members as examples: papa=he, mummy=she, dadi=she.", term: 1, type: "learn" },
  { week: 7, title: "Revision Week (Ch 1-6)", focus: "Revise sentences, nouns, plurals, gender", activities: "Mixed quiz, flashcard game, fun worksheet", homework: "Revision Test-I practice from book\nParent-led oral quiz (make it a game!)", parentTip: "No pressure — treat this as a fun game week. Star chart rewards!", term: 1, type: "revision" },
  { week: 8, chapter: 7, title: "We, You, He, She, It, They", focus: "Pronouns — replacing naming words", activities: "Replace nouns with pronouns in sentences", homework: "Fill in correct pronoun\nRewrite sentences replacing names with he/she/they", parentTip: "Tell a story together — every time you say a name twice, child shouts the pronoun!", term: 1, type: "learn" },
  { week: 9, chapter: 8, title: "I, We, You, He, She, It, They", focus: "More pronoun practice, using 'I' correctly", activities: "Choose correct pronoun, fill in blanks", homework: "Fill blanks with I/we/you/he/she/it/they\nWrite 3 sentences about yourself using 'I'", parentTip: "Play 'pronoun swap' — read a paragraph, child claps when they hear a pronoun.", term: 1, type: "learn" },
  { week: 10, chapter: 9, title: "Me, Us, You, Him, Her, It, Them", focus: "Object pronouns — me, us, him, her, them", activities: "Fill correct object pronoun, rewrite sentences", homework: "Choose him/her/them/us in sentences\nOral practice: 'Give it to ___'", parentTip: "During play: 'Pass the ball to ___' (him/her/them) — real-life pronoun practice!", term: 1, type: "learn" },
  { week: 11, chapter: 10, title: "A, An, The", focus: "Articles — when to use a, an, the", activities: "Fill a/an/the, sort words by vowel sound", homework: "Fill blanks with a, an, or the\nList 5 'an' words and 5 'a' words", parentTip: "Trick: if the word starts with a,e,i,o,u SOUND → use 'an'. Make a song out of it!", term: 1, type: "learn" },
  { week: 12, chapter: 11, title: "Describing Words", focus: "Adjectives — words that describe nouns", activities: "Add describing words, match adjective to noun", homework: "Underline describing words\nDescribe 5 things (big ball, red flower, tall tree)", parentTip: "Game: Hold up any object and child says 3 describing words. Gets silly and fun!", term: 1, type: "learn" },
  { week: 13, title: "Term 1 Revision & Revision Test-I", focus: "Full revision of Chapters 1-11", activities: "Practice revision test from book, oral quiz", homework: "Complete Revision Test-I from book\nStar chart celebration for Term 1!", parentTip: "Focus on chapters the child found hard. Keep it light — this is practice, not an exam.", term: 1, type: "revision" },

  // TERM 2: Weeks 14-26 (Ch 12-22 + 2 revision weeks)
  { week: 14, chapter: 12, title: "Comparisons", focus: "Comparing using -er, -est (tall, taller, tallest)", activities: "Compare objects and people using adjectives", homework: "Fill in -er and -est forms\nCompare 3 family members (tall, taller, tallest)", parentTip: "Compare toys, fruits, family members at home. Physical objects make it click!", term: 2, type: "learn" },
  { week: 15, chapter: 13, title: "Doing Words", focus: "Verbs — action words (run, eat, play, sleep)", activities: "Circle doing words, act them out", homework: "Underline verbs in sentences\nWrite 5 things you do every day", parentTip: "Simon Says with verbs! 'Simon says JUMP, Simon says CLAP' — they learn without knowing.", term: 2, type: "learn" },
  { week: 16, chapter: 14, title: "Am, Is, Are", focus: "Using am/is/are correctly with pronouns", activities: "Fill am/is/are, match with I/he/she/they", homework: "Fill blanks with am, is, or are\nWrite 3 sentences each for am, is, are", parentTip: "Simple rule: I AM, He/She IS, You/We/They ARE. Chant it like a song!", term: 2, type: "learn" },
  { week: 17, chapter: 15, title: "Was, Were", focus: "Past tense of am/is/are — was and were", activities: "Change is→was, are→were in sentences", homework: "Fill was or were\nRewrite 'today' sentences as 'yesterday' sentences", parentTip: "Talk about yesterday: 'Yesterday I WAS tired. We WERE at the park.' Daily context!", term: 2, type: "learn" },
  { week: 18, chapter: 16, title: "Has, Have", focus: "Using has/have to show possession", activities: "Fill has/have, draw and write what you have", homework: "Fill has or have\nWrite 5 sentences: 'I have...' 'She has...'", parentTip: "Point to family: 'Papa HAS a phone. You HAVE a toy.' He/She=HAS, I/You/We/They=HAVE.", term: 2, type: "learn" },
  { week: 19, chapter: 17, title: "Do, Does, Go, Goes", focus: "Using do/does and go/goes with different subjects", activities: "Fill correct form, make sentences", homework: "Fill do/does and go/goes\nOral: Make 4 sentences using each", parentTip: "He/She DOES, GOES. I/You/We/They DO, GO. Practice during daily talk.", term: 2, type: "learn" },
  { week: 20, title: "Revision Week (Ch 12-17)", focus: "Verbs, am/is/are, was/were, has/have, do/does", activities: "Verb charades, fill-in-the-blank game, mixed quiz", homework: "Mixed practice sheet covering Ch 12-17\nOral verb quiz — make it a competition!", parentTip: "Verbs are best learned through action, not writing. Act it out, then write it.", term: 2, type: "revision" },
  { week: 21, chapter: 18, title: "Am, Is, Are + -ing", focus: "Present continuous tense (I am running, she is eating)", activities: "Add -ing to verbs, make sentences with pictures", homework: "Write -ing form of verbs\nLook at pictures, write what is happening", parentTip: "Snap game: Parent does an action, child says 'You are ___ing!' Great for giggles.", term: 2, type: "learn" },
  { week: 22, chapter: 19, title: "Position Words", focus: "Prepositions — in, on, under, behind, between, near", activities: "Place toys and describe position, fill blanks", homework: "Fill position words from pictures\nDraw objects in/on/under a table", parentTip: "Treasure hunt! 'The chocolate is UNDER the pillow, BEHIND the book...'", term: 2, type: "learn" },
  { week: 23, chapter: 20, title: "Joining Words", focus: "Conjunctions — and, but, or, because", activities: "Join two sentences using and/but/or", homework: "Join sentences with correct joining word\nWrite 4 sentences using and, but, or, because", parentTip: "'Do you want roti OR rice?' 'I like ice cream BUT not in winter.' Sneak it into meals!", term: 2, type: "learn" },
  { week: 24, chapter: 21, title: "Statements and Questions", focus: "Full stop for statements, question mark for questions", activities: "Sort sentences, add correct punctuation", homework: "Add . or ? to sentences\nWrite 3 questions and 3 statements", parentTip: "Game: Parent says a sentence, child holds up a dot or ? card. Physical = memorable!", term: 2, type: "learn" },
  { week: 25, chapter: 22, title: "Who, What, Where, Which, When, Why, How", focus: "Question words — WH questions", activities: "Match question word to answer, frame questions", homework: "Fill correct question word\nWrite 1 question for each WH word", parentTip: "Daily 'question of the day' at dinner — child asks a WH question, family answers!", term: 2, type: "learn" },
  { week: 26, title: "Term 2 Revision & Revision Test-II", focus: "Full revision of Chapters 12-22", activities: "Practice Revision Test-II from book, game-based revision", homework: "Complete Revision Test-II from book\nCelebrate with a special treat!", parentTip: "Focus on weak chapters only. If child is confident, just do the test for fun.", term: 2, type: "revision" },

  // TERM 3: Weeks 27-34 (Ch 23-25 + skill building + final revision)
  { week: 27, chapter: 23, title: "Vocabulary", focus: "Opposites, rhyming words, odd one out", activities: "Match opposites, find rhyming pairs, circle odd one out", homework: "Opposites worksheet\nRhyming words game", parentTip: "Rhyming is fun! 'Cat-bat-hat-mat' — see how many child can find for one word.", term: 3, type: "learn" },
  { week: 28, chapter: 23, title: "Vocabulary (continued)", focus: "Homophones, word building, word families", activities: "Sort similar words, build new words from root", homework: "Word family trees (cat → bat, hat, mat, sat)\nSimple crossword puzzle", parentTip: "Make a 'word wall' on a chart paper — add 2 new words every day!", term: 3, type: "learn" },
  { week: 29, chapter: 24, title: "Comprehension", focus: "Reading a short passage and answering questions", activities: "Read passage aloud together, answer who/what/where questions", homework: "1 comprehension passage with 5 questions\nRetell the passage in own words", parentTip: "Read slowly, one paragraph at a time. Ask questions WHILE reading, not just after.", term: 3, type: "learn" },
  { week: 30, chapter: 24, title: "Comprehension (continued)", focus: "Finding information in text, true/false, main idea", activities: "Underline answers in passage, true/false exercises", homework: "1 more comprehension passage\nDraw a picture of what the passage described", parentTip: "Drawing what they read helps check understanding without pressure of writing.", term: 3, type: "learn" },
  { week: 31, chapter: 25, title: "Composition — Picture Description", focus: "Looking at a picture and writing 3-5 sentences about it", activities: "Describe a picture orally first, then write", homework: "Write 5 sentences about a picture\nDraw your own picture and write about it", parentTip: "Start oral: 'Tell me what you see.' Then: 'Now let's write what you just said!' Spoken → Written.", term: 3, type: "learn" },
  { week: 32, chapter: 25, title: "Composition — Letter & Story", focus: "Simple informal letter, 5-line story writing", activities: "Write a letter to a friend, complete a story", homework: "Write a short letter to grandparent/friend\nComplete a story from a given beginning", parentTip: "Actually post the letter or send a photo to the recipient — real purpose = real motivation!", term: 3, type: "learn" },
  { week: 33, title: "Full Book Revision (Week 1)", focus: "Chapters 1-13: Sentences, nouns, pronouns, articles, adjectives", activities: "Chapter-wise quick quiz, flashcard revision, game day", homework: "Mixed worksheet covering Ch 1-13\n10-min oral rapid fire quiz", parentTip: "Don't re-teach. Just quickly test and note which 2-3 topics need extra work.", term: 3, type: "revision" },
  { week: 34, title: "Full Book Revision (Week 2)", focus: "Chapters 14-25: Verbs, tenses, prepositions, questions, composition", activities: "Mixed exercise, mock test, celebration!", homework: "Mixed worksheet covering Ch 14-25\nFinal mock test (make it fun, not scary)", parentTip: "End with celebration! Certificate, special outing, or favourite meal. They did it!", term: 3, type: "revision" },
];

const TERMS = [
  { num: 1, label: "Term 1", weeks: "Week 1-13", chapters: "Ch 1-11", color: COLORS.purple, bg: COLORS.purpleBg },
  { num: 2, label: "Term 2", weeks: "Week 14-26", chapters: "Ch 12-22", color: COLORS.teal, bg: COLORS.tealBg },
  { num: 3, label: "Term 3", weeks: "Week 27-34", chapters: "Ch 23-25 + Revision", color: COLORS.orange, bg: COLORS.orangeBg },
];

const STRATEGY = [
  { icon: "1️⃣", title: "1 Chapter Per Week", desc: "Each chapter gets a full week (Mon-Fri). Day 1-2: learn concept. Day 3-4: practice exercises. Day 5: fun revision game." },
  { icon: "2️⃣", title: "10-15 Min Daily", desc: "Grammar fits into your Session 2 (Reading) or Session 3 slot. Never exceed 15 min — short bursts are more effective." },
  { icon: "3️⃣", title: "Read → Speak → Write", desc: "First READ the rule aloud. Then SPEAK examples together. Only then WRITE the exercises. This 3-step method prevents tears." },
  { icon: "4️⃣", title: "Revision Every 6 Weeks", desc: "Built-in revision weeks after every 6 chapters. Use these to catch up if you fell behind — no stress." },
  { icon: "5️⃣", title: "Skip If School Covers It", desc: "If school already taught a chapter well, mark it done and move on. This plan is a safety net, not extra load." },
];

function App() {
  const [tab, setTab] = useState("strategy");
  const [expandedWeek, setExpandedWeek] = useState(null);
  const [completed, setCompleted] = useState({});
  const [termFilter, setTermFilter] = useState(0);

  useEffect(() => {
    // Load from storage
    (async () => {
      try {
        const res = await window.storage.get("grammar-progress");
        if (res && res.value) setCompleted(JSON.parse(res.value));
      } catch (e) {}
    })();
  }, []);

  const toggleComplete = async (week) => {
    const next = { ...completed, [week]: !completed[week] };
    setCompleted(next);
    try { await window.storage.set("grammar-progress", JSON.stringify(next)); } catch (e) {}
  };

  const totalDone = Object.values(completed).filter(Boolean).length;
  const percent = Math.round((totalDone / WEEKS.length) * 100);

  const filteredWeeks = termFilter === 0 ? WEEKS : WEEKS.filter(w => w.term === termFilter);

  const tabs = [
    { id: "strategy", label: "Strategy", icon: "🎯" },
    { id: "plan", label: "34-Week Plan", icon: "📅" },
    { id: "howto", label: "How to Use", icon: "📖" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: "'Nunito', 'Segoe UI', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "20px 14px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 36 }}>📘</div>
          <h1 style={{ fontSize: 21, fontWeight: 900, color: COLORS.dark, margin: "4px 0 2px" }}>
            English Grammar — Full Book Planner
          </h1>
          <p style={{ fontSize: 12, color: COLORS.mid, margin: 0 }}>
            25 Chapters covered in 34 weeks — 1 chapter/week pace with built-in revision
          </p>
        </div>

        {/* Progress Bar */}
        <div style={{
          background: COLORS.card, borderRadius: 16, padding: 16, marginBottom: 16,
          border: `1px solid ${COLORS.border}`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: COLORS.dark }}>Progress</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.green }}>{totalDone}/{WEEKS.length} weeks done ({percent}%)</span>
          </div>
          <div style={{ height: 10, background: "#F1F5F9", borderRadius: 10, overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 10, transition: "width 0.4s ease",
              width: `${percent}%`,
              background: percent < 40 ? COLORS.purple : percent < 75 ? COLORS.teal : COLORS.green,
            }} />
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 10, flexWrap: "wrap" }}>
            {TERMS.map(t => {
              const termWeeks = WEEKS.filter(w => w.term === t.num);
              const termDone = termWeeks.filter(w => completed[w.week]).length;
              return (
                <div key={t.num} style={{
                  fontSize: 11, padding: "4px 10px", borderRadius: 8,
                  background: t.bg, color: t.color, fontWeight: 700,
                }}>
                  {t.label}: {termDone}/{termWeeks.length}
                </div>
              );
            })}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 16, overflowX: "auto" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: "9px 16px", borderRadius: 10, border: "none", cursor: "pointer",
              fontWeight: 800, fontSize: 12, fontFamily: "inherit", whiteSpace: "nowrap",
              transition: "all 0.2s",
              background: tab === t.id ? COLORS.dark : COLORS.card,
              color: tab === t.id ? "#FFF" : COLORS.mid,
              boxShadow: tab === t.id ? "0 4px 12px rgba(0,0,0,0.15)" : "0 1px 3px rgba(0,0,0,0.06)",
            }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{
          background: COLORS.card, borderRadius: 18, padding: 18,
          border: `1px solid ${COLORS.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}>

          {tab === "strategy" && (
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 900, color: COLORS.dark, margin: "0 0 4px" }}>
                The 5-Point Strategy
              </h2>
              <p style={{ fontSize: 12, color: COLORS.mid, margin: "0 0 16px" }}>
                How to cover 25 chapters without stress or burnout
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {STRATEGY.map((s, i) => (
                  <div key={i} style={{
                    padding: 14, borderRadius: 12, background: "#FAFAFA",
                    border: `1px solid ${COLORS.border}`,
                    borderLeft: `4px solid ${[COLORS.purple, COLORS.teal, COLORS.orange, COLORS.blue, COLORS.green][i]}`,
                  }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: COLORS.dark, marginBottom: 4 }}>
                      {s.icon} {s.title}
                    </div>
                    <div style={{ fontSize: 12, color: COLORS.mid, lineHeight: 1.6 }}>{s.desc}</div>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: 16, padding: 14, borderRadius: 12,
                background: COLORS.yellowBg, border: `1px solid #FDE68A`,
              }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: COLORS.yellow, marginBottom: 6 }}>
                  📐 How It Fits Into the Daily Routine
                </div>
                <div style={{ fontSize: 12, color: "#92400E", lineHeight: 1.7 }}>
                  <strong>Monday & Wednesday:</strong> Grammar goes into <strong>Session 2</strong> (the Reading/Phonics slot) — read the chapter concept + do 1 exercise.<br/>
                  <strong>Tuesday & Thursday:</strong> Grammar practice goes into <strong>Session 3</strong> (Maths/EVS slot) — complete remaining exercises.<br/>
                  <strong>Friday:</strong> Fun revision — flashcard game or oral quiz on the week's grammar chapter.<br/><br/>
                  <em>This means grammar takes just 10-15 min, 4-5 days a week. It replaces one existing session — never added on top!</em>
                </div>
              </div>

              <div style={{
                marginTop: 12, padding: 14, borderRadius: 12,
                background: COLORS.greenBg, border: `1px solid #A7F3D0`,
              }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: COLORS.green, marginBottom: 6 }}>
                  🎯 Realistic Pace
                </div>
                <div style={{ fontSize: 12, color: "#065F46", lineHeight: 1.7 }}>
                  Most schools take <strong>8-9 months</strong> to cover this book. Our plan finishes in <strong>34 weeks (~8 months)</strong> with buffer weeks built in. If you miss a week, you still finish on time. If your child's school is faster on some chapters, skip those weeks and use them as extra revision or rest.
                </div>
              </div>
            </div>
          )}

          {tab === "plan" && (
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 900, color: COLORS.dark, margin: "0 0 4px" }}>
                34-Week Chapter Plan
              </h2>
              <p style={{ fontSize: 12, color: COLORS.mid, margin: "0 0 12px" }}>
                Tap any week to see details. Check off completed weeks — progress is saved!
              </p>

              {/* Term Filter */}
              <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
                <button onClick={() => setTermFilter(0)} style={{
                  padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer",
                  fontSize: 11, fontWeight: 700, fontFamily: "inherit",
                  background: termFilter === 0 ? COLORS.dark : "#F1F5F9",
                  color: termFilter === 0 ? "#FFF" : COLORS.mid,
                }}>All Weeks</button>
                {TERMS.map(t => (
                  <button key={t.num} onClick={() => setTermFilter(t.num)} style={{
                    padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer",
                    fontSize: 11, fontWeight: 700, fontFamily: "inherit",
                    background: termFilter === t.num ? t.color : t.bg,
                    color: termFilter === t.num ? "#FFF" : t.color,
                  }}>{t.label} ({t.chapters})</button>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {filteredWeeks.map((w) => {
                  const term = TERMS.find(t => t.num === w.term);
                  const isExpanded = expandedWeek === w.week;
                  const isDone = completed[w.week];
                  const isRevision = w.type === "revision";

                  return (
                    <div key={w.week} style={{
                      borderRadius: 12, overflow: "hidden",
                      border: `1px solid ${isDone ? COLORS.green : COLORS.border}`,
                      background: isDone ? "#F0FDF4" : isRevision ? COLORS.yellowBg : COLORS.card,
                      transition: "all 0.2s",
                    }}>
                      <div
                        onClick={() => setExpandedWeek(isExpanded ? null : w.week)}
                        style={{
                          display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
                          cursor: "pointer", userSelect: "none",
                        }}
                      >
                        <div
                          onClick={(e) => { e.stopPropagation(); toggleComplete(w.week); }}
                          style={{
                            width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                            border: `2px solid ${isDone ? COLORS.green : COLORS.border}`,
                            background: isDone ? COLORS.green : "transparent",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer", fontSize: 13, color: "#FFF", fontWeight: 900,
                          }}
                        >
                          {isDone && "✓"}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{
                            fontSize: 12, fontWeight: 800, color: isDone ? COLORS.green : COLORS.dark,
                            textDecoration: isDone ? "line-through" : "none",
                          }}>
                            {isRevision ? "⭐ " : ""}{w.title}
                          </div>
                          <div style={{ fontSize: 10, color: COLORS.light }}>
                            Week {w.week} {w.chapter ? `• Ch ${w.chapter}` : ""} • {w.focus.slice(0, 50)}...
                          </div>
                        </div>
                        <div style={{
                          fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 12,
                          background: term.bg, color: term.color, flexShrink: 0,
                        }}>T{w.term}</div>
                        <span style={{ fontSize: 14, color: COLORS.light, flexShrink: 0, transition: "transform 0.2s", transform: isExpanded ? "rotate(180deg)" : "rotate(0)" }}>▼</span>
                      </div>

                      {isExpanded && (
                        <div style={{
                          padding: "0 12px 12px", borderTop: `1px solid ${COLORS.border}`,
                        }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 10 }}>
                            <div style={{ padding: "8px 10px", borderRadius: 8, background: COLORS.purpleBg }}>
                              <div style={{ fontSize: 10, fontWeight: 800, color: COLORS.purple, marginBottom: 2 }}>FOCUS</div>
                              <div style={{ fontSize: 11, color: COLORS.dark, lineHeight: 1.5 }}>{w.focus}</div>
                            </div>
                            <div style={{ padding: "8px 10px", borderRadius: 8, background: COLORS.tealBg }}>
                              <div style={{ fontSize: 10, fontWeight: 800, color: COLORS.teal, marginBottom: 2 }}>ACTIVITIES</div>
                              <div style={{ fontSize: 11, color: COLORS.dark, lineHeight: 1.5 }}>{w.activities}</div>
                            </div>
                            <div style={{ padding: "8px 10px", borderRadius: 8, background: COLORS.blueBg }}>
                              <div style={{ fontSize: 10, fontWeight: 800, color: COLORS.blue, marginBottom: 2 }}>HOMEWORK / EXERCISES</div>
                              <div style={{ fontSize: 11, color: COLORS.dark, lineHeight: 1.5, whiteSpace: "pre-line" }}>{w.homework}</div>
                            </div>
                            <div style={{ padding: "8px 10px", borderRadius: 8, background: COLORS.yellowBg }}>
                              <div style={{ fontSize: 10, fontWeight: 800, color: COLORS.yellow, marginBottom: 2 }}>💡 PARENT TIP</div>
                              <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.5, fontStyle: "italic" }}>{w.parentTip}</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {tab === "howto" && (
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 900, color: COLORS.dark, margin: "0 0 14px" }}>
                How to Use This Planner
              </h2>

              {[
                { q: "What if school is ahead of this plan?", a: "Great! Just tick off those chapters as done and skip to where school is. This plan is a safety net, not a rigid schedule.", color: COLORS.purple },
                { q: "What if my child doesn't understand a chapter?", a: "Spend 2 weeks on it instead of 1. Use the revision week as buffer. You can also ask me to create extra practice worksheets for any specific chapter!", color: COLORS.teal },
                { q: "Do we do grammar every single day?", a: "No! Grammar takes 2-3 sessions per week (Mon, Wed, Thu). Other days focus on reading, Hindi, maths as per the daily routine planner.", color: COLORS.orange },
                { q: "What about chapters 23-25 (Vocabulary, Comprehension, Composition)?", a: "These are skill-based, not rule-based. They get 2 weeks each because they need more practice. Reading storybooks daily naturally builds these skills too!", color: COLORS.blue },
                { q: "How do I track progress?", a: "Tap the checkbox next to each week in the 34-Week Plan tab. Your progress is saved automatically and shows in the progress bar!", color: COLORS.green },
                { q: "What if we miss weeks due to holidays/illness?", a: "The plan has 4 built-in revision weeks that double as buffer weeks. If you fall behind, use those to catch up. Even if you finish in 38 weeks instead of 34, that's perfectly fine.", color: COLORS.pink },
                { q: "Can you help me with specific exercises from the book?", a: "Absolutely! Just photograph any exercise page and share it with me. I'll solve it step-by-step with child-friendly explanations, or create similar practice questions.", color: COLORS.yellow },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: 14, borderRadius: 12, marginBottom: 8,
                  background: "#FAFAFA", border: `1px solid ${COLORS.border}`,
                  borderLeft: `4px solid ${item.color}`,
                }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: COLORS.dark, marginBottom: 4 }}>
                    {item.q}
                  </div>
                  <div style={{ fontSize: 12, color: COLORS.mid, lineHeight: 1.6 }}>
                    {item.a}
                  </div>
                </div>
              ))}

              <div style={{
                marginTop: 14, padding: 14, borderRadius: 12, textAlign: "center",
                background: COLORS.purpleBg, border: `1px solid #C4B5FD`,
              }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>🤝</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: COLORS.purple, marginBottom: 4 }}>
                  I'm Here to Help Throughout!
                </div>
                <div style={{ fontSize: 12, color: "#5B21B6", lineHeight: 1.6 }}>
                  Any week, you can come back and ask me to:<br/>
                  • Solve any exercise from the book<br/>
                  • Create extra practice worksheets (PDF)<br/>
                  • Build a fun quiz for any chapter<br/>
                  • Explain a concept in simple terms<br/>
                  • Adjust the plan if needed
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: 16, fontSize: 11, color: COLORS.light, lineHeight: 1.5 }}>
          Based on your child's Class 1 English Grammar textbook (25 chapters) • Aligned with the daily study routine
        </div>
      </div>
    </div>
  );
}

export default App;
