import React, { Component } from "react";
import { Map, SelectList } from "./components";
import mapboxgl from "mapbox-gl";
import "./sass/App.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import Chart from "./components/Chart";
import { Cards } from "./components/Cards";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYW1pbmVhYmRlbGxpIiwiYSI6ImNranU1ZWZzczJ6bjcyem1qZ25zb3UxbjYifQ.hbedsblNSZl7EnltQgLLkQ";
export default class App extends Component {
  state = {
    data: {},
    dataPC: {},
    loading: true,
    load2: true,
    listLoading: true,
    globalData: null,
    selectedCountry: "France",
    timeLine: null,
    countryData: null,
    countryList: {},
  };

  async componentDidMount() {
    // Fetch APIs premier rendu
    const timeLineUrl = `https://api.covid19api.com/country/${this.state.selectedCountry}`;
    const timeLine = await axios.get(timeLineUrl);

    const urlGlobal = "https://covid19.mathdro.id/api";
    const fetchedGlobal = await axios.get(urlGlobal);
    console.log(fetchedGlobal);

    const urlCountry = "https://covid19.mathdro.id/api/countries";
    const fetchedCountry = await axios.get(urlCountry);

    const urlDetail = `https://covid19.mathdro.id/api/countries/${this.state.selectedCountry}/confirmed`;
    const fetchedDetail = await axios.get(urlDetail);

    // Nouvelles valeurs du state
    this.setState({
      timeLine: timeLine,
      globalData: fetchedGlobal,
      countryList: fetchedCountry,
      countryData: fetchedDetail,
      loading: false,
    });
  }

  onCountryChange = async (country) => {
    // fetch APIs aprés que l'utilisateur ai sélectionné un pays dans la liste
    const urlDetail = `https://covid19.mathdro.id/api/countries/${country}/confirmed`;
    const fetchedDetail = await axios.get(urlDetail);

    const timeLineUrl = `https://api.covid19api.com/country/${country}`;
    const timeLine = await axios.get(timeLineUrl);

    console.log("received prop children " + country);
    this.setState({
      selectedCountry: country,
      countryData: fetchedDetail,
      timeLine,
      load2: false,
    });
  };
  render() {
    // TIMELINE
    console.log("TIMELINE", this.state.timeLine);
    // Globale
    console.log("GLOBAL DATA", this.state.globalData);
    // Long et Lat pour affichage des marqueurs + Graphiques
    console.log("COUNTRY DATA", this.state.countryData);

    // Chargement de la page en attendant le fetch
    if (this.state.loading) {
      return (
        <div className="loadingContent">
          <p className="loadingMessage">Chargement en cours ...</p>
        </div>
      );
    }

    return (
      <div className="main">
        <header>
          <div className="brand">
            <div className="logo">
              <img src={`${process.env.PUBLIC_URL}/img/Vector.svg`} alt="" />
            </div>
            <div className="covtr">
              <p>
                C<small>oronavirus</small>
              </p>
              <p className="tracker">tracker</p>
            </div>
          </div>

          {/* Liste de pays */}
          <SelectList
            className="selectList"
            loading={this.state.loading}
            countriesList={this.state.countryList.data.countries}
            onCountryChange={this.onCountryChange}
          />

          <div className="nav">
            <p>Monde</p>
            <p>Pays</p>
          </div>
        </header>
        {/* Carte */}
        <div className="mapWrapper">
          <Map
            dataTargeted={this.state.countryData.data}
            loading={this.state.loading}
            onCountryChange={this.onCountryChange}
          />
        </div>

        {/* Tuiles */}
        <Cards
          data={this.state.countryData.data}
          dataGb={this.state.globalData.data}
          selected={this.state.selectedCountry}
          timeLine={this.state.timeLine}
          loadgin={this.state.loading}
          load2={this.state.load2}
        />

        {/* Graphique */}
        <div className="chart">
          <Chart
            data={this.state.countryData.data}
            dataGb={this.state.globalData.data}
            selected={this.state.selectedCountry}
            timeLine={this.state.timeLine}
          />
        </div>
      </div>
    );
  }
}

// Componentdidmount
// const url = "https://covid19.mathdro.id/api";
// const urlPerCountry = "https://covid19.mathdro.id/api/confirmed";
// const urlTimeCountry = `https://covid19.mathdro.id/api/daily/${date}`;
