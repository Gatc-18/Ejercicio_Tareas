const fs = require('fs');
const archivo = './db/data.json';




const guardarArchivo = (data) => {


    fs.writeFileSync(archivo, data);
}

const leerDb = () => {
    if (fs.existsSync(archivo)) {
        const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
        const data = JSON.parse(info);
        
        return data;

    } else {
        return null;
    }


}

module.exports = {
    guardarArchivo,
    leerDb
}