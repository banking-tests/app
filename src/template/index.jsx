import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";

import { styled } from "@mui/material";
import { Footer } from "./footer";
import { Header } from "./header";
import { Main } from "./main";

export function Layout(props) {
  return (
    <App>
      <Header />
      <Main>{props.children}</Main>
      <Footer />
    </App>
  );
}

const App = styled("div")(() => ({
  minHeight: "inherit",
  fontFamily: "Poppins, sans-serif!important",
  display: "flex",
  flexDirection: "column",
}));
