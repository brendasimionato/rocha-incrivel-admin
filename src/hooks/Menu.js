import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useHistory } from 'react-router'


export default function Menu() {

    const history = useHistory()

    const goToAudits = () => {
        history.push("/audit")
    }

    const goToCards = () => {
        history.push("/cards")
    }

    const goToUsers = () => {
        history.push("/users")
    }


    return (
        <Navbar bg="light" expand="lg" sticky="left">
            <Container>
                <Navbar.Brand href={"/"}>Rocha Incrível</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href={"/audit"}>Auditorias</Nav.Link>
                        <Nav.Link href={"/cards"}>Cartões</Nav.Link>
                        <Nav.Link href={"/users"}>Usuários</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}
