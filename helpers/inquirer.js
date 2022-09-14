const inquirer = require('inquirer');
require('colors');

const questionsOpt = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué deseas hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            }
        ]
    }
]

const inquirerMenu = async () => {
    console.clear();
    console.log("==========".green);
    console.log("Seleccione una opcion".green);
    console.log("==========\n".green);

    const { opcion } = await inquirer.prompt(questionsOpt);

    return opcion;
}

const pausa = async () => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'Enter'.green} para continuar`
        }
    ]
    console.log('\n');
    await inquirer.prompt(question)
}

const leerInput = async (message) => {
    const option = [
        {
            type: 'input',
            name: 'descript',
            message,
            validate(value) {
                if (value.lenght === 0) {
                    return "Por favor ingresa un valor"
                }
                return true
            }

        }
    ]

    const { descript } = await inquirer.prompt(option);
    return descript;
}

const listadoTareasBorrar = async (tareas = []) => {

    const choices = tareas.map((task, i) => {
        let index = `${i + 1}.-`.green;
        return {
            value: task.id,
            name: `${index}${task.description}`
        }
    })


    const optionsDelete = [
        {
            type: 'list',
            name: 'idToDelete',
            message: 'Selecciona la tarea que deseas borrar',
            choices,
        }
    ]

    const { idToDelete } = await inquirer.prompt(optionsDelete);

    return idToDelete

}

const confirmar = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message,
        }
    ]

    const { ok } = await inquirer.prompt(question);
    return ok;

}

const mostrarListadoCheck = async (tareas = []) => {

    const choices = tareas.map((task, i) => {
        let index = `${i + 1}.-`.green;
        return {
            value: task.id,
            name: `${index}${task.description}`,
            checked: task.completadoEn ? true : false
        }
    })


    const optionsDelete = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciona las tareas que deseas completar',
            choices,
        }
    ]

    const { ids } = await inquirer.prompt(optionsDelete);

    return ids

}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheck
}