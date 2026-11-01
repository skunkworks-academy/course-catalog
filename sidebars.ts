import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  courseSidebar: [
    {
      type: 'category',
      label: 'Commerce administration',
      collapsed: false,
      items: ['shopify/user-permissions', 'shopify/store-operations'],
    },
    {
      type: 'category',
      label: 'Web deployment',
      collapsed: false,
      items: ['github-pages-setup', 'easyfile-domain-setup'],
    },
    {
      type: 'category',
      label: 'Data analytics',
      collapsed: false,
      items: ['data-outlier-analysis'],
    },
    {
      type: 'category',
      label: 'Programming and certification',
      collapsed: false,
      items: ['python-certification-prep'],
    },
    {
      type: 'category',
      label: 'Professional and business skills',
      collapsed: false,
      items: ['professional-articulation', 'professional-articulation-resources'],
    },
    {
      type: 'category',
      label: 'Microsoft 365 administration',
      collapsed: false,
      items: ['microsoft-365-licenses'],
    },
    {
      type: 'category',
      label: 'Cybersecurity and intelligence',
      collapsed: false,
      items: ['open-source-intelligence-gathering'],
    },
    {
      type: 'category',
      label: 'Learning experience design',
      collapsed: false,
      items: ['evidence-based-slide-design-digital-learning'],
    },
    {
      type: 'category',
      label: 'Affiliate marketing and digital commerce',
      collapsed: false,
      items: [
        'affiliate-marketing-foundations',
        'affiliate-traffic-and-list-building',
        'affiliate-campaign-operations-and-compliance',
      ],
    },
  ],
};

export default sidebars;
