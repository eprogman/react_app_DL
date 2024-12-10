import { Link, Outlet, Form, useLoaderData, NavLink } from "react-router-dom"
import { createContact, getContacts } from "../contacts.js";
import { Footer } from "../components/footer.jsx";
import { useEffect, useState } from "react";

export async function action() { // Cada que vez que se ejecuta por primera vez desde el App , crea un nuevo obejeto vacio en posicion 0, luego se pasa al ultimo debido al sortBy.
    const contact = await createContact(); // para crear contacto vacío y crea un registro
    return { contact }; // retorna en el rootAction de App la promesa con el nuevo elemento que fue creado.
}

export async function loader({ request }) { // carga la URL por el metodo GET. Se ejecuta desde el App.
    const url = new URL(request.url); // request para obtener el URL y url para obtenet los parametros del url
    const q = url.searchParams.get("q");  // para buscar el parametro a travez del INPUT
    const contacts = await getContacts(q); // para cargar todos los elementos del localforage
    return { contacts, q };
}


export const Home = ({ textoFecha }) => { // recibo la funcion de App, y la ejecuto desde Home, con el parametro 'text'

    const { contacts, q } = useLoaderData() // carga los elementos generados por loader

    const setearFechaDesdeHome = () => {
        textoFecha(true)
    }

    const [datosTable1, setDatosTable1] = useState(0)
    const [datosTable2, setDatosTable2] = useState(0)
    const [datosTable3, setDatosTable3] = useState(0)

    const conteoContactos = () => {
        if (contacts.length < 24) {
            setDatosTable1(contacts.slice(0, 24))
        }
        else if (24 <= contacts.length && contacts.length < 48) {
            setDatosTable1(contacts.slice(0, 24))
            setDatosTable2(contacts.slice(24, 48))
        }
        else if (48 <= contacts.length && contacts.length < 73) {
            setDatosTable1(contacts.slice(0, 24))
            setDatosTable2(contacts.slice(24, 48))
            setDatosTable3(contacts.slice(48, 73))

        }
        else {
            alert('TABLE LLENA - GUARDA LOS DATOS EN ESCRITORIO - Y VACIA CONTACTOS TABLA')
        }
    }

    useEffect(() => { //si algo de q cambia se vuelve a ejecuta la funcion. Si no lleva nada en [], lo de adentro se ejecuta primera vez cuando carga el comp Home
        document.getElementById("q").value = q;
        conteoContactos()
    }, [q, contacts]); // puse contacts , para que se carge nuevamente, cuando se envia al ruta raiz "./"


    return (
        <div className="contenedor">
            <header className="client-list">
                <Form id="search-form" role="search">
                    <input
                        id="q"
                        aria-label="Search contacts"
                        placeholder="Buscar"
                        type="search"
                        name="q"
                        defaultValue={q}
                    />
                    <div id="search-spinner" aria-hidden hidden={true} />
                    <div className="sr-only" aria-live="polite"></div>
                </Form>
                <nav className="navbar">
                    <Link to="/" className="navbar-boton">INICIO</Link>
                    <Form method="post"> {/* Form evita que el navegador envíe la solicitud al servidor y la envía a la ruta action en su lugar y por defecto apunta a a la ruta en la que se representa "/." */}
                        <button className="navbar-boton" type="submit">NUEVO CLIENTE</button>  {/* con el Form envía a una ruta action */}
                    </Form>
                    <Link to="/lista" className="navbar-boton">TABLA</Link>
                    <Form method="post" action="borrado" onSubmit={(e) => {
                        if (!window.confirm("ESTAS SEGURA!!!")) {
                            e.preventDefault() // en caso que no le des clip, no se confirme , previene la ejecucion.
                        }
                    }}>
                        <button className="navbar-boton" type="submit">BORRA TODO..CUIDADO!!!</button>
                    </Form>
                </nav>
            </header>
            <main className="main">
                <section className="form-contactos">
                    <div className="formulario">
                        <Outlet />
                    </div>
                    <div className="contactos" id="sidebar">

                        <div className="contactos-colum1">
                            {
                                datosTable1.length ? datosTable1.map((contact, index) =>
                                    <div key={index} onClick={setearFechaDesdeHome}>
                                        <NavLink to={`form/${contact.id}`} className={({ isActive }) => isActive ? "active" : ''}>
                                            {
                                                contact.nombre || contact.apellido ? (<p>{`${contact.nombre} ${contact.apellido}`}</p>) : <p><span>Nombre Vacio</span></p>
                                            }
                                        </NavLink>
                                    </div>
                                ) : <p><span>No Contacts</span></p>
                            }
                        </div >
                        <div className="contactos-colum2">
                            {
                                datosTable2.length > 0 ? datosTable2.map((contact, index) =>
                                    <div key={index + 10} onClick={setearFechaDesdeHome}>
                                        <NavLink to={`form/${contact.id}`} className={({ isActive }) => isActive ? "active" : ''}>
                                            {
                                                contact.nombre || contact.apellido ? (<p>{`${contact.nombre} ${contact.apellido}`}</p>) : <p><span>Nombre Vacio</span></p>
                                            }
                                        </NavLink>
                                    </div>
                                ) : <p><span>No Contacts</span></p>
                            }
                        </div>
                        <div className="contactos-colum3">
                            {
                                datosTable3.length > 0 ? datosTable3.map((contact, index) =>
                                    <div key={index + 20} onClick={setearFechaDesdeHome}>
                                        <NavLink to={`form/${contact.id}`} className={({ isActive }) => isActive ? "active" : ''}>
                                            {
                                                contact.nombre || contact.apellido ? (<p>{`${contact.nombre} ${contact.apellido}`}</p>) : <p><span>Nombre Vacio</span></p>
                                            }
                                        </NavLink>
                                    </div>
                                ) : <p><span>No Contacts</span></p>
                            }
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )

}
