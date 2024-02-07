import { QueryClientProvider } from "./query-client-provider";
import { BrowserRouter } from "./router-provider";

function Providers() {
  return (
    <QueryClientProvider>
      <BrowserRouter />
    </QueryClientProvider>
  )
}

const SuspenseProvider = withSuspense(Providers);
