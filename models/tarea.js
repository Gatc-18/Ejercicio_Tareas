const { v4: uuidv4 } = require('uuid');

class Tarea{
  id = '';
  description = '';
  completadoEn = null;

  constructor(desc) {
      this.id = uuidv4(),
      this.description = desc, 
      this.completadoEn
  }
}


module.exports = Tarea;