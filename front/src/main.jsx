import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import SmoothScrolling from './components/SmoothScroll.jsx'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import AdminDataSlice from './redux/AdminDataSlice.js'
import ProjectDataSlice from './redux/ProjectDataSlice.js'
import SliderDataSlice from './redux/SliderDataSlice.js'
import WorkProcessDataSlice from './redux/WorkProcessDataSlice.js'
import ServiceDataSlice from './redux/ServiceDataSlice.js'

const rootReducer = combineReducers({ AdminDataSlice, ProjectDataSlice, SliderDataSlice, WorkProcessDataSlice, ServiceDataSlice });
const store = configureStore({
  reducer : rootReducer
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SmoothScrolling>
        <Provider store={store}>
          <App />
        </Provider>
      </SmoothScrolling>
    </BrowserRouter>
  </StrictMode>,
)
