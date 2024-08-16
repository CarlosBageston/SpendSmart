import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './store/reducer/store.ts'
import { SaveProvider } from './constants/context/savefunctionContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <SaveProvider>
        <App />
      </SaveProvider>
    </Provider>
  </React.StrictMode>,
)
