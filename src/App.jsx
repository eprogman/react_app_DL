import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { action as formAction, loader as contactLoader } from './routes/formulario'
import { Formulario } from './routes/formulario'
import { loader as rootLoader } from './routes/lista'
import { Lista } from './routes/lista'
import { action as rootAction, loader as rootLoaderHome } from './routes/home'
import { Home } from './routes/home'
import { action as destroyAction } from './routes/destroy'
import { action as destroyActionAll } from './routes/destroy-all'
import Index from './routes/index';
import Login from './components/login'
import { useState } from 'react'
import { ErrorPage } from "./routes/error-page";
import './routes/estilos.css'

export const App = () => {

    const [logUser, setLogUser] = useState(false)

    const validateUser = ({ isPermitted }) => { // funcion para ser ejecutada en Login
        setLogUser(isPermitted)
    }

    const [dataText, setDataText] = useState(true)

    const textoFecha = (data) => {
        setDataText(data)
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: logUser ? <Home textoFecha={textoFecha} /> : <Login validateUser={validateUser} />,
            errorElement: <ErrorPage />,
            action: rootAction, // para ejecutar el action y crear el primer elemento vacío, y para que funcione el Form en home, luego retorna una promesa a rootAction.
            loader: rootLoaderHome, // cargador de ruta para cargar los datos con el loader y useLoaderData en el componente Home, y ademas renderizar nuevamente con el UseEffect
            children: [
                { index: true, element: <Index />, },
                { path: "form/:formID", element: <Formulario dataText={dataText} textoFecha={textoFecha} />, action: formAction, loader: contactLoader, }, // loader para cargar el contacto en Formulario
                { path: "form/:formID/destroy", action: destroyAction, errorElement: <div><h1>Oops! Fue un error de destrucción.</h1></div>, },
                { path: "lista", element: <Lista />, loader: rootLoader, },
            ],
        },
        {
            path: "borrado/", action: destroyActionAll,
        }
    ])

    return (
        <RouterProvider router={router} />
    )
}
