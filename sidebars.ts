import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  courseSidebar: [
    {
      type: 'category',
      label: 'Professional capability',
      collapsed: false,
      items: ['professional-articulation'],
    },
    {
      type: 'category',
      label: 'Commerce administration',
      collapsed: false,
      items: ['shopify-user-permissions'],
    },
    {
      type: 'category',
      label: 'Web deployment',
      collapsed: false,
      items: ['github-pages-setup'],
    },
    {
      type: 'category',
      label: 'Microsoft 365 administration',
      collapsed: false,
      items: ['microsoft-365-licenses'],
    },
  ],
};

export default sidebars;
