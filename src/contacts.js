import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getContacts(query) { // para obtener todos los contactos.
    await fakeNetwork(`getContacts:${query}`);
    let contacts = await localforage.getItem("contacts"); // obtengo todos los contactos.
    if (!contacts) contacts = []; // si no hay retorno un arreglo vacion.
    if (query) {
        contacts = matchSorter(contacts, query, { keys: ["nombre", "apellido"] });  // recien cuando se busca contacto en input hace match , el contacts es el objeto, y query es la coincidencia, para nombre o apellido
    }
    return contacts.sort(sortBy("last", "createdAt")); // lo ordeno por createdAt, desde el primero al ultimo , en orden de menor a mayor.
}

export async function createContact() { // creo el nuevo elemento id y contact, luego llamó a todos los contactos con getContacts, y luego agrego el nuevo elemento al principio del arreglo de objetos.
    await fakeNetwork();
    let id = Math.random().toString(36).substring(2, 9);
    let contact = { id, createdAt: Date.now() };
    let contacts = await getContacts();
    contacts.unshift(contact); // siempre agrega el nuevo elemento al inicio de contacts.
    await set(contacts);
    return contact;
}

export async function getContact(id) {
    await fakeNetwork(`contact:${id}`);
    let contacts = await localforage.getItem("contacts");
    let contact = contacts.find(contact => contact.id === id);
    return contact ?? null;
}

export async function updateContact(id, updates) {
    await fakeNetwork();
    let contacts = await localforage.getItem("contacts");
    let contact = contacts.find(contact => contact.id === id);
    if (!contact) throw new Error("No contact found for", id);
    Object.assign(contact, updates);
    await set(contacts);
    return contact;
}

export async function deleteContact(id) {
    let contacts = await localforage.getItem("contacts");
    let index = contacts.findIndex(contact => contact.id === id);
    if (index > -1) {
        contacts.splice(index, 1);
        await set(contacts);
        return true;
    }
    return false;
}

export async function deleteContactAll() {
    let contacts = await localforage.getItem("contacts");
    let cantidadContacts = contacts.length
    contacts.splice(0, cantidadContacts)
    await set(contacts);
    return true
}


function set(contacts) {
    return localforage.setItem("contacts", contacts);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
    if (!key) {
        fakeCache = {};
    }

    if (fakeCache[key]) {
        return;
    }

    fakeCache[key] = true;
    return new Promise(res => {
        setTimeout(res, Math.random() * 800);
    });
}