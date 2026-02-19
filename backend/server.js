const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config()

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

//MongoDB Connection
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.error("MongoDB Connection Error",err));

app.get("/",(req,res)=>{
    res.send("Bookmark Manager API is running...");
});

app.listen(PORT,()=>console.log(`server running on port ${PORT}`));

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const bookmarkRoutes = require("./routes/bookmarkRoutes");
app.use("/api/bookmarks", bookmarkRoutes);