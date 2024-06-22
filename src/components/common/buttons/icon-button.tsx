import { IconButton, Tooltip, styled } from "@mui/material";
import { FC } from "react";
import { SvgIconProps } from "@mui/material/SvgIcon";

interface Props {
  height?: string;
  fontSize?: string;
  tooltipTitle?: string;
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
  onClick = () => {},
  tooltipTitle = ""
}) => {
  const Icon = IconComponent;

  return (
    <Tooltip title={tooltipTitle} placement="top">
      <span>
        <Button
          aria-label="delete"
          type={type}
          sx={{ height }}
          onClick={onClick}
          disabled={disabled}
        >
          <Icon sx={{ fontSize }} />
        </Button>
      </span>
    </Tooltip>
  );
};

export default IconButtonStyled;
