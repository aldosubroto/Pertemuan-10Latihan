//memanggil framework 
const express  =  require("express");
const app = express();

//memanggil config
const db = require("./config/db");
const User = require("./models/user");

// membuat sebuah router 
app.get('/',(req,res)=> res.send("Respon nodejs berhasil"));


//menuliskan kode penting 
app.use(express.urlencoded({extended: true}));

// agar bisa di authentifikasi
db.authenticate().then(()=> console.log("berhasil terkoneksi dengan database"))

// memanggil user models
//const User = require("./models/user")

// membuat crud dan menambahkan async 
// menaruhkan async karena kita ada memakai await 
app.post("/crud", async (req,res)=>{
    try {
       const{username, email, password} = req.body;
       
       // membuat inisial user
       const newUser = new User({
           username, email, password
       })

       await newUser.save();

       //panggil respon json 
       res.json(newUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
})
// membuat alamat router get 
app.get("/crud", async (req,res)=>{
    try {
        const getAllUser = await User.findAll({})
        // membuat respon 
        res.json(getAllUser)

    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
})

//membuat router mengambil salah satu data dan munculkan di API 
app.get("/crud/:id", async (req,res)=>{
    try {
        const id = req.params.id

        const getUser = await User.findOne({
            where: {id:id}
        })

        res.json(getUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
})

//membuat router hapus data 
app.delete("/crud/:id", async (req,res)=>{
    try {
        const id = req.params.id;

        //membuat deklrasi delete
        const deleteUser = await User.destroy({
            where: {id:id}
        })
        await deleteUser;
        //ditampilkan res json 
        res.json("berhasil dihapus")
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
})

// membuat router update data 
app.put("/crud/:id", async (req,res)=>{
    try {
        //membuat dekstrutif object 
        const{username, email, password} = req.body
        const id = req.params.id

        const updateUser = await User.update({
            username, email, password
        }, {where: {id:id}})

        await updateUser;

        res.json("berhasil di update")

    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
})


// bisa diakses oleh postman
app.listen(8000,()=>{
    console.log('Server is running on port 8000');
})