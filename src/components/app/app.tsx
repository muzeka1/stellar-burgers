import { ConstructorPage, Feed, ForgotPassword, Login, NotFound404, Profile, ProfileOrders, Register, ResetPassword } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"

import { AppHeader, IngredientDetails, Modal, OrderInfo, ProtectedRoute } from '@components';

// const App = () => (
//   <div className={styles.app}>
//     <AppHeader />
//     <ConstructorPage />
//   </div>
// );

const App = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const backgroundLocation = location.state?.backgroundLocation;
  return (
    <>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
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

  )
}

export default App;
