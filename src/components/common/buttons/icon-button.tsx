import { IconButton, SvgIconProps } from "@mui/material";
import { FC } from "react";

interface Props {
  height?: string;
  fontSize?: string;
  type?: "submit" | "button" | "reset";
  icon: React.ElementType<SvgIconProps>;
}

const IconButtonStyled: FC<Props> = ({
  height = "100%",
  fontSize = "inherit",
  type = "button",
  icon: IconComponent
}) => {
  const Icon = IconComponent;

  return (
    <IconButton aria-label="delete" type={type} sx={{ height }}>
      <Icon sx={{ fontSize }} />
    </IconButton>
  );
};

export default IconButtonStyled;
