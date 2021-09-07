import GlobalStateContext from './GlobalStateContext'
import { useHistory } from 'react-router'



export default function GlobalState() {

    const history = useHistory()

    const goToLogin = () => {
        history.push("/")
    }

    const validLogin = () => {
        if (localStorage.getItem("analyst", analyst) = (undefined || null)) {
            { goToLogin }

        }
    }

    return (
        <GlobalStateContext.Provider value={validLogin}>
            {props.children}
        </GlobalStateContext.Provider>
    )
}
