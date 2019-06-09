const hbs = require('hbs');
const cursoController = require('../actions/courseController');
const inscripcionController = require('../actions/inscripcionController');

hbs.registerHelper('obtenerPromedio',(nota1,nota2,nota3)=>{
    return (nota1+nota2+nota3)/3;
});

hbs.registerHelper('listar',() => {
    listaCursos = require('../db/course.json');

    let texto = '<table><thead>'+
                '<th>Nombre</th><th>Id</th></thead>';

    texto = texto + '<tbody>'

    listaCursos.forEach(curso => {
        texto = texto + 
                "<tr><td>" + curso.name + '</td>' +
                "<td>" + curso.id + '</td></tr>';
    });

    texto+= '</tbody></table><br>';

    return texto;
});

hbs.registerHelper('agregarcurso',(id,nombre,modalidad,valor,descripcion,intensidad) => {
    let respuesta = cursoController.add(id,nombre,modalidad,valor,descripcion,intensidad);

    let mensaje = '';

    if(respuesta.toLowerCase().includes("error")){
        mensaje+='<div class="alert alert-danger" role="alert"><h2 class="colorwhite">'+
                respuesta + '</h2></div><a href="/crear" role="button" class="btn btn-success"'
                +'>Volver</a>';
    }else{
        mensaje+='<div class="alert alert-success" role="alert"><h2 class="colorwhite">'+
                respuesta + '</h2></div><p>A continuación, se presenta la lista de cursos creados hasta la fecha.</p>';

        mensaje+=cursoController.listCourseTable();
                
    }

    return mensaje;
});

hbs.registerHelper('listarcursos',() => {
    return cursoController.listCourseTable();
});

hbs.registerHelper('listarcursosdetalle',() => {

    //Solo traermos los cursos que estén disponibles

    let cursosCompletos = cursoController.list();
    if(typeof cursosCompletos!=='undefined' && cursosCompletos!= null){
        let courseFilter = cursosCompletos.filter(courseArray => courseArray.disponible == 'Disponible');
        if(typeof cursosCompletos !== 'undefined'){
            return JSON.stringify(courseFilter);
        }else{
            return null;
        }            
    }else{
        return null;
    }

    
});

hbs.registerHelper('inscribirestudiante',(cedula,nombre,correo,telefono,idCurso) => {
    let respuesta = inscripcionController.add(cedula,nombre,correo,telefono,idCurso);

    let mensaje = '';

    if(respuesta.toLowerCase().includes("error")){
        mensaje+='<div class="alert alert-danger" role="alert"><h2 class="colorwhite">'+
                respuesta + '</h2></div><a href="/inscribir" role="button" class="btn btn-success"'
                +'>Volver</a>';
    }else{
        mensaje+='<div class="alert alert-success" role="alert"><h2 class="colorwhite">'+
                respuesta + '</h2></div><a href="/inscribir" role="button" class="btn btn-success"'
                +'>Volver</a>';                
    }

    return mensaje;
});

hbs.registerHelper('actualizarcurso',(idCurso) => {
    let respuesta = cursoController.update(idCurso);

    let mensaje = '';

    if(respuesta.toLowerCase().includes("error")){
        mensaje+='<div class="alert alert-danger" role="alert"><h2 class="colorwhite">'+
                respuesta + '</h2></div><a href="/vercursos" role="button" class="btn btn-success"'
                +'>Volver</a>';
    }else{
        mensaje+='<div class="alert alert-success" role="alert"><h2 class="colorwhite">'+
                respuesta + '</h2></div><a href="/vercursos" role="button" class="btn btn-success"'
                +'>Volver</a>';                
    }

    return mensaje;
});

hbs.registerHelper('listarestudiantesporcurso',() => {
    let cursos = cursoController.list();

    //Creamos el collapse
    let mensaje = '';

    mensaje+='<div id="accordion">';;
    if(cursos!=null){
        let ariaExpanded = false;
        for (let i = 0; i < cursos.length; i++){
            let curso = cursos[i];
            //Buscamos por cada curso, su lista de estudiantes
            mensaje+='<div class="card">';
            mensaje+='<div class="card-header" id="heading'+ curso.id + '">';
            mensaje+='<h5 class="mb-0">';
            mensaje+='<button class="btn btn-link" data-toggle="collapse" data-target="#collapse' + curso.id + '" aria-expanded="' + (ariaExpanded ? 'false' : 'true') + '" aria-controls="collapse' + curso.id + '">';
            mensaje+='Alumnos inscritos en el curso ' + curso.nombre + ' con id ' + curso.id + '';
            mensaje+='</button>';
            mensaje+='</h5>';
            mensaje+='</div>';

            

            mensaje+='<div id="collapse' + curso.id + '" class="collapse' + (ariaExpanded ? ' show' : '') +'" aria-labelledby="heading'+ curso.id + '" data-parent="#accordion">';
            mensaje+='<div class="card-body">';
            ariaExpanded = true;
            mensaje+='<div class="table-responsive"><table class="table align-items-center">'+
            '<thead class="thead-light"><tr><th scope="col">Documento</th>'+
            '<th scope="col">Nombre</th><th scope="col">Correo</th>'+
            '<th scope="col">Teléfono</th><th scope="col">Eliminar</th></tr></thead><tbody>';

            //Obtenemos la lista de estudiantes por cada curso

            let alumnos = inscripcionController.obtenerAlumnosPorCurso(curso.id);

            if(alumnos!=null){
                alumnos.forEach(alumno =>{
                    mensaje = mensaje + 
                    "<tr><th scope='row'>" + alumno.cedula + '</th>' +
                    "<td>" + alumno.nombre + '</td>' +
                    "<td>" + alumno.correo + '</td>' +
                    "<td>" + alumno.telefono + '</td>' +
                    '<td>'+
                    '<a class="btn btn-danger btn-sm colorwhite" '+
                    'href="/eliminarestudiantecurso?cedula=' + alumno.cedula + '&idcurso='+ curso.id + '" '+
                    'data-toggle="tooltip" data-placement="top" title="Eliminar alumno del curso"'+
                    '><i class="ni ni-fat-remove"></i></a>'+
                    '</td></tr>';
                });
            }

            mensaje+='</tbody></table></div>';

            mensaje+='</div>';
            mensaje+='</div>';

            mensaje+='</div>';

            //Creamos el contenido por cada curso
            
    
        };
    }
    mensaje+='</div>';
    return mensaje;
});

hbs.registerHelper('eliminarestudiantecurso',(cedula,idCurso) => {
    let respuesta = inscripcionController.deleteEstudent(cedula,idCurso);

    let mensaje = '';

    if(respuesta.toLowerCase().includes("error")){
        mensaje+='<div class="alert alert-danger" role="alert"><h2 class="colorwhite">'+
                respuesta + '</h2></div><a href="/verinscritos" role="button" class="btn btn-success"'
                +'>Volver</a>';
    }else{
        mensaje+='<div class="alert alert-success" role="alert"><h2 class="colorwhite">'+
                respuesta + '</h2></div><a href="/verinscritos" role="button" class="btn btn-success"'
                +'>Volver</a>';                
    }

    return mensaje;
});