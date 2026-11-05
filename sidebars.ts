import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  courseSidebar: [
    {
      type: 'category',
      label: 'Academic teaching and editorial practice',
      items: [
        {type: 'category', label: "Software Engineering Lecturer Practice", items: ['software-engineering-lecturer', 'software-engineering-lecturer/module-01-requirements-and-tests', 'software-engineering-lecturer/module-02-design-and-algorithms', 'software-engineering-lecturer/module-03-digital-image-processing', 'software-engineering-lecturer/module-04-teaching-capstone']},
        {type: 'category', label: "Mathematics for IT Lecturers", items: ['mathematics-for-it-lecturers', 'mathematics-for-it-lecturers/module-01-logic-and-proof', 'mathematics-for-it-lecturers/module-02-vectors-and-transforms', 'mathematics-for-it-lecturers/module-03-probability-and-evidence', 'mathematics-for-it-lecturers/module-04-teaching-capstone']},
        {type: 'category', label: "Academic Copy Editing and Source Verification", items: ['academic-copy-editing', 'academic-copy-editing/module-01-editorial-scope', 'academic-copy-editing/module-02-source-verification', 'academic-copy-editing/module-03-accessible-technical-editing', 'academic-copy-editing/module-04-editorial-capstone']},
        {type: 'category', label: "IT Lecturer Practice and Assessment", items: ['it-lecturer-practice', 'it-lecturer-practice/module-01-alignment-and-planning', 'it-lecturer-practice/module-02-lab-facilitation', 'it-lecturer-practice/module-03-assessment-and-moderation', 'it-lecturer-practice/module-04-teaching-capstone']},
        {type: 'category', label: "Robotics Lecturer Practice", items: ['robotics-lecturer-practice', 'robotics-lecturer-practice/module-01-motion-and-frames', 'robotics-lecturer-practice/module-02-feedback-control', 'robotics-lecturer-practice/module-03-state-machines-and-safety', 'robotics-lecturer-practice/module-04-teaching-capstone']},
        {type: 'category', label: "Security and Network Engineering Lecturer Practice", items: ['security-network-engineering-lecturer', 'security-network-engineering-lecturer/module-01-segmentation-and-addressing', 'security-network-engineering-lecturer/module-02-identity-and-protocols', 'security-network-engineering-lecturer/module-03-incident-diagnosis', 'security-network-engineering-lecturer/module-04-teaching-capstone']},
        {type: 'category', label: "IT Hardware and Software Lecturer Practice", items: ['hardware-software-lecturer', 'hardware-software-lecturer/module-01-architecture-and-measurement', 'hardware-software-lecturer/module-02-operating-system-diagnosis', 'hardware-software-lecturer/module-03-java-data-structures', 'hardware-software-lecturer/module-04-teaching-capstone']},
        {type: 'category', label: "Python Programming Lecturer Practice", items: ['python-programming-lecturer', 'python-programming-lecturer/module-01-execution-and-data', 'python-programming-lecturer/module-02-contracts-and-errors', 'python-programming-lecturer/module-03-files-and-tests', 'python-programming-lecturer/module-04-teaching-capstone']},
      ],
    },
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
      items: [
        {
          type: 'category',
          label: 'GitHub Pages Setup — 7 visual modules',
          collapsed: false,
          items: [
            'github-pages-setup',
            'github-pages-setup/module-01-deployment-model',
            'github-pages-setup/module-02-actions-deployment',
            'github-pages-setup/module-03-custom-domain-dns',
            'github-pages-setup/module-04-https-security',
            'github-pages-setup/module-05-troubleshooting',
            'github-pages-setup/module-06-operations',
            'github-pages-setup/module-07-capstone',
          ],
        },
        'easyfile-domain-setup',
      ],
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
