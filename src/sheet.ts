import { createStyleSheet, type Sheet } from "../../../teiler/packages/core";
import { useSheetContext } from "./SheetContext";

export const styleSheet = createStyleSheet({})

export const StyleSheet = 'STYLE_SHEET'

export function getStyleSheet(): Sheet {
  return useSheetContext() || styleSheet;
}
