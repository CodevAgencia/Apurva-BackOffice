import http from '../services/http';

const getModuleSubscriptionUrl = '/api/v1/modules-subscription-by-subscription';
const saveModuleSubscriptionUrl = '/api/v1/module-subscription';
const deleteModuleSubscriptionUrl = '/api/v1/module-subscription';
const getModules = '/api/v1/modules-subs';

const moduleSubscriptionRepository = {
  getListModules: async (id) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.get(`${getModules}`);
    } catch (error) {
      throw error;
    }
  },
  getModuleSubscription: async (id) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.get(`${getModuleSubscriptionUrl}/${id}`);
    } catch (error) {
      throw error;
    }
  },
  saveModuleSubscription: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.post(`${saveModuleSubscriptionUrl}`, data);
    } catch (error) {
      throw error;
    }
  },
  deleteModuleSubscription: async (id) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.delete(`${deleteModuleSubscriptionUrl}/${id}`);
    } catch (error) {
      throw error;
    }
  },
};

export default moduleSubscriptionRepository;
