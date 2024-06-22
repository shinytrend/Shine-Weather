import { IconButton, SvgIconProps, styled } from "@mui/material";
import { FC } from "react";

interface Props {
  height?: string;
  fontSize?: string;
  type?: "submit" | "button" | "reset";
  icon: React.ElementType<SvgIconProps>;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = styled(IconButton)`
  &:hover {
    color: red;
  }
`;

const IconButtonStyled: FC<Props> = ({
  height = "100%",
  fontSize = "inherit",
  type = "button",
  icon: IconComponent,
  disabled = false,
  onClick = () => {}
}) => {
  const Icon = IconComponent;

  return (
    <Button
      aria-label="delete"
      type={type}
      sx={{ height }}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon sx={{ fontSize }} />
    </Button>
  );
};

export default IconButtonStyled;
