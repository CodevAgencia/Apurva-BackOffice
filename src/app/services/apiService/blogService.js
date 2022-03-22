import { serialize } from 'object-to-formdata';
import blogRepository from '../../repository/blogRepository';

const blogService = {
  getBlogs: async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const blogs = await blogRepository.getBlogs();
      return userblogModel(blogs);
    } catch (error) {
      throw error;
    }
  },
  saveBlog: async (blog) => {
    // eslint-disable-next-line no-useless-catch
    try {
      // return await blogRepository.saveBlog(serialize(blog, { nullsAsUndefineds: true }));
      return await blogRepository.saveBlog(blog);
    } catch (error) {
      throw error;
    }
  },
  updateBlog: async (blog) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await blogRepository.updateBlog(
        serialize(blogRequestData(blog, { nullsAsUndefineds: true }))
      );
    } catch (error) {
      throw error;
    }
  },
  changeStateBlog: async (id) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await blogRepository.changeStateBlog(id);
    } catch (error) {
      throw error;
    }
  },
  getCategoriesBlog: async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await blogRepository.getCategoriesBlog();
    } catch (error) {
      throw error;
    }
  },
};

const blogRequestData = (dataVariant) => {
  dataVariant = dataVariant || {};

  return {
    ...dataVariant,
    _method: 'PUT',
  };
};

const userblogModel = (data) => {
  const structure = data.map((item) => {
    return {
      ...item,
      state: item?.state?.state?.includes('Habilitado'),
    };
  });
  return structure;
};

export default blogService;
