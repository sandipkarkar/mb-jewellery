import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { NotFound } from './pages/NotFound';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { Cart } from './pages/Cart';
import { Wishlist } from './pages/Wishlist';
import { Profile } from './pages/Profile';
import { Addresses } from './pages/Addresses';
import { Contact } from './pages/Contact';
import { About } from './pages/About';
import { FAQ } from './pages/FAQ';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { AskPrice } from './pages/AskPrice';
import { AdminLogin } from './pages/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProductsList } from './pages/admin/AdminProductsList';
import { AdminProductForm } from './pages/admin/AdminProductForm';
import { AdminCategoriesList } from './pages/admin/AdminCategoriesList';
import { AdminCategoryForm } from './pages/admin/AdminCategoryForm';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'products',
        Component: Products,
      },
      {
        path: 'products/:id',
        Component: ProductDetail,
      },
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
      {
        path: 'forgot-password',
        Component: ForgotPassword,
      },
      {
        path: 'cart',
        Component: Cart,
      },
      {
        path: 'wishlist',
        Component: Wishlist,
      },
      {
        path: 'account',
        Component: Profile,
      },
      {
        path: 'addresses',
        Component: Addresses,
      },
      {
        path: 'contact',
        Component: Contact,
      },
      {
        path: 'about',
        Component: About,
      },
      {
        path: 'faq',
        Component: FAQ,
      },
      {
        path: 'privacy',
        Component: Privacy,
      },
      {
        path: 'terms',
        Component: Terms,
      },
      {
        path: 'ask-price',
        Component: AskPrice,
      },
      {
        path: 'admin-login',
        Component: AdminLogin,
      },
      {
        path: 'admin',
        Component: AdminLayout,
        children: [
          {
            index: true,
            Component: AdminDashboard,
          },
          {
            path: 'products',
            Component: AdminProductsList,
          },
          {
            path: 'products/new',
            Component: AdminProductForm,
          },
          {
            path: 'products/:id/edit',
            Component: AdminProductForm,
          },
          {
            path: 'categories',
            Component: AdminCategoriesList,
          },
          {
            path: 'categories/new',
            Component: AdminCategoryForm,
          },
          {
            path: 'categories/:name/edit',
            Component: AdminCategoryForm,
          },
        ],
      },
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
]);