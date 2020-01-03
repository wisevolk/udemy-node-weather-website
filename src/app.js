const express = require('express');
const app = express();

app.get('', (req,res) => {
    res.send('<h1>Weather</h1>');
});

app.get('/help', (req,res)=>{
   res.send({
       name: 'Wise',
       age: '49'
   });
});

app.get('/about', (req,res)=>{
   res.send('<h1>About</h1>');
});

app.get('/weather', (req,res)=>{
    res.send({
        forecast: {
            temperature: '11',
            precipProbability: '0'
        },
        location: {
            city: 'Paris',
            country: 'France'
        }
    });
})

 app.listen(3000,()=>{
     console.log('Server is on port 3000'   );
 });


