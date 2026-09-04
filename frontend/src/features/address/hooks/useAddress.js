import { useContext } from "react";
import AddressContext from "../context/AddressContext";

export function useAddress() {
  return useContext(AddressContext);
}
