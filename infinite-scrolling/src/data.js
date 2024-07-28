const data = [
    {
        id: 1,
        name: 'abc'
    }
];

// Array of unique names
const uniqueNames = ['abc', 'def', 'ghi', 'jkl', 'mno', 'pqr', 'stu', 'vwx', 'yz'];

// Function to clone an object
function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// Generate 20 records
const twentyRecords = [];
for (let i = 0; i < 20; i++) {
    const newData = clone(data[0]);
    newData.id = data.length + i + 1; // Incrementing ID
    newData.name = uniqueNames[i % uniqueNames.length]; // Using modulo to cycle through unique names
    twentyRecords.push(newData);
}

export default twentyRecords;
