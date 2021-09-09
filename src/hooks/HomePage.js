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
        <Container align="center" class="d-inline-flex p-2 bd-highlight">
            <Card align="center" style={{ width: '18rem' }}>
                <Card.Body >
                    <Card.Title class="row d-flex justify-content-center"><b>Cartões Pendentes</b></Card.Title>
                    <p></p>
                        <Button variant="info" onClick={goToCards} className="me-2">
                            {countUsers}
                        </Button>
                </Card.Body>
            </Card>

            <Card  align="center" style={{ width: '18rem' }}>
                <Card.Body align="center">
                    <Card.Title class="text-center"><b>Atuais Usuários</b></Card.Title>
                        <p></p>
                        <Button variant="info" onClick={goToUsers} className="me-2">
                            {countCards}
                        </Button>
                </Card.Body>
            </Card>

        </Container>
    )
}
