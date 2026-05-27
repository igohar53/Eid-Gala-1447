// ============================================
// GAME CONFIGURATION — edit these as needed
// ============================================

module.exports = {

  // Admin panel password
  ADMIN_PASSWORD: "nyama2026",

  // Google Sheets ID (from your sheet URL)
  SHEET_ID: "1Jr7_8WiARmHe7iSfZLXgBVZwmTAxYP7LtZgDtt3Pkzw",

  // Google Apps Script Web App URL (for writing to sheet)
  APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbzlcno9YaxVNv3KFwa3E4yKJungjIzYMzUtI30VVO-3464oCc2kzn9kr8mM4hvyqBegpg/exec",

  // Default timer in seconds (used if a question has no timer set)
  QUESTION_TIMER: 60,

  // Max team size (captain + members)
  MAX_TEAM_SIZE: 9,

  // Questions config
  // type: "short" | "number" | "mcq" | "paragraph" | "checkbox" | "multibox"
  // multibox: renders multiple labelled input boxes, one per entry in `boxes`
  // timer: per-question timer in seconds (overrides QUESTION_TIMER)
  // autoMark: true = app marks it automatically
  // correct: answer for auto-marking (mcq/number/short)
  QUESTIONS: [
    {
      id: 1,
      category: "General Knowledge",
      label: "Population of Tanzania",
      type: "number",
      timer: 60,
      autoMark: true,
      correct: "70",
      hint: "Enter a number in millions"
    },
    {
      id: 2,
      category: "General Knowledge",
      label: "Capital cities (8 countries)",
      type: "multibox",
      timer: 120,
      autoMark: false,
      boxes: ["UAE", "Sweden", "Rwanda", "Germany", "Brazil", "Australia", "Turkey", "Switzerland"],
      hint: "1 point per correct capital · 8 points total"
    },
    {
      id: 3,
      category: "General Knowledge",
      label: "Bones in human body",
      type: "number",
      timer: 60,
      autoMark: true,
      correct: "206",
      hint: "Enter a number"
    },
    {
      id: 4,
      category: "General Knowledge",
      label: "Tanganyika independence year",
      type: "number",
      timer: 60,
      autoMark: true,
      correct: "1961",
      hint: "Enter a year"
    },
    {
      id: 5,
      category: "General Knowledge",
      label: "Most abundant gas",
      type: "mcq",
      timer: 60,
      autoMark: true,
      correct: "C",
      options: ["A) Oxygen", "B) Carbon Dioxide", "C) Nitrogen", "D) Hydrogen"]
    },
    {
      id: 6,
      category: "Back to School",
      label: "Pythagorean theorem",
      type: "short",
      timer: 60,
      autoMark: false,
      hint: "Write as equation"
    },
    {
      id: 7,
      category: "Back to School",
      label: "Unit of force",
      type: "mcq",
      timer: 60,
      autoMark: true,
      correct: "B",
      options: ["A) Watt", "B) Newton", "C) Joule", "D) Pascal"]
    },
    {
      id: 8,
      category: "Back to School",
      label: "Shirt original price",
      type: "number",
      timer: 60,
      autoMark: true,
      correct: "30000",
      hint: "Enter amount in TZS, numbers only"
    },
    {
      id: 9,
      category: "Back to School",
      label: "Organ producing insulin",
      type: "mcq",
      timer: 60,
      autoMark: true,
      correct: "C",
      options: ["A) Liver", "B) Kidney", "C) Pancreas", "D) Spleen"]
    },
    {
      id: 10,
      category: "Back to School",
      label: "Value of Pi",
      type: "short",
      timer: 90,
      autoMark: false,
      hint: null
    },
    {
      id: 11,
      category: "Deen",
      label: "Dauat in Surat",
      type: "multibox",
      timer: 90,
      autoMark: false,
      boxes: ["1", "2", "3", "4", "5", "6", "7"],
      hint: null
    },
    {
      id: 12,
      category: "Deen",
      label: "Moula na Ali's battles",
      type: "multibox",
      timer: 60,
      autoMark: false,
      boxes: ["Battle 1", "Battle 2"],
      hint: null
    },
    {
      id: 13,
      category: "Deen",
      label: "Firishtao na jhagra",
      type: "multibox",
      timer: 60,
      autoMark: false,
      boxes: ["1", "2"],
      hint: null
    },
    {
      id: 14,
      category: "Deen",
      label: "Arabic word translations",
      type: "multibox",
      timer: 150,
      autoMark: false,
      boxes: ["Nemat", "Hidayat", "Taaat", "Rehmat", "Magferat", "Taqwa", "Yaqeen", "Tauba", "Khushu", "Hikmat"],
      hint: "1 point per correct translation · 10 points total"
    },
    {
      id: 15,
      category: "Deen",
      label: "Surato in 30mo siparo",
      type: "number",
      timer: 60,
      autoMark: true,
      correct: "37",
      hint: "Enter a number"
    }
  ]
};
