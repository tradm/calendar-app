import { styled } from "@mui/material/styles";
import Menu from "@mui/material/Menu";

const MainMenu = styled(Menu)`
  && {
    & .MuiPaper-root {
      overflow: visible;
      border-radius: 10px;
      box-shadow: 0 0 2px 0 rgba(145, 158, 171, 0.2),
        0 12px 24px -4px rgba(145, 158, 171, 0.12);
      margin-top: 0;
      padding-left: 4px;
      padding-right: 4px;
    }
  }
`;

export default MainMenu;
