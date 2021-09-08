import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useHistory } from 'react-router'


export default function Menu() {

    const history = useHistory()

    const goToLogout = () => {
        localStorage.clear()
        history.push("/")
    }

    const goToPage = (page, role) => {
        const rolesAnalyst = localStorage.getItem("roles").split(",")
        
        const roles = rolesAnalyst.find((r) => {
            if (r == role) return r
        })

        if (roles != undefined && roles.length > 0) {
            window.location.href = page
        } else {
            alert('Você não tem permissão para acessar essa página.')
        }

    }


    return (
        <Navbar bg="light" expand="lg" sticky="left">
            <Container>
                <Navbar.Brand href={"/home"}>Rocha Incrível</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => goToPage('/audit', 'n2')}>Auditorias</Nav.Link>
                        <Nav.Link onClick={() => goToPage('/cards', 'n1')}>Cartões</Nav.Link>
                        <Nav.Link href={"/features"}>Recursos</Nav.Link>
                        <Nav.Link href={"/users"}>Usuários</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Button onClick={goToLogout} variant=" dark -success">
                    Sair
                </Button>
            </Container>
        </Navbar>
    )

}
