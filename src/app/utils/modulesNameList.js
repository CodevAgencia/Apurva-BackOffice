// eslint-disable-next-line import/prefer-default-export
import DocumentosAdjuntosModal from '../main/usuarios/content-dialog/DocumentosAdjuntosModal';
import SubscriptionDialog from '../main/usuarios/content-dialog/SubscriptionDialog';
import ModuleModal from '../main/suscripciones/content-dialog/ModuleModal';
import BlogModal from '../main/blog/content-dialog/BlogModal';
import { TruncateString } from './TruncateString';
import SuscripcionModal from '../main/suscripciones/content-dialog/SuscripcionModal';

export const mergeModulesNames = (modules) => {
  if (!modules || !modules?.[0]) return 'sin modulos';
  const modulesNames = modules.map((module) => module.module.name).join(', ');
  if (modulesNames.length > 25) return TruncateString(modulesNames, 25);
  return modulesNames;
};

export const SelectModalContent = {
  userSubscriptionContent: <SubscriptionDialog />,
  userModalContent: <DocumentosAdjuntosModal />,
  suscriptionModalContent: <SuscripcionModal />,
  moduleModalContent: <ModuleModal />,
  blogModalContent: <BlogModal />,
};
