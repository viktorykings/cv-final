import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import HeaderNav from "../components/Navigation/Navigation";
import CssBaseline from "@mui/material/CssBaseline";

function Root() {
  return (
    <>
      <CssBaseline />
      <Header>
        <HeaderNav/>
        </Header>
      <Outlet />
    </>
  );
}

export default Root;