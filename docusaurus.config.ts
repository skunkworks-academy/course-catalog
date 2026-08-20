import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const GLOBAL_SHELL_LOADER_URL = 'https://skunkworksacademy.com/assets/academy-navigation.js?v=2026.08.15.1';

const config: Config = {
  title: 'Skunkworks Academy Course Catalog',
  tagline: 'Practical, evidence-led self-paced learning journeys',
  url: 'https://www.skunkworksacademy.com',
  baseUrl: '/',
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
      src: GLOBAL_SHELL_LOADER_URL,
      defer: true,
      'data-skunkworks-global-nav': 'v10',
    },
  ],
  customFields: {
    catalogUrl: 'https://www.skunkworksacademy.com/courses',
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
    prism: {
      additionalLanguages: ['bash', 'json', 'powershell'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
