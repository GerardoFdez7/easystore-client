import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@lib/utils/ThemeProvider';
import { ApolloWrapper } from '@lib/apollo/apollo-provider';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@i18n/routing';
import './globals.css';

// Load Inter font with all weights
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'EasyStore',
  description:
    'Want an ecommerce website, but doesnt know programming? We got you covered!',
};

export default async function RootLayout({
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
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ApolloWrapper>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NextIntlClientProvider>{children}</NextIntlClientProvider>
          </ThemeProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
