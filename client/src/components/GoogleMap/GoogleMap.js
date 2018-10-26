import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const style = {
    height: '40rem',
    width: '90%',
  }

class GoogleMap extends Component {
    

    render() {
      // console.log('GooleMap props',   this.props.markers)
      // const initial = this.props.markers[0];
      const initial = { lat: 38.9629, lng: -95.2464 }
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

              />
            )
          })
          }
   
          <InfoWindow onClose={this.onInfoWindowClose}>
          </InfoWindow>
        </Map>    
      );
    }
  }
  
  export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_API_KEY),
    // distanceapiKey: (process.env.DISTANCE_APP_GOOGLE_API_KEY)
  })(GoogleMap)
  