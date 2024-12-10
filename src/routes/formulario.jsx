import { useState, useEffect } from "react"
import { Form, redirect, useLoaderData } from "react-router-dom"
import { updateContact, getContact } from "../contacts.js";

export async function loader({ params }) { // con params obtengo todos los datos del segmento de URL.
    const contact = await getContact(params.formID); // con formID el contacto.
    return { contact }; // para ser usado en useLoaderData
}

export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateContact(params.formID, updates);
    return redirect(`/`);
}

export const Formulario = ({ dataText, textoFecha }) => {

    const { contact } = useLoaderData(); // cargo el datos del contacto que retorna de loader

    const [tipoDato, setTipoDato] = useState(true) // para regresar tipo de fecha a text
    const [tipoTime, setTipoTime] = useState(true) // para regresar tipo de time a text
    const tipoFecha = tipoDato ? 'text' : 'date' // para setear el tipo de dato cuando se hace clip en input
    const setHora = tipoTime ? 'text' : 'time' // para setear el tipo de dato cuando se hace clip en input

    const [isCompleteName, setIsCompleteName] = useState(false)
    const [isCompleteLast, setIsCompleteLast] = useState(false)
    const [isCompleteDNI, setIsCompleteDNI] = useState(false)
    const [isCompleteTelf, setIsCompleteTelf] = useState(false)
    const [isCompleteSpace, setIsCompleteSpace] = useState(false)
    const [isCompletePrecio, setIsCompletePrecio] = useState(false)
    const [isCompleteTAll, setIsCompleteAll] = useState(false)

    const tougleClassName = isCompleteName ? 'valid' : 'invalid'
    const tougleClassLastName = isCompleteLast ? 'valid' : 'invalid'
    const tougleClassSpace = isCompleteSpace ? 'valid' : 'invalid'
    const tougleClassNum = isCompleteTelf ? 'valid' : 'invalid'
    const tougleClassDNI = isCompleteDNI ? 'valid' : 'invalid'
    const tougleClassPRECIO = isCompletePrecio ? 'valid' : 'invalid'
    const tougleClassAllNum = isCompleteTAll ? 'valid' : 'invalid'


    const checkPrecio = (e) => {
        let numeros_letras = /[A-Za-z0-9_]/

        if (e.target.value.match(numeros_letras)) {
            setIsCompletePrecio(true)
        }
        else {
            setIsCompletePrecio(false)
        }
    }

    const checkTelf = (e) => {
        let numeros = /[0-9_]/
        if (e.target.value.match(numeros)) {
            setIsCompleteTelf(true)
        }
        else {
            setIsCompleteTelf(false)
        }
        if (e.target.value.slice(0, 1) != ' ') {
            setIsCompleteSpace(true)
        } else {
            setIsCompleteSpace(false)
        }
    }

    const checkDNI = (e) => {
        let numeros = /[0-9_]/
        if (e.target.value.match(numeros)) {
            setIsCompleteDNI(true)
        }
        else {
            setIsCompleteDNI(false)
        }
        if (e.target.value.slice(0, 1) != ' ') {
            setIsCompleteSpace(true)
        } else {
            setIsCompleteSpace(false)
        }
    }

    const setearFechaDate = () => { // con esto paso el tipo en fecha a "date"
        textoFecha(false) // ejecuto la funcion proveniente de App, para pasar el "dataText" a falso.
    }

    const setearTimeDate = () => {
        textoFecha(false) // ejecuto la funcion proveniente de App, para pasar el "dataText" a falso.
    }

    const setFecha = () => { // esta funcion se ejecuta con el useEffect cada vez hay cambio en "dataText"
        if (dataText === true) {
            setTipoDato(true) // si es true sale "text"
            setTipoTime(true) // si es true sale "text"
        }
        else {
            setTipoDato(false) // si es false sale "date"
            setTipoTime(false) // si es false sale "time"

        }
    }



    const checkAllNum = (e) => {
        e.preventDefault()
        if (isCompleteName === true && isCompleteLast === true && isCompleteSpace === true && isCompleteTelf === true && isCompleteDNI === true && isCompletePrecio === true) {
            setIsCompleteAll(true)
        }
        else {
            setIsCompleteAll(false)
            alert('LLenar todos los campos')
        }

    }

    const checkInput = (e) => {
        let letras = /[A-Za-z]/;

        // Condicion#1 mayor a 2 caracteres
        if (e.target.value.length > 1) {
            setIsCompleteName(true)
        }
        else {
            setIsCompleteName(false)
        }

        // Condicion#2 La primera letra es mayuscula
        if (e.target.value.match(letras) && (e.target.value.charAt(0) === e.target.value.charAt(0).toUpperCase())) {
            setIsCompleteLast(true)
        }
        else {
            setIsCompleteLast(false)
        }

        // Condicion#3 La contraseña no tiene espacios
        if (e.target.value.slice(0, 1) != ' ') {
            setIsCompleteSpace(true)
        } else {
            setIsCompleteSpace(false)
        }

    }

    useEffect(() => {
        setFecha()
    }, [dataText]);

    return (
        <>
            <div className="requisitosMin">
                <ul>
                    <li className={tougleClassName}>minimo 2 carácteres</li>
                    <li className={tougleClassLastName}>primera letra mayúscula</li>
                    <li className={tougleClassSpace}>sin espacio</li>
                    <li className={tougleClassNum}>solo números en teléfono</li>
                    <li className={tougleClassDNI}>solo números en DNI</li>
                    <li className={tougleClassPRECIO}>letras o numeros en precio</li>
                    <li className={tougleClassAllNum}>llenar todos los campos</li>
                </ul>
            </div>
            <div className="form-all-input">
                <Form method="post">
                    <div className="formulario-post"><label>NOMBRE:</label><input type="text" id="nombre" name='nombre' placeholder={contact.nombre} onChange={checkInput} required /></div>
                    <div className="formulario-post"><label>APELLIDO:</label><input type="text" name='apellido' id="apellido" placeholder={contact.apellido} onChange={checkInput} required /></div>
                    <div className="formulario-post"><label>DNI:</label><input type="text" name='dni' id="dni" placeholder={contact.dni} onChange={checkDNI} required /></div>
                    <div className="formulario-post"><label>ASUNTO:</label><input type="text" name='servicio' id="asunto" placeholder={contact.servicio} onChange={checkPrecio} required /></div>
                    <div className="formulario-post"><label>TELÉFONO:</label><input type="text" name='telefono' id="telefono" placeholder={contact.telefono} onChange={checkTelf} required /></div>
                    <div className="formulario-post"><label>PRECIO:</label><input type="text" name='precio' id="precio" placeholder={contact.precio} onChange={checkPrecio} required /></div>
                    <div className="formulario-post"><label>FECHA:</label><input type={tipoFecha} name="fecha" id="fecha" placeholder={contact.fecha} onChange={checkPrecio} required onClick={setearFechaDate} /></div>
                    <div className="formulario-post"><label>HORA:</label><input type={setHora} name="hora" id="hora" placeholder={contact.hora} onChange={checkAllNum} required onClick={setearTimeDate} /></div><br />
                    <button type="submit">Continuar</button>
                </Form >
                <Form
                    method="post"
                    action="destroy"
                    onSubmit={(event) => {
                        if (!window.confirm("Por favor confirme que desea eliminar este registro.")) {
                            event.preventDefault();
                        }
                    }}
                >
                    <button type="submit">Delete</button>
                </Form>
            </div>
        </>
    )
}


