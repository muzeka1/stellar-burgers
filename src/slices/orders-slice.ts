import { createSlice, createAsyncThunk,  } from '@reduxjs/toolkit'
import { getFeedsApi, getOrdersApi, orderBurgerApi, getOrderByNumberApi, TFeedsResponse } from '../utils/burger-api'
import { TOrder } from '@utils-types';
import { RootState } from '../services/store';

export const getFeedsThunk = createAsyncThunk(
    'orders/getFeeds',
    async (_, {rejectWithValue}) => {
        try {
            const feeds = await getFeedsApi();
            return feeds
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const getOrdersThunk = createAsyncThunk(
    'orders/getOrders',
    async (_, {rejectWithValue}) => {
        try {
            const orders = await getOrdersApi()
            return orders
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const orderBurgerThunk = createAsyncThunk(
    'orders/orderBurger',
    async (ingredients: string[], {rejectWithValue}) => {
        try {
            const order = await orderBurgerApi(ingredients)
            return order
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const getOrderByNumberThunk = createAsyncThunk(
    'orders/getOrderByNumber',
    async (number: number, {rejectWithValue}) => {
        try {
            const order = await getOrderByNumberApi(number)
            return order
        } catch (err) {
            return rejectWithValue(err)
        }
    }
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
        builder.addCase(getOrdersThunk.rejected, (state, {payload}) => {
            state.isLoading = false;
            state.error = payload as string;
        })
        builder.addCase(getOrdersThunk.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.orders = payload;
        })
        builder.addCase(getFeedsThunk.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getFeedsThunk.rejected, (state, {payload}) => {
            state.isLoading = false;
            state.error = payload as string;
        })
        builder.addCase(getFeedsThunk.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.feeds = payload;
        })
        builder.addCase(orderBurgerThunk.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(orderBurgerThunk.rejected, (state, {payload}) => {
            state.isLoading = false;
            state.error = payload as string;
        })
        builder.addCase(orderBurgerThunk.fulfilled, (state, {payload}) => {
            state.isLoading = false;
        })
        builder.addCase(getOrderByNumberThunk.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getOrderByNumberThunk.rejected, (state, {payload}) => {
            state.isLoading = false;
            state.error = payload as string;
        })
        builder.addCase(getOrderByNumberThunk.fulfilled, (state, {payload}) => {
            state.isLoading = false;
        })
    }
})

export const selectOrders = (state: RootState) => state.orders.orders;

export const selectFeeds = (state: RootState) => state.orders.feeds;

export default orderSlice.reducer