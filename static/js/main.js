$(document).ready(function() {

var osm_mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

var open_topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

var earthquake = new L.GeoJSON.AJAX("data/eq_davao.geojson", {
	style: function (feature) {
      var mag = feature.properties.MagnitudeRange;
    if (mag == '1 to <2' ) {
      return { color: "#F39A05" }; 
    } 
    else if (mag == '2 to <3') {
      return { color: "#E57505" };
    } 
    else if (mag == '3 to <4') {
      return { color: "#D34B08" };
    } 
    else if (mag == '4 to <5') {
      return { color: "#C2240B" };
    } 
    else {
      return { color: "#B70B0D" };
    }
  },
  onEachFeature: function (feature, layer) {
    layer.bindPopup('<b>Magnitude:</b> ' +feature.properties.Mag);
  },
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
        radius: 5});
  }
});



var basemaps = {
    "OSM Mapnik": osm_mapnik,
    "OpenTopoMap": open_topo,

}

var overlays = {
    "Earthquake": earthquake,
    
}

var map = L.map('map', {
    center: [6.87, 125.01],
    zoom: 10,
    layers: [osm_mapnik, earthquake]
});

L.control.layers(basemaps, overlays).addTo(map);

map.invalidateSize();
})
