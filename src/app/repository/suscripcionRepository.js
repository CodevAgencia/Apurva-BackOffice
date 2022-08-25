import http from '../services/http';

const getSuscriptionListUrl = '/api/v1/subscriptions';
const updateSuscriptionUrl = '/api/v1/subscription';

const suscriptionRepository = {
  getSuscriptions: async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.get(`${getSuscriptionListUrl}`);
    } catch (error) {
      throw error;
    }
  },
  saveSuscription: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.post(`${updateSuscriptionUrl}`, data);
    } catch (error) {
      throw error;
    }
  },
  updateSuscription: async (id, data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.get(`${updateSuscriptionUrl}/${id}`, data);
    } catch (error) {
      throw error;
    }
  },
};

export default suscriptionRepository;
