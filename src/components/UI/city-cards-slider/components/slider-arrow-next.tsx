import { FC } from "react";
import { IconButton, styled } from "@mui/material";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

interface Props {
  onClick: () => void;
}

const StyledIconButton = styled(IconButton)`
  position: absolute;
  top: 44%;
  color: green !important;
  &:hover {
    color: blue !important;
  }
`;

const SliderArrowNext: FC<Props> = ({ onClick }) => {
  return (
    <StyledIconButton style={{ right: -34 }} onClick={onClick}>
      <ArrowForwardIosOutlinedIcon />
    </StyledIconButton>
  );
};

export default SliderArrowNext;
