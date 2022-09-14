require('colors');
const { guardarArchivo, leerDb } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheck } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

// console.clear();


const main = async () => {
   let opt = '';

   const tareas = new Tareas();
   const tareasDB = leerDb();

   if (tareasDB) {
      tareas.cargarTareasFromArr(tareasDB);
   }


   do {
      opt = await inquirerMenu();

      switch (opt) {
         case '1':
            const descript = await leerInput("Descripcion: ");
            tareas.crearTarea(descript)

            break;

         case '2':
            tareas.listarTareaFromArr();
            break;

         case '3':
            tareas.listarTareasCompletadas();
            break;

         case '4':
            tareas.listarTareasCompletadas(false);
            break;

         case '5':
            const ids = await mostrarListadoCheck(tareas.listadoArr);
            tareas.completarTarea(ids)
            break;

         case '6':
            const optionDele = await listadoTareasBorrar(tareas.listadoArr);
            const confirm = await confirmar('¿Estas seguro que deseas eliminar esta tarea?');
            if (confirm) {
               tareas.borrarTarea(optionDele);
            }
            break;
      }

      guardarArchivo(JSON.stringify(tareas.listadoArr));


      await pausa()
   } while (opt !== '0')


}




main();