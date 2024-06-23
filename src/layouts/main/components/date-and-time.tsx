import useWindowWidth from "@hooks/window/use-window-width";
import { Box, Typography, styled } from "@mui/material";
import dayjs from "dayjs";
import { upperFirst } from "lodash";
import { FC, memo } from "react";

interface Props {
  margin: string;
}

const Component = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 4px;
`;

const DateAndTime: FC<Props> = ({ margin }): JSX.Element => {
  const currentDate = dayjs();
  const formattedDate = upperFirst(currentDate.format("dddd, D MMM"));
  const formattedTime = upperFirst(currentDate.format("HH:mm"));

  const screenWidth = useWindowWidth();

  return (
    <Component margin={margin}>
      {screenWidth > 499 ? (
        <Typography>{`${formattedDate} | Текущее время ${formattedTime}`}</Typography>
      ) : (
        <Box>
          <Typography>{formattedDate}</Typography>
          <Typography>Текущее время {formattedTime}</Typography>
        </Box>
      )}
    </Component>
  );
};

export default memo(DateAndTime);
