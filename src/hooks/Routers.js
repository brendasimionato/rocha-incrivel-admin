import ListAudits from "./audit/ListAudits";
import ListCards from "./card/ListCards";
import ListUsers from "./user/ListUsers";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomePage from "./HomePage";



export default function Routers() {
    return (
            <BrowserRouter>
                <Switch>
                    <Route exact path={"/"}>
                       <HomePage/>
                    </Route>
                    <Route exact path={"/audit"}>
                        <ListAudits/>
                    </Route>
                    <Route exact path={"/cards"}>
                        <ListCards/>
                    </Route>
                    <Route exact path={"/users"}>
                        <ListUsers/>
                    </Route>
                </Switch>
            </BrowserRouter>

    )
}