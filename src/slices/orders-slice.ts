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
    async (ingredients: string[]) => orderBurgerApi(ingredients)
)

export const getOrderByNumberThunk = createAsyncThunk(
    'orders/getOrderByNumber',
    async (number: number) => getOrderByNumberApi(number)
)

export interface IOrdersState {
    isLoading: boolean;
    orders: TOrder[] | null;
    feeds: TFeedsResponse | null,
    error: string | null;
}

const initialState: IOrdersState = {
    isLoading: false,
    orders: null,
    feeds: null,
    error: null,
}

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
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
            state.isLoading = true
        })
        builder.addCase(orderBurgerThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error?.message ?? "Unknown error"
        })
        builder.addCase(orderBurgerThunk.fulfilled, (state, {payload}) => {
            state.isLoading = false;
        })
        builder.addCase(getOrderByNumberThunk.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getOrderByNumberThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error?.message ?? "Unknown error"
        })
        builder.addCase(getOrderByNumberThunk.fulfilled, (state, {payload}) => {
            state.isLoading = false;
        })
    }
})

export const selectOrders = (state: RootState) => state.orders.orders;

export const selectFeeds = (state: RootState) => state.orders.feeds;

export default orderSlice.reducer