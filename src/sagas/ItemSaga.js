import {take, delay, takeLatest, put, retry, spawn, debounce, fork, call} from 'redux-saga/effects';

import {
    itemReducer_search_failure,
    itemReducer_search_start,
    itemReducer_search_success,
    set_itemReducer_param_failure,
    set_itemReducer_param_success
} from "../store/itemReducer";

import {loadData} from "../api/load";


// watcher
export function *watchItem_load() {

    yield takeLatest(itemReducer_search_start, handleItem_load);     // takeLatest - отменяет предыдущую задачу
}


// worker
function *handleItem_load(action) {

    console.log('handleItem_load', action);

    try{
//        const data = yield call(loadData, action.payload.url);       // call - вызов любой функции (блокирующий)

        const retryCount = 3;
        const retryDelay = 500;      // in ms
        const data = yield retry(retryCount, retryDelay, loadData, action.payload.url);

        yield put(
            itemReducer_search_success(
                set_itemReducer_param_success(data)
            ));
    }catch(ex) {
        yield put(
            itemReducer_search_failure(
                set_itemReducer_param_failure(ex.message)
            ));
    }
}
