// Importing the Client class from the "pg" module
import { Client } from "pg";

// Connection configuration for the PostgreSQL client
const connectionConfig = {
    host: 'ep-withered-moon-a543wtfg.us-east-2.aws.neon.tech',
    database: 'neonDB',
    user: 'yg3752',
    password: 'ikmNatGS7o3l',
    ssl: true
}

// Creating a new client instance with the connection configuration
const client = new Client(connectionConfig);

// Print all databases and tables
async function getAllDatabasesAndTables() {
    try {

        // Connect to the PostgreSQL server
        await client.connect();

        // Step 1: List all databases
        const databaseResult = await client.query('SELECT datname FROM pg_database');

        console.log('Database Result:');
        console.log(databaseResult);
        const databases = databaseResult.rows.map(row => row.datname);
        console.log('Databases:');
        console.log(databases);

        // Loop through each database
        for (const database of databases) {
            // Skip 'template0' database
            if (database == 'template0') continue;
            console.log(`Database: ${database}`);

            // Step 2: Connect to a specific database
            const databaseClient = new Client({ ...connectionConfig, database });
            await databaseClient.connect();

            // Step 3: List all tables in the connected database
            const tableResult = await databaseClient.query('SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\';');
            const tables = tableResult.rows.map(row => row.table_name);

            console.log('Tables:', tables);
            console.log('\n');

            // Close the client connection for this specific database
            await databaseClient.end();
        }
    } catch (error: any) {
        console.error('Error:', error.message);
    } finally {
        // Close the client connection
        await client.end();
    }
}

// Create table
async function createUsersTable() {
    try {
        // Connect to the PostgreSQL server
        await client.connect();

        // Create the users table
        const result = await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Create Table Result:');
        console.log(result);
    } catch (error: any) {
        console.error('Error:', error.message);
    } finally {
        // Close the client connection
        await client.end();
    }
}

// Insert values
async function insert_values_users(values: string[]) {
    try {
        // Connect to the PostgreSQL server
        await client.connect();

        // Insert values into the users table
        const result = await client.query(`
            INSERT INTO users (username, email, password) VALUES ($1, $2, $3)
        `, values);
        console.log('Insert Result:');
        console.log(result);
    } catch (error: any) {
        console.error('Error:', error.message);
    } finally {
        // Close the client connection
        await client.end();
    }
}

// Print values
async function select_all() {
    try {
        // Connect to the PostgreSQL server
        await client.connect();

        // Print all values from the users table
        const { rows } = await client.query('SELECT * FROM users');
        console.log('Print Values:');
        console.log(rows);
    } catch (error: any) {
        console.error('Error:', error.message);
    } finally {
        // Close the client connection
        await client.end();
    }
}

// Update values
async function update_users(password: string, id: number) {
    try {
        // Connect to the PostgreSQL server
        await client.connect();

        // Update password for the given user ID
        const result = await client.query(`
            UPDATE users
            SET password = $1
            WHERE id = $2
        `, [password, id]);
        console.log('Update Result:');
        console.log(result);
    } catch (error: any) {
        console.error('Error:', error.message);
    } finally {
        // Close the client connection
        await client.end();
    }
}

// Delete values
async function deleteValues_users(id: number) {
    try {
        // Connect to the PostgreSQL server
        await client.connect();

        // Delete user with the given ID
        const result = await client.query(`
            DELETE FROM users
            WHERE id = $1
        `, [id]);
        console.log('Delete Result:');
        console.log(result);

        // Print remaining values from the users table
        const { rows } = await client.query('SELECT * FROM users');
        console.log('Remaining Values:');
        console.log(rows);
    } catch (error: any) {
        console.error('Error:', error.message);
    } finally {
        // Close the client connection
        await client.end();
    }
}

// Create two tables
async function create2Tables() {
    try {
        // Connect to the PostgreSQL server
        await client.connect();

        // Create users3 and addresses tables
        const result = await client.query(`
            CREATE TABLE users_new_new (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
            CREATE TABLE addresses_new_new (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                city VARCHAR(100) NOT NULL,
                country VARCHAR(100) NOT NULL,
                street VARCHAR(255) NOT NULL,
                pincode VARCHAR(20),
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users_new_new(id) ON DELETE CASCADE
            );
        `);
        console.log('Create 2 Tables Result:');
        console.log(result);
    } catch (error: any) {
        console.error('Error:', error.message);
    } finally {
        // Close the client connection
        await client.end();
    }
}

// Transactions
async function transactions(
    username: string,
    email: string,
    password: string,
    city: string,
    country: string,
    street: string,
    pincode: string
) {
    try {
        // Connect to the PostgreSQL server
        await client.connect();

        // Start transaction
        await client.query('BEGIN');

        try {
            // Insert user
            const insertUserText = `
                INSERT INTO users_new (username, email, password)
                VALUES ($1, $2, $3)
                RETURNING id;
            `;
            const userRes = await client.query(insertUserText, [username, email, password]);
            const userId = userRes.rows[0].id;

            // Insert address using the returned user ID
            const insertAddressText = `
                INSERT INTO addresses_new (user_id, city, country, street, pincode)
                VALUES ($1, $2, $3, $4, $5);
            `;

            const addressRes = await client.query(insertAddressText, [userId, city, country, street, pincode]);
            console.log('Address Result:');
            console.log(addressRes);

            // Commit transaction
            await client.query('COMMIT');
        } catch (error) {
            // Rollback transaction in case of error
            await client.query('ROLLBACK');
            throw error;
        }
    } catch (error: any) {
        console.error('Error during transaction:', error.message);
    } finally {
        // Close the client connection
        await client.end();
    }
}


// Generate dummy data for users
const generateUsersData = (count: number) => {
    const usersData = [];
    for (let i = 1; i <= count; i++) {
        usersData.push({
            username: `user_${i}`,
            email: `user${i}@example.com`,
            password: 'password'
        });
    }
    return usersData;
};

// Generate dummy data for addresses
const generateAddressesData = (userCount: number, addressesPerUser: number) => {
    const addressesData = [];
    let addressId = 1;
    for (let i = 1; i <= userCount; i++) {
        for (let j = 1; j <= addressesPerUser; j++) {
            addressesData.push({
                user_id: i,
                city: `City_${i}_${j}`,
                country: `Country_${i}_${j}`,
                street: `Street_${i}_${j}`,
                pincode: `Pincode_${i}_${j}`
            });
            addressId++;
        }
    }
    return addressesData;
};

async function generateDummyData() {
    try {
        const usersCount = 10;
        const addressesPerUser = 3;

        const usersData = generateUsersData(usersCount);
        const addressesData = generateAddressesData(usersCount, addressesPerUser);

        await client.connect();
        // Insert dummy data into users_new table
        await Promise.all(usersData.map(user =>
            client.query(`
        INSERT INTO users_new_new (username, email, password) VALUES ($1, $2, $3)
      `, [user.username, user.email, user.password])
        ));

        // Insert dummy data into addresses_new table
        await Promise.all(addressesData.map(address =>
            client.query(`
        INSERT INTO addresses_new_new  (user_id, city, country, street, pincode) VALUES ($1, $2, $3, $4, $5)
      `, [address.user_id, address.city, address.country, address.street, address.pincode])
        ));

        console.log('Dummy data inserted successfully!');
    } catch (error) {
        console.error('Error inserting dummy data:', error);
    } finally {
        await client.end();
    }

}


async function inner_join() {
    await client.connect()

    let { rows } = await client.query(`
        SELECT users_new_new.username, addresses_new_new.city, addresses_new_new.country, addresses_new_new.street, addresses_new_new.pincode
        FROM users_new_new 
        INNER JOIN addresses_new_new ON users_new_new.id = addresses_new_new.user_id;
    `)

    console.log(rows)
}

async function left_join() {
    await client.connect()

    let { rows } = await client.query(`
        SELECT users_new_new.username, addresses_new_new.city, addresses_new_new.country, addresses_new_new.street, addresses_new_new.pincode
        FROM users_new_new 
        LEFT  JOIN addresses_new_new ON users_new_new.id = addresses_new_new.user_id;
    `)

    console.log(rows)
}

async function right_join() {
    await client.connect()

    let { rows } = await client.query(`
        SELECT users_new_new.username, addresses_new_new.city, addresses_new_new.country, addresses_new_new.street, addresses_new_new.pincode
        FROM users_new_new 
        RIGHT  JOIN addresses_new_new ON users_new_new.id = addresses_new_new.user_id;
    `)

    console.log(rows)
}

async function full_join() {
    await client.connect()

    let { rows } = await client.query(`
        SELECT users_new_new.username, addresses_new_new.city, addresses_new_new.country, addresses_new_new.street, addresses_new_new.pincode
        FROM users_new_new 
        FULL  JOIN addresses_new_new ON users_new_new.id = addresses_new_new.user_id;
    `)

    console.log(rows)
}


// getAllDatabasesAndTables();
// createUsersTable();
// insert_values_users(['username_here512', 'user@example.com251', 'user_password2']);
// select_all();
// update_users('new_password11112121', 1);
// deleteValues_users(2);

// create2Tables();
// transactions(
//     'johndoe',
//     'john.doe@example.com',
//     'securepassword123',
//     'New York',
//     'USA',
//     '123 Broadway St',
//     '10001'
// );


// generateDummyData();
// inner_join()
// left_join()
// right_join()
// full_join()