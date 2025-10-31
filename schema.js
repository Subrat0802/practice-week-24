const mongoose = require("mongoose");


mongoose.connect("mongodb+srv://subrat:Coursify%40123@clustercoursify.fe5gsbt.mongodb.net/week24?retryWrites=true&w=majority")
.then(() => console.log("DB connected"))
.catch((err) => console.log("Error while connection db", err));

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true,
        trim:true
    },
    email: {
        type:String,
        required: true,
        trim:true
    },
    password: {
        type:String,
        required: true,
        trim:true
    }
})

const User = mongoose.model("User", userSchema);
module.exports = User