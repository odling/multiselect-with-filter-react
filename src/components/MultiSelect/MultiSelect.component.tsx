import React, { forwardRef, useCallback, useImperativeHandle } from "react";
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
      items,
      name,
      label,
      onInputChange,
      selectedItems,
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

    const handleSelectItem = useCallback(
      (item: IMultiSelectItem, isSelected: boolean) => {
        if (isSelected) {
          /** Remove the item from selectedItems state */
          onSelectionChange(
            selectedItems.filter((selectedItem) => selectedItem.id !== item.id)
          );
        } else {
          /** Add the item to selectedItems state */
          const newSelectedItems = [...selectedItems, item];
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
        const onScrollEndDebounced = debounce(onEndScroll, 200, {
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

    const {
      isOpen: isTriggerFocused,
      open: setTriggerFocused,
      close: setTriggerBlurred,
    } = useToggle(false);

    const {
      isOpen: isButtonFocused,
      open: setButtonFocused,
      close: setButtonBlurred,
    } = useToggle(false);

    const { activeIndex, setActiveIndex, itemRef, triggerRef } =
      useAccessibleMultiSelect({
        isPopoverVisible,
        isFocus: isTriggerFocused || isButtonFocused,
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

    const highightItemTitle = useCallback(
      (title: string) => {
        /** Sanitize the title since dangerouslySetInnerHTML attribute is used*/
        title = sanitizeHtml(title);

        /** Find the first occurance of the input value */
        /** Do the comparison in lowercase versions only */
        const lowerCaseTitle = title.toLowerCase();
        const lowerCaseInputValue =
          triggerRef.current?.value.trim().toLowerCase() ?? "";

        const firstIndex = lowerCaseTitle.indexOf(lowerCaseInputValue);
        const lastIndex = firstIndex + lowerCaseInputValue.length;

        /** Use the indexes in the original text (not lowercase version) */
        return (
          title.slice(0, firstIndex) +
          `<b>${title.slice(firstIndex, lastIndex)}</b>` +
          title.slice(lastIndex)
        );
      },

      [triggerRef]
    );

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
          <Styled.ChipList>
            {selectedItems.map((selection) => (
              <Styled.Chip key={`${name}-selection-${selection.id}`}>
                <Styled.ChipText>{selection.title}</Styled.ChipText>
                <Styled.ChipButton
                  type="button"
                  aria-label={`Unselect ${selection.title}`}
                  onClick={() => handleSelectItem(selection, true)}
                >
                  <Styled.Cross />
                </Styled.ChipButton>
              </Styled.Chip>
            ))}
            <Styled.Input
              ref={triggerRef}
              id={`${name}-input`}
              type="text"
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
                        onClick={() => handleSelectItem(item, isSelected)}
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
          </Styled.ChipList>
          <Styled.Button
            onFocus={setButtonFocused}
            onBlur={setButtonBlurred}
            onClick={togglePopoverVisibility}
            aria-labelledby={`${name}-input`}
          >
            {isPopoverVisible ? <Styled.ArrowUp /> : <Styled.ArrowDown />}
          </Styled.Button>
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
