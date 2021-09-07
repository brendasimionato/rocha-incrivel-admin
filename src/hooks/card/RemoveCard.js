import { useState } from "react"
import { BASE_URL } from "../../constants/url"
import axios from "axios"


export default function RemoveCard() {

    const [card, setCard] = useState({})

    const history = useHistory()

    const goToAudits = () => {
        history.push("/audit")
    }

    const removeCard = (id) => {
        const url = `${BASE_URL}/cards` + id

        axios.delete(url, {

        }).then((resp) => {
            setCard(resp.data)
            alert("Cartão removido com sucesso")
            { goToAudits() }
            console.log(resp)

        }).catch((error) => {
            alert("Erro ao remover cartão")
        })
    }


    const confirmRemoveCard = (id) => {
        if (window.confirm("Deseja realmente remover este cartão?")) {
            removeCard(id)
        }
    }


    return (
        <Container>
            <div>
                <h5><b>Remover Cartões</b></h5>
                <Button variant="primary" type="submit" onCLick={() => confirmRemoveCard(id)}>
                    Remover
                </Button>

            </div>
        </Container>


    )
}