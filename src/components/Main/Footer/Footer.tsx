'use client';
import Image from 'next/image';
import logo from '@/app/[locale]/assets/images/Wordmark.svg';
import appStore from '@/app/[locale]/assets/images/app store.svg';
import google from '@/app/[locale]/assets/images/google play.svg';
import { FaFacebookSquare, FaInstagram, FaTwitter } from 'react-icons/fa';
import styles from './Footer.module.css';
import { useTranslations } from 'next-intl';
export default function Footer() {
  const t = useTranslations('Footer');
  const about = [t('about'), t('howItWorks'), t('careers'), t('press'), t('blog'), t('forum')];
  const partner = [
    t('partnershipPrograms'),
    t('affiliateProgram'),
    t('connectivityPartners'),
    t('promotionsAndEvents'),
    t('integrations'),
    t('community'),
    t('loyaltyProgram'),
  ];
  const support = [
    t('helpCenter'),
    t('contactUs'),
    t('privacyPolicy'),
    t('termsOfService'),
    t('trustAndSafety'),
    t('accessibility'),
  ];
  const app = [t('tripmaForAndroid'), t('tripmaForIOS'), t('mobileSite')];

  return (
    <footer>
      <div className={styles.borderBottom}>
        <div className={styles.container}>
          <div className={styles.topSection}>
            <a href="">
              <Image src={logo} alt="Tripma Logo" width={131} height={54} />
            </a>

            <div className={styles.footItemsWrapper}>
              <ul className={styles.column}>
                <li>
                  <strong className={styles.header}>{t('aboutTitle')}</strong>
                </li>
                {about.map((item, index) => (
                  <li key={index}>
                    <a href="" className={styles.link}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>

              <ul className={styles.column}>
                <li>
                  <strong className={styles.header}>{t('partnerTitle')}</strong>
                </li>
                {partner.map((item, index) => (
                  <li key={index}>
                    <a href="" className={styles.link}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>

              <ul className={styles.column}>
                <li>
                  <strong className={styles.header}>{t('supportTitle')}</strong>
                </li>
                {support.map((item, index) => (
                  <li key={index}>
                    <a href="" className={styles.link}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>

              <ul className={styles.column}>
                <li>
                  <strong className={styles.header}>{t('getAppTitle')}</strong>
                </li>
                {app.map((item, index) => (
                  <li key={index}>
                    <a href="" className={styles.link}>
                      {item}
                    </a>
                  </li>
                ))}
                <li className={styles.storeImage}>
                  <a href="">
                    <Image src={appStore} alt={t('appStore')} width={135} height={40} />
                  </a>
                </li>
                <li>
                  <a href="">
                    <Image src={google} alt={t('googlePlay')} width={135} height={40} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.bottomSection}>
          <ul className={styles.socialIcons}>
            <li>
              <a href="" aria-label="Twitter">
                <FaTwitter className={styles.socialIcon} />
              </a>
            </li>
            <li>
              <a href="" aria-label="Instagram">
                <FaInstagram className={styles.socialIcon} />
              </a>
            </li>
            <li>
              <a href="" aria-label="Facebook">
                <FaFacebookSquare className={styles.socialIcon} />
              </a>
            </li>
          </ul>
          <span className={styles.copy}>{t('copyright')}</span>
        </div>
      </div>
    </footer>
  );
}
