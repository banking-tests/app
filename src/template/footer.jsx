import styled from "@emotion/styled";
import { Container, Typography } from "@mui/material";

export function Footer() {
  return (
    <>
      <StyledFooter>
        <Container>
          <Typography variant="body1" color="initial" textAlign={"center"}>
            © 2024 Oye, banco
          </Typography>
        </Container>
      </StyledFooter>
    </>
  );
}

const StyledFooter = styled("footer")({
  padding: "32px 0",
});
