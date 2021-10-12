import React from 'react'
import { Container } from 'reactstrap';
import classes from "./NavBar.module.css";
import { Link } from 'react-router-dom';
const NavBar = () => {
    return (
        <Container className={classes.navBar}>
            <h6 className={classes.header}>Satış Uygulaması</h6>
            <Container className={classes.linksContainer}><Link to="/sale" className={classes.link}>Satış Sayfası</Link>&nbsp;
            <Link to="/customers" className={classes.link}>Müşteri Bilgileri Sayfası</Link></Container>
        </Container>
    )
}

export default NavBar
