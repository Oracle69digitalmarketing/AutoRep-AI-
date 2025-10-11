"use client";

import React from 'react';
import Link from 'next/link';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../lib/i18n';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('en-NG')}>Pidgin</button>
    </div>
  );
};

const Navigation = () => {
  const { t } = useTranslation();

  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc', marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <Link href="/" style={{ marginRight: '20px' }}>{t('home')}</Link>
        <Link href="/funnel-builder" style={{ marginRight: '20px' }}>{t('funnelBuilder')}</Link>
        <Link href="/chat" style={{ marginRight: '20px' }}>{t('chat')}</Link>
      </div>
      <div>
        <Link href="/login" style={{ marginRight: '20px' }}>{t('login')}</Link>
        <Link href="/register" style={{ marginRight: '20px' }}>{t('register')}</Link>
        <LanguageSwitcher />
      </div>
    </nav>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <I18nextProvider i18n={i18n}>
      <html>
        <body>
          <Navigation />
          {children}
        </body>
      </html>
    </I18nextProvider>
  );
}