import usuarioRepository from '../../repository/usuarioRepository';

const usuarioService = {
  getUsers: async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const users = await usuarioRepository.getUsers();
      // console.log(userModel(users));
      return usersModel(users);
    } catch (error) {
      throw error;
    }
  },
  updateStateUser: async (id) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const updateUser = await usuarioRepository.updateState(id);
      return updateUserModel(updateUser);
    } catch (error) {
      throw error;
    }
  },
};

const usersModel = (data) => {
  const structure = data.map((item) => {
    return {
      ...item,
      state: item?.state?.state.includes('Habilitado'),
    };
  });
  return structure;
};

const updateUserModel = (data) => {
  return {
    ...data,
    state: data?.state?.state.includes('Habilitado'),
  };
};

export default usuarioService;
