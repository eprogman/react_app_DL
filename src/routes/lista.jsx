import { useLoaderData } from "react-router-dom"
import { getContacts } from "../contacts.js";
import React, { useRef } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';

export async function loader() {
    const contacts = await getContacts();
    return { contacts };
}

export const Lista = () => {

    const tableRef = useRef(null);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Tabla',
        sheet: 'Contactos'
    })

    const { contacts } = useLoaderData();

    return (
        <div className="table-list">
            <button onClick={onDownload}> Export excel </button>
            <table ref={tableRef}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>DNI</th>
                        <th>Asunto</th>
                        <th>Teléfono</th>
                        <th>Precio</th>
                        <th>Fecha de Cita</th>
                        <th>Hora</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        contacts.length ?
                            contacts.map((contact) =>
                                <tr key={contact.id}>
                                    <td>{contact.nombre}</td>
                                    <td>{contact.apellido}</td>
                                    <td>{contact.dni}</td>
                                    <td>{contact.servicio}</td>
                                    <td>{contact.telefono}</td>
                                    <td>{contact.precio}</td>
                                    <td>{contact.fecha}</td>
                                    <td>{contact.hora}</td>
                                </tr>
                            )
                            : <tr><td>No List</td></tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

