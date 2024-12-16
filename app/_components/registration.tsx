"use client";

import { useState } from "react";
import ChooseLanguage from "@/app/_components/choose-language";
import FormRegistration from "@/app/_components/form-registration";
import { ChooseLanguage as ChooseLanguageType } from "@/types/types";
import { registerPageLanguage } from "@/lib/language";

export default function Registration() {
  const [lang, setLang] = useState<LanguageKeys | null>(null);

  type LanguageKeys = "fr" | "en";

  const language: Record<LanguageKeys, ChooseLanguageType> =
    registerPageLanguage;

  const handleSetLanguage = (lang: string) => {
    setLang(lang as LanguageKeys);
  };

  return (
    <>
      {lang ? (
        <FormRegistration {...language[lang || "en"]} />
      ) : (
        <ChooseLanguage handleSetLanguage={handleSetLanguage} />
      )}
    </>
  );
}
