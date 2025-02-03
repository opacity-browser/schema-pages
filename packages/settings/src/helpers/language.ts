export type LanguageName =
  | "English"
  | "Norwegian"
  | "Hindi"
  | "Korean"
  | "Chinese"
  | "German"
  | "Japanese"
  | "Spanish"
  | "French"
export type LanguageCode =
  | "en"
  | "nb"
  | "hi"
  | "ko"
  | "zh"
  | "de"
  | "ja"
  | "es"
  | "fr"

const languageMap: Record<LanguageName, LanguageCode> = {
  English: "en",
  Norwegian: "nb",
  Hindi: "hi",
  Korean: "ko",
  Chinese: "zh",
  German: "de",
  Japanese: "ja",
  Spanish: "es",
  French: "fr"
}

const codeToLanguageMap: Record<LanguageCode, LanguageName> =
  Object.fromEntries(
    Object.entries(languageMap).map(([language, code]) => [code, language])
  ) as Record<LanguageCode, LanguageName>

export const getLanguageCode = (language: LanguageName): LanguageCode => {
  return languageMap[language]
}

export const getLanguageName = (code: LanguageCode): LanguageName => {
  return codeToLanguageMap[code]
}
