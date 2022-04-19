const  express= require('express')
const bodyparser= require('body-parser')
const https=require('https')
const {response} = require("express");
const app=express()
const port = 3000
app.use(express.static('/'))



app.use('/js',express.static(__dirname+'/js'))
app.use('/img',express.static(__dirname+'/img'))
app.use('/css',express.static(__dirname+'/css'))

app.use('/about', require('./routes/about'))
app.use('/contact', require('./routes/contact'))
app.use('/index', require('./routes/index'))
app.use('/portfolio', require('./routes/portfolio'))
app.use('/service', require('./routes/service'))
app.use('/single', require('./routes/single'))
app.use('/weather', require('./routes/weather'))

app.use(bodyparser.urlencoded({extended:true}))

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html')
})
app.post('/',((req, res) =>{
    let cityname=req.body.city
    let key="d134b1b82ccbb2a01099550a3393edb5"
    let url="https://api.openweathermap.org/data/2.5/weather?q=" +cityname + "&appid=" + key + "&units=metric&mode=json"
    https.get(url,function (response){
        response.on( 'data',data=>{
            // console.log(data)
            let a= JSON.parse(data)
            let temp= a.main.temp
            let cond= a.weather[0].description
            res.send("Weather in city:"+ cityname + "  "+cond+"  "+temp)
        })

    })

} ))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)

})



