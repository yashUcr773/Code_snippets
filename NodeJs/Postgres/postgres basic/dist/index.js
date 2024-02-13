"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing the Client class from the "pg" module
const pg_1 = require("pg");
// Connection configuration for the PostgreSQL client
const connectionConfig = {
    host: 'ep-withered-moon-a543wtfg.us-east-2.aws.neon.tech',
    database: 'neonDB',
    user: 'yg3752',
    password: 'ikmNatGS7o3l',
    ssl: true
};
// Creating a new client instance with the connection configuration
const client = new pg_1.Client(connectionConfig);
// Print all databases and tables
function getAllDatabasesAndTables() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to the PostgreSQL server
            yield client.connect();
            // Step 1: List all databases
            const databaseResult = yield client.query('SELECT datname FROM pg_database');
            console.log('Database Result:');
            console.log(databaseResult);
            const databases = databaseResult.rows.map(row => row.datname);
            console.log('Databases:');
            console.log(databases);
            // Loop through each database
            for (const database of databases) {
                // Skip 'template0' database
                if (database == 'template0')
                    continue;
                console.log(`Database: ${database}`);
                // Step 2: Connect to a specific database
                const databaseClient = new pg_1.Client(Object.assign(Object.assign({}, connectionConfig), { database }));
                yield databaseClient.connect();
                // Step 3: List all tables in the connected database
                const tableResult = yield databaseClient.query('SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\';');
                const tables = tableResult.rows.map(row => row.table_name);
                console.log('Tables:', tables);
                console.log('\n');
                // Close the client connection for this specific database
                yield databaseClient.end();
            }
        }
        catch (error) {
            console.error('Error:', error.message);
        }
        finally {
            // Close the client connection
            yield client.end();
        }
    });
}
// Create table
function createUsersTable() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to the PostgreSQL server
            yield client.connect();
            // Create the users table
            const result = yield client.query(`
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
        }
        catch (error) {
            console.error('Error:', error.message);
        }
        finally {
            // Close the client connection
            yield client.end();
        }
    });
}
// Insert values
function insert_values_users(values) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to the PostgreSQL server
            yield client.connect();
            // Insert values into the users table
            const result = yield client.query(`
            INSERT INTO users (username, email, password) VALUES ($1, $2, $3)
        `, values);
            console.log('Insert Result:');
            console.log(result);
        }
        catch (error) {
            console.error('Error:', error.message);
        }
        finally {
            // Close the client connection
            yield client.end();
        }
    });
}
// Print values
function select_all() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to the PostgreSQL server
            yield client.connect();
            // Print all values from the users table
            const { rows } = yield client.query('SELECT * FROM users');
            console.log('Print Values:');
            console.log(rows);
        }
        catch (error) {
            console.error('Error:', error.message);
        }
        finally {
            // Close the client connection
            yield client.end();
        }
    });
}
// Update values
function update_users(password, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to the PostgreSQL server
            yield client.connect();
            // Update password for the given user ID
            const result = yield client.query(`
            UPDATE users
            SET password = $1
            WHERE id = $2
        `, [password, id]);
            console.log('Update Result:');
            console.log(result);
        }
        catch (error) {
            console.error('Error:', error.message);
        }
        finally {
            // Close the client connection
            yield client.end();
        }
    });
}
// Delete values
function deleteValues_users(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to the PostgreSQL server
            yield client.connect();
            // Delete user with the given ID
            const result = yield client.query(`
            DELETE FROM users
            WHERE id = $1
        `, [id]);
            console.log('Delete Result:');
            console.log(result);
            // Print remaining values from the users table
            const { rows } = yield client.query('SELECT * FROM users');
            console.log('Remaining Values:');
            console.log(rows);
        }
        catch (error) {
            console.error('Error:', error.message);
        }
        finally {
            // Close the client connection
            yield client.end();
        }
    });
}
// Create two tables
function create2Tables() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to the PostgreSQL server
            yield client.connect();
            // Create users3 and addresses tables
            const result = yield client.query(`
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
        }
        catch (error) {
            console.error('Error:', error.message);
        }
        finally {
            // Close the client connection
            yield client.end();
        }
    });
}
// Transactions
function transactions(username, email, password, city, country, street, pincode) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to the PostgreSQL server
            yield client.connect();
            // Start transaction
            yield client.query('BEGIN');
            try {
                // Insert user
                const insertUserText = `
                INSERT INTO users_new (username, email, password)
                VALUES ($1, $2, $3)
                RETURNING id;
            `;
                const userRes = yield client.query(insertUserText, [username, email, password]);
                const userId = userRes.rows[0].id;
                // Insert address using the returned user ID
                const insertAddressText = `
                INSERT INTO addresses_new (user_id, city, country, street, pincode)
                VALUES ($1, $2, $3, $4, $5);
            `;
                const addressRes = yield client.query(insertAddressText, [userId, city, country, street, pincode]);
                console.log('Address Result:');
                console.log(addressRes);
                // Commit transaction
                yield client.query('COMMIT');
            }
            catch (error) {
                // Rollback transaction in case of error
                yield client.query('ROLLBACK');
                throw error;
            }
        }
        catch (error) {
            console.error('Error during transaction:', error.message);
        }
        finally {
            // Close the client connection
            yield client.end();
        }
    });
}
// Generate dummy data for users
const generateUsersData = (count) => {
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
const generateAddressesData = (userCount, addressesPerUser) => {
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
function generateDummyData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const usersCount = 10;
            const addressesPerUser = 3;
            const usersData = generateUsersData(usersCount);
            const addressesData = generateAddressesData(usersCount, addressesPerUser);
            yield client.connect();
            // Insert dummy data into users_new table
            yield Promise.all(usersData.map(user => client.query(`
        INSERT INTO users_new_new (username, email, password) VALUES ($1, $2, $3)
      `, [user.username, user.email, user.password])));
            // Insert dummy data into addresses_new table
            yield Promise.all(addressesData.map(address => client.query(`
        INSERT INTO addresses_new_new  (user_id, city, country, street, pincode) VALUES ($1, $2, $3, $4, $5)
      `, [address.user_id, address.city, address.country, address.street, address.pincode])));
            console.log('Dummy data inserted successfully!');
        }
        catch (error) {
            console.error('Error inserting dummy data:', error);
        }
        finally {
            yield client.end();
        }
    });
}
function inner_join() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        let { rows } = yield client.query(`
        SELECT users_new_new.username, addresses_new_new.city, addresses_new_new.country, addresses_new_new.street, addresses_new_new.pincode
        FROM users_new_new 
        INNER JOIN addresses_new_new ON users_new_new.id = addresses_new_new.user_id;
    `);
        console.log(rows);
    });
}
function left_join() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        let { rows } = yield client.query(`
        SELECT users_new_new.username, addresses_new_new.city, addresses_new_new.country, addresses_new_new.street, addresses_new_new.pincode
        FROM users_new_new 
        LEFT  JOIN addresses_new_new ON users_new_new.id = addresses_new_new.user_id;
    `);
        console.log(rows);
    });
}
function right_join() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        let { rows } = yield client.query(`
        SELECT users_new_new.username, addresses_new_new.city, addresses_new_new.country, addresses_new_new.street, addresses_new_new.pincode
        FROM users_new_new 
        RIGHT  JOIN addresses_new_new ON users_new_new.id = addresses_new_new.user_id;
    `);
        console.log(rows);
    });
}
function full_join() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        let { rows } = yield client.query(`
        SELECT users_new_new.username, addresses_new_new.city, addresses_new_new.country, addresses_new_new.street, addresses_new_new.pincode
        FROM users_new_new 
        FULL  JOIN addresses_new_new ON users_new_new.id = addresses_new_new.user_id;
    `);
        console.log(rows);
    });
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
