var images = [
  "http://www.wsupress.wayne.edu/sites/default/files/27X23.3924.Merged.jpg",
  "http://www.trbimg.com/img-555a6588/turbine/la-trb-michigan-tour-explores-art-and-architecture-of-detroit-20150516",
  "http://www.6am-group.com/wp-content/uploads/2016/02/DetroitSkyline.jpg",
];

////////////////////////////////////////////////////////////////////////////


// Let's create graphemescope object inside the container

var container = $("#container");
var scope = new Graphemescope( container[0] );


var index = 0;
function changePicture() {
    scope.setImage(images[index]);
    index = (index + 1) % images.length;
};

setInterval(changePicture, 10000);
changePicture();


////////////////////////////////////////////////////////////////////////////

//Lets try to get co-ordinates from tracking of the color yellow and use it in place of the mouse move co-ordinates to play the kaleidoscope.


let colors = new tracking.ColorTracker(['yellow'])

colors.on('track', function(event) {
      if (event.data.length === 0) {
    // No colors were detected in this frame.
      } else {

        let factorx = 0;
        let factory = 0;

        event.data.forEach(function(rect) {
         //console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
         if (rect.color == "yellow"){

           var factorx = rect.x / $(window).width();
           var factory = rect.y / $(window).height();
                 // This will move kaleidoscope
           scope.angleTarget = factorx;
           scope.zoomTarget  = 1.0 + 0.5 * factory;

         }
       })
     }

       });

var resizeHandler = function() {
container.height( $(window).height() );
container.width( $(window).width() );
};

$(window).resize(resizeHandler);
$(window).resize();

container.click(changePicture);

tracking.track('#myCanvas', colors, {camera: true});





///////////////////////////////////////////////////////////////////////////

// //Moving the kaleidoscope with mouse hover
//
// var factorx = 0
// var factory = 0
//
// $(window).mousemove(function(event) {
//   var factorx = event.pageX / $(window).width();
//   var factory = event.pageY / $(window).height()
//
//   // This will move kaleidoscope
//   scope.angleTarget = factorx;
//   scope.zoomTarget  = 1.0 + 0.5 * factory;
// });
//
