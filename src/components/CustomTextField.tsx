import { TextField, styled } from "@mui/material";
import ArrowDown from "../assets/arrow-down-angle-svgrepo-com.svg"

export const CustomTextField = styled(TextField)(() => ({
  width: "100%",
  background: `url(${ArrowDown}) no-repeat left 15px center`,
  boxSizing: 'border-box',
  border: "none",

  "& .MuiOutlinedInput-input": {
    padding: "20px 20px 20px 50px",
    outline: "none",
    border: "none",
    borderRadius: "0",
    borderBottom: "2px solid #EBEBEB",
    alignSelf: "flex-start",
    fontSize: "18px",
    color: "rgba(0, 0, 0, 0.5)",

  },

  "& .MuiOutlinedInput-root:hover, .MuiOutlinedInput-notchedOutline": {
    border: "none",
    outline: "none",
  },
}));