import './configs/i18n';
import { StrictMode } from 'react';
import App from '@revisionary/App';
import * as ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
