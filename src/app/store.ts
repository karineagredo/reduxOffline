import { configureStore, ThunkAction, Action, applyMiddleware } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import * as localforage from 'localforage'

localforage.config({storeName: 'app_data'})

const offlineConfigOptions = {
	...offlineConfig,
  persistOptions: { storage: localforage},
	discard: (error, _action, _retries) => true // avoids retrying requests
}
console.log(offlineConfig)
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  enhancers: (defaultEnhancer) => [...defaultEnhancer, offline(offlineConfigOptions)] as any
})
// store.dispatch({
//   type: 'SOME_OFFLINE_ACTION',
//   meta: {
//     offline: {
//       effect: { url: 'https://jsonplaceholder.typicode.com/todos/1' }
//     }
//   }
// });
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
