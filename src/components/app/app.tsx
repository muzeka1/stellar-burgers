import { ConstructorPage, Feed, ForgotPassword, Login, NotFound404, Profile, ProfileOrders, Register, ResetPassword } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from '../../services/store';
import { AppHeader, IngredientDetails, Modal, OrderInfo, ProtectedRoute } from '@components';
import { getIngredientsThunk, selectIngredients, selectIsIngredientsLoading } from '../../slices/ingredients-slice';
import React, { useEffect } from 'react';
import { getUserThunk } from '../../slices/user-slice';
import { Preloader } from '@ui';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsIngredientsLoading);

  useEffect(() => {
    dispatch(getIngredientsThunk())
    dispatch(getUserThunk())
  }, [])

  const backgroundLocation = location.state?.backgroundLocation;

  return (
    <div>
      <AppHeader />
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <Routes location={backgroundLocation || location}>
            <Route path='/' element={<ConstructorPage />} />
            <Route path='/feed' element={<Feed />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route element={<ProtectedRoute />}>              
              <Route path='/profile' element={<Profile />} />
              <Route path='/profile/orders' element={<ProfileOrders />} />
              <Route path='/profile/orders/:number' element={<OrderInfo />} />
            </Route>
            <Route path='*' element={<NotFound404 />} />
          </Routes>

          {backgroundLocation &&
            <Routes>
              <Route path='/feed/:number' element={<Modal title='Информация о заказе' onClose={() => { navigate(-1) }}><OrderInfo /></Modal>} />
              <Route path='/ingredients/:id' element={<Modal title='Ингредиенты' onClose={() => { navigate(-1) }}><IngredientDetails /></Modal>} />

              <Route element={<ProtectedRoute />}>
                <Route path='/profile/orders/:number' element={<Modal title='Информация о заказе' onClose={() => { navigate(-1) }}><OrderInfo /></Modal>} />
              </Route>
            </Routes>
          }
        </>
      )}
    </div>

  )
};

export default App;
