import styled from "styled-components";
import { ReactComponent as light } from "./assets/light.svg";
import { ReactComponent as dark } from "./assets/dark.svg";

const Header = styled.header`
  top: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100px;
  padding: ${({ theme }) => theme.spacing["5"]};
`;

const ThemeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.primary100};
  border-radius: ${({ theme }) => theme.borderRadius.standard};
  padding: ${({ theme }) => theme.spacing["3"]};
  cursor: pointer;
  fill: ${({ theme }) => theme.color.foreground};

  transition: outline 0.2s;
  &:focus {
    outline: ${({ theme }) =>
      `${theme.borderWidth.thin} solid ${theme.color.foreground}`};
  }
`;

const LightIcon = styled(light)`
  width: 20px;
  height: 20px;
`;

const DarkIcon = styled(dark)`
  width: 20px;
  height: 20px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  align-self: center;
  padding: 0 ${({ theme }) => theme.spacing[5]};
`;

const Panel = styled.div`
  width: 100%;
  @media (min-width: ${({ theme }) => `${theme.breakpoint.md}px`}) {
    width: 50%;
  }
  min-height: 100vh;
`;

export { Header, Main, Panel, DarkIcon, LightIcon, ThemeButton };
