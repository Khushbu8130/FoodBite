import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import Home from './pages/Home/Home'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import MyOrders from './pages/MyOrders/MyOrders'
import Verify from './pages/Verify/Verify'
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import Success from './pages/Success/Success';
import FormPage from './pages/FormPage/FormPage';
import OrderSuccess from './pages/OrderSuccess/OrderSuccess'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          < Route path='/' element={<Home />} />
          < Route path='/cart' element={<Cart />} />
          < Route path='/order' element={<PlaceOrder />} />
           <Route path="/payment" element={<PaymentPage />} />
          < Route path='/verify' element={<Verify/>} />
         <Route path="/myorders" element={<MyOrders/>} />

           <Route path="/form" element={<FormPage />} />
        <Route path="/success" element={<Success />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        </Routes>
      </div>
      <Footer />
    </>

  )
}

export default App
