import React, { Component } from "react";
import { MapAPI, SelectList, Buttons } from "./components";
import mapboxgl from "mapbox-gl";
import "./sass/App.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYW1pbmVhYmRlbGxpIiwiYSI6ImNranU1ZWZzczJ6bjcyem1qZ25zb3UxbjYifQ.hbedsblNSZl7EnltQgLLkQ";
let fetchedCountry = null; //Bonne ou mauvaise pratique?
export default class App extends Component {
  state = {
    data: {},
    dataPC: {},
    loading: true,
    selectedCountry: "France",
    countryData: null,
  };

  async componentDidMount() {
    // Fetch APIs premier rendu
    const urlCountry = "https://covid19.mathdro.id/api/countries";
    const urlDetail = `https://covid19.mathdro.id/api/countries/${this.state.selectedCountry}/confirmed`;
    fetchedCountry = await axios.get(urlCountry);
    const fetchedDetail = await axios.get(urlDetail);
    console.log(fetchedCountry.data.countries);

    this.setState({
      // Nouvelles valeurs du state

      countryData: fetchedDetail,
      loading: false,
    });
  }

  onCountryChange = async (country) => {
    // fetch APIs aprés que l'utilisateur ai sélectionné un pays dans la liste
    const urlDetail = `https://covid19.mathdro.id/api/countries/${country}/confirmed`;
    const fetchedDetail = await axios.get(urlDetail);

    console.log("received prop children " + country);
    this.setState({ selectedCountry: country, countryData: fetchedDetail });
  };
  render() {
    // Chargement de la page en attendant le fetch
    if (this.state.loading) {
      return (
        <div className="loadingContent">
          <p className="loadingMessage">Chargement en cours ...</p>
        </div>
      );
    }

    return (
      <div>
        {/* Carte */}
        <MapAPI
          dataTargeted={this.state.countryData.data}
          loading={this.state.loading}
        />
        {/* Liste de pays */}
        <SelectList
          countriesList={fetchedCountry.data.countries}
          onCountryChange={this.onCountryChange}
        />
      </div>
    );
  }
}

// Componentdidmount
// const url = "https://covid19.mathdro.id/api";
// const urlPerCountry = "https://covid19.mathdro.id/api/confirmed";
// const urlTimeCountry = `https://covid19.mathdro.id/api/daily/${date}`;
