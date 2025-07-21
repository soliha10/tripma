'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import styles from '@/components/Main/Login/css/LanguageSwitcher.module.css';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'; // shadcn/ui Select

const languages = [
  { code: 'en', label: 'English', flag: 'EN' },
  { code: 'uz', label: 'O‘zbekcha', flag: 'UZ' },
  { code: 'ru', label: 'Русский', flag: 'RU' },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  // Sizdagi segmentlarni almashtirish funksiyasi
  const getPathWithLocale = (newLocale: string) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    // segments[0] = "", segments[1] = locale
    if (segments.length > 1 && ['en', 'uz', 'ru'].includes(segments[1])) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    return segments.join('/') || '/';
  };

  const handleChange = (newLocale: string) => {
    if (newLocale !== locale) {
      router.push(getPathWithLocale(newLocale));
    }
  };

  return (
    <div className={styles.languageSwitcher}>
      <Select value={locale} onValueChange={handleChange}>
        <SelectTrigger className={styles.languageButton} aria-label="Select language">
          <SelectValue>
            <span className={styles.flag}>{currentLanguage.flag}</span>
            <span className={styles.arrow}>▼</span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className={styles.languageDropdown}>
          {languages.map((language) => (
            <SelectItem
              key={language.code}
              value={language.code}
              className={`${styles.languageOption} ${
                language.code === locale ? styles.active : ''
              }`}
            >
              <span className={styles.flag}>{language.flag}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
