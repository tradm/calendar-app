import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

const MainTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    borderRadius: "10px",
  },
}));

export default MainTextField;
