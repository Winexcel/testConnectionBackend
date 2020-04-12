const axios = require('axios');
const overAll = require('@functions/overAll');

class VKAPI {
  constructor() {
    this.init();
  }

  init() {
    this.axios = axios.create({ baseURL: 'https://api.vk.com/method/' });
  }

  async handle(method, fields) {
    let response = '';
    try {
      // получаем строку запроса
      const fieldsArr = Object.entries(fields);
      let queryString = '';
      fieldsArr.forEach((field) => {
        queryString += `${field[0]}=${field[1]}&`;
      });
      queryString = queryString.slice(0, -1);

      // делаем запрос
      while (true) {
        response = await this.axios.get(`${method}?${queryString}`);

        // если есть ошибка о превышении количества запросов, то делаем новый запрос
        if (response.data.error && response.data.error.error_code === 6) {
          await overAll.sleep(1000);
        } else {
          break;
        }
      }
    } catch (error) {
      console.error(`${error.stack} | ts: ${new Date()}`);
    }

    if (response.data) return response.data;
    return {};
  }

  get users() {
    const handle = this.handle.bind(this);
    const section = 'users.';
    return new Proxy({}, {
      get(target, prop) {
        return async (...args) => handle(`${section}${prop}`, ...args);
      },
    });
  }

  get database() {
    const handle = this.handle.bind(this);
    const section = 'database.';
    return new Proxy({}, {
      get(target, prop) {
        return async (...args) => handle(`${section}${prop}`, ...args);
      },
    });
  }

  get photos() {
    const handle = this.handle.bind(this);
    const section = 'photos.';
    return new Proxy({}, {
      get(target, prop) {
        return async (...args) => handle(`${section}${prop}`, ...args);
      },
    });
  }

  get friends() {
    const handle = this.handle.bind(this);
    const section = 'friends.';
    return new Proxy({}, {
      get(target, prop) {
        return async (...args) => handle(`${section}${prop}`, ...args);
      },
    });
  }

  get notifications() {
    const handle = this.handle.bind(this);
    const section = 'notifications.';
    return new Proxy({}, {
      get(target, prop) {
        return async (...args) => handle(`${section}${prop}`, ...args);
      },
    });
  }
}

const codoAPI = {
  init() {
    this.vkapi = new VKAPI();
  },
};

codoAPI.init();

module.exports = codoAPI;
