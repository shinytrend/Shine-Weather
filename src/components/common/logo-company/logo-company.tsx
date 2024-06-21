import { Box, Typography, styled } from "@mui/material";
import LogoCompanyImg from "@assets/logo_company.png";

const Component = styled(Box)`
  display: flex;
  align-items: center;
  gap: 4px;
  text-transform: uppercase;
  cursor: pointer;
`;

const CompanyName = styled(Typography)`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  line-height: 1;
  text-transform: uppercase;
`;

const Logo = styled("img")({
  width: "32px",
  height: "auto"
});

const LogoCompany = () => {
  return (
    <Component>
      <Logo src={LogoCompanyImg} width="30px" />
      <CompanyName>Погода</CompanyName>
    </Component>
  );
};

export default LogoCompany;
