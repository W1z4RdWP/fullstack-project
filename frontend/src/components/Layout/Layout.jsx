import { useState } from "react";
import Header from "../Header/Header";
import Page from "../Page/Page";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import './Layout.css';

const Layout = () => {
    const [count, setCount] = useState(0);

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
};


export default Layout;