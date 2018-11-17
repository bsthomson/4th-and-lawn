import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import HouseIcon from "./HouseDollarThree.png";


const style = {
    height: '100%;',
    width: '100%',
  }

class GoogleMap extends Component {
  constructor(props) {
    super(props);

    console.log("Google Map Init")

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };

    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  onMarkerClick(props, marker, e) {
    console.log(props);

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
  
    render() {
      console.log('GooleMap props',   this.props)
      const eventCoords = this.props.markers[0].event[0].coords

      const initial = {lat: eventCoords.lat, lng: eventCoords.lng}
      let markers = this.props.markers
      return (
        
        <Map 
          style = {style}
          initialCenter = {initial}
          google={this.props.google} 
          zoom={14}>
   
          {markers.map((m, i) => {
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
      );
    }
  }
  
  export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_API_KEY),
    // distanceapiKey: (process.env.DISTANCE_APP_GOOGLE_API_KEY)
  })(GoogleMap)
  