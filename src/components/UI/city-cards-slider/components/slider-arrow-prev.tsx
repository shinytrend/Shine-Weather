import { FC } from "react";
import { IconButton, styled } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

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

const SliderArrowPrev: FC<Props> = ({ onClick }) => {
  return (
    <StyledIconButton style={{ left: -40 }} onClick={onClick}>
      <ArrowBackIosNewOutlinedIcon />
    </StyledIconButton>
  );
};

export default SliderArrowPrev;
