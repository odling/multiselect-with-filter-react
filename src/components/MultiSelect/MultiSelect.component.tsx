import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { IMultiSelectItem, IMultiSelectProps } from "./MultiSelect.interface";
import * as Styled from "./MultiSelect.styles";
import {
  useAccessibleMultiSelect,
  useOutsideClick,
  useToggle,
} from "../../hooks";
import debounce from "lodash/debounce";
import sanitizeHtml from "sanitize-html";

const MultiSelect = forwardRef<HTMLDivElement, IMultiSelectProps>(
  function MultiSelect(props, ref) {
    const {
      inputValue,
      items,
      name,
      label,
      onInputChange,
      onSelectionChange,
      placeholder,
      isLoading,
      onEndScroll,
      ...otherProps
    } = {
      ...defaultProps,
      ...props,
    };

    const {
      isOpen: isPopoverVisible,
      close: hidePopover,
      open: displayPopover,
      toggle: togglePopoverVisibility,
    } = useToggle(false);

    const [selectedItems, setSelectedItems] = useState<
      IMultiSelectProps["items"]
    >([]);

    const handleSelectItem = useCallback(
      (item: IMultiSelectItem) => {
        const filteredItems = selectedItems.filter(
          (selectedItem) => selectedItem.id !== item.id
        );
        if (filteredItems.length !== selectedItems.length) {
          /** Remove the item from selectedItems state */
          setSelectedItems(filteredItems);
          onSelectionChange(filteredItems);
        } else {
          /** Add the item to selectedItems state */
          const newSelectedItems = [...selectedItems, item];
          setSelectedItems(newSelectedItems);
          onSelectionChange(newSelectedItems);
        }
      },
      [selectedItems, onSelectionChange]
    );

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> =
      useCallback(
        (e) => {
          onInputChange(e.target.value);
        },
        [onInputChange]
      );

    const handleScrollEnd: React.UIEventHandler<HTMLUListElement> = useCallback(
      (e) => {
        const onScrollEndDebounced = debounce(onEndScroll, 100, {
          trailing: true,
        });

        const { offsetHeight, scrollTop, scrollHeight } = e.currentTarget;
        /** 1px safety factor is utilized */
        if (offsetHeight + scrollTop >= scrollHeight - 1) {
          onScrollEndDebounced();
        }
      },
      [onEndScroll]
    );

    const highightItemTitle = useCallback(
      (title: string) => {
        title = sanitizeHtml(title);
        const regExp = new RegExp(inputValue.trim(), "i");
        return title.toLowerCase().replace(regExp, "<b>" + inputValue + "</b>");
      },
      [inputValue]
    );

    const {
      isOpen: isTriggerFocused,
      open: setTriggerFocused,
      close: setTriggerBlurred,
    } = useToggle(false);

    const { activeIndex, setActiveIndex, itemRef, triggerRef } =
      useAccessibleMultiSelect({
        isPopoverVisible,
        isFocus: isTriggerFocused,
        openAction: displayPopover,
        closeAction: hidePopover,
        optionsLength: items.length,
      });

    const handleOutsideClick = useCallback(() => {
      hidePopover();
      setActiveIndex(-1);
    }, [hidePopover, setActiveIndex]);

    const { ref: containerRef } =
      useOutsideClick<HTMLDivElement>(handleOutsideClick);

    useImperativeHandle(ref, () => containerRef.current as HTMLDivElement, [
      containerRef,
    ]);

    return (
      <Styled.Container ref={containerRef} {...otherProps}>
        {label && (
          <Styled.Label
            id={`${name}-label`}
            aria-label={label}
            htmlFor={`${name}-input`}
          >
            {label}
          </Styled.Label>
        )}
        <Styled.InputWrap>
          {selectedItems.length > 0 && (
            <Styled.ChipList>
              {selectedItems.map((selection) => (
                <Styled.Chip key={`${name}-selection-${selection.id}`}>
                  <Styled.ChipText>{selection.title}</Styled.ChipText>
                  <Styled.ChipButton
                    type="button"
                    aria-label={`Unselect ${selection.title}`}
                    onClick={() => handleSelectItem(selection)}
                  >
                    <Styled.Cross />
                  </Styled.ChipButton>
                </Styled.Chip>
              ))}
            </Styled.ChipList>
          )}
          <Styled.Input
            ref={triggerRef}
            id={`${name}-input`}
            type="text"
            value={inputValue}
            placeholder={placeholder}
            aria-label={label || `${name}-input`}
            autoComplete="off"
            aria-haspopup="listbox"
            role="combobox"
            aria-expanded={isPopoverVisible}
            aria-controls={`${name}-popover`}
            onFocus={setTriggerFocused}
            onBlur={setTriggerBlurred}
            onChange={handleInputChange}
            onClick={displayPopover}
          />
          <Styled.Button
            tabIndex={-1}
            onClick={togglePopoverVisibility}
            aria-labelledby={`${name}-input`}
          >
            {isPopoverVisible ? <Styled.ArrowUp /> : <Styled.ArrowDown />}
          </Styled.Button>
          <Styled.Popover>
            <Styled.SelectionList
              id={`${name}-popover`}
              role="listbox"
              tabIndex={-1}
              aria-multiselectable="true"
              onScroll={handleScrollEnd}
            >
              {items.length === 0 ? (
                <Styled.InfoText>
                  {!isLoading && "No results found"}
                </Styled.InfoText>
              ) : (
                items.map((item, index) => {
                  const isFocused = activeIndex === index;
                  const isSelected = selectedItems.some(
                    (selectedItem) => selectedItem.id === item.id
                  );
                  return (
                    <Styled.SelectItem
                      ref={isFocused ? itemRef : null}
                      id={`${name}-element-${item.id}`}
                      key={item.id}
                      role="option"
                      tabIndex={isPopoverVisible ? 0 : -1}
                      aria-label={item.title}
                      aria-selected={isFocused}
                      onClick={() => handleSelectItem(item)}
                      onMouseOver={() => setActiveIndex(index)}
                    >
                      <Styled.ItemCheckbox
                        id={`${item.id}-checkbox`}
                        type="checkbox"
                        readOnly
                        tabIndex={-1}
                        aria-labelledby={`${name}-element-${item.id}`}
                        checked={isSelected}
                      />
                      <Styled.ItemImage
                        src={item.imageSrc}
                        alt={item.title}
                      ></Styled.ItemImage>
                      <Styled.ItemInfoContainer>
                        <Styled.ItemTitle
                          dangerouslySetInnerHTML={{
                            __html: highightItemTitle(item.title),
                          }}
                        />
                        <Styled.ItemDescription>
                          {item.description}
                        </Styled.ItemDescription>
                      </Styled.ItemInfoContainer>
                    </Styled.SelectItem>
                  );
                })
              )}
              {isLoading && (
                <Styled.SpinnerContainer>
                  <Styled.Spinner />
                </Styled.SpinnerContainer>
              )}
            </Styled.SelectionList>
          </Styled.Popover>
        </Styled.InputWrap>
      </Styled.Container>
    );
  }
);

const defaultProps = {
  id: undefined,
  label: "",
  onInputChange: () => {},
  onSelectionChange: () => {},
  placeholder: "",
  isLoading: false,
  onEndScroll: () => {},
};

MultiSelect.defaultProps = defaultProps;

export default MultiSelect;
