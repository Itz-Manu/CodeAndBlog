import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Home from './components/Home/Home.jsx'
import LoginForm from './components/registration/Login.jsx'
import SignupForm from './components/registration/Signup.jsx'
import Blogs from './components/Home/Blogs.jsx'
import Error from './components/pages/Error.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<App />}>
      <Route path='' element={<Home />}/>
      <Route path='/blogs' element={<Blogs />}/>
      <Route path='login' element={<LoginForm />}/>
      <Route path='signup' element={<SignupForm />}/>

      <Route path='*' element={<Error/>} />
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
