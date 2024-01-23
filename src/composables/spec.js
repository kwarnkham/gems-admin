export default function useSpec () {
  const clarityGrades = [
    { value: 1, label: "FL", grade: "Flawless" },
    { value: 2, label: "IF", grade: "Internally Flawless" },
    { value: 3, label: "VVS1", grade: "Very Very Slightly Included" },
    { value: 4, label: "VVS2", grade: "Very Very Slightly Included" },
    { value: 5, label: "VS1", grade: "Very Slightly Included" },
    { value: 6, label: "VS2", grade: "Very Slightly Included" },
    { value: 7, label: "SI1", grade: "Slightly Included" },
    { value: 8, label: "SI2", grade: "Slightly Included" },
    { value: 9, label: "I1", grade: "Included" },
    { value: 10, label: "I2", grade: "Included" },
    { value: 11, label: "I3", grade: "Included" },
  ]

  const colorGrades = [
    { value: 1, label: "D", grade: "Colorless" },
    { value: 2, label: "E", grade: "Colorless" },
    { value: 3, label: "F", grade: "Colorless" },
    { value: 4, label: "G", grade: "Near Colorless" },
    { value: 5, label: "H", grade: "Near Colorless" },
    { value: 6, label: "I", grade: "Near Colorless" },
    { value: 7, label: "J", grade: "Near Colorless" },
    { value: 8, label: "K", grade: "Faint" },
    { value: 9, label: "L", grade: "Faint" },
    { value: 10, label: "M", grade: "Faint" },
    { value: 11, label: "N", grade: "Very Light" },
    { value: 12, label: "O-P", grade: "Very Light" },
    { value: 13, label: "Q-R", grade: "Very Light" },
    { value: 14, label: "S-T", grade: "Light" },
    { value: 15, label: "U-V", grade: "Light" },
    { value: 16, label: "W-X", grade: "Light" },
    { value: 17, label: "Y-Z", grade: "Light" },
  ]

  const cutGrades = [
    { value: 1, label: "Excellent" },
    { value: 2, label: "Very Good" },
    { value: 3, label: "Good" },
    { value: 4, label: "Fair" },
    { value: 5, label: "Poor" },
  ]

  const colorless = [1, 2, 3]
  const nearColorless = [4, 5, 6, 7]
  const faint = [8, 9, 10]
  const veryLight = [11, 12, 13]
  const light = [14, 15, 16, 17]

  return {
    cutGrades,
    faint,
    clarityGrades,
    colorGrades,
    colorless,
    nearColorless,
    veryLight,
    light
  }
}
