import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  courseSidebar: [
    {
      type: 'category',
      label: 'Programming and data',
      collapsed: false,
      items: ['python-certification-prep', 'data-outlier-analysis'],
    },
    {
      type: 'category',
      label: 'EasyFile operations',
      collapsed: false,
      items: ['easyfile-domain-setup'],
    },
    {
      type: 'category',
      label: 'Professional capability',
      collapsed: false,
      items: ['professional-articulation', 'professional-articulation-resources'],
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
