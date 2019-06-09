const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');

//importamos el controlador de curso
const course = require('../actions/courseController');

require('./helpers');
 
const dirPublic = path.join(__dirname,'../public');
const partialsDir = path.join(__dirname,'../partials');

app.use(express.static(dirPublic));
hbs.registerPartials(partialsDir);
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine','hbs');

//Página de Inicio
app.get('/',(req,res)=>{
    res.render('index',{
        nombrePagina: 'Inicio'
    });
});

//Crear curso
app.get('/crear',(req,res)=>{
    res.render('crearcurso',{
        nombrePagina: 'Crear Curso'
    });
});

//Creamos el curso
app.post('/crear',(req,res)=>{
    res.render('crear',{
        nombrePagina: 'Cursos',
        id: parseInt(req.body.id),
        nombre: req.body.nombre,
        modalidad: req.body.modalidad,
        valor: parseInt(req.body.valor),
        descripcion: req.body.descripcion,
        intensidad: parseInt(req.body.intensidad)
    });
});
//Lista de cursos con detalle
app.get('/vercursos',(req,res)=>{
    res.render('listacursos',{
        nombrePagina: 'Lista de Cursos'
    });
});

//formulario para inscribir estudiante
app.get('/inscribir',(req,res)=>{
    res.render('inscribirestudiante',{
        nombrePagina: 'Inscribir'
    });
});

//Inscribimos al estudiante
app.post('/inscribirest',(req,res)=>{
    res.render('resultadoinscribir',{
        nombrePagina: 'Resultado de Inscripción',
        cedula: parseInt(req.body.cedula),
        nombre: req.body.nombre,
        correo: req.body.correo,
        telefono: parseInt(req.body.telefono),
        idCurso: parseInt(req.body.idCurso)
    });
});

//actualizar el estado del curso
app.get('/actualizarcurso',(req,res)=>{
    res.render('actualizar',{
        nombrePagina: 'Resultado de Actualización',
        idCurso: req.query.idCurso
    });
});

//lista de estudiantes por curso
app.get('/verinscritos',(req,res)=>{
    res.render('listainscritos',{
        nombrePagina: 'Lista de Alumnos inscritos por Curso'
    });
});

//Eliminar alumno del curso
app.get('/eliminarestudiantecurso',(req,res)=>{
    res.render('eliminarestudiante',{
        nombrePagina: 'Resultado',
        idCurso: req.query.idCurso,
        cedula: req.query.cedula
    });
});


app.post('/calculos',(req,res)=>{
    res.render('calculos',{
        estudiante: req.body.nombre,
        nota1: parseInt(req.body.nota1),
        nota2: parseInt(req.body.nota2),
        nota3: parseInt(req.body.nota3)
    });
});

// Handle 404
app.use(function(req, res) {
    res.status(400);
    res.render('404',{
        nombrePagina: 'Error'
    });
});

// Handle 500
app.use(function(error, req, res, next) {
    res.status(500);
    res.render('500', {
        nombrePagina: 'Error'
    });
  });

app.listen(3000, function(){
    console.log(path.join(__dirname , '../public/vendor/jquery/dist'));
    console.log("info",'Server is running at port : ' + 3000);
});