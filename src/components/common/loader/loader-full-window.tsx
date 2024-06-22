import { Box } from "@mui/material";
import Loader from "./loader";
import styled from "@emotion/styled";
import { FC, memo } from "react";

interface LoaderFullWindowProps {
  color?: string;
  size?: number;
  isLoading?: boolean;
}

const Component = styled(Box)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: white;
  opacity: 0.2;
  z-index: 99999999;
`;

const LoaderFullWindow: FC<LoaderFullWindowProps> = memo(
  ({ color = "grey", size = 75, isLoading }) => {
    return (
      isLoading && (
        <Component sx={{ color: color }}>
          <Loader size={size} color={color} />
        </Component>
      )
    );
  }
);

export default LoaderFullWindow;
