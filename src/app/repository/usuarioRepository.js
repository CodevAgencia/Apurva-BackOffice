import http from '../services/http';

// eslint-disable-next-line camelcase
const userListUrl = '/api/v1/users';
const userChangeStateUrl = '/api/v1/state/users';

const usuarioRepository = {
  getUsers: async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.get(`${userListUrl}`);
    } catch (error) {
      throw error;
    }
  },
  updateState: async (id) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.get(`${userChangeStateUrl}/${id}`);
    } catch (error) {
      throw error;
    }
  },
};

export default usuarioRepository;
