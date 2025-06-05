// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Brandon\'s DB',
  tagline: 'Your Documentation Hub for Programming, 3D Printing, and More',
  favicon: 'favicon/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://db.brandgrand.rocks',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/BrandgrandRealMe/the-db/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        // The application ID provided by Algolia
        appId: 'XFKQOSKRJ9',
  
        // Public API key: it is safe to commit it
        apiKey: '0d6b56e82aada7e9a9f818961bf4af14',
  
        indexName: 'db-brandgrand',
      },
      // Replace with your project's social card
      image: 'img/brandons_db_social_card.png',
      navbar: {
        title: 'Brandon\'s DB',
        logo: {
          alt: 'My Site Logo',
          src: 'logos/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'DBSidebar',
            position: 'left',
            label: 'Home',
          },
          {
            href: '/discord',
            label: 'Discord Server',
            position: 'right',
          },
          {
            href: 'https://github.com/BrandgrandRealMe',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                href: 'https://blog.brandgrand.rocks/',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/BrandgrandRealMe/the-db',
              },
            ],
          },
          {
            title: 'Social',
            items: [
              {
                label: 'Discord',
                href: '/discord',
              },
            ],
          },
        ],
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
