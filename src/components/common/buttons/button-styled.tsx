import { FC } from "react";
import { Button } from "@mui/material";

interface Props {
  title: string;
  icon?: React.ReactElement;
  color?: "primary" | "secondary" | "success" | "error";
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}

const ButtonStyled: FC<Props> = ({
  title,
  icon,
  color = "success",
  onClick,
  disabled,
  type = "button"
}): JSX.Element => {
  return (
    <Button
      variant="contained"
      startIcon={icon}
      color={color}
      fullWidth
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {title}
    </Button>
  );
};

export default ButtonStyled;
