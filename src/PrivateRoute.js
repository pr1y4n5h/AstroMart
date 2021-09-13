import { Route, Navigate } from "react-router-dom";
import {useAuth} from "./Contexts/AuthContext";

export function PrivateRoute({path, ...props}) {

    const {token} = useAuth();

    return token ? (<Route {...props} path={path} />) : (<Navigate state={{from: path }} replace to="/login" /> )
    
}