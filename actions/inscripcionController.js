var util = require('../util/util');
var errorInscribir = "Error: No se pudo inscribir el estudiante";
var errorEliminar = "Error: No se pudo eliminar al estudiante";

const add = (cedula,nombre,correo,telefono,idCurso) =>{

    var listaInscritos =  util.list('../db/inscripcion.json',errorInscribir);

    var listaCursos =  util.list('../db/course.json',errorInscribir);
    
    if(listaCursos!=null){
        //Filtramos por el idcurso
        //validamos que no exista un curso con el id dado
        var cursos = listaCursos.find(courseArray => courseArray.id == idCurso);

        if(typeof cursos==='undefined'){
            return errorCurso + ', Id de curso no disponible';
        }
    }else{
        return errorInscribir;
    }

    if(listaInscritos!=null){
 
        //validamos que el estudiante no esté matriculado en el curso
        let courseFilter = listaInscritos.find(courseArray => courseArray.cedula == cedula && courseArray.idCurso == idCurso);
        if(typeof courseFilter !== 'undefined'){
            return errorInscribir + ', esta persona ya está matriculada en el curso';
        }
            
    }else{
        listaInscritos = [];
    }
    let newInscripcion = {};
    newInscripcion.cedula = cedula;
    newInscripcion.nombre = nombre;
    newInscripcion.correo = correo;
    newInscripcion.telefono = telefono;
    newInscripcion.idCurso = idCurso;
    listaInscritos.push(newInscripcion);
    return util.add('../db/inscripcion.json',listaInscritos, nombre + ' fue inscrito(a) con éxito al curso ' + cursos.nombre,errorInscribir);
};

const list = () =>{
    var listaEst =  util.list('../db/inscripcion.json',errorInscribir);
    if(typeof listaEst!=='undefined' && listaEst!=null){
        return listaEst;
    }else{
        return null;
    }
};

const obtenerAlumnosPorCurso = (idCurso) => {

    var listaEstudiantes = list();
    if(listaEstudiantes!==undefined && listaEstudiantes!=null){
        //validamos que el estudiante no esté matriculado en el curso
        let inscritos = listaEstudiantes.filter(courseArray => courseArray.idCurso == idCurso);
        if(typeof inscritos !== 'undefined'){
            return inscritos;
        }else{
            return null;
        }
    }

};

const deleteEstudent = (cedula, idCurso) => {
    var listaEstudiantes = list();

    if(listaEstudiantes!==undefined && listaEstudiantes!=null){
        let result = listaEstudiantes.filter(lista => lista.cedula!=cedula && lista.idCurso!=idCurso);

        if (typeof result !== 'undefined'){
            return util.add('../db/inscripcion.json',result, 'Alumno eliminado del curso exitosamente',errorEliminar);
        }else{
            return errorEliminar + ', no se encontraron registros con los datos suministrados';
        } 

    }else{
        return errorEliminar + ', no se encontraron datos';
    }

};

module.exports = {
    add,
    list,
    obtenerAlumnosPorCurso,
    deleteEstudent
};