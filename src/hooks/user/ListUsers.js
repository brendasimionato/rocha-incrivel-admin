import { useEffect, useState } from "react"
import axios from "axios"
import { Table } from "react-bootstrap"
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

    // const hasRoleViewSalary = () => {
    //     const rolesAnalyst = localStorage.getItem("roles").split(",")
        
    //     const roles = rolesAnalyst.find((r) => {
    //         if (r == role) return r
    //     })

    //     if (roles != undefined && roles.length > 0) {
    //         return true
    //     } else {
    //         return false
    //     }
    // }
    

    useEffect(() => {
        listUsers()
    }, [])

    
    return (
        <Container>
            <div>
                <h5><b>Lista de Usuários</b></h5>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Documento</th> 
                        <th>Salário Base</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return (
                            <tr>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.document}</td>
                                <td>{user.salaryBase}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

        </Container>
    )
}
