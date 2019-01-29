var mongoose = require('mongoose');
var Price = mongoose.model('Price');

function Price(priceObj){
  this.sku = priceObj.sku;
  this.name = priceObj.name;
  this.sale_price = priceObj.sale_price;
  this.price = priceObj.price;
}

Price.prototype.save = function (callback){

}

// Price.get = 

exports.price.index = function ( req, res, next ){

  new Price({
    sku: 'B2002',
    name: 'Bundle',
    sale_price: '299',
    price: '399'      
  }).save(function(err, price, count){
    console.log(price);
  })

  // Price.
  //   find({ sku : 'B2002' })
  //   // sort( '-updated_at' ). // {updated_at: -1} descending
  //   .exec( function ( err, price ){
  //     if( err ) return next( err );

  //     console.log(price);
  //     // res.render( 'index', {
  //     //     title : 'Express Todo Example',
  //     //     price : price
  //     // });
  //   });
};

// exports.create = function ( req, res ){
//   new Price({
//     content    : req.body.content,
//     updated_at : Date.now()
//   }).save( function( err, todo, count ){
//     res.redirect( '/' );
//   });
// };