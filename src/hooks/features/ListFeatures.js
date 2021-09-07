import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL } from "../../constants/url"
import { Container, Table } from "react-bootstrap"



export default function ListFeatures() {

    const [features, setFeatures] = useState([])


    const getFeatures = () => {
        const url = `${BASE_URL}/features`

        axios.get(url, {
        }).then((resp) => {
            setFeatures(resp.data.result)
      
        }).catch((error) => {
            alert("Recursos não encontrados.")
        })
    }

    useEffect(() => {
        getFeatures()
    }, [])

    return (

        <Container>
            <div>
                <h5><b>Recursos disponíveis</b></h5>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                    </tr>
                </thead>
                <tbody>
                    {features.map((feature) => {
                        return (
                            <tr>
                                <td>{feature.id}</td>
                                <td>{feature.name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

        </Container>

    )
}