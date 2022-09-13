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
      return await suscriptionRepository.saveSuscription(saveSuscriptionStructure(data));
    } catch (error) {
      throw error;
    }
  },
  updateSuscription: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await suscriptionRepository.updateSuscription(
        data.id,
        updateSuscriptionStructure(data)
      );
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

const saveSuscriptionStructure = (data) => {
  return { ...data, price: Number(data.price) };
};

const updateSuscriptionStructure = (data) => {
  return {
    name_es: data.name_es,
    name_en: data.name_en,
    description_es: data.description_es,
    description_en: data.description_en,
    price: Number(data.price),
    period: data.period,
    active: data.active,
    level_id: data.level_id,
    type_id: data.type_id,
    _method: 'PUT',
  };
};

export default suscriptionService;
