import m from "mithril";
import createContext, { useContext } from "./createContext";
import { type Sheet } from "../../../teiler/packages/core/src/index";

const SheetContext = createContext<Sheet>(undefined);

export const useSheetContext = () => {
  return useContext(SheetContext);
};

export const SheetContextProvider = ({ sheet }) => {
  return {
    view: (vnode) => {
      return m(SheetContext.Provider, sheet, vnode.children);
    },
  };
};
