import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavBarComponent = () => {
    return (
        <Navbar bg="primary" variant="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home"><strong>Penjualan App</strong></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">About</Nav.Link>
                        <NavDropdown title="Kategori" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Makanan</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Minuman
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Cemilan</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
export default NavBarComponent;
