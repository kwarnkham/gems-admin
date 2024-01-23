export default function useSpec () {
  const clarityGrades = [
    { value: 1, label: "FL" },
    { value: 2, label: "IF" },
    { value: 3, label: "VVS1" },
    { value: 4, label: "VVS2" },
    { value: 5, label: "VS1" },
    { value: 6, label: "VS2" },
    { value: 7, label: "SI1" },
    { value: 8, label: "SI2" },
    { value: 9, label: "I1" },
    { value: 10, label: "I2" },
    { value: 11, label: "I3" },
  ]

  const colorGrades = [
    { value: 1, label: "D" },
    { value: 2, label: "E" },
    { value: 3, label: "F" },
    { value: 4, label: "G" },
    { value: 5, label: "H" },
    { value: 6, label: "I" },
    { value: 7, label: "J" },
    { value: 8, label: "K" },
    { value: 9, label: "L" },
    { value: 10, label: "M" },
    { value: 11, label: "N" },
    { value: 12, label: "O-P" },
    { value: 13, label: "Q-R" },
    { value: 14, label: "S-T" },
    { value: 15, label: "U-V" },
    { value: 16, label: "W-X" },
    { value: 17, label: "Y-Z" },
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
