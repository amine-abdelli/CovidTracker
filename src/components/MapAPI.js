import React, { Component, Fragment } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Button } from "antd";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYW1pbmVhYmRlbGxpIiwiYSI6ImNranU1ZWZzczJ6bjcyem1qZ25zb3UxbjYifQ.hbedsblNSZl7EnltQgLLkQ";

let map, markers;

export default class MapAPI extends Component {
  state = {
    lng: 2.3863,
    lat: 47.261,
    zoom: 4.5,
  };

  componentDidMount() {
    // const confirmed = confirmedCases.default;

    map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/amineabdelli/ckjuc8dph019219o4mu8r4lth",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });

    map.on("move", () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });

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

  componentDidUpdate() {
    markers.forEach((marker) => marker.remove());
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

    map.on("move", () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });
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

        <Button onClick={this.handleClick} block>
          Default
        </Button>
      </Fragment>
    );
  }
}
