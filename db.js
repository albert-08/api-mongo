const {MongoClient} = require('mongodb')

let state = {
    db: null
}//aquí vamos a guardar el estado de la conexión

// module.exports = {
//     connect: function(){

//     }
// }

exports.connect = function(url, done){
    //url es la url de conexión
    //done --> done es un callback que va a ejecutar algo si todo sale bien
    if(state.db) return done()//si ya hay una conexión activa hacemos algo
    MongoClient.connect(url, function(err,db){
        if(err) return done(err)//si algo salio mal ejecutamos algo y mostramos el error
        state.db = db//guardo el estado de la conexión en el state
        done()//ejecuto algo
    })
}

exports.get = function(){//esta función regresa la conexión a la DB
    return state.db
}

exports.close = function(done){
    if(state.db){//si hay una conexión hay que terminarla
        state.db.close(function(err,result){//terminó la conexión
            state.db = null//al terminar la conexión borro el estado que tenia 
            done(err)//ejecuto algo si quiero terminar la conexión
        })
    }
}