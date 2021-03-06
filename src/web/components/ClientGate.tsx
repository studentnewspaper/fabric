import { FunctionComponent } from "preact";

export interface ClientGateProps {}

const ClientGate: FunctionComponent<ClientGateProps> = ({ children }) => {
  const isBrowser = typeof window != "undefined";
  return isBrowser ? <>{children}</> : null;
};

export default ClientGate;
