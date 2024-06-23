import LogoCompany from "@components/common/logo-company/logo-company";
import { Box, styled } from "@mui/material";
import { FC, memo } from "react";

const HeaderContainer = styled(Box)`
  width: 100%;
  padding: 10px 0;
  background: white;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Header = styled(Box)`
  background: white;
  display: flex;
  justify-content: center;
`;

const HeaderMain: FC = (): JSX.Element => {
  return (
    <HeaderContainer>
      <Header>
        <LogoCompany />
      </Header>
    </HeaderContainer>
  );
};

export default memo(HeaderMain);
