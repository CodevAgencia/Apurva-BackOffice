import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import UsuariosHeader from './UsuariosHeader';
import UsuariosSidebarHeader from './UsuariosSidebarHeader';
import SharedModal from '../../shared-components/SharedModal';
import UsuariosSidebarContent from './UsuarioSidebarContent';
import DocumentosAdjuntosModal from './content-dialog/DocumentosAdjuntosModal';
import UsuariosTable from './UsuariosTable';
import { getUsers, selectUsers } from '../../store/app/usuarioSlice';

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

function Usuarios(props) {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  const pageLayout = useRef(null);
  const routeParams = useParams();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useDeepCompareEffect(() => {
    // dispatch(getTodos(routeParams));
  }, [dispatch, routeParams]);

  return (
    <>
      <FusePageCarded
        classes={{
          root: 'w-full',
          contentCard: 'overflow-hidden',
          header: 'items-center min-h-72 h-72 sm:h-136 sm:min-h-136',
        }}
        header={<UsuariosHeader pageLayout={pageLayout} />}
        contentToolbar=""
        content={<UsuariosTable users={users} />}
        leftSidebarHeader={<UsuariosSidebarHeader />}
        leftSidebarContent={<UsuariosSidebarContent categories={categories} />}
        ref={pageLayout}
        innerScroll
      />
      <SharedModal>
        <DocumentosAdjuntosModal />
      </SharedModal>
    </>
  );
}

export default Usuarios;
