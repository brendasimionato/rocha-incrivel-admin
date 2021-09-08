import { Container, Row, Col, Card, ListGroup, ListGroupItem, Dropdown, Button } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react"
import { BASE_URL } from "../constants/url";
import { useHistory } from 'react-router'

export default function HomePage() {


    const [countUsers, setCountUsers] = useState([])
    const [countCards, setCountCards] = useState([])


    const history = useHistory()

    const goToCards = () => {
        history.push("/cards")
    }

    const goToUsers = () => {
        history.push("/users")
    }

    const users = () => {
        const url = `${BASE_URL}/users`

        axios.get(url, {
        }).then((resp) => {
            setCountUsers(resp.data.length)
            console.log(resp.data)

        }).catch((error) => {
        })
    }


    const cards = () => {
        const url = `${BASE_URL}/cards`
        axios.get(url, {
        }).then((resp) => {
            setCountCards(resp.data.length)
        }).catch((error) => {
        })
    }


    useEffect(() => {
        users()
        cards()
    }, [])

    return (
        <Container class="d-inline-flex p-2 bd-highlight">
            <Card style={{ width: '18rem' }}>
                <Card.Body >
                    <Card.Title class="text-center">Cartões pendentes</Card.Title>
                    <Card.Text class="text-center">
                        Nossos cartões.
                        <p></p>

                        <Button variant="info" onClick={goToCards} className="me-2">
                            {countUsers}
                        </Button>
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title class="text-center" >Usuários</Card.Title>
                    <Card.Text class="text-center">
                        Atuais clientes.
                        <p></p>
                        <Button variant="info" onClick={goToUsers} className="me-2">
                            {countCards}
                        </Button>
                    </Card.Text>
                </Card.Body>
            </Card>

        </Container>
    )
}
