class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }

    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
      })
        .then(res => {
          if (res.ok){
            return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
        });
    }

    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      })
        .then(res => {
          if (res.ok){
            return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
        });
    }

    editUserInfo(name, about) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about,
        }),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      });
    }

    addCard({name, link}) {
      console.log(this._baseUrl)
      return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link,
        }),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      });
    }

    addLikes(cardId) {
      return fetch(`https://around.nomoreparties.co/v1/web-ptbr-cohort-10/cards/likes/${cardId}`, {
        method: "PUT",
        headers: {
          authorization: "cc445779-d6db-4667-8701-d2576b6346ad",
          "Content-Type": "application/json"
        },
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      });
    }

    removeLike(cardId) {
      return fetch(`https://around.nomoreparties.co/v1/web-ptbr-cohort-10/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: {
          authorization: "cc445779-d6db-4667-8701-d2576b6346ad",
          "Content-Type": "application/json"
        },
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      });
    }

    removeCard(cardId) {
      return fetch(`https://around.nomoreparties.co/v1/web-ptbr-cohort-10/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: {
          authorization: "cc445779-d6db-4667-8701-d2576b6346ad",
          "Content-Type": "application/json"
        },
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      });
    }

    editAvatar({avatar}) {
      return fetch(`https://around.nomoreparties.co/v1/web-ptbr-cohort-10/users/me/avatar`, {
        method: "PATCH",
        headers: {
          authorization: "cc445779-d6db-4667-8701-d2576b6346ad",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ avatar: avatar }),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      });
        }

        changeLikeCardStatus(cardId, isLiked) {
          return isLiked ? this.removeLike(cardId) : this.addLikes(cardId);
        }
    }

    const api = new Api({
        baseUrl: "https://around.nomoreparties.co/v1/web-ptbr-cohort-10",
        headers: {
          authorization: "cc445779-d6db-4667-8701-d2576b6346ad",
          "Content-Type": "application/json"
        }
      });

export default api;