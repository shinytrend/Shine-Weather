import { FC, memo } from "react";
import { Box, SvgIconProps, Typography, styled } from "@mui/material";

interface Props {
  title: string;
  value: number;
  symbol: string;
  icon: React.ElementType<SvgIconProps>;
}

const HorizontalContainer = styled(Box)`
  display: flex;
  gap: 4px;
`;

const RowCityCard: FC<Props> = ({
  title,
  value,
  symbol,
  icon: IconComponent
}): JSX.Element => {
  const Icon = IconComponent;

  return (
    <HorizontalContainer>
      <Icon />
      <Typography>{title}:</Typography>
      <Typography fontWeight="600">
        {value}
        {symbol}
      </Typography>
    </HorizontalContainer>
  );
};

export default memo(RowCityCard);
