import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux';
import App from './App.jsx'
import store from './Redux/store';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <App />
</Provider>
);
