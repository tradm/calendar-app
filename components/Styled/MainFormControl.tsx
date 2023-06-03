import { FormControl } from "@mui/material";
import { styled } from "@mui/material/styles";

const MainFormControl = styled(FormControl)(({ theme }) => ({
  margin: 0,
  minWidth: 120,
  "& .MuiSelect-root": {
    borderRadius: "10px",
  },
  "& .MuiOutlinedInput-input": {
    paddingTop: "6px",
    paddingBottom: "6px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderWidth: 0,
    borderColor: "transparent",
  },
  "& .Mui-focused": {
    borderWidth: 0,
    outline: "none",
  },
}));

export default MainFormControl;
