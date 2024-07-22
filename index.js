import express from "express"
import bodyParser from "body-parser"
import fs from "fs"
import qr from "qr-image"
import { dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.get("/", (req,res)=>{
    res.render("index.ejs")
})

app.post("/genarate",(req,res)=>{

   var text = req.body["link"];
    console.log(text);
   var qr_img = qr.image(text, { type: 'png' });
   var qrimgePath = __dirname + "/public/qr.png";
   qr_img.pipe(fs.createWriteStream(qrimgePath));

   console.log(qrimgePath);
   qr_img.on('end', () => {res.render("output.ejs", { qrPath: "/qr.png" });});
   
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
