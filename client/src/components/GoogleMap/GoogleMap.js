import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import HouseIcon from "./HouseDollarThree.png";

import { getGeocode } from '../../utils/Helpers';


const style = {
    height: '100%;',
    width: '100%',
  }

class GoogleMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      lat: undefined,
      lng: undefined,
    };

    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  componentDidMount()
  {
    console.log({location: this.props.markers[0].event[0].location})
    getGeocode(this.props.markers[0].event[0].location)
      .then(res => {
          const { lat, lng } = res;

          this.setState({
            lat,
            lng
          });
      })
      .catch(err => console.log(err))
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

    // onMapClicked = (props) => {
    //   if (this.state.showingInfoWindow) {
    //     this.setState({
    //       showingInfoWindow: false,
    //       activeMarker: null
    //     })
    //   }
    // };

    /*
    // Use this and a DirectionsRoute object to center the map on a route
    map.setCenter(route.bounds.getCenter());
    */
  
    render() {
      let returnThis;

      returnThis = this.state.lat ? (
        <Map 
          style = {style}
          initialCenter = {this.state.lat ? {lat: this.state.lat, lng: this.state.lng} : {}}
          google={this.props.google} 
          zoom={14}>
   
          {this.props.markers.map((m, i) => {
            console.log(m, i);
            return (
              <Marker key={`marker-${i}`} onClick={this.onMarkerClick}
                title={m.address}
                position={{lat: m.lat, lng: m.lng}}
                icon={{
                  url: HouseIcon,
                  anchor: new this.props.google.maps.Point(32,32),
                  scaledSize: new this.props.google.maps.Size(80,80)
                }}
              />
            )
          })
          }
   
          <InfoWindow 
          // here is where I'm getting an error. I need to feed this componenet props.
            marker={this.state.activeMarker}
            onClose={this.onInfoWindowClose}
            onOpen={this.windowHasOpened}
            visible={this.state.showingInfoWindow}>
            >
            
            <div>
              <h3>{this.state.selectedPlace.title}</h3>
            </div>
          </InfoWindow>
        </Map>    
      ) : 
      (
        <div>Map is loading...</div>
      )

      return returnThis;
    }
  }
  
  export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_API_KEY),
    // distanceapiKey: (process.env.DISTANCE_APP_GOOGLE_API_KEY)
  })(GoogleMap)
  