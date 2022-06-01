import {spawn} from 'redux-saga/effects';

import {watchList_load} from "./listSaga";
import {watchItem_load} from "./ItemSaga";


// Коренная sagas - необязательная
export default function *sagas() {
    yield spawn(watchList_load);     // spawn изолирует дочернюю sagas от коренной
    yield spawn(watchItem_load);
}