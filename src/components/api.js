const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-17',
    headers: {
        authorization: 'd23797db-84d4-4701-b645-1174990f5c2b',
        'Content-Type': 'application/json',
    },
};

function apiFetch(method, endpoint, body) {
    return fetch(`${config.baseUrl}${endpoint}`, {
        method,
        headers: config.headers,
        body: body ? JSON.stringify(body) : undefined,
    })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }

            return Promise.reject(`Ошибка ${res.statusText}`);
        });
}

export function fetchUser() {
    return apiFetch('GET', '/users/me');
}

export function updateUser(name, about) {
    return apiFetch('PATCH', '/users/me', { name, about });
}

export function updateAvatar(avatar) {
    return apiFetch('PATCH', '/users/me/avatar', { avatar });
}

export function fetchCards() {
    return apiFetch('GET', '/cards');
}

export function addCard(name, link) {
    return apiFetch('POST', '/cards', { name, link });
}

export function deleteCard(id) {
    return apiFetch('DELETE', `/cards/${id}`);
}

export function putLike(id) {
    return apiFetch('PUT', `/cards/likes/${id}`);
}

export function deleteLike(id) {
    return apiFetch('DELETE', `/cards/likes/${id}`);
}
