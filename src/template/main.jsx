import styled from "@emotion/styled";

export function Main(props) {
  return <StyledMain>{props.children}</StyledMain>;
}

const StyledMain = styled("main")({
  flexGrow: 1,
  padding: "3rem 0"
});
