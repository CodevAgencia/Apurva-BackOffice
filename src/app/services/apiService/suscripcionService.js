import suscriptionRepository from '../../repository/suscripcionRepository';

const suscriptionService = {
  getSuscriptions: async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await suscriptionRepository.getSuscriptions();
    } catch (error) {
      throw error;
    }
  },
  saveSuscription: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await suscriptionRepository.saveSuscription(data);
    } catch (error) {
      throw error;
    }
  },
  updateSuscription: async (id, data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await suscriptionRepository.updateSuscription(id, data);
    } catch (error) {
      throw error;
    }
  },

  /* tipos y niveles para suscripciones */
  getTypesSuscriptions: async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await suscriptionRepository.getTypesSuscriptions();
    } catch (error) {
      throw error;
    }
  },
  getLevelsSuscriptions: async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await suscriptionRepository.getLevelsSuscriptions();
    } catch (error) {
      throw error;
    }
  },
};

export default suscriptionService;
