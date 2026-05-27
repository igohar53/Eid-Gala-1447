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

  // Timer in seconds per question (edit this to change timer)
  QUESTION_TIMER: 60,

  // Max team size (captain + members)
  MAX_TEAM_SIZE: 9,

  // Questions config
  // type: "short" | "number" | "mcq" | "paragraph" | "checkbox"
  // autoMark: true = app marks it automatically
  // correct: answer for auto-marking (mcq/number/short)
  QUESTIONS: [
    {
      id: 1,
      category: "General Knowledge",
      label: "Population of Tanzania",
      type: "number",
      autoMark: true,
      correct: "70",
      hint: "Enter a number in millions"
    },
    {
      id: 2,
      category: "General Knowledge",
      label: "Capital cities (8 countries)",
      type: "paragraph",
      autoMark: false,
      placeholder: "UAE:\nSweden:\nRwanda:\nGermany:\nBrazil:\nAustralia:\nTurkey:\nSwitzerland:",
      hint: "1 point per correct capital · 8 points total"
    },
    {
      id: 3,
      category: "General Knowledge",
      label: "Bones in human body",
      type: "number",
      autoMark: true,
      correct: "206",
      hint: "Enter a number"
    },
    {
      id: 4,
      category: "General Knowledge",
      label: "Tanganyika independence year",
      type: "number",
      autoMark: true,
      correct: "1961",
      hint: "Enter a year"
    },
    {
      id: 5,
      category: "General Knowledge",
      label: "Most abundant gas",
      type: "mcq",
      autoMark: true,
      correct: "C",
      options: ["A) Oxygen", "B) Carbon Dioxide", "C) Nitrogen", "D) Hydrogen"]
    },
    {
      id: 6,
      category: "Back to School",
      label: "Pythagorean theorem",
      type: "short",
      autoMark: false,
      hint: "Write as an equation e.g. a²+b²=c²"
    },
    {
      id: 7,
      category: "Back to School",
      label: "Unit of force",
      type: "mcq",
      autoMark: true,
      correct: "B",
      options: ["A) Watt", "B) Newton", "C) Joule", "D) Pascal"]
    },
    {
      id: 8,
      category: "Back to School",
      label: "Shirt original price",
      type: "number",
      autoMark: true,
      correct: "30000",
      hint: "Enter amount in TZS, numbers only"
    },
    {
      id: 9,
      category: "Back to School",
      label: "Organ producing insulin",
      type: "mcq",
      autoMark: true,
      correct: "C",
      options: ["A) Liver", "B) Kidney", "C) Pancreas", "D) Spleen"]
    },
    {
      id: 10,
      category: "Back to School",
      label: "Value of Pi",
      type: "short",
      autoMark: false,
      hint: "More digits = more points. Start with 3.14"
    },
    {
      id: 11,
      category: "Deen",
      label: "Dauat in Surat",
      type: "short",
      autoMark: false,
      hint: "Write the name"
    },
    {
      id: 12,
      category: "Deen",
      label: "Moula na Ali's battles",
      type: "checkbox",
      autoMark: true,
      correct: ["Jang-e-Siffin", "Jang-e-Jamal", "Jang-e-Nahrawan"],
      options: ["Jang-e-Siffin", "Jang-e-Jamal", "Jang-e-Nahrawan"],
      hint: "Select at least 2"
    },
    {
      id: 13,
      category: "Deen",
      label: "Firishtao na jhagra",
      type: "paragraph",
      autoMark: false,
      placeholder: "Likho...",
      hint: "Write any 2 of the 3 things the angels argued about"
    },
    {
      id: 14,
      category: "Deen",
      label: "Arabic word translations",
      type: "paragraph",
      autoMark: false,
      placeholder: "Nemat:\nHidayat:\nTaaat:\nRehmat:\nMagferat:\nTaqwa:\nYaqeen:\nTauba:\nKhushu:\nHikmat:",
      hint: "1 point per correct translation · 10 points total"
    },
    {
      id: 15,
      category: "Deen",
      label: "Surato in 30mo siparo",
      type: "number",
      autoMark: true,
      correct: "37",
      hint: "Enter a number"
    }
  ]
};
