const Tarea = require("./tarea");
require('colors')

class Tareas {

    _listado = {}

    constructor() {
        this._listado = {};
    }

    borrarTarea(id) {

        if (this._listado[id]) {
            delete this._listado[id]
        }

    }


    cargarTareasFromArr(data = []) {

        data.forEach(task => {
            this._listado[task.id] = task
        })
    }

    get listadoArr() {
        const listado = [];

        Object.keys(this._listado).forEach(key => {
            listado.push(this._listado[key]);
        })

        return listado;
    }


    crearTarea(desc = '') {
        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;
    }

    listarTareaFromArr() {
        this.listadoArr.forEach((task, index) => {
            let state = task.completadoEn ? `${'Completado'.green}` : `${'Pendiente'.red}`
            console.log(`${`${index + 1}.-`.green} ${task.description} :: ${state}`)
        })
    }

    listarTareasCompletadas(completada = true) {
        if (completada) {
            let cumple = this.listadoArr.filter(item => item.completadoEn);
            this.showList(cumple);
        } else {
            let pendi = this.listadoArr.filter(item => !item.completadoEn);
            this.showList(pendi)
        }
    }

    showList(arr = [], status) {
        arr.forEach((task, i) => {
            let index = `${i + 1}.-`.yellow;
            console.log(`${index} ${task.description}`)
        })
    }

    completarTarea(arr = []) {
        //    this.listadoArr.forEach()
        arr.forEach(ids => {
            const tarea = this._listado[ids];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        })

        this.listadoArr.forEach(item => {
            if (!arr.includes(item.id)) {
                const tarea = this._listado[item.id];
             
                tarea.completadoEn = null;


            }
        })
    }

}




module.exports = Tareas;