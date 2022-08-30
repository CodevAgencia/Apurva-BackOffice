import http from '../services/http';

const getModelSubscriptionUrl = '/api/v1/modules-subscription-by-subscription';
const saveModelSubscriptionUrl = '/api/v1/module-subscription';
const deleteModelSubscriptionUrl = '/api/v1/module-subscription';

const modelSubscriptionRepository = {
  getModelSubscription: async (id) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.get(`${getModelSubscriptionUrl}/${id}`);
    } catch (error) {
      throw error;
    }
  },
  saveModelSubscription: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.post(`${saveModelSubscriptionUrl}`, data);
    } catch (error) {
      throw error;
    }
  },
  deleteModelSubscription: async (id) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.delete(`${deleteModelSubscriptionUrl}/${id}`);
    } catch (error) {
      throw error;
    }
  },
};

export default modelSubscriptionRepository;
