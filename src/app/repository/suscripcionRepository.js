import http from '../services/http';

const getSuscriptionListUrl = '/api/v1/subscriptions';
const saveSuscriptionUrl = '/api/v1/subscription';
const updateSuscriptionUrl = '/api/v1/subscription';
const getSuscriptionTypeUrl = '/api/v1/subscriptions-type';
const getSuscriptionLevelUrl = '/api/v1/levels-suscriptions';

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
      return await http.post(`${saveSuscriptionUrl}`, data);
    } catch (error) {
      throw error;
    }
  },
  updateSuscription: async (id, data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.post(`${updateSuscriptionUrl}/${id}`, data);
    } catch (error) {
      throw error;
    }
  },

  /* tipos y niveles para suscripciones */
  getTypesSuscriptions: async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.get(`${getSuscriptionTypeUrl}`);
    } catch (error) {
      throw error;
    }
  },
  getLevelsSuscriptions: async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.get(`${getSuscriptionLevelUrl}`);
    } catch (error) {
      throw error;
    }
  },
};

export default suscriptionRepository;
