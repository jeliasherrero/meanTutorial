var express = require('express'),
    bodyParser = require('body-parser'),
    http = require('http'),
    fs = require('fs'),
    cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');


app.set('port', process.env.PORT || 3000);

app.get('/', function(request, response) {
   fs.readFile('../../IoT/direct/photo/image.jpg', function(err,data) {
     if (err) throw err;
     response.type('image/jpg').send(data);
   });
});

app.get('/users/:userName', function(request, response) {
   var name = request.params.userName;
   response.send('Hola, ' + name + '!');
});

app.post('/users', function(request, response) {
   var username = request.body.username;
   response.send('Hola, ' + username + '!');
});

app.get(/\/personal\/(\d*)\/?(edit)?/, function(request,response) {
   var message = 'el perfil del empleado #' + request.params[0];
   if (request.params[1] === 'edit') {
      message = 'Editando ' + message;
   } else {
      message = 'Viendo ' + message;
   }
   response.send(message);
});

app.get('/name/:name', function(req, res) {
  res.cookie('name', 'oscar', { expires: new Date(Date.now() + 900000) } )
     .send('<p>Vea el valor de la cookie <a href="/name">aquí</a></p>');
});

app.get('/name', function(req, res) {
   res.send(req.cookies.name);
});

http.createServer(app).listen(app.get('port'), function(){
   console.log('Express está escuchando en el puerto ' + app.get('port'));
});
