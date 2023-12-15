import { Navigate } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import Error404Page from 'app/main/404/Error404Page';
import UsuariosConfig from '../main/usuarios/UsuariosConfig';
import BlogConfig from '../main/blog/BlogConfig';
import TextosConfig from '../main/textos/TextosConfig';
import SuscripcionesConfig from '../main/suscripciones/SuscripcionesConfig';
import LoginConfig from '../main/login/LoginConfig';

const routeConfigs = [LoginConfig, UsuariosConfig, BlogConfig, SuscripcionesConfig, TextosConfig];

const routes = [
  // if you want to make whole app auth protected by default change defaultAuth for example:
  // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
  // The individual route configs which has auth option won't be overridden.
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin']),
  {
    path: '/',
    element: <Navigate to="/users" />,
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: '404',
    element: <Error404Page />,
  },
  {
    path: '*',
    element: <Navigate to="404" />,
  },
];

export default routes;
