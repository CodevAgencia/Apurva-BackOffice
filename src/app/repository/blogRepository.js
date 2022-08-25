import http from '../services/http';

const getBlogsListUrl = '/api/v1/list/knowledge/admin';
const crudBlogUrl = '/api/v1/knowledge';
const updateStateBlogUrl = '/api/v1/state/knowledge';
const getCategoryBlogUrl = '/api/v1/knowledgeCategories';

const blogRepository = {
  getBlogs: async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.get(`${getBlogsListUrl}`);
    } catch (error) {
      throw error;
    }
  },
  saveBlog: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.post(`${crudBlogUrl}`, data);
    } catch (error) {
      throw error;
    }
  },
  updateBlog: async (id, data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.put(`${crudBlogUrl}/${id}`, data);
    } catch (error) {
      throw error;
    }
  },
  changeStateBlog: async (id) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.get(`${updateStateBlogUrl}/${id}`);
    } catch (error) {
      throw error;
    }
  },
  getCategoriesBlog: async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.get(`${getCategoryBlogUrl}`, '', { 'Accept-Language': 'es' });
      // return top100Films;
    } catch (error) {
      throw error;
    }
  },
};

export default blogRepository;
