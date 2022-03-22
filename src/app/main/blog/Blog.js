import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import SharedModal from '../../shared-components/SharedModal';
import BlogHeader from './BlogHeader';
import BlogTable from './BlogTable';
import BlogSidebarHeader from './BlogSidebarHeader';
import BlogSidebarContent from './BlogSidebarContent';
import BlogModal from './content-dialog/BlogModal';
import { getBlogs, selectBlogs } from '../../store/app/blogSlice';

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

function Blog(props) {
  const dispatch = useDispatch();
  const blogs = useSelector(selectBlogs);

  const pageLayout = useRef(null);
  const routeParams = useParams();

  useEffect(() => {
    dispatch(getBlogs());
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
        header={<BlogHeader pageLayout={pageLayout} />}
        contentToolbar=""
        content={<BlogTable blogs={blogs} />}
        leftSidebarHeader={<BlogSidebarHeader />}
        leftSidebarContent={<BlogSidebarContent categories={categories} />}
        ref={pageLayout}
        innerScroll
      />
      <SharedModal>
        <BlogModal />
      </SharedModal>
    </>
  );
}

export default Blog;
