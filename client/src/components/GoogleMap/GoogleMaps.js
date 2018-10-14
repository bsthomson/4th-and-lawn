import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper, withGoogleMap} from 'google-maps-react';


export class MapContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeMarker: {},
      selectedPlace: {}
    }
    // binding this to event-handle functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    console.log(this.props.google);
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWIndow: false,
        activeMarker: null
      });
    }
  }

  render() {
      const style = {
        width: '50px',
        height: '75px',
        'marginLeft': 'auto',
        'marginRight': 'auto',
        position: 'absolute'
      }
      

    return (
      <Map 
        // googleMapURL = {'https://maps.googleapis.com/maps/api/js?key=AIzaSyD657yqfrr4YzIO0dmHh__RQ_jvN3yqWMc&callback=initMap.exp&libraries=geometry,drawing,places'}
        style = { style }
        google = { this.props.google }
        onClick = { this.onMapClick }
        zoom ={14}
        initialCenter = {{ lat: 38.9629, lng: 95.2464 }}
        >
        
        <Marker 
          onClick={ this.onMarkerClick }
          title = { 'Memorial Stadium Lawrence, Ks' }
          position = {{ lat: 38.9629, lng: 95.2464 }}
          name={ 'Memorial Stadium Lawrence, Ks' } 

        />

        <InfoWindow 
            onClose={this.onInfoWindowClose}
            market = { this.state.activeMarker }
            visible = { this.state.showingInfoWindow }
          >
            <div>
              {/* <h1>{this.state.parkingspots.address}</h1> */}
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyD657yqfrr4YzIO0dmHh__RQ_jvN3yqWMc')
})(MapContainer)