import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import HouseIcon from "./HouseDollarThree.png";


const style = {
    height: '40rem',
    width: '90%',
  }

class GoogleMap extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) => {
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
      // console.log('GooleMap props',   this.props.markers)
      // const initial = this.props.markers[0];
      const initial = { lat: 38.964460, lng: -95.246237}
      let markers = this.props.markers
      return (
        
        <Map 
          style = {style}
          initialCenter = {initial}
          google={this.props.google} 
          zoom={16}>
   
          {markers.map((m, i) => {
            console.log(m, i);
            return (

              <Marker key={`marker-${i}`} onClick={this.onMarkerClick}
                title={m.address}
                position={m}
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
    apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
  })(GoogleMap)
  