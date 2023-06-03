import { Select } from "@mui/material";
import { styled } from "@mui/material/styles";

const MainSelect = styled(Select)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderWidth: 0,
  },
  borderRadius: "10px",
}));

export default MainSelect;
