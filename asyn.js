const fs = require('fs');

fs.writeFile('sample.txt', 'Welcome to Full Stack Development',  (err) => {
    if (err)
    {
        console.error('Error writing file:', err);
    }
}
) 


fs.readFile('sample.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('File content is:', data);
}
)
//append 

fs.appendFile('sample.txt', '\nSemester 3', 'utf8', (err) => {

    if (err) {
        console.error('Error appending file:', err);
    }
    else {
        console.log('Data appended successfully.');
    }
}
) 

//updated read
fs.readFile('sample.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('Updated file content is:', data);
}
)


