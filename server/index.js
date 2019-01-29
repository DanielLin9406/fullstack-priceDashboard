// mongoose setup
require( './schema/price' );

var express = require( 'express' );
// var routes  = require( './routes/price' );
var http    = require( 'http' );
var path    = require( 'path' );
var app     = express();

// all environments
app.set('port', process.env.PORT || 3001);
// app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
// app.use(express.methodOverride());
// app.use(app.router);
// app.use(express.static(path.join( __dirname, 'public')));
 
// development only
if ('development' == app.get('env')){
  // app.use(express.errorHandler());
}

app.use(express.static('client/build'));
app.use('/static', express.static(path.resolve(__dirname, '../client/build/static')))
// app.get('/', routes.price.index);
app.get('/', function(req, res){
  res.sendFile(path.resolve(__dirname, '../client/build/index.html'))
});

http.createServer( app ).listen( app.get( 'port' ), function(){
  console.log( 'Express server listening on port ' + app.get( 'port' ));
} );