import { styled } from "@mui/material/styles";
import { Dialog } from "@mui/material";

const MainDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "15px",
  },
}));

export default MainDialog;
