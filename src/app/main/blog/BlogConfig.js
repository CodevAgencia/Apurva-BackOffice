import Blog from './Blog';

const BlogConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  // auth: authRoles.admin,
  routes: [
    {
      path: '/blog',
      element: <Blog />,
    },
  ],
};

export default BlogConfig;
