'use client';
import Image from 'next/image';
import { useState } from 'react';
import close from '@/app/[locale]/assets/images/x-close-no.svg';
import logo from '@/app/[locale]/assets/images/Wordmark.svg';
import menuIcon from '@/app/[locale]/assets/images/menu.svg'; // Assumed menu icon path
import LoginModal from './LoginModal';
import styles from './css/LoginHeader.module.css';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
// import { useTranslations } from 'next-intl';

export default function LoginHeader() {
  // const t = useTranslations('HomePage');
  const [isVisible, setIsVisible] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu toggle

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  // const router = useRouter();
  // const pathName = usePathname();
  // const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
  //   const newLocale = e.target.value as string;
  //   const path = pathName.split('/').slice(2).join('/');
  //   router.push(`${newLocale}/${path}`);
  // };
  return (
    <header>
      {isVisible && (
        <div className={styles.headerBanner}>
          <div className={styles.bannerWrapper}>
            <div className={styles.bannerContent}>
              <p className={styles.bannerText}>
                Join Tripma today and save up to 20% on your flight using code TRAVEL at checkout.
                Promotion valid for new users only.
              </p>
              <Image
                src={close}
                alt="close"
                width={32}
                height={32}
                className={styles.closeIcon}
                onClick={() => setIsVisible(false)}
              />
            </div>
          </div>
        </div>
      )}

      <div className={styles.mainWrapper}>
        <div className={styles.headerMain}>
          <a href="">
            <Image src={logo} alt="Tripma logo" width={131} height={54} className={styles.logo} />
          </a>
          <button type="button" className={styles.menuToggle} onClick={toggleMenu}>
            <Image src={menuIcon} alt="menu" width={32} height={32} className={styles.menuIcon} />
          </button>
          <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
            <ul className={styles.navList}>
              <li>
                <a href="" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                  Flights
                </a>
              </li>
              <li>
                <a href="" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                  Hotels
                </a>
              </li>
              <li>
                <a href="" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                  Packages
                </a>
              </li>
              <li>
                <button
                  type="button"
                  className={styles.signIn}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign in
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={styles.signUp}
                  onClick={() => {
                    setIsOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  Sign up
                </button>
              </li>
            </ul>
          </nav>
          <Select>
            <SelectTrigger className={styles.selectTriggerGo}>
              <SelectValue placeholder="Lang" />
            </SelectTrigger>
            <SelectContent className={styles.selectContent}>
              {/* {routing.locales.map((lang) => (
                <SelectItem key={lang} value={lang} className={styles.selectItem}>
                  <Link href={`/${lang}`}> {lang}</Link>
                </SelectItem>
              ))} */}
              <SelectItem value="en" className={styles.selectItem}>
                <Link href="/en">en</Link>
              </SelectItem>
              <SelectItem value="uz" className={styles.selectItem}>
                <Link href="/uz">uz</Link>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isOpen && (
        <ul>
          <LoginModal onClose={() => setIsOpen(false)} />
        </ul>
      )}
    </header>
  );
}
