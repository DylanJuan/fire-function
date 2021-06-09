const functions = require("firebase-functions");
const axios = require('axios')
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.helloWorld = functions.https.onRequest((req, res)=> {
    res.send("Hello from firebase function .. ");

});

exports.api = functions.https.onRequest(async(req, res) => {
    switch(req.method){
        case 'GET':
            const response = await axios.get('https://jsonplaceholder.typicode.com/users/1')
            res.send(response.data);
            break;
       case 'POST':
            res.send(' it was POST request');
            break;
        case 'DELETE':
            res.send(' it was DELETE request');
            break;
        default:
            res.send("It waws a default request .....")        
    }

});

exports.userAdded = functions.auth.user().onCreate(user=> {
    console.log(`${user.email} is created..`)
    return Promise.resolve()
});
exports.userDeleted = functions.auth.user().onDelete(user=> {
    console.log(`${user.email} is deleted..`)
    return Promise.resolve()
});

exports.ukmAdded = functions.firestore.document('/ukm/{documentId}').onCreate((snapshot, context) => {
    console.log(snapshot.data(),'added');
    return Promise.resolve();
});

exports.ukmDeleted = functions.firestore.document('/ukm/{documentId}').onDelete((snapshot, context) => {
    console.log(snapshot.data(), 'deleted');
    return Promise.resolve();
});

exports.ukmUpdated = functions.firestore.document('/ukm/{documentId}').onUpdate((snapshot, context) => {
    console.log('Before',snapshot.before.data())
    console.log('After',snapshot.after.data())
    return Promise.resolve();
});

