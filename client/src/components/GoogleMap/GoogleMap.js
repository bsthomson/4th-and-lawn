import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const style = {
    height: '450px',
    width: '65%',
    'marginTop': '10px',
    'marginLeft': "30px",
    'borderStyle': 'solid',
    'borderColor': '808080',
    'borderWidth': '1px'
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
   
          {this.props.markers.map((m,i)=>{
            console.log(m, i);
return (

                <Marker key={`marker-${i}`} onClick={this.onMarkerClick}
                      title={m.name}
                      position = {m} 

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
  