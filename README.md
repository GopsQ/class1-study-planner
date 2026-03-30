# 📚 Class 1 Study Planner & Grammar Fun Zone

A comprehensive, interactive home learning toolkit for Class 1 (Grade 1) students aged 6-7 years. Built to make learning joyful, stress-free, and effective.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![License](https://img.shields.io/badge/License-MIT-green)
![Age Group](https://img.shields.io/badge/Age-6--7%20years-orange)

## 🌟 What's Inside

### 1. 📅 Daily Study Planner (`class1-study-planner.jsx`)
- **Weekday & Weekend routines** — structured after-school schedules
- **Weekly subject focus** — Phonics, Hindi, Maths, EVS, Art rotation
- **Visual timetable** — printable week-at-a-glance table
- **Parent tips** — handling resistance, motivation, progress tracking
- **Fun activity ideas** — 12 free/low-cost learning games

### 2. 📘 Grammar Book Planner (`grammar-book-planner.jsx`)
- **34-week chapter plan** covering 25 grammar chapters
- **Term-wise breakdown** — 3 terms with built-in revision weeks
- **Progress tracking** — checkboxes with persistent storage
- **5-point study strategy** — practical approach for parents
- **Detailed weekly guides** — focus, activities, homework, parent tips

### 3. 🎓 Grammar Fun Zone (`grammar-fun-zone.jsx`)
- **160+ interactive exercises** across 20 chapters
- **5 question types** — MCQ, Yes/No, Unscramble, Match Pairs, Category Sort
- **Detailed explanations** for every answer (right or wrong)
- **Star rating system** — earn up to 3 stars per chapter
- **Streak counter** — tracks consecutive correct answers
- **Topic-wise tips** — concept explanation, memory tricks, daily practice ideas, common mistakes
- **Persistent progress** — stars and scores saved across sessions

### 4. 📄 Printable PDF (`class1_study_planner.pdf`)
- 5-page printable document with all routines and timetables
- Color-coded tables for easy reference
- Perfect for sticking on the fridge or study desk

## 📋 Chapters Covered (English Grammar)

| # | Chapter | # | Chapter |
|---|---------|---|---------|
| 1 | The Sentence | 11 | Doing Words (Verbs) |
| 2 | Two Parts of a Sentence | 12 | Am, Is, Are |
| 3 | Naming Words (Nouns) | 13 | Was, Were |
| 4 | Common & Special Names | 14 | Has, Have |
| 5 | One and Many (Plurals) | 15 | Do, Does, Go, Goes |
| 6 | He or She (Gender) | 16 | Am/Is/Are + -ing |
| 7 | Pronouns | 17 | Position Words |
| 8 | Articles (A, An, The) | 18 | Joining Words |
| 9 | Describing Words | 19 | Statements & Questions |
| 10 | Comparisons (-er, -est) | 20 | WH Questions |

## 🚀 Getting Started

### Quick Start (Vite + React)

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/class1-study-planner.git
cd class1-study-planner

# Install dependencies
npm install

# Start development server
npm run dev
```

### Run Individual Components

Each `.jsx` file is a standalone React component with no external dependencies (except React and Tailwind). You can:

1. **Drop into any React project** — import and use directly
2. **Use with Claude.ai** — upload the `.jsx` files as artifacts
3. **Use the PDF** — print directly for offline reference

## 🛠️ Tech Stack

- **React 18** — functional components with hooks
- **Tailwind CSS** — utility-first styling (inline styles used for portability)
- **Persistent Storage** — `window.storage` API for progress tracking
- **No backend required** — fully client-side

## 📁 Project Structure

```
class1-study-planner/
├── src/
│   ├── StudyPlanner.jsx        # Daily routine & weekly planner
│   ├── GrammarBookPlanner.jsx  # 34-week chapter coverage plan
│   └── GrammarFunZone.jsx      # Interactive exercises & tips
├── pdf/
│   └── class1_study_planner.pdf  # Printable PDF version
├── public/
│   └── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Design Philosophy

- **Maximum 40 minutes/day** of focused study time
- **3 short sessions** (10-15 min each) matching a child's attention span
- **Play-based learning** — games, songs, movement breaks
- **No stress, no tears** — positive reinforcement, star rewards
- **Parent involvement** — sit WITH the child, not just supervise
- **Flexibility** — skip, swap, adapt based on the child's energy and school pace

## 👨‍👩‍👧 For Parents

- **Handling resistance:** Give choices, use timers, never force
- **Motivation:** Star charts, praise effort over perfection, celebrate small wins
- **Tracking:** Simple weekly checklists, monthly photo journal
- **When to seek help:** Consistent letter reversals beyond age 7, no reading improvement after 2-3 months

## 📱 Works On

- ✅ Desktop browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile browsers (responsive design)
- ✅ Claude.ai artifacts
- ✅ Any React-based project

## 📄 License

MIT License — free to use, modify, and share.

## 🙏 Acknowledgments

Created with care for every child who deserves a joyful learning experience. 

> *"The goal is not perfection — it's building a love for learning."* 💛

---

**Made with ❤️ for Class 1 students and their parents**
