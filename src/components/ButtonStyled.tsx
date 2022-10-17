import React, { ReactNode } from "react";
import { Button } from "@mui/material";
import defaultTheme from "../config/theme/Default";

interface ButtonStyledProps {
  icon: ReactNode;
  onClick?: () => void;
  txt: string;
}
const styled = {
  margin: "5px",
  "&:hover": {
    backgroundColor: defaultTheme.palette.primary.light,
  },
  backgroundColor: defaultTheme.palette.primary.main,
  fontFamily: '"Josefin Sans", sans-serif',
};

const ButtonStyled: React.FC<ButtonStyledProps> = ({ icon, onClick, txt }) => {
  return (
    <Button
      className=""
      variant="contained"
      startIcon={icon}
      sx={styled}
      onClick={onClick}
    >
      {txt}
    </Button>
  );
};

export default ButtonStyled;
