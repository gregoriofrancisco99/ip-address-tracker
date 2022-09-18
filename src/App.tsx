import { MapContainer, TileLayer } from 'react-leaflet';
import { FormEvent } from 'react';
import { useState } from 'react';
import { PopUpButton } from './components/PopUpButton';


import '../src/styles/app.scss'
import 'leaflet/dist/leaflet.css';

import arrowIcon from '../src/assets/images/icon-arrow.svg';
import copyIcon from '../src/assets/images/copy.svg';

export type IPInfoType = {
  ip: string,
  isp:string,
  location: {
    country: string,
    region: string,
    timezone: string
  }
}

export function App() {
  const [ipInfo, setIpInfo] = useState<IPInfoType>();
  const [IP, setIP] = useState('');
  
  async function AskAPI(form:FormEvent) {
    form.preventDefault();
    
    const url = `https://geo.ipify.org/api/v2/country?apiKey=at_m846Jgs38FaHLrJ0dwiFhMtwP1S6S&ipAddress=${IP}`
    
    await fetch(url)
    .then((res) => {
      const result = res.json();
      result.then(result => {
        setIpInfo(result);
        console.log(result);
        setIP('');
      });
    }, (error) => {
      console.log(error);
    });
  }
  
  


  return (
    <div className='app'>
      <header>
        <h1>
          IP Address Tracker
        </h1>
        <form onSubmit={AskAPI}>
          <input 
            placeholder="Search for any IP address or domain" 
            onChange={(newIpValue) => {setIP(newIpValue.target.value);}}
            value={IP}
          />  
          <button type="submit">
            <img src={arrowIcon} alt="" />
          </button>
        </form>
        <div className="table">
          <div className="column first">
            <PopUpButton icon={copyIcon} text={'IP'} IPAddress={IP} ipInfo={ipInfo} />            
            <h3>IP Address</h3>
            <span>
              <strong>{ (ipInfo?.ip) ? ipInfo?.ip : '----'}</strong>
            </span>
          </div>
          <div className="column second">
          <PopUpButton icon={copyIcon} text="Location" IPAddress={IP} ipInfo={ipInfo}/> 
            <h3>Location</h3>
            <span>
              <strong>{ (ipInfo?.location?.region || ipInfo?.location?.country) ? `${ipInfo?.location?.region}, ${ipInfo?.location?.country} `: '----'}</strong>
            </span>
          </div>
          <div className="column three">
          <PopUpButton icon={copyIcon} text="Time Zone" IPAddress={IP} ipInfo={ipInfo}/> 
            <h3>TimeZone</h3>
            <span>
              <strong>{ (ipInfo?.location?.timezone) ? ipInfo?.location?.timezone : '----'}</strong>
            </span>
          </div>
          <div className="column four">
          <PopUpButton icon={copyIcon} text="ISP" IPAddress={IP} ipInfo={ipInfo}/> 
            <h3>ISP</h3>
            <span>
              <strong>{ (ipInfo?.isp) ? ipInfo?.isp : '----'}</strong>
            </span>
          </div>
        </div>
      </header>
      <main>
        <MapContainer 
          center={[-12.3592333, 13.5964385]}
          zoom={20}
          scrollWheelZoom={false}
          style={{width: '100%', height: '100%'}}
        > 
          {/*url=`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`*/}
          <TileLayer
            url= {'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'}
          />
        </MapContainer>

      </main>
    </div>
  );
}