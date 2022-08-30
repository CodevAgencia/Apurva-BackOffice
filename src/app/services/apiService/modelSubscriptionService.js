import modelSubscriptionRepository from '../../repository/modelSubscriptionRepository';

const modelSubscriptionService = {
  getModelSubscription: async (id) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await modelSubscriptionRepository.getModelSubscription(id);
    } catch (error) {
      throw error;
    }
  },
  saveModelSubscription: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await modelSubscriptionRepository.saveModelSubscription(data);
    } catch (error) {
      throw error;
    }
  },
  deleteModelSubscription: async (id) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await modelSubscriptionRepository.deleteModelSubscription(id);
    } catch (error) {
      throw error;
    }
  },
};

export default modelSubscriptionService;
