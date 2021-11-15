

export const getAll = async (url) => {
    return await fetch(`${url}`)
        .then((response) => {
            return response.json();
        });
    
};
export const logout = async (url, userState) => {
    
    return await fetch(`${url}`, {
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
    return await fetch(url, {
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
    return await fetch(url, {
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