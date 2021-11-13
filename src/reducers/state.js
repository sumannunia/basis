const initialState = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));

const userState = (state = initialState, action) => {
    switch (action.type) {
        // case "INCREMENT": return state + 1;
        // case "DECREMENT": return state - 1;
        case "LOGIN": return localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
        default: return state;
    }
};

export default userState;