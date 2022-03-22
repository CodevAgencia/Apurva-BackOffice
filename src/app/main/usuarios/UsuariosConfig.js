import Usuarios from './Usuarios';

const UsuariosConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  // auth: authRoles.admin,
  routes: [
    {
      path: '/users',
      // component: lazy(() => import('./Usuarios')),
      element: <Usuarios />,
    },
  ],
};

export default UsuariosConfig;
