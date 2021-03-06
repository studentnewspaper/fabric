import { FunctionComponent } from "preact";

export interface ClientGateProps {}

const ClientGate: FunctionComponent<ClientGateProps> = ({ children }) => {
  const isBrowser = typeof window != "undefined";
  return isBrowser ? <>{children}</> : <div style={{ height: "500px" }}></div>;
};

export default ClientGate;
