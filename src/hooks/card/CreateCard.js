import axios from "axios"
import React, { useEffect, useState } from "react"
import { BASE_URL } from "../../constants/url"
import { Container, Button } from "react-bootstrap"
import { useHistory } from 'react-router'
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { render } from "react-dom"

export default function CreateCard() {


    const [id, setId] = useState(null)
    const [name, setName] = useState("")
    const [selected, setSelected] = useState([]);


    const history = useHistory()

    const goToAudits = () => {
        history.push("/audit")
    }


    const onChangeId = (event) => {
        setId(event.target.value)
    }

    const onChangeName = (event) => {
        setName(event.target.value)
    }

    const createCard = () => {
        
        const url = `${BASE_URL}/cards`

        const body = {
            status: "requested",
            user_id: 1,
        }
        axios.post(url, body, {

        }).then((resp) => {
            alert("Cartão criado com sucesso");
            //{ goToAudits() }

        }).catch((error) => {
            alert('Não foi possível criar um novo cartão');
        });
    };


    const getUsersEnabledCards = () => {
        const url = "http://localhost:3001/api/users"

        axios.get(url, {
        }).then((resp) => {
            
            const enabledUsers = resp.data.filter((user) => {
                return (
                    user.enabledFeatures.find("0") != (undefined || null)
                )
            })
            console.log(enabledUsers)

            return enabledUsers
      
        }).catch((error) => {
            alert("Erro ao exibir usuários!")
        })
    }


    return (
        <Container>
            <div>
                <h5><b>Criar novo Cartão</b></h5>
            </div>
            <Typeahead
                id="basic-example"
                onChange={setSelected}
                options={getUsersEnabledCards}
                placeholder="Choose a state..."
                selected={selected}
            />
            <Button variant="primary" type="button" onClick={createCard}>
                    Enviar
                </Button>

        </Container>
    )
}

render(<CreateCard />, document.getElementById('root'));
