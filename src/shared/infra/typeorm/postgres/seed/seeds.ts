import { connectService } from '../../';
import { BcryptHashProvider } from '@modules/user/providers/HashProvider/services/BcryptHashProvider';

const create = async () => {
    const connection = await connectService('default');

    const { gererateHash } = new BcryptHashProvider();

    const data = {
        users: [
            {
                id: 'venzel',
                name: 'Venzel Junior',
                email: 'venzel@gmail.com',
                password: 'Kakodev1dro#',
                role: 'ADMIN',
            },
            {
                id: 'cintia',
                name: 'Cintia Almeida',
                email: 'cintia@gmail.com',
                password: 'Kakodev1dro#',
                role: 'MANAGER',
            },
            {
                id: 'camila',
                name: 'Camila Porto',
                email: 'camila@gmail.com',
                password: 'Kakodev1dro#',
                role: 'MANAGER',
            },
            {
                id: 'bruna',
                name: 'Bruna Cartilho',
                email: 'bruna@gmail.com',
                password: 'Kakodev1dro#',
                role: 'MANAGER',
            },
            {
                id: 'alex',
                name: 'Alex Sandro',
                email: 'alex@gmail.com',
                password: 'Kakodev1dro#',
                role: 'USER',
            },
            {
                id: 'marcos',
                name: 'Marcos Santos',
                email: 'marcos@gmail.com',
                password: 'Kakodev1dro#',
                role: 'USER',
            },
            {
                id: 'simas',
                name: 'Simas Almeida',
                email: 'simas@gmail.com',
                password: 'Kakodev1dro#',
                role: 'USER',
            },
            {
                id: 'marilia',
                name: 'Marilia Nicacio',
                email: 'marilia@gmail.com',
                password: 'Kakodev1dro#',
                role: 'USER',
            },
            {
                id: 'franco',
                name: 'Franco Nelio',
                email: 'franco@gmail.com',
                password: 'Kakodev1dro#',
                role: 'USER',
            },
            {
                id: 'denis',
                name: 'Denis Simplicio',
                email: 'denis@gmail.com',
                password: 'Kakodev1dro#',
                role: 'USER',
            },
            {
                id: 'vanessa',
                name: 'Vanessa Matos',
                email: 'vanessa@gmail.com',
                password: 'Kakodev1dro#',
                role: 'USER',
            },
            {
                id: 'sergio',
                name: 'Sergio Neiva',
                email: 'sergio@gmail.com',
                password: 'Kakodev1dro#',
                role: 'USER',
            },
        ],
    };

    for (const { id, name, email, password, role } of data.users) {
        await connection
            .query(
                `INSERT INTO users (id, name, email, password, role, avatar, allowed, activated, created_at, updated_at, deleted_at) VALUES 
                ('${id}', '${name}', '${email}', '${await gererateHash(password)}', '${role}', '', true, true, 'now()', 'now()', null)`
            )
            .then((_) => {
                console.log(`${role} ${name} created!`);
            })
            .catch((err) => {
                console.log(`Erro in create ${name} ${role}!`);
                console.log(err);
            });
    }

    await connection.close();
};

create()
    .then((e) => {
        console.log(`Finalized!`);
    })
    .catch((e) => {
        console.log(`Error in create seed!`);
        console.log(e);
    });
