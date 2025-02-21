import { createSlice, createAsyncThunk, nanoid,  } from '@reduxjs/toolkit'
import { getIngredientsApi } from '../utils/burger-api'
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { RootState } from '../services/store';

export const getIngredientsThunk = createAsyncThunk(
    'ingredients/getIngredients',
    async (_, {rejectWithValue}) => {
        try {
            const data = await getIngredientsApi();
            return data
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export interface IIngredientsState {
    isLoading: boolean;
    ingredients: TIngredient[];
    error: string | null;
    constructorItems: {
        bun: TConstructorIngredient | null,
        ingredients: TConstructorIngredient[];
    }
}

const initialState: IIngredientsState = {
    isLoading: false,
    ingredients: [],
    error: null,
    constructorItems: {
        bun: null,
        ingredients:[]
    }
}

const ingredientSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        addBun: (state, {payload}: {payload: TIngredient}) => {
            state.constructorItems.bun = {...payload, id: nanoid()}
        },
        removeBun: (state) => {
            state.constructorItems.bun = null
        },
        addIngredient: (state, {payload}: {payload: TIngredient}) => {
            state.constructorItems.ingredients.push({...payload, id: nanoid()})
        },
        removeIngredient: (state, {payload}: {payload: string}) => {
            state.constructorItems.ingredients = state.constructorItems.ingredients.filter(item => item.id != payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getIngredientsThunk.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getIngredientsThunk.rejected, (state, {payload}) => {
            state.isLoading = false;
            state.error = payload as string;
        });
        builder.addCase(getIngredientsThunk.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.ingredients = payload;
        })
    },
  });
export const selectIsIngredientsLoading = (state: RootState) => state.ingredients.isLoading;
export const selectIngredients = (state: RootState) => state.ingredients.ingredients;
export const selectConstructorItems = (state: RootState) => state.ingredients.constructorItems;
export const {addBun, removeBun, addIngredient, removeIngredient} = ingredientSlice.actions;
export default ingredientSlice.reducer