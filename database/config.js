const mongoose=require("mongoose");

const ConexionDB= async () => {
    try {
        //await para que espere la conexion
        await mongoose.connect(process.env.MONGO_CN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('CONEXION REALIZADA');
    } catch (error) {
        console.log(error);
        throw new Error('FALLO CONEXION');
    }
}

module.exports={
    ConexionDB
}