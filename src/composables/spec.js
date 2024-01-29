import { computed } from "vue"
import { useI18n } from "vue-i18n"

export default function useSpec () {
  const { t } = useI18n()
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

  const colorGrades = computed(() => [
    { value: 1, label: "D", grade: t('colorless') },
    { value: 2, label: "E", grade: t('colorless') },
    { value: 3, label: "F", grade: t('colorless') },
    { value: 4, label: "G", grade: t('nearColorless') },
    { value: 5, label: "H", grade: t('nearColorless') },
    { value: 6, label: "I", grade: t('nearColorless') },
    { value: 7, label: "J", grade: t('nearColorless') },
    { value: 8, label: "K", grade: t('faint') },
    { value: 9, label: "L", grade: t('faint') },
    { value: 10, label: "M", grade: t('faint') },
    { value: 11, label: "N", grade: t('veryLight') },
    { value: 12, label: "O-P", grade: t('veryLight') },
    { value: 13, label: "Q-R", grade: t('veryLight') },
    { value: 14, label: "S-T", grade: t('light') },
    { value: 15, label: "U-V", grade: t('light') },
    { value: 16, label: "W-X", grade: t('light') },
    { value: 17, label: "Y-Z", grade: t('light') },
  ])

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
