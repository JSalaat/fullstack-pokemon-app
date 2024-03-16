import React from "react";
import { ChakraProviders } from "./providers";

export default ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      <ChakraProviders>{children}</ChakraProviders>
    </body>
  </html>
);
