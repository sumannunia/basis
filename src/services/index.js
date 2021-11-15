const BASE_URL = 'https://hiring.getbasis.co/candidate'

export const getAll = async (url) => {
    return await fetch(`${BASE_URL}${url}`)
        .then((response) => {
            return response.json();
        });
    
};
export const logout = async (url, userState) => {
    
    return await fetch(`${BASE_URL}${url}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${userState.userState.response.results.user._id},${userState.userState.response.results.user.token}`
        }
    })
        .then((response) => {
            return response.json();
        });
    
};

export const post = async (url, body) => {
    return await fetch(`${BASE_URL}${url}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)
    })
        .then((response) => {
            return response.json();
        });
};
export const put = async (url, body) => {
    return await fetch(`${BASE_URL}${url}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(body)
    })
        .then((response) => {
            return response.json();
        });
};