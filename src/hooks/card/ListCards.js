import { useEffect, useState } from "react"
import { Table, Button, Alert } from "react-bootstrap"
import styled from "styled-components"
import axios from "axios"
import { BASE_URL } from "../../constants/url"


const Container = styled.div`
text-align: center;
`

export default function ListCards() {

    const [cards, setCards] = useState([])
    const [alertShowStatus, setAlertShowStatus] = useState(false)
    const [cardIdToUpdated, setCardIdToUpdated] = useState(null)
    const [cardStatusToUpdated, setCardStatusToUpdated] = useState(null)

    const listCards = () => {
        const url = `${BASE_URL}/cards`
        axios.get(url, {
        }).then((resp) => {
            const cards = resp.data.filter((card) => card.status == 'requested')
            setCards(cards)
        }).catch((error) => {
            alert("Erro ao exibir cartões disponíveis!")
        })
    }

    const confirmChangeStatus = (cardId, status) => {
        setCardIdToUpdated(cardId)
        setCardStatusToUpdated(status)
        setAlertShowStatus(true)
    }

    const changeCardStatus = (cardId, status) => {
        const url = `${BASE_URL}/cards/${cardId}`
        axios.put(url, {
            status: status
        }).then((resp) => {
            setAlertShowStatus(false)
            listCards()
        }).catch((error) => {
            alert("Erro ao atualizar o status do cartão")
        })
    }

    useEffect(() => {
        listCards()
    }, [])


    return (

        <Container>
            <Alert show={alertShowStatus} variant="secondary">
                <p>
                    Tem certeza que deseja alterar realizar esta alteração?
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => changeCardStatus(cardIdToUpdated, cardStatusToUpdated)} variant="outline-success">
                        Sim
                    </Button>
                    <Button onClick={() => setAlertShowStatus(false)} variant="outline-danger">
                        Não
                    </Button>
                </div>
            </Alert>
            <div>
                <h5><b>Cartões disponíveis</b></h5>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Digitos</th>
                        <th>Limite</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {cards.map((card) => {
                        return (
                            <tr>
                                <td>{card.metadatas.name}</td>
                                <td>{card.metadatas.digits}</td>
                                <td>{card.metadatas.limit}</td>
                                <td>
                                    <Button onClick={() => confirmChangeStatus(card.id, 'approved')} variant="success">Aprovar</Button>&nbsp;
                                    <Button onClick={() => confirmChangeStatus(card.id, 'rejected')} variant="danger">Rejeitar</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

        </Container>
    )
}