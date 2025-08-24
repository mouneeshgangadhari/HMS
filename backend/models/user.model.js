const mongoose=require("mongoose");
const bcrypt = require("bcryptjs");
const { trim } = require("zod");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 50
  },
  age: {
    type: Number,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    index: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 100,
    select: false // hide password by default in queries
  },
  role: {
    type: String,
    enum: ["Patient"],
    default: "Patient"
  },
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment"
    }
  ],
  refreshTokenHash: {
    type: String,
    select: false
  }
}, { timestamps: true });


UserSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password,10);
    next();
})

UserSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}   

UserSchema.methods.setRefreshToken=function(refreshToken){
    this.refreshTokenHash=bcrypt.hashSync(refreshToken,10);
}

UserSchema.methods.matchesRefreshToken=function(refreshToken){
    if(!this.refreshTokenHash) return false;
    return bcrypt.compareSync(refreshToken,this.refreshTokenHash);  
}


UserSchema.methods.toJSON=function(){
    const obj=this.toObject();
    delete obj.password;
    delete obj.refreshTokenHash;
    delete obj.__v;
    return obj;
}

module.exports=mongoose.model("User",UserSchema,"users");