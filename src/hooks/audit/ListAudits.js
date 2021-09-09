import { useEffect, useState } from "react"
import axios from "axios"
import { Table, p } from "react-bootstrap"
import styled from "styled-components"
import { BASE_URL } from "../../constants/url"



const Container = styled.div`
text-align: center;
`


export default function ListAudits() {

    const [audits, setAudits] = useState([])


    const listAudits = () => {
        const url = `${BASE_URL}/audits`

        axios.get(url, {
        }).then((resp) => {
            setAudits(resp.data)

        }).catch((error) => {
            alert("Erro ao exibir auditoria!")
        })
    }

    useEffect(() => {
        listAudits()
    }, [])


    return (
        <Container>
            <div>
                <h5 p class="text-center"><b>Lista de Auditoria</b></h5>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr p class="text-center">
                        <th>Nome</th>
                        <th>Tipo</th>
                        <th>Criado em</th>
                        <th>Identificador</th>
                    </tr>
                </thead>
                <tbody>
                    {audits.map((audit) => {
                        return (
                            <tr p class="text-center">
                                <td>{audit.name}</td>
                                <td>{audit.type}</td>
                                <td>{audit.createdAt}</td>
                                <td>{audit.requestedBy}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

        </Container>
    )
}
