import React from "react";

export const LensContext = React.createContext({
  wagmiClient: null,
  signer: null,
  handle: null,
  data: null,
  onSetData: (data: any, key: string) => {},
});
