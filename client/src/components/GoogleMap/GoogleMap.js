import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const style = {
    height: '40rem',
    width: '90%',
  }

class GoogleMap extends Component {
    

    render() {
      const initial = this.props.markers[0];
      return (
        
        <Map 
          style = {style}
          initialCenter = {initial}
          google={this.props.google} 
          zoom={16}>
   
          {this.props.markers.map((m, i) => {
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
    apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
  })(GoogleMap)
  