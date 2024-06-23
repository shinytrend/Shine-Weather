import { CircularProgress, Box } from "@mui/material";
import { FC, memo } from "react";

interface Props {
  size?: number;
  color?: string;
  width?: string;
  height?: string;
  padding?: string;
}

const Loader: FC<Props> = memo(
  ({
    size = 25,
    color = "orange",
    width = "100%",
    height = "100%",
    padding = "30px 0"
  }): JSX.Element => {
    return (
      <Box
        sx={{
          width: { width },
          height: { height },
          padding: padding,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <CircularProgress sx={{ color: color }} size={size} />
      </Box>
    );
  }
);

export default Loader;
