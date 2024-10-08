import { all, put, takeEvery } from 'redux-saga/effects';
import {
    actionTypes,
    getCompareListSuccess,
    updateCompareListSuccess,
    addItemSuccess,
} from './action';

const modalSuccess = type => {
    
};

const modalWarning = type => {
    
};

const modalLimitWarning = type => {
    
};

function* getCompareListSaga() {
    try {
        const localCompareList = JSON.parse(
            localStorage.getItem('persist:purplefare')
        ).compare;
        yield put(getCompareListSuccess(localCompareList));
    } catch (err) {
        console.log(err);
    }
}

function* addItemSaga(payload) {
    try {
        const { product } = payload;
        let localCompare = JSON.parse(
            JSON.parse(localStorage.getItem('persist:purplefare')).compare
        );

        let existItem = localCompare.compareItems.find(
            item => item.id === product.id
        );

        if (!existItem) {            
            product.quantity = 1;
            localCompare.compareItems.push(product);
            localCompare.compareTotal++;
            yield put(updateCompareListSuccess(localCompare));            
        }
    } catch (err) {
        console.log(err);
    }
}

function* removeItemSaga(payload) {
    try {
        const { product } = payload;
        let localCompare = JSON.parse(
            JSON.parse(localStorage.getItem('persist:purplefare')).compare
        );
        let index = localCompare.compareItems.findIndex(
            item => item.id === product.id 
        );
        localCompare.compareTotal = localCompare.compareTotal - 1;
        localCompare.compareItems.splice(index, 1);
        yield put(updateCompareListSuccess(localCompare));
        modalWarning('warning');
    } catch (err) {
        console.log(err);
    }
}

function* clearCompareListSaga() {
    try {
        const emptyCart = {
            compareItems: [],
            compareTotal: 0,
        };
        yield put(updateCompareListSuccess(emptyCart));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_COMPARE_LIST, getCompareListSaga)]);
    yield all([takeEvery(actionTypes.ADD_ITEM_COMPARE, addItemSaga)]);
    yield all([takeEvery(actionTypes.REMOVE_ITEM_COMPARE, removeItemSaga)]);
    yield all([takeEvery(actionTypes.CLEAR_COMPARE_LIST, clearCompareListSaga)]);
}
