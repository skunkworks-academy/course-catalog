import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Skunkworks Academy Course Catalog',
  tagline: 'Practical, evidence-led self-paced learning journeys',
  url: 'https://skunkworks-academy.github.io',
  baseUrl: '/course-catalog/',
  organizationName: 'skunkworks-academy',
  projectName: 'course-catalog',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  scripts: [
    {
      src: 'https://www.skunkworksacademy.com/assets/academy-navigation.js?v=2026.07.17.6',
      defer: true,
      'data-skunkworks-global-nav': 'v8',
    },
  ],
  customFields: {
    accessApi: 'https://portal.skunkworksacademy.com/api/course-access',
    portalSignInUrl: 'https://portal.skunkworksacademy.com/signin',
    portalEnrollUrl: 'https://portal.skunkworksacademy.com/checkout/',
  },
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: 'courses',
          sidebarPath: './sidebars.ts',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          breadcrumbs: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.7,
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: 'img/skunkworks-academy-course-catalog.svg',
    metadata: [
      {name: 'author', content: 'Skunkworks Academy'},
      {name: 'robots', content: 'index,follow,max-image-preview:large'},
    ],
    navbar: {
      title: 'Skunkworks Academy',
      items: [],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learning',
          items: [
            {label: 'Self-paced catalogue', href: 'https://www.skunkworksacademy.com/self-paced/'},
            {label: 'Learner portal', href: 'https://portal.skunkworksacademy.com/'},
            {label: 'Labs', href: 'https://labs.skunkworksacademy.com/'},
          ],
        },
        {
          title: 'Support',
          items: [
            {label: 'Contact training', href: 'mailto:training@skunkworks.africa'},
            {label: 'GitHub organisation', href: 'https://github.com/skunkworks-academy'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Skunkworks Academy. Dream. Design. Deliver.`,
    },
    prism: {
      additionalLanguages: ['bash', 'json', 'powershell'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
