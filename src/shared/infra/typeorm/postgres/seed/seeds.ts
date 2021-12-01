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
        groups: [
            {
                id: 'group_a_cintia',
                user_id: 'cintia',
                name: 'Turma A - Fundamental',
            },
            {
                id: 'group_b_cintia',
                user_id: 'cintia',
                name: 'Turma B - Fundamental',
            },
            {
                id: 'group_c_cintia',
                user_id: 'cintia',
                name: 'Turma C - Fundamental',
            },
            {
                id: 'group_a_camila',
                user_id: 'camila',
                name: 'Turma Z - Fundamental',
            },
            {
                id: 'group_b_camila',
                user_id: 'camila',
                name: 'Turma Y - Fundamental',
            },
            {
                id: 'group_c_camila',
                user_id: 'camila',
                name: 'Turma Z - Fundamental',
            },
        ],
        group_queue: [
            {
                id: 'group_queue_a',
                group_id: 'group_a_cintia',
                user_id: 'marilia',
            },
            {
                id: 'group_queue_b',
                group_id: 'group_a_cintia',
                user_id: 'franco',
            },
            {
                id: 'group_queue_c',
                group_id: 'group_a_cintia',
                user_id: 'denis',
            },
        ],
        groups_users: [
            {
                group_id: 'group_a_cintia',
                user_id: 'alex',
            },
            {
                group_id: 'group_a_cintia',
                user_id: 'marcos',
            },
            {
                group_id: 'group_a_cintia',
                user_id: 'simas',
            },
        ],
        campaigns: [
            {
                id: 'campaign_a_cintia',
                group_id: 'group_a_cintia',
                user_id: 'cintia', // Manager
                name: 'Primeira dinâmica em grupo',
                expiration: 'now()',
            },
            {
                id: 'campaign_b_cintia',
                group_id: 'group_a_cintia',
                user_id: 'cintia', // Manager
                name: 'Segunda dinâmica em grupo',
                expiration: 'now()',
            },
        ],
        campaign_queue: [
            {
                id: 'campaign_queue_a_cintia',
                campaign_id: 'campaign_a_cintia',
                user_id: 'alex',
            },
            {
                id: 'campaign_queue_b_cintia',
                campaign_id: 'campaign_a_cintia',
                user_id: 'marcos',
            },
            {
                id: 'campaign_queue_c_cintia',
                campaign_id: 'campaign_a_cintia',
                user_id: 'simas',
            },
        ],
        emotions: [
            {
                id: 'emotion_feliz',
                name: 'Feliz',
                slug: 'feliz',
            },
            {
                id: 'emotion_triste',
                name: 'Triste',
                slug: 'triste',
            },
            {
                id: 'emotion_raiva',
                name: 'Raiva',
                slug: 'raiva',
            },
            {
                id: 'emotion_medo',
                name: 'Medo',
                slug: 'medo',
            },
        ],
        actors: [
            {
                id: 'actor_colega',
                name: 'Colega',
                slug: 'colega',
            },
            {
                id: 'actor_pai',
                name: 'Pai',
                slug: 'pai',
            },
            {
                id: 'actor_padastro',
                name: 'Padastro',
                slug: 'padastro',
            },
            {
                id: 'actor_mae',
                name: 'Mae',
                slug: 'mae',
            },
            {
                id: 'actor_tio',
                name: 'Tio',
                slug: 'tio',
            },
            {
                id: 'actor_madastra',
                name: 'Madastra',
                slug: 'madastra',
            },
            {
                id: 'actor_irmao_irma',
                name: 'Irma(o)',
                slug: 'irmao_irma',
            },
            {
                id: 'actor_escola',
                name: 'Escola',
                slug: 'escola',
            },
        ],
        reasons: [
            {
                id: 'reason_a_triste',
                emotion_id: 'emotion_triste',
                description: 'Me bateu',
            },
            {
                id: 'reason_b_triste',
                emotion_id: 'emotion_triste',
                description: 'Me apelidou',
            },
            {
                id: 'reason_c_triste',
                emotion_id: 'emotion_triste',
                description: 'Me xingou',
            },
            {
                id: 'reason_d_triste',
                emotion_id: 'emotion_triste',
                description: 'Me machucou',
            },
            {
                id: 'reason_a_raiva',
                emotion_id: 'emotion_raiva',
                description: 'De um colega',
            },
            {
                id: 'reason_b_raiva',
                emotion_id: 'emotion_raiva',
                description: 'De um irmão',
            },
            {
                id: 'reason_c_raiva',
                emotion_id: 'emotion_raiva',
                description: 'De meus pais',
            },
            {
                id: 'reason_d_raiva',
                emotion_id: 'emotion_raiva',
                description: 'De uma pessoa',
            },
            {
                id: 'reason_e_raiva',
                emotion_id: 'emotion_raiva',
                description: 'Da escola',
            },
            {
                id: 'reason_f_raiva',
                emotion_id: 'emotion_raiva',
                description: 'Da minha casa',
            },
            {
                id: 'reason_a_medo',
                emotion_id: 'emotion_medo',
                description: 'De um colega',
            },
            {
                id: 'reason_b_medo',
                emotion_id: 'emotion_medo',
                description: 'De um irmão',
            },
            {
                id: 'reason_c_medo',
                emotion_id: 'emotion_medo',
                description: 'Dos meus pais',
            },
            {
                id: 'reason_d_medo',
                emotion_id: 'emotion_medo',
                description: 'De uma pessoa',
            },
        ],
    };

    // USERS

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

    // GROUPS

    for (const { id, user_id, name } of data.groups) {
        await connection
            .query(
                `INSERT INTO groups (id, user_id, name, created_at, updated_at) VALUES 
                ('${id}', '${user_id}', '${name}', 'now()', 'now()')`
            )
            .then((_) => {
                console.log(`Group ${name} created!`);
            })
            .catch((err) => {
                console.log(`Erro in create group ${name}!`);
                console.log(err);
            });
    }

    // GROUP_QUEUE

    for (const { id, group_id, user_id } of data.group_queue) {
        await connection
            .query(
                `INSERT INTO group_queue (id, group_id, user_id, created_at) VALUES 
                ('${id}', '${group_id}', '${user_id}', 'now()')`
            )
            .then((_) => {
                console.log(`Group queue ${group_id} created!`);
            })
            .catch((err) => {
                console.log(`Erro in create group ${group_id}!`);
                console.log(err);
            });
    }

    // GROUPS_USERS

    for (const { group_id, user_id } of data.groups_users) {
        await connection
            .query(
                `INSERT INTO groups_users (group_id, user_id) VALUES 
                ('${group_id}', '${user_id}')`
            )
            .then((_) => {
                console.log(`Groups users ${group_id} created!`);
            })
            .catch((err) => {
                console.log(`Erro in create groups users ${group_id}!`);
                console.log(err);
            });
    }

    // CAMPAIGNS

    for (const { id, group_id, user_id, name, expiration } of data.campaigns) {
        await connection
            .query(
                `INSERT INTO campaigns (id, group_id, user_id, name, expiration, created_at, updated_at, deleted_at) VALUES 
                ('${id}', '${group_id}', '${user_id}', '${name}', '${expiration}', 'now()', 'now()', null)`
            )
            .then((_) => {
                console.log(`Campaign ${name} created!`);
            })
            .catch((err) => {
                console.log(`Erro in create campaign ${name}!`);
                console.log(err);
            });
    }

    // CAMPAIGN QUEUE

    for (const { id, campaign_id, user_id } of data.campaign_queue) {
        await connection
            .query(
                `INSERT INTO campaign_queue (id, campaign_id, user_id, created_at) VALUES 
                    ('${id}', '${campaign_id}', '${user_id}', 'now()')`
            )
            .then((_) => {
                console.log(`Campaign queue ${id} created!`);
            })
            .catch((err) => {
                console.log(`Erro in create campaign queue ${id}!`);
                console.log(err);
            });
    }

    // EMOTION

    for (const { id, name, slug } of data.emotions) {
        await connection
            .query(
                `INSERT INTO emotions (id, name, slug, created_at) VALUES 
                    ('${id}', '${name}', '${slug}', 'now()')`
            )
            .then((_) => {
                console.log(`Emotion ${name} created!`);
            })
            .catch((err) => {
                console.log(`Erro in create emotion ${name}!`);
                console.log(err);
            });
    }

    // ACTOS

    for (const { id, name, slug } of data.actors) {
        await connection
            .query(
                `INSERT INTO actors (id, name, slug, created_at) VALUES 
                            ('${id}', '${name}', '${slug}', 'now()')`
            )
            .then((_) => {
                console.log(`Actor ${name} created!`);
            })
            .catch((err) => {
                console.log(`Erro in create actor ${name}!`);
                console.log(err);
            });
    }

    // REASONS

    for (const { id, emotion_id, description } of data.reasons) {
        await connection
            .query(
                `INSERT INTO reasons (id, emotion_id, description, created_at) VALUES 
                        ('${id}', '${emotion_id}', '${description}', 'now()')`
            )
            .then((_) => {
                console.log(`Question ${description} created!`);
            })
            .catch((err) => {
                console.log(`Erro in create reason ${description}!`);
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
