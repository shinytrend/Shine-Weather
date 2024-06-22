import { Box, Typography, styled } from "@mui/material";

const Component = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 60px;
`;
const EmptySelectTitle = () => {
  return (
    <Component>
      <Typography variant="h4">Выберите город из списка</Typography>
    </Component>
  );
};

export default EmptySelectTitle;
