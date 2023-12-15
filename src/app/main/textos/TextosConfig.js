import Textos from './Textos';

const TextosConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  // auth: authRoles.admin,
  routes: [
    {
      path: '/textos',
      // component: lazy(() => import('./Usuarios')),
      element: <Textos />,
    },
  ],
};

export default TextosConfig;
