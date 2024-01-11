import { useEffect, useRef, useState } from "react";

interface IUseAccessibleMultiSelectProps {
  isPopoverVisible: boolean;
  isFocus: boolean;
  openAction: () => void;
  closeAction: () => void;
  optionsLength: number;
}

const useAccessibleMultiSelect = ({
  isFocus,
  openAction,
  closeAction,
  optionsLength,
}: IUseAccessibleMultiSelectProps) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const itemRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let keyDownCallback: (e: KeyboardEvent) => void;
    if (isFocus) {
      keyDownCallback = (e) => {
        switch (e.key) {
          case "Enter":
          case "Down":
          case "ArrowDown":
            /** Open the popover and focus on the first item */
            e.preventDefault();
            openAction();
            setActiveIndex(0);
            console.log("Hello");
            break;
          case "Up":
          case "ArrowUp":
          case "Escape":
          case "Esc":
            /** Close the popover and reset active index */
            e.preventDefault();
            closeAction();
            setActiveIndex(-1);
            break;
          case "Tab":
            /** Close the popover and reset active index */
            /** Do not prevent default */
            closeAction();
            setActiveIndex(-1);
            break;
          default:
            setActiveIndex(-1);
            break;
        }
      };
      document.addEventListener("keydown", keyDownCallback);
    } else {
      /** attach no listener if trigger or list item is not focused */
      if (activeIndex < 0) return;
      keyDownCallback = (e) => {
        e.preventDefault();
        switch (e.key) {
          case "Up":
          case "ArrowUp":
            /** Focus on previous item or the filter element */
            if (activeIndex === 0) {
              triggerRef.current?.focus();
              setActiveIndex(-1);
            } else {
              setActiveIndex(activeIndex - 1);
            }
            break;
          case "Down":
          case "ArrowDown":
            setActiveIndex((prev) =>
              /** Focus on next item or the first item */
              prev + 1 === optionsLength ? 0 : prev + 1
            );
            break;
          case "Esc":
          case "Escape":
            /** Close the popover and reset active index */
            closeAction();
            setActiveIndex(-1);
            break;
          case "PageUp":
          case "Home":
            /** Focus on the first item */
            setActiveIndex(0);
            break;
          case "PageDown":
          case "End":
            /** Focus on the last item */
            setActiveIndex(optionsLength - 1);
            break;
          case "Enter":
          case " ": // Space
            /** Click on the focused item */
            itemRef.current?.click();
            break;
          case "Tab":
            if (e.shiftKey) {
              /** ACT AS UP ARROW */
              /** Focus on previous item or the filter element */
              if (activeIndex === 0) {
                triggerRef.current?.focus();
                setActiveIndex(-1);
              } else {
                setActiveIndex(activeIndex - 1);
              }
              break;
            } else {
              /** ACT AS DOWN ARROW */
              /** Focus on next item or the first item */
              setActiveIndex((prev) =>
                prev + 1 === optionsLength ? 0 : prev + 1
              );
              break;
            }
        }
      };
      document.addEventListener("keydown", keyDownCallback);
    }
    return () => {
      document.removeEventListener("keydown", keyDownCallback);
    };
  }, [isFocus, openAction, closeAction, optionsLength, activeIndex]);

  useEffect(() => {
    activeIndex >= 0 && itemRef.current?.focus();
  }, [activeIndex, itemRef]);

  return { activeIndex, setActiveIndex, itemRef, triggerRef };
};

export default useAccessibleMultiSelect;
