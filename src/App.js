import React, { Component } from "react";
import MapAPI from "./components/MapAPI";
import mapboxgl from "mapbox-gl";
import "./sass/App.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import { SelectList } from "./components/SelectList";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYW1pbmVhYmRlbGxpIiwiYSI6ImNranU1ZWZzczJ6bjcyem1qZ25zb3UxbjYifQ.hbedsblNSZl7EnltQgLLkQ";

export default class App extends Component {
  state = {
    data: {},
    dataPC: {},
    loading: true,
    selectedCountry: "Spain",
    countryData: null,
  };

  async componentDidMount() {
    // const url = "https://covid19.mathdro.id/api";
    // const urlPerCountry = "https://covid19.mathdro.id/api/confirmed";
    // const urlTimeCountry = `https://covid19.mathdro.id/api/daily/${date}`;
    const urlDetail = `https://covid19.mathdro.id/api/countries/${this.state.selectedCountry}/confirmed`;

    const fetchedDetail = await axios.get(urlDetail);
    console.log(fetchedDetail);
    this.setState({
      // data: fetchedData,
      // dataPC: fetchedDataPC,
      countryData: fetchedDetail,
      loading: false,
    });
  }

  onCountryChange = async (country) => {
    const urlDetail = `https://covid19.mathdro.id/api/countries/${country}/confirmed`;
    const fetchedDetail = await axios.get(urlDetail);

    console.log("received prop children " + country);
    this.setState({ selectedCountry: country, countryData: fetchedDetail });
  };
  render() {
    // Loading Page
    if (this.state.loading) {
      return (
        <div className="loadingContent">
          <p className="loadingMessage">Chargement en cours ...</p>
        </div>
      );
    }

    return (
      <div>
        <MapAPI
          dataTargeted={this.state.countryData.data}
          loading={this.state.loading}
        />
        <SelectList onCountryChange={this.onCountryChange} />
      </div>
    );
  }
}
