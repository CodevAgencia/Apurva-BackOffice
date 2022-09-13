// eslint-disable-next-line import/prefer-default-export
import DocumentosAdjuntosModal from '../main/usuarios/content-dialog/DocumentosAdjuntosModal';
import ModuleModal from '../main/suscripciones/content-dialog/ModuleModal';
import BlogModal from '../main/blog/content-dialog/BlogModal';

export const mergeModulesNames = (modules) => {
  if (!modules || !modules?.[0]) return 'sin modulos';
  const modulesNames = modules.map((module) => module.module.name);
  return modulesNames.join(', ');
};

export const SelectModalContent = {
  userModalContent: <DocumentosAdjuntosModal />,
  suscriptionModalContent: <ModuleModal />,
  moduleModalContent: <ModuleModal />,
  blogModalContent: <BlogModal />,
};
