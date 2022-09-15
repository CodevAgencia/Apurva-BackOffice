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
      const saveData = handleSaveAction(data);

      return await moduleSubscriptionRepository.saveModuleSubscription(saveData);
    } catch (error) {
      throw error;
    }
  },
  deleteModelSubscription: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await moduleSubscriptionRepository.deleteModuleSubscription(data);
    } catch (error) {
      throw error;
    }
  },
};

const handleSaveAction = (data) => {
  const { action } = data;

  if (action === 'new') return StructureSaveModules(data);
  return handleFilterNewModulesToSave(data);
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

// suscriptionModules: LISTA DE MODULOS QUE YA TIENE LA SUSCRIPCION
// formModulesSelected: LISTA QUE MANDA EL USUARIO DESDE EL FORMULARIO
// return: UNA LISTA CON LOS NUEVOS MODULOS QUE SE TIENE QUE AGREGAR
const handleFilterNewModulesToSave = (data) => {
  const { modules, formModulesSelected, suscriptionModules, idSuscription } = data;

  const newModulesToSave = formModulesSelected.filter((item) => !suscriptionModules.includes(item));

  const newData = {
    data: newModulesToSave,
    modules,
    idSuscription,
  };

  return StructureSaveModules(newData);
};

export default moduleSubscriptionService;
