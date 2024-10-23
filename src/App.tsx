import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/home";
import { Admin } from "./pages/admin";
import { Login } from "./pages/login";
import { Networks } from "./pages/networks";
import { NotFound } from "./pages/error";

import { Private } from "./routes/Private";



const routes = createBrowserRouter([
    {

        children: [
            {
                path:'/',
                element: <Home/>
            },
            {
                path: '/admin',
                element: <Private><Admin/></Private>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path:'/admin/social',
                element: <Private><Networks/></Private>
            },
            {
                path:'*',
                element: <NotFound/>
            }
        ]
    }
])

export { routes };