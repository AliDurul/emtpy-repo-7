import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { themeConfigSlice } from "./features/themeConfig/themeConfigSlice";
import { invoiceSlice } from "./features/invoices/invoiceSlice";
import { ticketSlice } from "./features/tickets/ticketSlice";
import { categorySlice } from "./features/category/categorySlice";
import { kycSlice } from "./features/kyc/kycSlice";
import { productSlice } from "./features/products/productSlice";
import { faqSlice } from "./features/faq/faqSlice";
import { taskSlice } from "./features/task/taskSlice";
import { chatSlice } from "./features/chat/chatSlice";
import { leadSlice } from "./features/leads/leadSlice";
import { coparateSlice } from "./features/coparate/coparateSlice";

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices(themeConfigSlice, invoiceSlice, ticketSlice, categorySlice, kycSlice, productSlice, faqSlice, taskSlice, chatSlice, leadSlice, coparateSlice);
// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

// `makeStore` encapsulates the store configuration to allow
// creating unique store instances, which is particularly important for
// server-side rendering (SSR) scenarios. In SSR, separate store instances
// are needed for each request to prevent cross-request state pollution.
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    // middleware: (getDefaultMiddleware) => {
    //   return getDefaultMiddleware().concat(quotesApiSlice.middleware);
    // },
  });
};

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
