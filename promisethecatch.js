const fs = require('fs').promises;

async function writeFile() {
    try{
        await fs.writeFile('promise.txt', 'This is a promise based file operation.');
        console.log('File written successfully.');
    }
    catch(err){
        console.error('Error writing file:', err);
    }
}

writeFile();

//read file

async function readFile() {
    try{
        const data = await fs.readFile('promise.txt', 'utf8');
        console.log('File content is:', data);
    }
    catch(err){
        console.error('Error reading file:', err);
    }
}

readFile();

//append file

async function appendFile() {
    try{
        await fs.appendFile('promise.txt', '\nWelcome to FSD Training.');
        console.log('Data appended successfully.');
    }
    catch(err){
        console.error('Error appending file:', err);
    }
}

appendFile();

//rename file


async function renameFile() {
    try{
        await fs.rename('promise.txt', 'renamedPromise.txt');
        console.log('File renamed successfully.');
    }
    catch(err){
        console.error('Error renaming file:', err);
    }
}

renameFile();
