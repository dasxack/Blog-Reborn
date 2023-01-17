class ApiService {
  baseURL = 'https://blog.kata.academy/api';

  async deleteArticle(slug, token) {
    const url = new URL(`${this.baseURL}/articles/${slug}`);

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).catch((err) => err.message);

    return response;
  }

  async addLike(slug, token) {
    const url = new URL(`${this.baseURL}/articles/${slug}/favorite`);

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers,
    });

    return response.json();
  }
  async getArticleFull(slug, token) {
    const url = new URL(`${this.baseURL}/articles/${slug}`);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).catch((err) => err.message);

    return response.json();
  }

  async deleteLike(slug, token) {
    const url = new URL(`${this.baseURL}/articles/${slug}/favorite`);

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).catch((err) => err.message);

    return response.json();
  }
  async updateArticle(slug, modifiedArticle, token) {
    const url = new URL(`${this.baseURL}/articles/${slug}`);

    const body = {
      article: modifiedArticle,
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    };

    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers,
    });

    return response.json();
  }
  async createArticle(newArticle, token) {
    const url = new URL(`${this.baseURL}/articles`);

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ article: newArticle }),
      headers,
    }).catch((err) => err.message);

    return response.json();
  }
}

const apiService = new ApiService();

export { apiService };
