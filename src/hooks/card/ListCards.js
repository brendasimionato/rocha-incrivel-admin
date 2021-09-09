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
            createAudit(cardId, status)
            setAlertShowStatus(false)
            listCards()
        }).catch((error) => {
            alert("Erro ao atualizar o status do cartão")
        })
    }

    const createAudit = (cardId, status) => {
        const url = `${BASE_URL}/audits`
        const body = {
            "createdAt": new Date(Date.now()),
            "type": "card-status-change",
            "before": {
                "id": cardId,
                "status": "requested",
                "user_id": localStorage.getItem("user_id")
            },
            "after": {
                "id": cardId,
                "status": status,
                "user_id": localStorage.getItem("user_id")
            }
        }

        axios.post(url, body, {

        }).then((resp) => {

        }).catch((error) => {
            alert('Não foi possível criar uma auditoria');
        });
    };

    const hasRoleViewLimit = (role) => {
        const rolesAnalyst = localStorage.getItem("roles").split(",")

        const roles = rolesAnalyst.find((r) => {
            if (r == role) return r
        })

        if (roles != undefined && roles.length > 0) {
            return true
        } else {
            return false
        }
    }



    useEffect(() => {
        listCards()
    }, [])


    return (

        <Container>
            <Alert show={alertShowStatus} variant="secondary" p class="text-center">
                <p>
                    Tem certeza que deseja alterar realizar esta alteração?
                </p>
                <hr />
                <div className="d-flex justify-content-end" p class="text-center">
                    <Button onClick={() => changeCardStatus(cardIdToUpdated, cardStatusToUpdated)} variant="outline-success">
                        Sim
                    </Button>
                    <Button onClick={() => setAlertShowStatus(false)} variant="outline-danger">
                        Não
                    </Button>
                </div>
            </Alert>
            <div>
                <h5 p class="text-center"><b>Cartões Disponíveis</b></h5>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr p class="text-center">
                        <th>Nome</th>
                        <th>Digitos</th>
                        {(hasRoleViewLimit('n2')) ? <th>Limite</th> : null}

                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {cards.map((card) => {
                        return (
                            <tr p class="text-center">
                                <td>{card.metadatas.name}</td>
                                <td>{card.metadatas.digits}</td>
                                {(hasRoleViewLimit('n2')) ? <td>{card.metadatas.limit}</td> : null}
                                <td>
                                    <Button onClick={() => confirmChangeStatus(card.id, 'approved')} variant="success">Aprovar</Button>&nbsp;
                                    {(hasRoleViewLimit('n2')) ? <Button onClick={() => confirmChangeStatus(card.id, 'rejected')} variant="danger">Rejeitar</Button> : null}

                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

        </Container>
    )
}