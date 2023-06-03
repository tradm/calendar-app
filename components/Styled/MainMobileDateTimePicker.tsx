import { styled } from "@mui/material/styles";
import { MobileDateTimePicker } from "@mui/x-date-pickers";

const MainMobileDateTimePicker = styled(MobileDateTimePicker)(({ theme }) => ({
  "& .MuiInputBase-root": {
    borderRadius: "10px",
  },
}));

export default MainMobileDateTimePicker;
