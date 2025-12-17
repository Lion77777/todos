import { Checkbox, checkboxClasses, styled } from "@mui/material";

export const RoundedCheckbox = styled(Checkbox)(() => ({
  padding: 0,
  width: 30,
  height: 30,
  position: "relative",

  "& .MuiSvgIcon-root, & .MuiCheckbox-checkedIcon": {
    display: "none",
  },

  "&": {
    content: '""',
    position: "absolute",
    left: "16px",
    top: "8px",
    width: 30,
    height: 30,
    borderRadius: "50%",
    border: "2px solid #ccc",
    transition: "0.2s ease",
  },

  [`&.${checkboxClasses.checked}`]: {
    borderColor: "#22c55e",
  },

  "&::after": {
    content: '""',
    position: "absolute",
    left: 9,
    top: 3,
    width: 6,
    height: 14,
    border: "solid green",
    borderWidth: "0 2px 2px 0",
    opacity: 0,
    transform: "rotate(45deg)",
    transition: "opacity 0.15s ease",
  },

  [`&.${checkboxClasses.checked}::after`]: {
    opacity: 1,
  },
}));