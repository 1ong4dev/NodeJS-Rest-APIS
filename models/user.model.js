const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 
const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    gender:{
       type: String,
        enum: ["male", "famale","other"],
        default: "male"
    }
});

UserSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
})

module.exports = mongoose.model('User', UserSchema);