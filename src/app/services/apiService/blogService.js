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
      const newBlog = await blogRepository.saveBlog(serialize(blog, { nullsAsUndefineds: true }));
      return updateBlogModel(newBlog);
    } catch (error) {
      throw error;
    }
  },
  updateBlog: async (blog) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const { id } = blog;
      const updateBlog = await blogRepository.updateBlog(
        id,
        serialize(blogRequestData(blog, { nullsAsUndefineds: true }))
      );
      return updateBlogModel(updateBlog);
    } catch (error) {
      throw error;
    }
  },
  changeStateBlog: async (id) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const updateStateBLog = await blogRepository.changeStateBlog(id);
      return updateBlogModel(updateStateBLog);
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
    id: dataVariant.id,
    title_en: dataVariant.title_en,
    title_es: dataVariant.title_es,
    description_en: dataVariant.description_en,
    description_es: dataVariant.description_es,
    knowledge_category_id: dataVariant.knowledge_category_id,
    image: dataVariant.image,
    _method: 'PUT',
  };
};

const userblogModel = (data) => {
  const structure = data.map((item) => {
    return {
      ...item,
      state: item?.state?.is_enabled,
    };
  });
  return structure;
};

const updateBlogModel = (data) => {
  data = data;
  return {
    ...data,
    state: data?.state?.is_enabled,
  };
};

export default blogService;
