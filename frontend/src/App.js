import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import * as Components from "./Components";
import { Route, Routes } from "react-router-dom";
import * as store from "./Components/store";
import { useReducer } from "react";
import Layout from './Components/LayoutAdmin';
import LayoutCustomer from './Components/LayoutCustomer';
import LayoutShipper from './Components/LayoutNhanVienDH';
function App() {
  const initiaState = { user: null, post: [] };
  const [state, dispatch] = useReducer(store.Reducer, initiaState);
  return (
    <store.AppContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <Routes>
          <Route path="/admin/login" element={<Components.Login />} />
          <Route element={<Layout />}>
            <Route path="/admin" element={<Components.Dahroash />} />
            <Route path="/admin/profitovertime" element={<Components.ProfitOverTime />} />
            <Route path="/admin/profitbyproduct" element={<Components.ProfitByProduct />} />
            <Route path="/admin/category" element={<Components.Category />} />
            <Route path="/admin/product" element={<Components.Products />} />
            <Route path='/admin/viewpet' element={<Components.Viewpet />} />
            <Route path="/admin/order" element={<Components.Oder />} />
            <Route path="/admin/bill" element={<Components.Bills />} />
            <Route path="/admin/employee" element={<Components.Employee />} />
            <Route path="/admin/customer" element={<Components.Customer />} />
            <Route path="/admin/myinfo" element={<Components.Myinfo />} />
            <Route path="/admin/comment" element={<Components.Comment />} />
            <Route path="/admin/feedbacks" element={<Components.Feedbacks />} />
            <Route path="/admin/themphieunhap" element={<Components.ImportCoupon />} />
            <Route path="/admin/phieunhap" element={<Components.ShowCoupon />} />
            <Route path="/admin/phieunhap-detail/:id" element={<Components.DetailCoupon />} />
            <Route path="/admin/export/:id" element={<Components.ExportPDF />} />
          </Route>
          {/* shipper*/}
          <Route path="/shipper" element={<Components.LoginShipper />} />
          <Route element={<LayoutShipper />}>
            <Route path="/shipper/status/success" element={<Components.Success />} />
            <Route path="/shipper/allorder" element={<Components.AllOrder />} />
            {/* <Route path="/shipper/orderdelivered" element={<Components.OrdersDelivered />} /> */}
            <Route path="/shipper/orderdestroy" element={<Components.OrderDestroy />} />
          </Route>
          <Route element={<LayoutCustomer />} >
            <Route path="/" element={<Components.Home />} />
            <Route path="/products" element={<Components.ProductsCustomer />} />
            <Route path="/detail/:id" element={<Components.Details />} />
            <Route path="/cart" element={<Components.Cart />} />
            <Route path="/bill" element={<Components.Bill />} />
            <Route path="/login" element={<Components.LoginCustomer />} />
            <Route path='/book/pet' element={<Components.Bookpet />} />
            <Route path='/view/pet' element={<Components.ViewPet />} />
            <Route path='/register' element={<Components.RegisterCustomer />} />
            <Route path='/contact' element={<Components.Contact />} />
            <Route path='/myinfo' element={<Components.InfoCustomer />} />
            <Route path='/blog' element={<Components.Blog />} />
            <Route path='/abouts' element={<Components.Abouts />} />
            <Route path='/forgot-password' element={<Components.ForgotPasswordCustomer />} />
            <Route path=':token/reset-password' element={<Components.ResetPasswordCustomer />} />
            <Route path='/*' element={<Components.PageNotFound />} />
          </Route>
        </Routes>
      </div>
    </store.AppContext.Provider >
  );
}

export default App;
