const app = require('./app');

const main = async() =>{
    app.listen(4000);
    console.log('Server on');
}

main();