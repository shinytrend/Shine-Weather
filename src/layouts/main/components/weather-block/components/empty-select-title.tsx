import { Box, Typography, styled } from "@mui/material";
import { FC } from "react";

const Component = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 60px;
`;
const EmptySelectTitle: FC = (): JSX.Element => {
  return (
    <Component>
      <Typography variant="h4">Выберите город из списка</Typography>
    </Component>
  );
};

export default EmptySelectTitle;
