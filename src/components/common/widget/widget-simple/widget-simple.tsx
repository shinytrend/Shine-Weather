import { FC, memo } from "react";
import { Box, Card, CardContent, Typography, styled } from "@mui/material";
import Loader from "@components/common/loader/loader";

interface Props {
  title: string;
  colorTitle: string;
  colorSubtitle: string;
  subtitle: string | undefined;
  imageSrc: string | undefined;
  imageAlt: string;
  background: string;
  isLoading: boolean;
}

const Image = styled("img")({
  width: "90px",
  height: "auto"
});

const CardStyled = styled(Card)`
  width: 100%;
`;

const ContentStyled = styled(CardContent)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const WidgetSimple: FC<Props> = ({
  title,
  colorTitle,
  colorSubtitle,
  subtitle,
  imageSrc,
  imageAlt,
  isLoading,
  background
}): JSX.Element => {
  return (
    <CardStyled>
      {!isLoading ? (
        <ContentStyled sx={{ background }}>
          <Box>
            <Typography variant="h5" color={colorTitle}>
              {title}
            </Typography>
            <Typography color={colorSubtitle}>{subtitle}</Typography>
          </Box>
          <Image src={imageSrc} alt={imageAlt} />
        </ContentStyled>
      ) : (
        <Loader />
      )}
    </CardStyled>
  );
};

export default memo(WidgetSimple);
