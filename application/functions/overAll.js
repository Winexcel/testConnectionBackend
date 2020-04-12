'use strict';

const overAll = {
  async sleep(ms) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  },
  randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  },

  //TODO: реализовать фильтрацию объектов и применить во всем проекте
  filterObject(obj, allowParams) {

  }

};

module.exports = overAll;
