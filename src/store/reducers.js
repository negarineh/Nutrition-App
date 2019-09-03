import * as actionTypes from './actionTypes';
import { updateObject } from './utility';
import data from '../../src/assets/data/mockData';

const initialState = {
    addedItem: data,
    selectedItem: null,
    error: false,
    showAddForm: false,
    searching: false,
    showSearchList: false,
    currentDay: 0,
};

const selectItem = (state, action) => {
    const selectedItem = {...action.selectedItem};
    return updateObject(state, {
        selectedItem,
        showAddForm: true,
    });
};

const searchItem = (state, action) => {
    return updateObject(state, {
        items: action.items,
        searching: true,
        error: false,
    });
};

const fetchItems = (state, action) => {
    return updateObject(state, { food: action.food, error: true });
};

const addItem = (state, action) => {
    const updatedUserData = {...state.addedItem};
    updatedUserData.data_points[0].intake_list.push(action.addedItem);
    return updateObject(state,
        {
            addedItem: updatedUserData,
            showAddForm: false,
            currentDay: 0,
            error: false
        });
};

export const closeAddItem = (state, action) => {
    return updateObject(state, { showAddForm: false })
};

export const nextDay = (state) => {
    return updateObject(state, { state, currentDay: state.currentDay + 1 });
};

export const previousDay = (state) => {
    return updateObject(state, { state, currentDay: state.currentDay - 1 });
};

const requestFailed = (state) => {
    return updateObject(state, { error: false });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SELECT_ITEM: return selectItem(state, action);
        case actionTypes.FETCH_ITEM: return fetchItems(state, action);
        case actionTypes.SEARCH_ITEM: return searchItem(state, action);
        case actionTypes.ADD_ITEM: return addItem(state, action);
        case actionTypes.CLOSE_ADD_ITEM: return closeAddItem(state);
        case actionTypes.NEXT_DAY: return nextDay(state);
        case actionTypes.PREVIOUS_DAY: return previousDay(state);
        case actionTypes.REQUEST_FAILED: return requestFailed(state);
        default:
            return state;
    }
};

export default reducer;