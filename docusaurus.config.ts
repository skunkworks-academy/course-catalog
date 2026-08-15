import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Skunkworks Academy Course Catalog',
  tagline: 'Practical, evidence-led self-paced and instructor-led learning journeys',
  // The catalogue is served from the root of its verified custom domain.
  // A project-path base URL causes Docusaurus to reject the client bundle when
  // a learner opens https://catalog.skunkworksacademy.com/.
  url: 'https://catalog.skunkworksacademy.com',
  baseUrl: '/',
  organizationName: 'skunkworks-academy',
  projectName: 'course-catalog',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  markdown: {hooks: {onBrokenMarkdownLinks: 'throw'}},
  i18n: {defaultLocale: 'en', locales: ['en']},
  scripts: [{src: 'https://www.skunkworksacademy.com/assets/academy-navigation.js?v=2026.07.17.6', defer: true, 'data-skunkworks-global-nav': 'v8'}],
  customFields: {
    accessApi: 'https://skunkworks-instructor-portal-api-a5gxhyc2fvc7gmch.southafricanorth-01.azurewebsites.net/api/course-access',
    portalSignInUrl: 'https://portal.skunkworksacademy.com/signin',
    portalEnrollUrl: 'https://portal.skunkworksacademy.com/checkout/',
  },
  headTags: [{
    tagName: 'script',
    attributes: {},
    innerHTML: `(function () {
      if (window.location.hostname !== 'skunkworks-academy.github.io') return;
      var prefix = '/course-catalog';
      var path = window.location.pathname.indexOf(prefix) === 0
        ? window.location.pathname.slice(prefix.length) || '/'
        : window.location.pathname;
      window.location.replace('https://catalog.skunkworksacademy.com' + path + window.location.search + window.location.hash);
    }());`,
  }],
  plugins: ['./plugins/generated-course-pages'],
  presets: [['classic', {
    docs: {routeBasePath: 'courses', sidebarPath: './sidebars.ts', showLastUpdateAuthor: true, showLastUpdateTime: true, breadcrumbs: true},
    blog: false,
    theme: {customCss: './src/css/custom.css'},
    sitemap: {changefreq: 'weekly', priority: 0.7},
  } satisfies Preset.Options]],
  themeConfig: {
    image: 'img/skunkworks-academy-course-catalog.svg',
    metadata: [{name: 'author', content: 'Skunkworks Academy'}, {name: 'robots', content: 'index,follow,max-image-preview:large'}],
    navbar: {title: 'Skunkworks Academy', items: []},
    footer: {
      style: 'dark',
      links: [
        {title: 'Learning', items: [
          {label: 'Self-paced catalogue', href: 'https://www.skunkworksacademy.com/self-paced/'},
          {label: 'Instructor-led catalogue', href: 'https://www.skunkworksacademy.com/instructor-led/'},
          {label: 'Learner portal', href: 'https://portal.skunkworksacademy.com/'},
          {label: 'Labs', href: 'https://labs.skunkworksacademy.com/'},
        ]},
        {title: 'Support', items: [{label: 'Contact training', href: 'mailto:training@skunkworks.africa'}, {label: 'GitHub organisation', href: 'https://github.com/skunkworks-academy'}]},
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Skunkworks Academy. Dream. Design. Deliver.`,
    },
    prism: {additionalLanguages: ['bash', 'json', 'powershell']},
  } satisfies Preset.ThemeConfig,
};

export default config;
