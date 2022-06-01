import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import listReducer from "./listReducer";
import itemReducer from "./itemReducer";
import sagas from "../sagas/sagas";


// Конфигурируем Saga
const sagaMiddleware = createSagaMiddleware();

// Конфигурируем Store
const store = configureStore({
    reducer: {
        listReducer,
        itemReducer
    },
    middleware: [sagaMiddleware]
});

sagaMiddleware.run(sagas);

export default store;