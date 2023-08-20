import { Navigate, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LayoutAdmin from "./components/admin/LayoutAdmin";
import Dashboard from "./components/admin";
import ListCategory from "./components/admin/category";
import AddCategory from "./components/admin/category/add";
import SignupPage from "./pages/SignupPage";
import Login from "./pages/Login";

const routers = createBrowserRouter([
    { path: '', element: <HomePage /> },
    {
        path: 'admin', element: <LayoutAdmin />, children: [
            { index: true, element: <Navigate to={'dashboard'} /> },
            { path: 'dashboard', element: <Dashboard /> },
            {
                path: 'categories', children: [
                    { index: true, element: <ListCategory /> },
                    { path: 'add', element: <AddCategory /> }
                ]
            }
        ]
    },
    {
        path:'signup',element:<SignupPage/>
    },
    {
        path:'login',element:<Login/>
    }
])
export default routers