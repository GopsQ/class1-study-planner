import { useState } from "react";

const COLORS = {
  bg: "#FFF8F0",
  card: "#FFFFFF",
  accent1: "#FF6B6B",
  accent2: "#4ECDC4",
  accent3: "#FFE66D",
  accent4: "#A78BFA",
  accent5: "#F97316",
  accent6: "#38BDF8",
  text: "#2D3436",
  textLight: "#636E72",
  border: "#E8E0D8",
  highlight: "#FFF3CD",
};

const TABS = [
  { id: "daily", label: "Daily Routine", emoji: "🌞" },
  { id: "weekly", label: "Weekly Focus", emoji: "📅" },
  { id: "timetable", label: "Week Timetable", emoji: "📋" },
  { id: "tips", label: "Parent Tips", emoji: "💡" },
  { id: "activities", label: "Fun Activities", emoji: "🎨" },
];

const weekdayRoutine = [
  { time: "1:00 PM", activity: "Arrive home, wash up, change clothes", type: "habit", duration: "15 min", icon: "🏠" },
  { time: "1:15 PM", activity: "Lunch + relaxed chat about school day", type: "meal", duration: "30 min", icon: "🍛" },
  { time: "1:45 PM", activity: "Free play / rest / quiet time", type: "free", duration: "30 min", icon: "🧸" },
  { time: "2:15 PM", activity: "Study Session 1 — Handwriting / Writing (fun worksheet or tracing)", type: "study", duration: "12-15 min", icon: "✏️" },
  { time: "2:30 PM", activity: "Movement Break — jumping jacks, dance, run around", type: "break", duration: "5 min", icon: "🤸" },
  { time: "2:35 PM", activity: "Study Session 2 — Reading / Phonics (read-aloud with parent)", type: "study", duration: "10-12 min", icon: "📖" },
  { time: "2:50 PM", activity: "Fun Break — coloring, stickers, or a quick game", type: "break", duration: "10 min", icon: "🎨" },
  { time: "3:00 PM", activity: "Study Session 3 — Maths or EVS (as per daily focus)", type: "study", duration: "10-12 min", icon: "🔢" },
  { time: "3:15 PM", activity: "Healthy snack time", type: "meal", duration: "15 min", icon: "🍎" },
  { time: "3:30 PM", activity: "Outdoor play / sports / cycling / park", type: "play", duration: "60 min", icon: "⚽" },
  { time: "4:30 PM", activity: "Bath & freshen up", type: "habit", duration: "20 min", icon: "🛁" },
  { time: "5:00 PM", activity: "Free play / TV time (limited) / creative play", type: "free", duration: "45 min", icon: "🎮" },
  { time: "5:45 PM", activity: "Bedtime story / read-aloud (Hindi or English)", type: "study", duration: "10-15 min", icon: "📚" },
  { time: "6:00 PM", activity: "Dinner + family time", type: "meal", duration: "45 min", icon: "🍽️" },
  { time: "7:00 PM", activity: "Wind down, brush teeth, sleep by 7:30-8:00 PM", type: "habit", duration: "30 min", icon: "🌙" },
];

const weekendRoutine = [
  { time: "7:30 AM", activity: "Wake up naturally, morning routine", type: "habit", duration: "30 min", icon: "☀️" },
  { time: "8:00 AM", activity: "Breakfast", type: "meal", duration: "30 min", icon: "🥞" },
  { time: "8:30 AM", activity: "Outdoor play / park / nature walk", type: "play", duration: "60 min", icon: "🌳" },
  { time: "9:30 AM", activity: "Fun Study — Art + Craft or Moral Stories project", type: "study", duration: "20 min", icon: "🖍️" },
  { time: "10:00 AM", activity: "Revision game — flashcards, puzzles, or board game", type: "study", duration: "15 min", icon: "🧩" },
  { time: "10:15 AM", activity: "Snack + free play", type: "free", duration: "45 min", icon: "🧃" },
  { time: "11:00 AM", activity: "Read-aloud together (longer story / picture book)", type: "study", duration: "15-20 min", icon: "📖" },
  { time: "11:30 AM", activity: "Free time — hobbies, music, imaginative play", type: "free", duration: "30 min", icon: "🎵" },
  { time: "12:00 PM", activity: "Lunch", type: "meal", duration: "30 min", icon: "🍛" },
  { time: "12:30 PM", activity: "Rest / quiet time / nap if needed", type: "free", duration: "60 min", icon: "😴" },
  { time: "1:30 PM", activity: "Family activity — cooking together, gardening, outing", type: "play", duration: "90 min", icon: "👨‍👩‍👧" },
  { time: "Evening", activity: "Same as weekday evening routine", type: "habit", duration: "", icon: "🌙" },
];

const weeklyFocus = [
  {
    day: "Monday",
    emoji: "🔤",
    focus: "Phonics + Numbers",
    session1: "Handwriting: Practice 2 letters (uppercase + lowercase)",
    session2: "Phonics: Letter sounds, blending CVC words (cat, bat, sun)",
    session3: "Maths: Number writing (1-50), counting objects",
    tip: "Use magnetic letters on fridge for phonics play!"
  },
  {
    day: "Tuesday",
    emoji: "📝",
    focus: "Hindi + Shapes",
    session1: "Hindi writing: Practice 2 Hindi varnamala letters with tracing",
    session2: "Hindi reading: Simple words (आम, कल, घर) — read aloud together",
    session3: "Maths: Shapes recognition, drawing, finding shapes at home",
    tip: "Go on a 'shape hunt' around the house!"
  },
  {
    day: "Wednesday",
    emoji: "📖",
    focus: "English Reading + Addition",
    session1: "Handwriting: 3-4 letter sight words (the, and, is, was)",
    session2: "English reading: Read a short story aloud, ask 2-3 questions",
    session3: "Maths: Simple addition (1+2, 3+4) using real objects",
    tip: "Use biscuits, coins, or toys to make addition real!"
  },
  {
    day: "Thursday",
    emoji: "🌍",
    focus: "EVS / GK + Hindi",
    session1: "Handwriting: Sentence writing (copy 1 simple sentence neatly)",
    session2: "EVS: Topic of the week — My Family / Plants / Animals / Seasons",
    session3: "Hindi: Matra practice (aa, ee, oo ki matra) with tracing",
    tip: "Draw or paste pictures related to the EVS topic!"
  },
  {
    day: "Friday",
    emoji: "🎉",
    focus: "Fun Revision Day",
    session1: "Handwriting: Free writing (draw + write about favourite thing)",
    session2: "Revision game: Flashcards, quiz, or board game on week's topics",
    session3: "Art & Craft or Moral Values story + discussion",
    tip: "Friday is celebration day — sticker reward for the week's effort!"
  },
  {
    day: "Saturday",
    emoji: "🖍️",
    focus: "Creative + Light Revision",
    session1: "Art project or craft activity related to school topic",
    session2: "Read-aloud: Longer storybook (English or Hindi)",
    session3: "Optional: Light practice of any weak area (keep it playful!)",
    tip: "Visit a library, bookshop, or do a nature journal activity."
  },
  {
    day: "Sunday",
    emoji: "🌈",
    focus: "REST DAY — No Formal Study",
    session1: "Family outing, free play, sports, hobbies",
    session2: "Only activity: Bedtime story read-aloud (parent + child)",
    session3: "Prepare school bag and uniform for Monday together",
    tip: "Rest is not lazy — it's essential for a 6-year-old's brain!"
  },
];

const parentTips = [
  {
    title: "Handling Resistance",
    icon: "🛡️",
    tips: [
      "Never force — if the child resists, take a 10-minute play break and try again gently.",
      "Give choices: 'Do you want to do writing first or maths first?' This gives a sense of control.",
      "Use a timer: 'Let's do just 10 minutes, then you can play!' — seeing the timer helps.",
      "If a bad day happens, skip study entirely. One day off won't hurt. Consistency over perfection.",
    ]
  },
  {
    title: "Motivation & Rewards",
    icon: "⭐",
    tips: [
      "Use a star chart — 5 stars = a small treat (extra play time, favourite snack, sticker book).",
      "Praise effort, not perfection: 'You tried so hard today!' not just 'You got it right!'",
      "Celebrate small wins loudly — finished a page? Do a happy dance together!",
      "Avoid comparing with other children. Every child's pace is unique and valid.",
    ]
  },
  {
    title: "Tracking Progress",
    icon: "📊",
    tips: [
      "Keep a simple weekly checklist — tick off what was covered (not scores, just done/not done).",
      "Take photos of their work monthly — you'll see improvement and it boosts their confidence.",
      "Talk to the school teacher once a month to align home practice with classroom topics.",
      "Watch for consistent struggles over 3-4 weeks — that may need teacher or specialist input.",
    ]
  },
  {
    title: "When to Seek Help",
    icon: "🩺",
    tips: [
      "If the child consistently reverses letters (b/d, p/q) beyond age 7, consult an educational specialist.",
      "If reading doesn't improve despite regular practice for 2-3 months, check for vision or learning difficulties.",
      "Extreme resistance to writing (hand pain, tears daily) — may need an occupational therapy assessment.",
      "Trust your instinct — you know your child best. Early support is always better.",
    ]
  },
  {
    title: "Golden Rules for Home Study",
    icon: "✨",
    tips: [
      "Same time, same place every day — routine builds habit without battle.",
      "Sit WITH the child for the first few months. Your presence = security, not surveillance.",
      "Keep study area clutter-free with only the needed materials. Less distraction = more focus.",
      "End every session on a positive note, even if it was hard. 'I'm proud we tried together.'",
    ]
  }
];

const funActivities = [
  { name: "Letter Hunt", desc: "Find objects starting with a given letter around the house", cost: "Free", subject: "Phonics", emoji: "🔍" },
  { name: "Rice Tray Writing", desc: "Spread rice/salt on a tray — child traces letters with finger", cost: "Free", subject: "Handwriting", emoji: "🍚" },
  { name: "Grocery Maths", desc: "Count fruits, add vegetables, compare sizes while cooking/shopping", cost: "Free", subject: "Maths", emoji: "🛒" },
  { name: "Story Retelling", desc: "Read a story, then child retells it in their own words (builds fluency)", cost: "Free", subject: "Reading", emoji: "🗣️" },
  { name: "Nature Journal", desc: "Draw a leaf, flower, or insect and write its name — builds EVS + writing", cost: "Free", subject: "EVS + Writing", emoji: "🌿" },
  { name: "Sight Word Bingo", desc: "Make bingo cards with common words — call them out, child marks them", cost: "Free", subject: "Reading", emoji: "🎯" },
  { name: "Playdough Letters", desc: "Roll playdough into letter shapes — great for motor skills + letter recognition", cost: "Low", subject: "Handwriting", emoji: "🎨" },
  { name: "Coin Counting", desc: "Use real coins to practice addition, subtraction, and coin recognition", cost: "Free", subject: "Maths", emoji: "🪙" },
  { name: "Hindi Label Walk", desc: "Stick Hindi word labels on objects at home (दरवाज़ा, कुर्सी, मेज़)", cost: "Free", subject: "Hindi", emoji: "🏷️" },
  { name: "Drawing Dictation", desc: "Parent says a shape/scene, child draws it — builds listening + creativity", cost: "Free", subject: "Art + Listening", emoji: "✏️" },
  { name: "Flashcard Race", desc: "Spread flashcards on floor, call a word/number, child runs to grab it", cost: "Free", subject: "All Subjects", emoji: "🏃" },
  { name: "Weekend Cooking", desc: "Simple recipe together — measuring, counting, reading steps = real learning", cost: "Low", subject: "Maths + Reading", emoji: "👨‍🍳" },
];

const typeColors = {
  study: { bg: "#EDE9FE", text: "#7C3AED", label: "Study" },
  break: { bg: "#ECFDF5", text: "#059669", label: "Break" },
  meal: { bg: "#FFF7ED", text: "#EA580C", label: "Meal" },
  play: { bg: "#EFF6FF", text: "#2563EB", label: "Play" },
  free: { bg: "#FDF2F8", text: "#DB2777", label: "Free" },
  habit: { bg: "#F5F5F4", text: "#78716C", label: "Habit" },
};

function Badge({ type }) {
  const c = typeColors[type];
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20,
      background: c.bg, color: c.text, textTransform: "uppercase", letterSpacing: 0.5,
    }}>{c.label}</span>
  );
}

function RoutineCard({ items, title, subtitle }) {
  return (
    <div>
      <h3 style={{ fontSize: 18, fontWeight: 800, color: COLORS.text, margin: "0 0 4px" }}>{title}</h3>
      <p style={{ fontSize: 13, color: COLORS.textLight, margin: "0 0 16px" }}>{subtitle}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {items.map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 10, padding: "8px 12px",
            background: i % 2 === 0 ? "#FAFAF8" : "#FFF", borderRadius: 10,
            border: `1px solid ${COLORS.border}`,
          }}>
            <span style={{ fontSize: 22, width: 32, textAlign: "center", flexShrink: 0 }}>{item.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text }}>{item.activity}</div>
              {item.duration && <span style={{ fontSize: 11, color: COLORS.textLight }}>{item.duration}</span>}
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: COLORS.accent1, fontFamily: "monospace" }}>{item.time}</span>
              <Badge type={item.type} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DailyTab() {
  const [view, setView] = useState("weekday");
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {["weekday", "weekend"].map(v => (
          <button key={v} onClick={() => setView(v)} style={{
            padding: "8px 20px", borderRadius: 25, border: "none", cursor: "pointer",
            fontWeight: 700, fontSize: 13, transition: "all 0.2s",
            background: view === v ? COLORS.accent2 : "#F0EDED",
            color: view === v ? "#FFF" : COLORS.textLight,
          }}>
            {v === "weekday" ? "🏫 Weekday (Mon-Fri)" : "🌈 Weekend (Sat)"}
          </button>
        ))}
      </div>
      {view === "weekday" ? (
        <RoutineCard items={weekdayRoutine}
          title="After-School Weekday Routine"
          subtitle="Total study time: ~35-40 min in 3 short sessions + bedtime story. Plenty of play & rest!" />
      ) : (
        <RoutineCard items={weekendRoutine}
          title="Weekend Routine (Saturday)"
          subtitle="Light & creative — only 35 min of fun learning. Sunday is a full rest day!" />
      )}
      <div style={{
        marginTop: 16, padding: 14, background: COLORS.highlight, borderRadius: 12,
        border: "1px solid #F0E5B8", fontSize: 13, color: "#92400E", lineHeight: 1.6,
      }}>
        <strong>Key Principle:</strong> Study sessions are short bursts (10-15 min each) with breaks in between. This matches a 6-year-old's natural attention span. If the child is engaged and wants to continue — wonderful! If not, stop and try later. No battles.
      </div>
    </div>
  );
}

function WeeklyTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {weeklyFocus.map((day, i) => (
        <div key={i} style={{
          padding: 16, borderRadius: 14, background: COLORS.card,
          border: `1px solid ${COLORS.border}`,
          borderLeft: `4px solid ${["#FF6B6B","#4ECDC4","#FFE66D","#A78BFA","#F97316","#38BDF8","#94A3B8"][i]}`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 24 }}>{day.emoji}</span>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: COLORS.text }}>{day.day}</div>
              <div style={{ fontSize: 12, color: COLORS.accent1, fontWeight: 700 }}>{day.focus}</div>
            </div>
          </div>
          {day.day !== "Sunday" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 }}>
              <div style={{ fontSize: 12, padding: "6px 10px", background: "#EDE9FE", borderRadius: 8 }}>
                <strong>Session 1 (Writing):</strong> {day.session1}
              </div>
              <div style={{ fontSize: 12, padding: "6px 10px", background: "#ECFDF5", borderRadius: 8 }}>
                <strong>Session 2 (Reading):</strong> {day.session2}
              </div>
              <div style={{ fontSize: 12, padding: "6px 10px", background: "#FFF7ED", borderRadius: 8 }}>
                <strong>Session 3 (Maths/EVS):</strong> {day.session3}
              </div>
            </div>
          ) : (
            <div style={{ fontSize: 12, padding: "6px 10px", background: "#F0FDF4", borderRadius: 8, marginBottom: 10 }}>
              {day.session1} • {day.session2} • {day.session3}
            </div>
          )}
          <div style={{
            fontSize: 11, color: "#92400E", background: COLORS.highlight,
            padding: "6px 10px", borderRadius: 8, fontStyle: "italic",
          }}>
            💡 {day.tip}
          </div>
        </div>
      ))}
    </div>
  );
}

function TimetableTab() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const sessions = [
    { label: "Session 1 ✏️", key: "s1", color: "#EDE9FE" },
    { label: "Session 2 📖", key: "s2", color: "#ECFDF5" },
    { label: "Session 3 🔢", key: "s3", color: "#FFF7ED" },
  ];
  const data = {
    Mon: { s1: "Letter practice (Aa, Bb)", s2: "CVC phonics (cat, bat)", s3: "Number writing 1-20" },
    Tue: { s1: "Hindi letters (क, ख)", s2: "Hindi words read-aloud", s3: "Shapes & patterns" },
    Wed: { s1: "Sight words writing", s2: "English story reading", s3: "Addition with objects" },
    Thu: { s1: "Sentence copying", s2: "EVS topic discussion", s3: "Hindi matra tracing" },
    Fri: { s1: "Free drawing + label", s2: "Flashcard game/quiz", s3: "Art/craft/moral story" },
    Sat: { s1: "Creative art project", s2: "Long story read-aloud", s3: "Light revision (optional)" },
    Sun: { s1: "REST", s2: "REST", s3: "Bedtime story only 📚" },
  };

  return (
    <div>
      <h3 style={{ fontSize: 18, fontWeight: 800, color: COLORS.text, margin: "0 0 4px" }}>Sample Week at a Glance</h3>
      <p style={{ fontSize: 13, color: COLORS.textLight, margin: "0 0 16px" }}>Each session = 10-15 minutes. Adapt freely to your child's school topics and energy.</p>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, fontSize: 12 }}>
          <thead>
            <tr>
              <th style={{ padding: "10px 8px", background: COLORS.accent2, color: "#FFF", borderRadius: "10px 0 0 0", fontWeight: 800, textAlign: "left", position: "sticky", left: 0, zIndex: 1 }}>Day</th>
              {sessions.map((s, i) => (
                <th key={i} style={{
                  padding: "10px 8px", background: COLORS.accent2, color: "#FFF", fontWeight: 700,
                  textAlign: "left", borderRadius: i === sessions.length - 1 ? "0 10px 0 0" : 0,
                }}>{s.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day, di) => (
              <tr key={day} style={{ background: di % 2 === 0 ? "#FAFAF8" : "#FFF" }}>
                <td style={{
                  padding: "10px 8px", fontWeight: 800, color: day === "Sun" ? COLORS.accent1 : COLORS.text,
                  borderBottom: `1px solid ${COLORS.border}`, position: "sticky", left: 0,
                  background: di % 2 === 0 ? "#FAFAF8" : "#FFF", zIndex: 1,
                }}>{day}</td>
                {sessions.map((s, si) => (
                  <td key={si} style={{
                    padding: "8px", borderBottom: `1px solid ${COLORS.border}`,
                  }}>
                    <span style={{
                      display: "inline-block", padding: "4px 8px", borderRadius: 6,
                      background: day === "Sun" ? "#F5F5F4" : s.color,
                      color: day === "Sun" ? COLORS.textLight : COLORS.text,
                      fontSize: 11, lineHeight: 1.4,
                    }}>
                      {data[day][s.key]}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{
        marginTop: 16, padding: 14, background: "#EDE9FE", borderRadius: 12,
        fontSize: 13, color: "#5B21B6", lineHeight: 1.6,
      }}>
        <strong>How to use this table:</strong> Treat it as a starting template. Swap topics based on what your child's school is currently teaching. The structure (writing → reading → maths/other) stays the same. If school gives homework, that replaces one session — never add homework ON TOP of this.
      </div>
    </div>
  );
}

function TipsTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {parentTips.map((section, i) => (
        <div key={i} style={{
          padding: 16, borderRadius: 14, background: COLORS.card,
          border: `1px solid ${COLORS.border}`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 26 }}>{section.icon}</span>
            <h4 style={{ fontSize: 15, fontWeight: 800, color: COLORS.text, margin: 0 }}>{section.title}</h4>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {section.tips.map((tip, j) => (
              <div key={j} style={{
                fontSize: 13, lineHeight: 1.6, color: COLORS.text,
                padding: "8px 12px", background: "#FAFAF8", borderRadius: 10,
                borderLeft: `3px solid ${[COLORS.accent1, COLORS.accent2, COLORS.accent4, COLORS.accent5][j % 4]}`,
              }}>
                {tip}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ActivitiesTab() {
  return (
    <div>
      <h3 style={{ fontSize: 18, fontWeight: 800, color: COLORS.text, margin: "0 0 4px" }}>Fun Learning Activities</h3>
      <p style={{ fontSize: 13, color: COLORS.textLight, margin: "0 0 16px" }}>All free or very low-cost. Use these to replace a study session when the child needs variety!</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
        {funActivities.map((act, i) => (
          <div key={i} style={{
            padding: 14, borderRadius: 14, background: COLORS.card,
            border: `1px solid ${COLORS.border}`, display: "flex", flexDirection: "column", gap: 6,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 24 }}>{act.emoji}</span>
              <span style={{
                fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20,
                background: act.cost === "Free" ? "#ECFDF5" : "#FFF7ED",
                color: act.cost === "Free" ? "#059669" : "#EA580C",
              }}>{act.cost}</span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: COLORS.text }}>{act.name}</div>
            <div style={{ fontSize: 12, color: COLORS.textLight, lineHeight: 1.5 }}>{act.desc}</div>
            <span style={{
              fontSize: 10, fontWeight: 700, color: COLORS.accent4, alignSelf: "flex-start",
              padding: "2px 8px", background: "#EDE9FE", borderRadius: 20,
            }}>{act.subject}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("daily");

  const renderTab = () => {
    switch (activeTab) {
      case "daily": return <DailyTab />;
      case "weekly": return <WeeklyTab />;
      case "timetable": return <TimetableTab />;
      case "tips": return <TipsTab />;
      case "activities": return <ActivitiesTab />;
      default: return null;
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: COLORS.bg,
      fontFamily: "'Nunito', 'Segoe UI', system-ui, sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 16px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 40, marginBottom: 4 }}>📚✨</div>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: COLORS.text, margin: "0 0 4px", lineHeight: 1.2 }}>
            Class 1 Study Planner
          </h1>
          <p style={{ fontSize: 13, color: COLORS.textLight, margin: 0 }}>
            A gentle, joyful home learning routine for your 6-7 year old
          </p>
          <div style={{
            display: "inline-flex", gap: 8, marginTop: 12, flexWrap: "wrap", justifyContent: "center",
          }}>
            {["Max 40 min/day", "3 short sessions", "Lots of play", "Hindi + English"].map((tag, i) => (
              <span key={i} style={{
                fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20,
                background: [COLORS.accent1, COLORS.accent2, COLORS.accent3, COLORS.accent4][i],
                color: i === 2 ? COLORS.text : "#FFF",
              }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: "flex", gap: 4, overflowX: "auto", paddingBottom: 4, marginBottom: 20,
          WebkitOverflowScrolling: "touch",
        }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding: "10px 14px", borderRadius: 12, border: "none", cursor: "pointer",
              fontWeight: 800, fontSize: 12, whiteSpace: "nowrap", transition: "all 0.2s",
              fontFamily: "inherit",
              background: activeTab === tab.id ? COLORS.text : COLORS.card,
              color: activeTab === tab.id ? "#FFF" : COLORS.textLight,
              boxShadow: activeTab === tab.id ? "0 4px 12px rgba(0,0,0,0.15)" : "0 1px 3px rgba(0,0,0,0.08)",
            }}>
              {tab.emoji} {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{
          background: COLORS.card, borderRadius: 20, padding: 20,
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: `1px solid ${COLORS.border}`,
        }}>
          {renderTab()}
        </div>

        {/* Footer */}
        <div style={{
          textAlign: "center", marginTop: 20, fontSize: 12, color: COLORS.textLight, lineHeight: 1.6,
        }}>
          <strong>Remember:</strong> The goal is not perfection — it's building a love for learning. 💛<br />
          Adapt this plan to YOUR child. Some days will be great, some won't. Both are okay.
        </div>
      </div>
    </div>
  );
}
