import { createAsyncThunk } from '@reduxjs/toolkit';
const baseURL = 'https://blog.kata.academy/api';

export const getArticles = createAsyncThunk('articles/getArticles', async ([pageNum, token], { rejectWithValue }) => {
  const url = new URL(`${baseURL}/articles?limit=5&offset=${pageNum}`);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch with ${response.status}!`);
    }

    return response.json();
  } catch (err) {
    return rejectWithValue(err.message);
  }
});
export const userRemember = createAsyncThunk('user/userRemember', async (token, { rejectWithValue }) => {
  const url = new URL(`${baseURL}/user`);
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });

    return response.json();
  } catch (err) {
    return rejectWithValue(err.message);
  }
});
export const registration = createAsyncThunk('user/registration', async (newUser, { rejectWithValue }) => {
  const url = new URL(`${baseURL}/users`);

  localStorage.setItem('userPassword', newUser.password);

  try {
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
    };
    let response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ user: newUser }),
      headers,
    });

    if (response.status === 422) {
      return await response.json().then((result) => rejectWithValue(result));
    }

    if (!response.ok) {
      throw new Error('Data fetching failed');
    }

    response = await response.json();
    return response;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});
export const userUpdate = createAsyncThunk('user/userUpdate', async ({ newUser, token }, { rejectWithValue }) => {
  const url = new URL(`${baseURL}/user`);
  try {
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify({ user: newUser }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });

    if (response.status === 422) {
      return await response.json().then((result) => rejectWithValue(result));
    }

    return response.json();
  } catch (err) {
    return rejectWithValue(err.message);
  }
});
export const userLogIn = createAsyncThunk('user/userLogIn', async (newUser, { rejectWithValue }) => {
  const url = new URL(`${baseURL}/users/login`);
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ user: newUser }),
    });
    if (response.status === 422) {
      return await response.json().then((result) => rejectWithValue(result));
    }

    if (!response.ok) {
      throw new Error('Data fetching failed');
    }

    response = await response.json();
    return response;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

class ApiService {
  baseURL = 'https://blog.kata.academy/api';
  getResults = async (url, body) => {
    try {
      const res = await fetch(url, body);
      if (!res.ok) {
        throw new Error(`${res.status}`);
      }
      return await res.json();
    } catch (err) {
      console.error('Возникла проблема с fetch запросом: ', err.message);
      return err.message;
    }
  };
  updateArticle = async (slug, modifiedArticle, token) => {
    const url = new URL(`${this.baseURL}/articles/${slug}`);

    const body = {
      article: modifiedArticle,
    };
    const response = await this.getResults(url, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });

    return response;
  };
  createArticle = async (newArticle, token) => {
    const url = new URL(`${this.baseURL}/articles`);
    const response = await this.getResults(url, {
      method: 'POST',
      body: JSON.stringify({ article: newArticle }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  };
  deleteArticle = async (slug, token) => {
    const url = new URL(`${this.baseURL}/articles/${slug}`);

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).catch((err) => err.message);

    return response;
  };
  deleteLike = async (slug, token) => {
    const url = new URL(`${this.baseURL}/articles/${slug}/favorite`);
    const response = await this.getResults(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  };
  addLike = async (slug, token) => {
    const url = new URL(`${this.baseURL}/articles/${slug}/favorite`);
    const response = await this.getResults(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  };
  getArticleFull = async (slug, token) => {
    const res = await this.getResults(`${this.baseURL}/articles/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  };
}

const apiService = new ApiService();

export { apiService };
