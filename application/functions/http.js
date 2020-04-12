
const { XMLHttpRequest } = require('xmlhttprequest');


const http = {
  // TODO: добавить возможность отправлять как объект в postData, так и обычную строку разделенную &
  // TODO:добавить авто перевод кордировки из windows1251 в utf8 если в заголовках ответа есть charset windows1251
  async send(method, url, postData, headers, cookies, showCoookies) {
    let response = '';
    const xhr = new XMLHttpRequest();
    xhr.setDisableHeaderCheck(true);// чтобы можно было нормально хеадер устанавливать

    if (postData) {
      postData = postData.split('&');
      const str = '';
      str.slice();
      const postDataToObj = {};

      postData.forEach((item) => {
        const index = item.slice(0, item.indexOf('='));
        const value = encodeURIComponent(item.slice(item.indexOf('=') + 1, item.length));
        postDataToObj[index] = value;
      });

      postData = '';
      Object.keys(postDataToObj).forEach((item) => {
        postData += `${item}=${postDataToObj[item]}`;
        postData += '&';
      });

      postData = postData.slice(0, -1);
    }

    // TODO: добавить асинхронный запрос, возможно имеет смысл разработать свой компонент
    xhr.open(method, url, false);
    if (method.toUpperCase() === 'POST') {
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    if (cookies) {
      xhr.setRequestHeader('Cookie', cookies);
    }

    xhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36');

    if (postData) {
      xhr.send(postData);
    } else {
      xhr.send(null);
    }

    if (xhr.status === 200) {
      // Get the raw header string
      const headers = xhr.getAllResponseHeaders();

      // Convert the header string into an array
      // of individual headers
      const arr = headers.trim().split(/[\r\n]+/);

      // Create a map of header names to values
      const headerMap = {};
      arr.forEach((line) => {
        const parts = line.split(': ');
        const header = parts.shift();
        const value = parts.join(': ');
        headerMap[header] = value;
      });

      response = xhr.responseText;
      return response;
    }
  },
};

module.exports = http;
