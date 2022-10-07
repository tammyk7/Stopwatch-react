import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

const component = (
  <div>
    <span></span>
    'Hello world'
  </div>
)

console.log(component)
