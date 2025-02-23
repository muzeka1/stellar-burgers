import { createSlice, createAsyncThunk,  } from '@reduxjs/toolkit'
import { getFeedsApi, getOrdersApi, orderBurgerApi, getOrderByNumberApi, TFeedsResponse } from '../utils/burger-api'
import { TOrder } from '@utils-types';
import { RootState } from '../services/store';

export const getFeedsThunk = createAsyncThunk(
    'orders/getFeeds',
    async () => getFeedsApi()
)

export const getOrdersThunk = createAsyncThunk(
    'orders/getOrders',
    async () => getOrdersApi()
)

export const orderBurgerThunk = createAsyncThunk(
    'orders/orderBurger',
    async (ids: string[]) => orderBurgerApi(ids)
)

export const getOrderByNumberThunk = createAsyncThunk(
    'orders/getOrderByNumber',
    async (number: number) => getOrderByNumberApi(number)
)

export interface IOrdersState {
    isLoading: boolean;
    orders: TOrder[];
    feeds: TFeedsResponse | null;
    error: string | null;
    successedOrder: TOrder | null;
    isOrderSuccessed: true | false | null;
}

const initialState: IOrdersState = {
    isLoading: false,
    orders: [],
    feeds: null,
    error: null,
    successedOrder: null,
    isOrderSuccessed: null
}

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        clearOrderData: (state) => {
            state.successedOrder = null;
        },
        changeLoadingOrder: (state) => {
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getOrdersThunk.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getOrdersThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error?.message ?? "Unknown error"
        })
        builder.addCase(getOrdersThunk.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.orders = payload;
        })
        builder.addCase(getFeedsThunk.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getFeedsThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error?.message ?? "Unknown error"
        })
        builder.addCase(getFeedsThunk.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.feeds = payload;
        })
        builder.addCase(orderBurgerThunk.pending, (state) => {
            state.isLoading = true;
            state.isOrderSuccessed = null;
        })
        builder.addCase(orderBurgerThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error?.message ?? "Unknown error"
            state.isOrderSuccessed = false;
        })
        builder.addCase(orderBurgerThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successedOrder = action.payload.order;
            state.isOrderSuccessed = true
        })
        builder.addCase(getOrderByNumberThunk.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getOrderByNumberThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error?.message ?? "Unknown error"
        })
        builder.addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
            state.isLoading = false;
        })
    }
})

export const selectOrders = (state: RootState) => state.orders.orders;
export const selectIsOrderRequest = (state: RootState) => state.orders.isLoading;
export const selectSuccessedOrder = (state: RootState) => state.orders.successedOrder;
export const selectIsOrderSuccessed = (state: RootState) => state.orders.isOrderSuccessed;
export const selectFeeds = (state: RootState) => state.orders.feeds;
export const selectOrderError = (state: RootState) => state.orders.error;
export const {clearOrderData, changeLoadingOrder} = orderSlice.actions

export default orderSlice.reducer