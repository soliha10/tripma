'use client';
import Image from 'next/image';
import logo from '@/app/assets/images/Wordmark.svg';
import appStore from '@/app/assets/images/app store.svg';
import google from '@/app/assets/images/google play.svg';
import { FaFacebookSquare, FaInstagram, FaTwitter } from 'react-icons/fa';
import styles from './Footer.module.css';

export default function Footer() {
  const about = ['About Tripma', 'How it works', 'Careers', 'Press', 'Blog', 'Forum'];
  const partner = [
    'Partnership programs',
    'Affiliate program',
    'Connectivity partners',
    'Promotions and events',
    'Integrations',
    'Community',
    'Loyalty program',
  ];
  const support = [
    'Help Center',
    'Contact us',
    'Privacy policy',
    'Terms of service',
    'Trust and safety',
    'Accessibility',
  ];
  const app = ['Tripma for Android', 'Tripma for iOS', 'Mobile site'];

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
                  <strong className={styles.header}>About</strong>
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
                  <strong className={styles.header}>Partner with us</strong>
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
                  <strong className={styles.header}>Support</strong>
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
                  <strong className={styles.header}>Get the app</strong>
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
                    <Image src={appStore} alt="App Store" width={135} height={40} />
                  </a>
                </li>
                <li>
                  <a href="">
                    <Image src={google} alt="Google Play" width={135} height={40} />
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
          <span className={styles.copy}>© 2020 Tripma incorporated</span>
        </div>
      </div>
    </footer>
  );
}
