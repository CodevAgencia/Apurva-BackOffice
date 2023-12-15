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
  updateText: async (data) => {
    try {
      return await http.put(`${updateUrl}/${data?.id}`, data, "application/json", "PUT");
    } catch (error) {
      console.log("update error: ", error);
      throw error;
    }
  },
};

export default textosRepository;
