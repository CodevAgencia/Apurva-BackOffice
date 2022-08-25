import suscriptionRepository from '../../repository/suscripcionRepository';

const suscriptionService = {
  getSuscriptions: async () => {
    try {
      return await suscriptionRepository.getSuscriptions();
    } catch (error) {
      throw error;
    }
  },
};

export default suscriptionService;
