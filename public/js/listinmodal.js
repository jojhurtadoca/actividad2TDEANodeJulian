$( document ).ready(function() {
    //Llenamos el select con los id de cursos
    let idc = '';
    if(typeof lista!=='undefined' && lista!=null){
        lista.forEach(curso => {
            idc += '<option value="' + curso. id + '">' + curso.id + ' - ' + curso.nombre
                + '</option>';
        });
    }
    
    $( "#idCurso" ).append(idc);

    //Capturamos el evento del botón de detalle para abrir el modal

    $( "#verDetalleCurso" ).click(function() {
        //Limpiamos los valores
        $( "#modalDetalleTitulo" ).empty();
        $( "#id" ).empty();
        $( "#nombre" ).empty();
        $( "#disponible" ).empty();
        $( "#valor" ).empty();
        $( "#modalidad" ).empty();
        $( "#descripcion" ).empty();
        $( "#intensidad" ).empty();

        //buscamos el curso que coincide con el valor seleccionado
        if(typeof lista!=='undefined' && lista!=null){
            let curso = lista.find(courseArray => courseArray.id == $( "#idCurso" ).val());

            if(typeof curso !== 'undefined'){
                $( "#modalDetalleTitulo" ).append('Curso: ' + curso.nombre);
                $( "#id" ).append(curso.id);
                $( "#nombre" ).append(curso.nombre);
                $( "#disponible" ).append(curso.disponible);
                $( "#valor" ).append(curso.valor);
                $( "#modalidad" ).append(curso.modalidad);
                $( "#descripcion" ).append(curso.descripcion);
                $( "#intensidad" ).append(curso.intensidad);
                $('#modalDetalle').modal('show');
            }
        }
        

    });
});
