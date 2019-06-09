var util = require('../util/util');
var errorCurso = "Error: No se pudo crear el curso";
var errorActualizar = "Error: No se pudo actualizar el curso";
const add = (id,nombre,modalidad,valor,descripcion,intensidad) =>{
    //Obtenemos la lista de cursos
    let courseList =  util.list('../db/course.json',errorCurso);

    if(courseList!=null){
        //validamos que no exista un curso con el id dado
        let courseFilter = courseList.find(courseArray => courseArray.id == id);

        if(typeof courseFilter!=='undefined'){
            return errorCurso + ', Id de curso no disponible';
        }
            
    }else{
        jsonData = [];
    }
    //Agregamos el nuevo item
    let newCourse = {};
    
    newCourse.id = id;
    newCourse.nombre = nombre;
    newCourse.modalidad = modalidad==null || modalidad=="" ? "-" : modalidad;
    newCourse.valor = valor;
    newCourse.descripcion = descripcion;
    newCourse.intensidad = intensidad==null || intensidad=="" || intensidad==0 || isNaN(intensidad) ? "-" : intensidad + " Hrs";
    newCourse.disponible = "Disponible";
    courseList.push(newCourse);

    return util.add('../db/course.json',courseList, 'Curso ' + nombre + ' creado con éxito',errorCurso);
};

const list = () =>{
    var courseList =  util.list('../db/course.json',errorCurso);
    if(typeof courseList!=='undefined' && courseList !=null){
        return courseList;
    }else{
        return null;
    }
};

const listCourseTable = () =>{
    let lista = list();

    let table = "";

    table+='<div class="table-responsive"><table class="table align-items-center">'+
            '<thead class="thead-light"><tr><th scope="col">Id</th>'+
            '<th scope="col">Nombre</th><th scope="col">Modalidad</th>'+
            '<th scope="col">Valor (COP)</th><th scope="col">Descripción</th>'+
            '<th scope="col">Disponible</th><th scope="col">Intensidad</th>'+
            '<th scope="col"></th></tr></thead><tbody>';

    if(lista != null){
        for (let i = 0; i < lista.length; i++){
        let curso = lista[i];
            table = table + 
                    "<tr><th scope='row'>" + curso.id + '</th>' +
                    "<td>" + curso.nombre + '</td>' +
                    "<td>" + curso.modalidad + '</td>' +
                    "<td>" + curso.valor + '</td>' +
                    "<td>" + curso.descripcion + '</td>' +
                    "<td>" + (typeof curso.disponible!=='undefined' 
                    ? curso.disponible : 'Cerrado')  + '</td>' +
                    "<td>" + curso.intensidad + '</td>' +
                    '<td>'+
                    '<a class="btn btn-success btn-sm colorwhite" '+
                    'href="/actualizarcurso?idCurso=' + curso.id + '" '+
                    'data-toggle="tooltip" data-placement="top" title="Actualizar estado de curso"'+
                    '><i class="ni ni-settings"></i></a>'+
                    '</td></tr>';
        };
    }

    table+='</tbody></table></div>';
    return table;
}

const update = (idCurso) =>{
    //Obtenemos la lista de cursos
    var courseList =  util.list('../db/course.json',errorActualizar);
    if(courseList ==null){
        return errorCurso + ', no se encontraron cursos';
            
    }else{
        //validamos que no exista un curso con el id dado
        let courseFilter = courseList.find(courseArray => courseArray.id == idCurso);
        console.log(courseFilter);
        if(typeof courseFilter === 'undefined'){
            return errorActualizar + ', no se encontraron cursos con el id suministrado';
        }

        courseFilter.disponible = courseFilter.disponible == 'Disponible' ? 'Cerrado' : 'Disponible';
        return util.add('../db/course.json',courseList, 'Curso ' + courseFilter.nombre + ' actualizado con éxito',errorActualizar);
    }

};

module.exports = {
    add,
    list,
    listCourseTable,
    update
};