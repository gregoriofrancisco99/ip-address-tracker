import { MapContainer, TileLayer } from 'react-leaflet';

import '../src/styles/app.scss'
import 'leaflet/dist/leaflet.css';

import arrowIcon from '../src/assets/images/icon-arrow.svg';

export function App() {
  return (
    <div className='app'>
      <header>
        <h1>
          IP Address Tracker
        </h1>
        <form>
          <input placeholder="192.168.1.1" />
          <button type="submit">
            <img src={arrowIcon} alt="" />
          </button>
        </form>
      </header>
      <main>
      <div className="table">
        <div className="column first">
            <h3>IP Address</h3>
            <span>
              <strong>192.212.174.101</strong>
            </span>
          </div>
          <div className="column second">
            <h3>Location</h3>
            <span>
              <strong>Brooklyn, NY <br /> 10001</strong>
            </span>
          </div>
          <div className="column three">
            <h3>TimeZone</h3>
            <span>
              <strong>UTC-05:00</strong>
            </span>
          </div>
          <div className="column four">
            <h3>ISP</h3>
            <span>
              <strong>SpaceX <br /> Starlink</strong>
            </span>
          </div>
        </div>
      
        <MapContainer 
          center={[-12.3592333, 13.5964385]}
          zoom={14.19}
          scrollWheelZoom={true}
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

