import React from 'react'
import { Container } from 'reactstrap';
import classes from "./NavBar.module.css";
import { Link } from 'react-router-dom';
const NavBar = () => {
    return (
        <Container className={classes.navBar}>
            <h6 className={classes.header}>Satış Uygulaması</h6>
            <Link to="/sale">Satış Sayfası</Link>&nbsp;
            <Link to="/customers">Müşteri Bilgileri Sayfası</Link>
        </Container>
    )
}

export default NavBar
