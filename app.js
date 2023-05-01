const express = require('express');
const env = require('dotenv');
env.config();
const {connection} = require('./DB');
const {UserRoutes} = require('./SRC/Routes/User.routes');
const {NoteRoutes} = require('./SRC/Routes/Notes.routes');
const PORT = process.env.PORT || 8080;
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); 
app.use('/users',UserRoutes);
app.use('/notes',NoteRoutes)

app.listen(PORT, async () => {
    try {
        await connection
        console.log('')
        console.log('--------------------------------------------------')
        console.log('|                                                |');
        console.log('|     🗳️  ✅ Coneected to the DATABASE 📅 🗳️       |');
        console.log('|                                                |');
        console.log('|     🚀 Server is running on port ', PORT,'        |');
        console.log('|                                                |');
        console.log('--------------------------------------------------');
        console.log('')
    } catch (error) {
        console.log('Unable to connect to the Database\n',error);
    }
})