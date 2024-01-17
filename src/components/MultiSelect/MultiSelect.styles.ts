import styled, { css } from "styled-components";
import { ReactComponent as chevronDown } from "../../assets/chevron-down.svg";
import { ReactComponent as chevronUp } from "../../assets/chevron-up.svg";
import { ReactComponent as cross } from "../../assets/cross.svg";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing["2"]};
  position: relative;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.color.primary600};
  font-size: ${({ theme }) => theme.fontSize.header_xxs};
  line-height: ${({ theme }) => theme.lineHeight.header_xxs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const InputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing["2"]};
  padding: ${({ theme }) =>
    `${theme.spacing["1"]} ${theme.spacing["3"]} ${theme.spacing["1"]} ${theme.spacing["1"]}`};

  border-style: solid;
  border-width: ${({ theme }) => theme.borderWidth.thin};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  box-shadow: ${({ theme }) =>
    `0 ${theme.spacing["0.5"]} 4px ${theme.color.primary100}`};

  transition: border-color 200ms ease-in-out;
  border-color: ${({ theme }) => theme.color.primary300};
  &:hover {
    border-color: ${({ theme }) => theme.color.primary500};
  }
  &:focus-within {
    border-color: ${({ theme }) => theme.color.primary600};
  }
`;

const Popover = styled.div`
  overflow: hidden;
  position: absolute;
  z-index: 1000;
  width: 100%;
  top: ${({ theme }) => `calc(100% + ${theme.spacing["2"]})`};
  left: 0;
  border-style: solid;
  border-width: ${({ theme }) => theme.borderWidth.thin};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border-color: ${({ theme }) => theme.color.primary600};
  background-color: ${({ theme }) => theme.color.primary50};

  transform-origin: top center;
  transition: transform 0.2s;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  align-self: center;

  background-color: transparent;

  font-size: ${({ theme }) => theme.fontSize.text_md};
  line-height: ${({ theme }) => theme.lineHeight.text_md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  caret-color: ${({ theme }) => theme.color.primary500};
  color: ${({ theme }) => theme.color.foreground};

  &::-moz-selection {
    /* Code for Firefox */
    color: ${({ theme }) => theme.commonColors.white};
    background: ${({ theme }) => theme.color.primary500};
  }

  &::selection {
    color: ${({ theme }) => theme.commonColors.white};
    background: ${({ theme }) => theme.color.primary500};
  }

  &::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${({ theme }) => theme.color.primary500};
    opacity: 1; /* Firefox */
  }

  &:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${({ theme }) => theme.color.primary500};
  }

  &::-ms-input-placeholder {
    /* Microsoft Edge */
    color: ${({ theme }) => theme.color.primary400};
  }

  &:not([aria-expanded="true"]) ~ ${Popover} {
    transform: scaleY(0);
  }
`;

const ChipList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  min-height: 28px;
  flex: 1;
  gap: ${({ theme }) => theme.spacing["1"]};
`;

const Chip = styled.li`
  display: flex;
  width: fit-content;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing["1.5"]};
  padding: ${({ theme }) => `${theme.spacing["1"]} ${theme.spacing["2"]}`};
  border-radius: ${({ theme }) => theme.borderRadius.standard};

  background-color: ${({ theme }) => theme.color.primary200};
  &:focus-within {
    background-color: ${({ theme }) => theme.color.primary300};
  }
`;

const ChipText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.text_sm};
  line-height: ${({ theme }) => theme.lineHeight.text_sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.color.foreground};
`;

const ChipButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  fill: ${({ theme }) => theme.color.background};
  padding: ${({ theme }) => theme.spacing["1"]};
  border-radius: ${({ theme }) => theme.borderRadius.tiny};

  background-color: ${({ theme }) => theme.color.primary500};
  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.color.primary600};
  }
  cursor: ${({ disabled }) => (disabled ? "initial" : "pointer")};
`;

const Cross = styled(cross)`
  width: 9px;
  height: 9px;
`;

const Button = styled.button`
  outline: none;
  cursor: ${({ disabled }) => (disabled ? "initial" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
  fill: ${({ theme }) => theme.color.foreground};
`;

const ArrowDown = styled(chevronDown)`
  width: 12px;
  height: 12px;
`;

const ArrowUp = styled(chevronUp)`
  width: 12px;
  height: 12px;
`;

const popoverScrollBarStyles = css`
  /* width */
  &::-webkit-scrollbar {
    width: 4px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    border-radius: ${({ theme }) => theme.borderRadius.tiny};
    background-color: ${({ theme }) => theme.color.primary500};
    min-height: 56px;
    overflow: hidden;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.color.primary700};
  }
`;

const SelectionList = styled.ul`
  display: flex;
  flex-direction: column;
  max-height: 450px;
  overflow-y: scroll;

  ${popoverScrollBarStyles}
`;

const SelectItem = styled.li`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing["3"]} ${theme.spacing["2"]}`};
  gap: ${({ theme }) => theme.spacing["2"]};
  cursor: pointer;

  border-style: solid;
  border-bottom-width: ${({ theme }) => theme.borderWidth.thin};
  border-color: ${({ theme }) => theme.color.primary600};

  &[aria-selected="true"] {
    background-color: ${({ theme }) => theme.color.primary100};
  }

  &:last-child {
    border-bottom: none;
  }

  transform: scaleY(1);
`;

const ItemCheckbox = styled.input`
  width: 14px;
  height: 14px;
  cursor: pointer;
`;

const ItemImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.standard};
`;

const ItemInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSize.text_sm};
  line-height: ${({ theme }) => theme.lineHeight.text_sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.color.primary800};
`;

const ItemDescription = styled.span`
  font-size: ${({ theme }) => theme.fontSize.text_xs};
  line-height: ${({ theme }) => theme.lineHeight.text_xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.color.primary700};
`;

const SpinnerContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.primary50};
  opacity: 0.6;
`;

const Spinner = styled.span`
  min-height: 20px;
  min-width: 20px;
  align-self: center;
  border-radius: 50%;
  position: relative;
  animation: rotate 1s linear infinite;

  &::before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border: ${({ theme }) =>
      `${theme.borderWidth.medium} solid ${theme.color.foreground}`};
    animation: prixClipFix 2s linear infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes prixClipFix {
    0% {
      clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
    }
    25% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
    }
    50% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
    }
    75% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
    }
    100% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
    }
  }
`;

const InfoText = styled.p`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.text_md};
  line-height: ${({ theme }) => theme.lineHeight.text_md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.color.foreground};
  padding: ${({ theme }) => `0 ${theme.spacing["3"]}`};
  height: 50px;
`;

export {
  Container,
  Label,
  Input,
  InputWrap,
  ChipList,
  Chip,
  ChipText,
  ChipButton,
  Cross,
  Button,
  ArrowDown,
  ArrowUp,
  Popover,
  SelectionList,
  SelectItem,
  ItemCheckbox,
  ItemImage,
  ItemInfoContainer,
  ItemTitle,
  ItemDescription,
  SpinnerContainer,
  Spinner,
  InfoText,
};
