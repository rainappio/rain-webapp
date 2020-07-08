import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { urlMapping } from '../Mappings/Mappings';

export const Routers = (props) => {
    return (
        <Switch>
            <Route exact path={"/"}
                render={({ location }) => {
                    // return (getItemlocalStorage("Auth") !== null) ? (
                    return urlMapping["/"]
                    // ) : (
                    //         <Redirect
                    //             to={{
                    //                 pathname: "/Login",
                    //             }}
                    //         />
                    //     );
                }
                }>
            </Route>
        </Switch>
    )
}
