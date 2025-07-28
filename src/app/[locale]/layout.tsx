import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { FlightProvider } from '@/context/FlightContext';
import { AuthProvider } from '@/context/AuthContext';
import './globals.css';
import { Nunito_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';
const nunitoSans = Nunito_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-nunito-sans',
});
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={cn(nunitoSans.className, 'antialiased')}>
        <NextIntlClientProvider>
          <AuthProvider>
            <FlightProvider>{children}</FlightProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
