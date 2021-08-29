import { useEffect, useState } from "react"
import axios from "axios"
import { Table } from "react-bootstrap"
import styled from "styled-components"


const Container = styled.div`
text-align: center;
`


export default function ListAudits() {

    const [audits, setAudits] = useState([])


    const listAudits = () => {
        const url = "http://localhost:3001/api/audits"

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
                <h5><b>Lista de Auditoria</b></h5>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Criado em</th>
                    </tr>
                </thead>
                <tbody>
                    {audits.map((audit) => {
                        return (
                            <tr>
                                <td>{audit.type}</td>
                                <td>{audit.createdAt}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

        </Container>
    )
}
