'use strict';
const Estudiante=require('../models/estudiante');
const controller={
    datosestudiante:(req,res)=>{
        console.log("Soy el controlador mas chimbita");
        return res.status(200).send({
            nombre:'Hua jie',
            apellido:'Zhen ma'
        })
    },
    test:(req,res)=>{
        console.log("Desde el test");
        return res.status(200).send({
            message:'I am working nice :)'
        })
    },
    save:(req,res)=>{
        /*
        1. Recoger los parametros
        2. Se validan los parametros
        3. Se crea el objeto
        4. Se guarda el objeto
        5. Devolver una respuesta
        */
       const {nombre,apellido}=req.body;
       const estudiante=new Estudiante;
       estudiante.nombre=nombre;
       estudiante.apellido=apellido;
       try{
            if(nombre.length>0 && apellido.length>0){
                estudiante.save((err,estudiante)=>{
                    if(err || !estudiante){
                        return res.status(500).send({
                            status:'error',
                            message:'Not inserted'
                        })
                    }
                    else{
                        return res.status(200).send({
                            status:'ok',
                            estudiante
                        })
                    }
                })
            }
       }
       catch(err){
            return res.status(500).send({
                message:'Paila',
                status:'error'
            })
       }
       
    },
    get_estudiantes:(req,res)=>{
        Estudiante.find({}).sort('nombre').exec((err,estudiantes)=>{
            if(err){
                return res.status(500).send({
                    status:'error',
                    message:'Error al buscar'
                })
            }
            return res.status(200).send({
                status:'success',
                estudiantes
            })
        })
    }
}
module.exports=controller;