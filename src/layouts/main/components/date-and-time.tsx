import { Box, Typography, styled } from "@mui/material";
import dayjs from "dayjs";
import { upperFirst } from "lodash";
import { FC, memo } from "react";

interface Props {
  margin: string;
}

const Component = styled(Box)`
  display: flex;
  gap: 4px;
`;

const DateAndTime: FC<Props> = memo(({ margin }): JSX.Element => {
  const currentDate = dayjs();
  const formattedDate = upperFirst(currentDate.format("dddd, D MMM"));
  const formattedTime = upperFirst(currentDate.format("HH:mm"));

  return (
    <Component margin={margin}>
      <Typography>{formattedDate}</Typography>
      <Typography>|</Typography>
      <Typography>Текущее время</Typography>
      <Typography>{formattedTime}</Typography>
    </Component>
  );
});

export default DateAndTime;
