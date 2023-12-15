import http from '../services/http';

const listUrl = '/api/v1/text/modules';
const updateUrl = '/api/v1/text/module';

const textosRepository = {
  getTexts: async () => {
    try {
      return await http.get(`${listUrl}`);
    } catch (error) {
      throw error;
    }
  },
  updateText: async (id) => {
    try {
      return await http.get(`${updateUrl}/${id}`);
    } catch (error) {
      throw error;
    }
  },
};

export default textosRepository;
