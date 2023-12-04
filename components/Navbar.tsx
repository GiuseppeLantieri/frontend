'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import useViewportState from 'beautiful-react-hooks/useViewportState';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavbarB from 'react-bootstrap/Navbar';

export function Navbar() {
    const { width } = useViewportState();
    const [isShow, setShow] = useState(false);

    if (width < 1000) {
        return (
            <NavbarB expand="lg" className="bg-body-tertiary">
                <Container>
                    <NavbarB.Brand href="/" style={{ width: "auto", height: "auto" }}>
                        <img src="/asset/darkgreen.svg" alt="logo" style={{ width: "50px", height: "50px" }} />
                    </NavbarB.Brand>
                    <NavbarB.Toggle aria-controls="basic-navbar-nav" onClick={() => setShow(!isShow)} />
                    {
                        isShow &&
                        <Nav className="me-auto" style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                            <Nav.Link href="/raccolte">Le mie Raccolte</Nav.Link>
                            <Nav.Link href="/sostieni">Chi Sostieni</Nav.Link>
                            <Nav.Link href="/crea">Crea Raccolta</Nav.Link>
                            <ConnectButton />
                        </Nav>
                    }
                </Container>
            </NavbarB>
        );
    }

    return (
        <NavbarB expand="lg" className="bg-body-tertiary">
            <Container>
                <NavbarB.Brand href="/" style={{ width: "auto", height: "auto" }}>
                    <img src="/asset/darkgreen.svg" alt="logo" style={{ width: "50px", height: "50px" }} />
                </NavbarB.Brand>
                <Nav className="me-auto" style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                    <Nav.Link href="/raccolte">Le mie Raccolte</Nav.Link>
                    <Nav.Link href="/sostieni">Chi Sostieni</Nav.Link>
                    <Nav.Link href="/crea">Crea Raccolta</Nav.Link>
                    <ConnectButton />
                </Nav>
            </Container>
        </NavbarB>
    );
}
