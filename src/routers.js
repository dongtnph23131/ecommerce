import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LayoutAdmin from "./components/admin/LayoutAdmin";
import Dashboard from "./components/admin";
import ListCategory from "./components/admin/category";
import AddCategory from "./components/admin/category/add";
import SignupPage from "./pages/SignupPage";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import EditCategory from "./components/admin/category/edit";
import ProductListAdmin from "./components/admin/product";
import AddProduct from "./components/admin/product/add";
import EditProduct from "./components/admin/product/edit";
import CheckoutCartPage from "./pages/checkout";
import OrderListAdmin from "./components/admin/order";
import MyOrder from "./pages/MyOrder";
const user = JSON.parse(localStorage.getItem('user'))
const PrivateRouter = ({ user }) => {
    if (!user) {
        return <Navigate to={'/login'} />
    }
    if (user.role !== 'admin') {
        return <Navigate to={'/'} />
    }
    return <Outlet />
}
const routers = createBrowserRouter([
    { path: '', element: <HomePage /> },
    {
        path: '/products/:id', element: <ProductDetail></ProductDetail>
    },
    {
        path: 'admin', element: <PrivateRouter user={user} />, children: [
            {
                element: <LayoutAdmin />, children: [
                    { index: true, element: <Navigate to={'dashboard'} /> },
                    { path: 'dashboard', element: <Dashboard /> },
                    {
                        path: 'categories', children: [
                            { index: true, element: <ListCategory /> },
                            { path: 'add', element: <AddCategory /> },
                            { path: 'edit/:id', element: <EditCategory /> }
                        ]
                    },
                    {
                        path: 'products', children: [
                            { index: true, element: <ProductListAdmin /> },
                            { path: 'add', element: <AddProduct /> },
                            { path: 'edit/:id', element: <EditProduct /> }
                        ]
                    },
                    {
                        path: 'orders', children: [
                            { index: true, element: <OrderListAdmin /> }
                        ]
                    }
                ]
            }
        ]
    },
    { path: 'myOrder', element: <MyOrder /> },
    {
        path: 'checkout/cart', element: <CheckoutCartPage />
    },
    {
        path: 'signup', element: <SignupPage />
    },
    {
        path: 'login', element: <Login />
    }
])
export default routers