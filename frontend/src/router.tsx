import { createBrowserRouter } from "react-router-dom"
import DefaultLayout from "./components/main/DefaultLayout"
import GuestLayout from "./components/main/GuestLayout"
import Home from "./components/default/Home";
import Women from "./components/default/Women";
import Men from "./components/default/Men";
import Kids from "./components/default/Kids";
import Baby from "./components/default/Baby";
import Cart from "./components/default/Cart";
import Register from "./components/guest/Register";
import Login from "./components/guest/Login";
import AdminLayout from "./components/main/AdminLayout";
import Dasboard from "./components/admin/Dasboard";
import Produts from "./components/admin/Produts";
import AddProduct from "./components/admin/AddProduct";
import EditProduct from "./components/admin/EditProduct";
import NotFound from "./components/NotFound";


interface RouteConfig {
	path: string;
	element: JSX.Element;
	children?: RouteConfig[];
}

const  role = sessionStorage.getItem('ROLE');

const defaultLayout:RouteConfig = {
	path: '/',
	element: <DefaultLayout/>,
	children: [
		{
			path: '/',
			element: <Home />
		},
		{
			path: '/women',
			element: <Women />
		},
		{
			path: '/men',
			element: <Men />
		},
		{
			path: '/kids',
			element: <Kids />
		},
		{
			path: '/baby',
			element: <Baby />
		},
		{
			path: '/cart',
			element: <Cart />
		},
	]
}

const authLayout:RouteConfig = {
	path: '/',
	element: <GuestLayout/>,
	children: [
		{
		path: '/register',
		element: <Register/>
		},
		{
		path: '/login',
		element:  <Login/> 
		},
	]
}

const adminLayout:RouteConfig = {
	path: '/admin',
	element: <AdminLayout/>,
	children: [
		{
			path: '/admin',
			element: <Dasboard />
		},
		{
			path: '/admin/dashboard',
			element: <Dasboard />
		},
		{
			path: '/admin/products',
			element: <Produts  />
		}, 
		{
			path: '/admin/product/add-new',
			element: <AddProduct  />
		}, 
		{
			path: '/admin/product/update/:id',
			element: <EditProduct  />
		}, 
	]
} 

const notFound:RouteConfig = {
	path: '*',
	element: <NotFound />
}

let routes: RouteConfig[] = [];

// If  is not available, show both Default and Auth layouts
if (  role === null) {
  routes = [defaultLayout, authLayout];
}
// If  is 0, show Default layout
else if ( role === 'client') {
  routes = [defaultLayout];
}
// If  is 1, show Admin layout
else if ( role  === 'admin') {
  routes = [adminLayout, defaultLayout];
}

routes.push(notFound);

const router = createBrowserRouter(routes);

export default router;
