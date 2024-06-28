import { FC, memo } from "react";
import { Box, Typography, styled } from "@mui/material";
import { getBackgroundColor } from "@utils/get-background-card-color";
import { IHour } from "@interfaces/weather-data-interface";

interface Props {
  hour: IHour;
}

const Component = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  padding: 4px 8px;
  justify-content: space-between;
`;

const Condition = styled("img")({
  width: "60px",
  height: "auto",
  pointerEvents: "none"
});

const HourComponent: FC<Props> = ({ hour }): JSX.Element => {
  const { time, condition } = hour;
  const hourTime = time.split(" ")[1];
  const { icon: conditionIcon, text: conditionText } = condition;
  const { code } = condition;

  return (
    <Component sx={{ background: getBackgroundColor(code) }}>
      {<Typography>{hourTime}</Typography>}{" "}
      <Condition src={conditionIcon} alt={conditionText} />
    </Component>
  );
};

export default memo(HourComponent);
