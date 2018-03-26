// Usage example with ExpressJS
const publicIp = require('public-ip');
var express = require('express'),
port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000,
host = process.env.OPENSHIFT_NODEJS_IP;

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static('./'));

// In your project, this would be require('node-gallery')
app.use('/gallery', require('../lib/gallery.js')({
  staticFiles : '../../ebay_c/imgs/',
  urlRoot : 'gallery',
  title : 'Scraped images',
  render : false // 
}), function(req, res, next){
  return res.render('gallery', { galleryHtml : req.html });
});

app.listen(port, host);
publicIp.v4().then(ip => {
	console.log('preview images at ' + ip  + ':' + port + '/gallery');
});