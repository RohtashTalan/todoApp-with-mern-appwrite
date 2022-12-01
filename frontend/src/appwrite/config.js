import { Client, Account, ID, Databases } from "appwrite";

const client = new Client()
    .setEndpoint('http://localhost/v1') // Your API Endpoint
    .setProject('6384577ff38bfd634a0b');               // Your project ID


// export const Appwrite = {
//     ACCOUNT: new Account(client),
//     DATABASE:new Databases(client),
//     DATABASE_ID: '6384587a7adf4d1cdcb3',
//     COLLECTION_TODOS_ID: '638458c39647a4f3b95a',
//     COLLECTION_TASKS_ID: '63846bda1778b3592870',
//     ID
// }

export const Appwrite = {
    ACCOUNT: new Account(client),
    DATABASE:new Databases(client),
    DATABASE_ID: '6384587a7adf4d1cdcb3',
    COLLECTION_TODOS_ID: '6385b06b7892b6b4ed74',
    ID
}
