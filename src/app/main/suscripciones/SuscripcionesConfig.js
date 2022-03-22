import Suscripciones from './Suscripciones';

const SuscripcionesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  // auth: authRoles.admin,
  routes: [
    {
      path: '/subscription',
      element: <Suscripciones />,
    },
  ],
};

export default SuscripcionesConfig;
