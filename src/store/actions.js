import * as actionTypes from './actionTypes';
import axios from '../axios-nutritionix';

const CONFIG = {
    headers: {
        "Content-Type": "application/json",
        "x-app-id": "Your App Id",
        "x-app-key": "Your App Key",
        "x-remote-user-id": 0
    }
};

export const addItem = (addedItem) => {
    return {
        type: actionTypes.ADD_ITEM,
        addedItem,
    }
};

export const closeAddItem = () => {
    return {
        type: actionTypes.CLOSE_ADD_ITEM,
    }
};

export const searchItem = (items) => {
    return {
        type: actionTypes.SEARCH_ITEM,
        items,
    }
};

export const fetchItem = (food) => {
    return {
        type: actionTypes.FETCH_ITEM,
        food,
    }
};

export const requestFailed = () => {
    return {
        type: actionTypes.REQUEST_FAILED,
    }
};

export const selectItem = (selectedItem) => {
    return {
        type: actionTypes.SELECT_ITEM,
        selectedItem,
    }
};

export const fetchItems = (name) => {
    const query = {
        'query': name,
    };
    return dispatch => {
        axios.post('/v2/natural/nutrients', query, CONFIG)
            .then(response => {
                dispatch(fetchItem(response.data));
            })
            .catch(error => {
                dispatch(requestFailed());
            })
    }
};

export const searchItems = (name) => {
    const query = {
        'query': name,
        'detailed':true,
        'self':true
    };
    return dispatch => {
        axios.post('/v2/search/instant', query, CONFIG)
            .then((response) => {
                dispatch(searchItem(response.data));
            })
            .catch((error) => {
                dispatch(requestFailed());
            })
    }
};

export const nextDay = () => {
    return {
        type: actionTypes.NEXT_DAY,
    }
};

export const previousDay = () => {
    return {
        type: actionTypes.PREVIOUS_DAY,
    }
};
