const app= require("./index")
require('dotenv').config()
const port=process.env.PORT || 4000
const Moralis = require("moralis").default;
const MORALIS_API_KEY=process.env.MORALIS_API_KEY;
 const DB=require("./config/db.js")

const runApp = async () => {
  await Moralis.start({
    apiKey:MORALIS_API_KEY
}).then(async()=>{
    const streamId = await Moralis.Streams.getAll({
        limit: 10,
      });
      let x = streamId.jsonResponse.result[0];
      if(!x.id){
        const response = await Moralis.Streams.add({
            webhookUrl: "http://13.60.18.111:4000/moralis/moralis-webhook", // replace with your own webhook URL
            description: "My first stream",
            tag: "my_stream",
            chains: ["0x1"],
            includeNativeTxs: true,
        }).then(()=>{
            // console.log(response.toJSON().id); 
            app.listen(port, function(){
                console.log('listening on port '+ port)
                })
        })
        console.log(response.toJSON().id)
      }else{
        app.listen(port, async function(){
            await DB()
            console.log('listening on port '+ port)
            })
      }
   
    
})

 
};

runApp();


