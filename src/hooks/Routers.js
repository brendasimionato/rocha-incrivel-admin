import ListAudits from "./audit/ListAudits";
import ListCards from "./card/ListCards";
import ListUsers from "./user/ListUsers";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomePage from "./HomePage";
import Login from "./analyst/Login";
import Menu from "./Menu";
import ListFeatures from "./features/ListFeatures";



export default function Routers() {

    return (

        <BrowserRouter>

            <Switch>
                <Route exact path={"/"}>
                    <Login />
                </Route>
                <Route exact path={"/home"}>
                    <Menu />
                    <HomePage />
                </Route>
                <Route exact path={"/audit"}>
                    <Menu />
                    <ListAudits />
                </Route>
                <Route exact path={"/cards"}>
                    <Menu />
                    <ListCards />
                </Route>
                <Route exact path={"/users"}>
                    <Menu />
                    <ListUsers />
                </Route>
                <Route exact path={"/features"}>
                    <Menu />
                    <ListFeatures />
                </Route>
            </Switch>

        </BrowserRouter>

    )
}