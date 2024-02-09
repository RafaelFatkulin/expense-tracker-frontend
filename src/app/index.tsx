import { createRoot } from 'react-dom/client';
import { Provider } from './providers';

createRoot(document.getElementById('root') as HTMLElement).render(<Provider />);
