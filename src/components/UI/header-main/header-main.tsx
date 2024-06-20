import LogoCompany from "@components/common/logo-company/logo-company";
import { Box, styled } from "@mui/material";

const HeaderContainer = styled(Box)`
  width: 100%;
  padding: 10px 0;
  background: white;
  display: flex;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Header = styled(Box)`
  width: 1024px;
  background: white;
  display: flex;
  justify-content: space-between;
`;

const HeaderMain = () => {
  return (
    <HeaderContainer>
      <Header>
        <LogoCompany />
      </Header>
    </HeaderContainer>
  );
};

export default HeaderMain;
