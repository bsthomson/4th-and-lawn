import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const style = {
    height: '40rem',
    width: '90%',
  }

class GoogleMap extends Component {
    

    render() {
      return (
        
        <Map 
          style = {style}
          initialCenter = {{ lat: 38.9629 , lng: -95.2464 }}
          google={this.props.google} 
          zoom={17}>
   
          <Marker onClick={this.onMarkerClick}
                  name={'Current location'}
                  initialCenter = {{ lat: 38.9629 , lng: -95.2464 }} 
            />
   
          <InfoWindow onClose={this.onInfoWindowClose}>
          </InfoWindow>
        </Map>    
      );
    }
  }
  
  export default GoogleApiWrapper({
    apiKey: ('AIzaSyD657yqfrr4YzIO0dmHh__RQ_jvN3yqWMc')
  })(GoogleMap)
  