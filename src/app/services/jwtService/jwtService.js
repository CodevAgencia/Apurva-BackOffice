import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Axios } from '../apiService/apiService';
/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
            // if you ever get an unauthorized response, logout the user
            this.emit('onAutoLogout', 'Invalid access_token');
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    const access_token = this.getAccessToken();

    if (!access_token) {
      this.emit('onNoAccessToken');

      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit('onAutoLogin', true);
    } else {
      this.setSession(null);
      this.emit('onAutoLogout', 'access_token expired');
    }
  };

  createUser = (data) => {
    return new Promise((resolve, reject) => {
      axios.post('/api/auth/register', data).then((response) => {
        if (response.data.user) {
          this.setSession(response.data.access_token);
          resolve(response.data.user);
        } else {
          reject(response.data.error);
        }
      });
    });
  };

  signInWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${process.env.REACT_APP_APURVA_API}/api/v1/auth/email`,
          { email, password, rol: 'admin' },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          console.log('response jwtservice', response);
          if (response?.data?.access_token) {
            this.setSession(response?.data?.access_token);
            axios
              .get(`${process.env.REACT_APP_APURVA_API}/api/v1/auth/me`, {
                headers: {
                  'Content-Type': 'application/json',
                  // eslint-disable-next-line prettier/prettier
                  'Authorization': `Bearer ${response?.data?.access_token}`,
                },
              })
              .then((responseAuthMe) => {
                console.log('responseAuthMe', responseAuthMe);
                resolve(responseAuthMe?.data?.data);
              });
          } else {
            reject(response.data.error);
          }
        });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${process.env.REACT_APP_APURVA_API}/api/v1/auth/me`, {
          headers: {
            'Content-Type': 'application/json',
            // eslint-disable-next-line prettier/prettier
            'Authorization': `Bearer ${this.getAccessToken()}`,
          },
        })
        .then((response) => {
          if (response?.data?.code === 200) {
            this.setSession(this.getAccessToken());
            const { data } = response.data.data;
            const newData = {
              role: ['admin'],
              data: {
                displayName: data.name,
                photoURL: 'assets/images/avatars/ApurvaLogo.jpg',
                email: data.email,
                displayUser: data.email,
                displayDocument: data.email,
              },
            };
            resolve(newData);
          } else {
            this.logout();
            reject(new Error('Failed to login with token.'));
          }
        })
        .catch((error) => {
          this.logout();
          reject(new Error('Failed to login with token.'));
        });
    });
  };

  updateUserData = (user) => {
    return axios.post('/api/auth/user/update', {
      user,
    });
  };

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem('@apurva_admin:access_token', access_token);
      Axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } else {
      localStorage.removeItem('@apurva_admin:access_token');
      delete Axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    this.setSession(null);
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn('access token expired');
      return false;
    }

    return true;
  };

  getAccessToken = () => {
    return window.localStorage.getItem('@apurva_admin:access_token');
  };
}

const instance = new JwtService();

export default instance;
