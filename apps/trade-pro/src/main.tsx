import './configs';
import './styles.scss';
import App from '@tradePro/App';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
