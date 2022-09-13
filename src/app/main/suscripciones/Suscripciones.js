import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '../../../@fuse/hooks';
import FusePageCarded from '../../../@fuse/core/FusePageCarded/FusePageCarded';
import SharedModal from '../../shared-components/SharedModal';
import SuscripcionesHeader from './SuscripcionesHeader';
import SuscripcionTable from './SuscripcionTable';
import SuscripcionesSidebarHeader from './SuscripcionesSidebarHeader';
import SuscripcionesSidebarContent from './SuscripcionesSidebarContent';
import {
  getSuscriptions,
  getSuscriptionsLevels,
  getSuscriptionsTypes,
  selectSuscriptions,
} from '../../store/app/suscriptionSlice';

const initialFakeData = [
  {
    id: 1,
    codigo: 'codigo',
    nombre: 'Pedro del Castillo Rojas',
    periodidad: 'periodo',
    foto: 'assets/images/avatars/Abbott.jpg',
    descripcion: 'descripción',
    valor: 'valor',
    modulos: 'modulos',
    status: 1,
  },
  {
    id: 2,
    codigo: 'codigo',
    nombre: 'Rojas',
    periodidad: 'periodo',
    foto: 'assets/images/avatars/Abbott.jpg',
    descripcion: 'descripción',
    valor: 'valor',
    modulos: 'modulos',
    status: 0,
  },
  {
    id: 3,
    codigo: 'codigo',
    nombre: 'Juan Castillo',
    periodidad: 'periodo',
    foto: 'assets/images/avatars/Abbott.jpg',
    descripcion: 'descripción',
    valor: 'valor',
    modulos: 'modulos',
    status: 0,
  },
];

const categories = [
  {
    id: 1,
    category: 'Activo',
  },
  {
    id: 2,
    category: 'Inactivo',
  },
];

function Suscripciones(props) {
  const dispatch = useDispatch();
  const subscriptions = useSelector(selectSuscriptions);
  const optionsDialog = useSelector(({ fuse }) => fuse.dialog.options);
  const [dialogType, setDialogType] = useState();

  const pageLayout = useRef(null);
  const routeParams = useParams();

  useEffect(() => {
    setDialogType(optionsDialog.module);
  }, [optionsDialog]);

  useDeepCompareEffect(() => {
    // dispatch(getTodos(routeParams));
  }, [dispatch, routeParams]);

  useEffect(() => {
    dispatch(getSuscriptions());
    dispatch(getSuscriptionsTypes());
    dispatch(getSuscriptionsLevels());
  }, [dispatch]);

  return (
    <>
      <FusePageCarded
        classes={{
          root: 'w-full',
          contentCard: 'overflow-hidden',
          header: 'items-center min-h-72 h-72 sm:h-136 sm:min-h-136',
        }}
        header={<SuscripcionesHeader pageLayout={pageLayout} />}
        contentToolbar=""
        content={<SuscripcionTable dataFilter={subscriptions} />}
        leftSidebarHeader={<SuscripcionesSidebarHeader />}
        leftSidebarContent={<SuscripcionesSidebarContent categories={categories} />}
        ref={pageLayout}
        innerScroll
      />
      <SharedModal />
    </>
  );
}

export default Suscripciones;
