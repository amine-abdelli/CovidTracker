import React, { Component, Fragment } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as countryz from "../country.json";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYW1pbmVhYmRlbGxpIiwiYSI6ImNranU1ZWZzczJ6bjcyem1qZ25zb3UxbjYifQ.hbedsblNSZl7EnltQgLLkQ";

let centroid;
let map, markers; // Bonne pratique ou non??????
export default class Map extends Component {
  state = {
    lng: 2.3863,
    lat: 47.161,
    zoom: 4,
    loading: true,
  };

  componentDidMount() {
    // Création de la carte
    map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/amineabdelli/ckjuc8dph019219o4mu8r4lth",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });
    // Focus de la carte par défault
    // map.on("move", () => {
    //   console.log("MAP.ON MOVE");
    //   this.setState({
    //     lng: map.getCenter().lng.toFixed(4),
    //     lat: map.getCenter().lat.toFixed(4),
    //     zoom: map.getZoom().toFixed(2),
    //   });
    // });

    // Ajout des marqueurs par défaut au premier rendu
    markers = Object.entries(this.props.dataTargeted).map(
      ([key, value], index) => {
        return new mapboxgl.Marker({
          color: "#FFFFFF",
          draggable: false,
        })
          .setLngLat([value.long, value.lat])
          .addTo(map);
      }
    );
  }

  componentDidUpdate(/*prevProps, prevState, snapshot*/) {
    // Suppresion anciens marqueurs
    markers.forEach((marker) => marker.remove());

    // Ajout des nouveaux marqueurs // Marqueurs OK
    markers = Object.entries(this.props.dataTargeted).map(([key, value]) => {
      centroid = value;
      return new mapboxgl.Marker({
        color: "#FFFFFF",
        draggable: false,
      })
        .setLngLat([value.long, value.lat])
        .addTo(map);
    });
    // fetch de country.json
    Object.entries(countryz.default).map(([key, count]) => {
      if (count.name === centroid.countryRegion) {
        map.flyTo({
          center: [count.long, count.lat],
          zoom: 4,
          essential: true,
        });
      }
    });
  }

  render() {
    return (
      <Fragment>
        {/*  {this.myMap} */}
        <div className="mapContainer" ref={(el) => (this.mapContainer = el)} />
      </Fragment>
    );
  }
}
