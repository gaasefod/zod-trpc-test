import type { AppProps } from "next/app";
import { useState } from "react";

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import "@/styles/normalize.css";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
};

export default App;
