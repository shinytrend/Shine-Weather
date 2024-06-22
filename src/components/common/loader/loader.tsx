import { CircularProgress, Box } from "@mui/material";

const Loader = ({
  size = 25,
  color = "white",
  width = "100%",
  height = "100%",
  padding = "30px 0"
}) => {
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
};

export default Loader;
