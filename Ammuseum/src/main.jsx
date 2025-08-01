import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'

import './index.css'
import App from './App.jsx'
import myStore from './redux/store.js'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={myStore}>
    <App />
  </Provider>
  </BrowserRouter>
)
