const fetch = require('node-fetch');

const API_URL = 'https://icanhazdadjoke.com/';
const API_HEADERS = { Accept: 'application/json' };

class DadJokeService {
  requestJoke(url = API_URL, headers = API_HEADERS) {
    return fetch(url, { headers });
  }

  convertToJson(response) {
    return response.json();
  }

  extractJoke({ joke }) {
    return joke;
  }

  async getJoke() {
    const response = await this.requestJoke();
    const json = await this.convertToJson(response);
    return this.extractJoke(json);
  }
}

module.exports = {
  DadJokeService,
};
