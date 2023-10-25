import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Components/Routes/Home'
import Login from './Components/Routes/Login'
import Register from './Components/Routes/Register'
import NotFoundPage from './Components/Routes/404'
import CreatePrivate from './Components/Routes/RoutesPrivates/Private/CreatePrivate'
import ProfilePrivate from './Components/Routes/RoutesPrivates/Private/ProfilePrivate'
import MyImagePrivate from './Components/Routes/RoutesPrivates/Private/MyImagePrivate'
import EditProfilePrivate from './Components/Routes/RoutesPrivates/Private/EditProfilePrivate'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <NotFoundPage/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/result/:id',
        element: <Home/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/register',
        element: <Register/>
      },
      {
        path: '/create',
        element: <CreatePrivate/>
      },
      {
        path: '/profile',
        element: <ProfilePrivate/>
      },
      {
        path: '/myimages',
        element: <MyImagePrivate/>
      },
      {
        path: 'edit',
        element: <EditProfilePrivate/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
