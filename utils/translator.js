const axios = require('axios')
// exports.translate = (transFrom,content) => {
//     console.log('in translate');
//     var http = require('http');

// // When you have your own Client ID and secret, put down their values here:
// var clientId = "FREE_TRIAL_ACCOUNT";
// var clientSecret = "PUBLIC_SECRET";

// // TODO: Specify your translation requirements here:
// var fromLang = transFrom;
// var toLang = "en";
// var text = content;

// var jsonPayload = JSON.stringify({
//     fromLang: fromLang,
//     toLang: toLang,
//     text: text
// });
// console.log(Buffer.byteLength(jsonPayload));
// var options = {
//     hostname: "api.whatsmate.net",
//     port: 80,
//     path: "/v1/translation/translate",
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json",
//         "X-WM-CLIENT-ID": clientId,
//         "X-WM-CLIENT-SECRET": clientSecret,
//         "Content-Length": Buffer.byteLength(jsonPayload)
//     }
// };
// var request = new http.ClientRequest(options);
// request.end(jsonPayload);

//     request.on('response', response => {
//         console.log('Status code: ' + response.statusCode);
//         response.setEncoding('utf8');
//         response.on('data', chunk => {
//             console.log('Translated text:');
//             console.log(chunk);
//         })
//     })
// }













exports.translate =async (transFrom,content) =>{
var http = require('http');
console.log(content);
// When you have your own Client ID and secret, put down their values here:
var clientId = "FREE_TRIAL_ACCOUNT";
var clientSecret = "PUBLIC_SECRET";

// TODO: Specify your translation requirements here:
var fromLang = "ta";
var toLang = "en";
var text = content;

var jsonPayload = JSON.stringify({
    fromLang: fromLang,
    toLang: toLang,
    text: text
});

var options = {
    hostname: "api.whatsmate.net",
    port: 80,
    path: "/v1/translation/translate",
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "X-WM-CLIENT-ID": clientId,
        "X-WM-CLIENT-SECRET": clientSecret,
        "Content-Length": Buffer.byteLength(jsonPayload)
    }
};
console.log('buffer:'+Buffer.byteLength(jsonPayload));
// var request = new http.ClientRequest(options);
// request.end(jsonPayload);

// request.on('response', function (response) {
//     console.log('Status code: ' + response.statusCode);
//     response.setEncoding('utf8');
//     response.on('data', function (chunk) {
//         console.log('Translated text:');
//         console.log(chunk);
//     });
// });}


///////////////axios///////////
const res = await axios.post('https://api.whatsmate.net:80/v1/translation/translate',{
    headers: {
        "Content-Type": "application/json",
        "X-WM-CLIENT-ID": clientId,
        "X-WM-CLIENT-SECRET": clientSecret,
        "Content-Length": Buffer.byteLength(jsonPayload)
    }
})
console.log(res.data);
}