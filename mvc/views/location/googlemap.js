import { Loader } from "@googlemaps/js-api-loader"

// [START maps_programmatic_load]
let map;
const additionalOptions = {};
// [START maps_programmatic_load_promise]
const loader = new Loader({
  apiKey: "AIzaSyAFN7pm1QA20ojk8CA2tQnXzOHB1ryRGtM",
  version: "weekly",
  additionalOptions,
});

var markers = [
  {
    coordinates: { lat: 38.7766642, lng: -90.79698789999999},
    icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    content: '<h1>My Location</h1>'
  },

];

function addMarker(prop){
  var marker = new google.maps.Marker({
    position: prop.coordinates,
    map: map,
    draggable:true,
    title:"Drag me!"
  });

  if(prop.icon){
    marker.setIcon(prop.icon);
  }

  /* if(prop.content){
    alert('hi3')
    var infoWindow = new google.map.infoWindow({
      content: prop.content
    });
    alert('hi4')
    marker.addListener('click', function(){
      infoWindow.open(map, marker);
    }); 
  } */
}

loader.load().then(() => {
  console.log('loading map.............')
  const cordinates = { lat: 32.7766642, lng: -96.79698789999999}
  map = new google.maps.Map(document.getElementById("googlemap"), {
    center: cordinates,
    zoom: 8,
  });

  markers.map(addMarker);

}).catch( (e) => {console.log(e)});
// [END maps_programmatic_load_promise]
// [END maps_programmatic_load]
