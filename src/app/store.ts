import { configureStore, ThunkAction, Action, applyMiddleware } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  enhancers: (defaultEnhancer) => [...defaultEnhancer, offline(offlineConfig)] as any
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
