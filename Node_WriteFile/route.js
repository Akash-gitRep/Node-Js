const fs = require("fs");

const requestHandler=(req,res)=>{
const url = req.url;
const method = req.method;
if (url === "/") {
  res.write(
    "<html><head><title>welcome</title></head><body><h1>Enter your name</h1>"
  );
  res.write(
    '<form action="/message" method="POST" > <input type="text" name="username"/><button type="submit">send Data</button></form>'
  );
  res.write("</body></html>");
  return res.end();
}
if (url === "/sucess") {
  res.write("<html><head><title>sucess page </title></head>");
  res.write("<body><h1>sucess page is got </h1></body>");
  res.write("</html>");
  return res.end();
}
if (url === "/message" && method === "POST") {
  const datas = [];
  req.on("data", (chunk) => {
    datas.push(chunk);
  });
  req.on("end", () => {
    const parsedData = Buffer.concat(datas).toString();
    const message = parsedData.split("=")[1];
    fs.writeFileSync("message.txt", message);
  });
  res.statusCode = 302;
  res.setHeader("Location", "/sucess");
  return res.end();
}


}

module.exports=requestHandler