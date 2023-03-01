const argv = require("yargs").argv;

const {
    listContacts,
    getContactById,
    addContact,
    removeContact,
} = require("./contacts");


const invokeAction = async({action, id, name, email, phone}) => {
    switch (action) {
        case "list":
            const contacts = await listContacts()
            console.log(contacts);
            break;
        case "get":
            const contact = await getContactById(id);
            if (!contact) {
                throw new Error(`Prodact with id=${id} not fount`)
            }
            console.log(contact);
            break;
        case "add":
            const newContact = await addContact({name,email,phone,});
            console.log(newContact);
            break;
        case "remove":
            const removeById = await removeContact(id);
            console.log(removeById);
            break;    
        default:
            console.warn("\x1B[31m Unknown action type!");
            
    }
} 

invokeAction (argv);

