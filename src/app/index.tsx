import { Provider } from "./providers";
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById("root") as HTMLElement).render(<Provider/>);

