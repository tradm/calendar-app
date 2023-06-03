import { Drawer } from "@mui/material";
import { styled } from "@mui/material/styles";

const MainDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiModal-backdrop": {
    backgroundColor: "transparent",
  },
  "& .MuiDrawer-paper": {
    boxShadow:
      "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px,rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
  },
}));

export default MainDrawer;
