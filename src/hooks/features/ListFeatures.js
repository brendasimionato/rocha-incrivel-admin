import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL } from "../../constants/url"
import { Container, Table, p} from "react-bootstrap"



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

        <Container >
            <div>
                <h5 p class="text-center"><b>Recursos Disponíveis</b></h5>
            </div>

            <Table striped bordered hover>
                <thead p class="text-center">
                    <tr p class="text-center">
                        <th>Id</th>
                        <th>Nome</th>
                    </tr>
                </thead>
                <tbody>
                    {features.map((feature) => {
                        return (
                            <tr p class="text-center">
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