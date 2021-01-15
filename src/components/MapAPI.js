import React, { Component, Fragment } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYW1pbmVhYmRlbGxpIiwiYSI6ImNranU1ZWZzczJ6bjcyem1qZ25zb3UxbjYifQ.hbedsblNSZl7EnltQgLLkQ";

let map, markers; // Bonne pratique ou non??????

export default class MapAPI extends Component {
  state = {
    lng: 2.3863,
    lat: 47.261,
    zoom: 4.5,
  };

  componentDidMount() {
    // const confirmed = confirmedCases.default;
    // Création de la carte
    map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/amineabdelli/ckjuc8dph019219o4mu8r4lth",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });
    // Focus de la carte par défault
    // map.on("move", () => {
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
    console.log("hello world");
  }

  componentDidUpdate() {
    // Suppresion anciens marqueurs
    markers.forEach((marker) => marker.remove());
    // Ajout des nouveaux marqueurs
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
    // Nouveau focus de la carte
    map.on("move", () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });
    console.log(Date.now());
  }

  render() {
    return (
      <Fragment>
        {this.myMap}
        <div className=".sideBar">
          Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom:{" "}
          {this.state.zoom}
        </div>
        <div>
          <div
            ref={(el) => (this.mapContainer = el)}
            className="mapContainer"
          />
        </div>
      </Fragment>
    );
  }
}
