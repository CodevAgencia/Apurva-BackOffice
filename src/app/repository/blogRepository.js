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

const top100Films = [
  { id: 1, label: 'The Shawshank Redemption', year: 1994 },
  { id: 2, label: 'The Godfather', year: 1972 },
  { id: 3, label: 'The Godfather: Part II', year: 1974 },
  { id: 4, label: 'The Dark Knight', year: 2008 },
  { id: 5, label: '12 Angry Men', year: 1957 },
  { id: 6, label: "Schindler's List", year: 1993 },
  { id: 7, label: 'Pulp Fiction', year: 1994 },
];

export default blogRepository;
