import { Form, Container, Button } from "react-bootstrap"
import { useHistory } from 'react-router'
import axios from "axios"
import { useState } from "react"
import { BASE_URL } from "../../constants/url"


export default function Login() {
    
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)


    const history = useHistory()

    const goToHome = () => {
        history.push("/home")
    }
    

    const validAnalyst = () => {
        
        const url = `${BASE_URL}/analysts`

        axios.get(url, {
        }).then((resp) => {
            const validAnalyst = resp.data.find(analyst =>
                email === analyst.email && password === analyst.password
            )
            if(validAnalyst) {
                localStorage.clear()
                localStorage.setItem("user_id", validAnalyst.user_id)
                localStorage.setItem("roles", validAnalyst.roles)
                goToHome()
            } else {
               alert("Analista não encontrado.")
            }
        }).catch((error) => {
            alert("Erro")
        })

    }


    const onChangeEmail = (event) => {
        setEmail(event.target.value)
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }



    return (
        <Container  class="col-md-4">
            <Form class="col-md-4">
                <Form.Group class="col-md-4" controlId="formBasicEmail">
                    <Form.Label p class="text-center" >E-mail</Form.Label>
                    <Form.Control type="email" placeholder="Digite seu e-mail" onChange={onChangeEmail} />
                    <Form.Text  className="text-muted">
                        Não compartilharemos seu e-mail com mais ninguém.
                    </Form.Text>
                </Form.Group>

                <Form.Group class="col-md-4" controlId="formBasicPassword">
                    <Form.Label class="col-md-4">Senha</Form.Label>
                    <Form.Control type="password" placeholder="Digite sua senha" onChange={onChangePassword} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                </Form.Group>
                <Button variant="primary" type="button" onClick={validAnalyst}>
                    Enviar
                </Button>
            </Form>

        </Container>
    )
}