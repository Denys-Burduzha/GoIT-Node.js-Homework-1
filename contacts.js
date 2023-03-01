
const path = require("path");
const {v4} = require("uuid");
const fs = require("fs").promises;

const contactsPath  = path.join("db", "contacts.json");

const listContacts = async() => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
}


const getContactById = async(id) => {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id.toString() === id.toString());
    if (!result) {
        return null;
    } 
    return result; 
}


const updateСontacts = async(contacts) => {
    await fs.writeFile(contactsPath , JSON.stringify(contacts));
}


const removeContact = async(id) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id.toString() === id.toString());
    if (idx === -1) {
        return null;
    } 
    const newСontacts = contacts.filter((_, index) => index !== idx);
    await updateСontacts(newСontacts);
    return contacts[idx];
}


const addContact = async(data) => {
    const contacts = await listContacts();
    const newСontacts = {...data, id: v4()};
    contacts.push(newСontacts);
    await updateСontacts(contacts);
    return newСontacts;
}


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};

