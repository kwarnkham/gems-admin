import { useQuasar } from "quasar";
import { onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import languages from 'quasar/lang/index.json'
import { useRoute } from "vue-router";

export default function useLocale () {
  const route = useRoute()
  const { lang } = useQuasar();
  const { locale } = useI18n({ useScope: "global" });
  const language = ref(lang.isoName);
  const appLanguages = languages.filter((lang) =>
    ["en-US", "zh-CN", "mm"].includes(lang.isoName)
  );
  const langOptions = appLanguages.map((lang) => ({
    label: lang.nativeName,
    value: lang.isoName,
  }));

  watch(language, () => {
    const langList = import.meta.glob(
      "../../node_modules/quasar/lang/(mm|en-US|zh-CN).mjs"
    );
    try {
      langList[`../../node_modules/quasar/lang/${language.value}.mjs`]().then(
        (imported) => {
          lang.set(imported.default);
          locale.value = language.value;
        }
      );
    } catch (err) {
      console.warn(err);
    }
  });

  onMounted(() => {
    const queryLocale = route.query.locale
    if (queryLocale && langOptions.find(e => e.value == queryLocale) != null) language.value = queryLocale
  })


  return {
    language,
    langOptions,
    locale
  }
}
