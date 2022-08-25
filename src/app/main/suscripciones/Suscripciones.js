import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '../../../@fuse/hooks';
import FusePageCarded from '../../../@fuse/core/FusePageCarded/FusePageCarded';
import SharedModal from '../../shared-components/SharedModal';
import SuscripcionesHeader from './SuscripcionesHeader';
import SuscripcionTable from './SuscripcionTable';
import SuscripcionesSidebarHeader from './SuscripcionesSidebarHeader';
import SuscripcionesSidebarContent from './SuscripcionesSidebarContent';
import SuscripcionModal from './content-dialog/SuscripcionModal';
import { getSuscriptions } from '../../store/app/suscriptionSlice';

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

  const pageLayout = useRef(null);
  const routeParams = useParams();

  useDeepCompareEffect(() => {
    // dispatch(getTodos(routeParams));
  }, [dispatch, routeParams]);

  useEffect(() => {
    dispatch(getSuscriptions());
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
        content={<SuscripcionTable dataFilter={initialFakeData} />}
        leftSidebarHeader={<SuscripcionesSidebarHeader />}
        leftSidebarContent={<SuscripcionesSidebarContent categories={categories} />}
        ref={pageLayout}
        innerScroll
      />
      <SharedModal>
        <SuscripcionModal />
      </SharedModal>
    </>
  );
}

export default Suscripciones;
