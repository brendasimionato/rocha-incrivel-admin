import { useEffect, useState } from "react"
import axios from "axios"
import { Table, p} from "react-bootstrap"
import styled from "styled-components"


const Container = styled.div`
text-align: center;
`


export default function ListUsers() {

    const [users, setUsers] = useState([])


    const listUsers = () => {
        const url = "http://localhost:3001/api/users"

        axios.get(url, {
        }).then((resp) => {
            setUsers(resp.data)

        }).catch((error) => {
            alert("Erro ao exibir usuários!")
        })
    }

    const hasRoleViewSalary = (role) => {
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
        listUsers()
    }, [])


    return (
        <Container>
            <div>
                <h5 p class="text-center"><b>Lista de Usuários</b></h5>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr p class="text-center">
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Documento</th>
                        {(hasRoleViewSalary('n2')) ? <th>Salário Base</th> : null}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return (
                            <tr p class="text-center">
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.document}</td>
                                {(hasRoleViewSalary('n2')) ? <td>{user.salaryBase}</td> : null}
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

        </Container>
    )
}
