export interface IMultiSelectItem {
  /** Unique identifier of the selection item */
  id: string;
  /** Title of the selection item */
  title: string;
  /** Description of the selection item */
  description: string;
  /** Image source of the selection item */
  imageSrc: string;
}

export interface IMultiSelectProps
  extends React.ComponentPropsWithoutRef<"div"> {
  /** The element's unique identifier.*/
  id?: string;
  /** The name of the input element, used when submitting an HTML form */
  name: string;
  /** The text to display as the label. */
  label?: string;
  /** The value of the MultiSelect input. */
  inputValue: string;
  /** Handler that is called when the MultiSelect input value changes. */
  onInputChange?: (value: string) => void;
  /** Handler that is called when Multiselect selection changes */
  onSelectionChange?: (selectedItems: IMultiSelectItem[]) => void;
  /** The list of MultiSelect items. */
  items: Array<IMultiSelectItem>;
  /** Temporary text that occupies the text input when it is empty. */
  placeholder?: string;
  /** The boolean prop to display spinner in popover list */
  isLoading?: boolean;
  /** Handler that is called when popover scroll position reaches to the end */
  onEndScroll?: () => void;
}
