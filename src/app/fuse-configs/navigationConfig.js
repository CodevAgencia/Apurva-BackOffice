import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import authRoles from '../auth/authRoles';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'applications',
    title: 'Applications',
    translate: 'APPLICATIONS',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'usuarios-component',
        title: 'Usuarios',
        translate: 'Usuarios',
        type: 'item',
        icon: 'person',
        url: '/users',
        auth: authRoles.admin,
      },
      {
        id: 'blog-component',
        title: 'Blog',
        translate: 'Blog',
        type: 'item',
        icon: 'note',
        url: '/blog',
        auth: authRoles.admin,
      },
      {
        id: 'suscripciones-component',
        title: 'Suscripciones',
        translate: 'Suscripciones',
        type: 'item',
        icon: 'attach_money',
        url: '/subscription',
        auth: authRoles.admin,
      },
      {
        id: 'text-module-component',
        title: 'Textos',
        translate: 'Textos',
        type: 'item',
        icon: 'note',
        url: '/textos',
        auth: authRoles.admin,
      },
    ],
  },
];

export default navigationConfig;
