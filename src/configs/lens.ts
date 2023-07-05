import { LensConfig, appId, development } from "@lens-protocol/react-web";
import { bindings as wagmiBindings } from "@lens-protocol/wagmi";

export const lensConfig: LensConfig = {
  appId: appId("bob"),
  sources: [appId("bob")],
  bindings: wagmiBindings(),
  environment: development,
};
