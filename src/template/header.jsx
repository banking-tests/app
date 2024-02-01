import styled from "@emotion/styled";
import { Container, Typography } from "@mui/material";

export function Header(props) {
  return (
    <StyledHeader>
      <Container>
        <Typography
          variant="h1"
          component={"h1"}
          fontSize={36}
          textAlign={"center"}
        >
          Oye, banco
        </Typography>
      </Container>
    </StyledHeader>
  );
}

const StyledHeader = styled("header")({
  padding: "32px 0",
});
