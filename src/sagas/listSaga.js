import {take, delay, takeLatest, put, retry, spawn, debounce, fork, call} from 'redux-saga/effects';
import {
    listReducer_search_failure,
    listReducer_search_start,
    listReducer_search_success,
    set_listReducer_param_failure,
    set_listReducer_param_success
} from "../store/listReducer";

import {loadData} from "../api/load";


// watcher
export function *watchList_load() {

    yield takeLatest(listReducer_search_start, handleList_load);     // takeLatest - отменяет предыдущую задачу
}


// worker
function *handleList_load(action) {

    console.log('handleList_load', action);

    try{
//        const data = yield call(loadData, action.payload.url);       // call - вызов любой функции (блокирующий)

        const retryCount = 3;
        const retryDelay = 500;      // in ms
        const data = yield retry(retryCount, retryDelay, loadData, action.payload.url);

        yield put(
            listReducer_search_success(
                set_listReducer_param_success(data)
            ));
    }catch(ex) {
        yield put(
            listReducer_search_failure(
                set_listReducer_param_failure(ex.message)
            ));
    }
}
