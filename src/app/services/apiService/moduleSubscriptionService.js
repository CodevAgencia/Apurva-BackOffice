import moduleSubscriptionRepository from '../../repository/moduleSubscriptionRepository';

const moduleSubscriptionService = {
  getModules: async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await moduleSubscriptionRepository.getListModules();
    } catch (error) {
      throw error;
    }
  },
  getModuleSubscription: async (id) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await moduleSubscriptionRepository.getModuleSubscription(id);
    } catch (error) {
      throw error;
    }
  },
  saveModuleSubscription: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await moduleSubscriptionRepository.saveModuleSubscription(StructureSaveModules(data));
    } catch (error) {
      throw error;
    }
  },
  deleteModelSubscription: async (id) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await moduleSubscriptionRepository.deleteModuleSubscription(id);
    } catch (error) {
      throw error;
    }
  },
};

const StructureSaveModules = (dataForm) => {
  const { idSuscription } = dataForm;
  return {
    modules: FindNameToModulesList(dataForm),
    subscription_id: idSuscription,
  };
};

const FindNameToModulesList = (dataObject) => {
  const { data, modules } = dataObject;
  const stringIdList = data.map((moduleName) => {
    const module = modules.find((d) => d.name === moduleName);
    return module.id;
  });

  return stringIdList.join(',');
};

export default moduleSubscriptionService;
