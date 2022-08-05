import { useEffect, useState } from "react"; 
import axios from "axios"; 
import Map, { Marker, Popup } from "react-map-gl";
import RoomIcon from '@mui/icons-material/Room';
import StarRateIcon from '@mui/icons-material/StarRate';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import "./Hero.scss"; 

const Hero = () => {
    // sample user 
    const currentUser = "peach"; 
    const [viewState, setViewState] = useState({
        // main coordinates for center view
        longitude: -58.403578,
        latitude: -34.608056,
        zoom: 11.5
    });
    const [showPopup] = useState(true); 
    const [pins, setPins] = useState([]); 
    const [currentPlaceId, setCurrentPlaceId] = useState(null); 
    const [newPlace, setNewPlace] = useState(null); 
    const [title, setTitle] = useState(null); 
    const [description, setDescription] = useState(null); 
    const [rating, setRating] = useState(null); 
    const [cost, setCost] = useState(null); 

    // useEffect to fetch data 
    useEffect(() => {
        const getPins = async () => {
            try {
                const response = await axios.get("/pins"); 
                setPins(response.data); 
            } catch(error) {
                console.log(error)
            }; 
        }; 
        getPins(); 
    // empty dependency; we want AXIOS to fire when refreshing page
    }, []);

    // handleMarkerClick
    const handleMarkerClick = (id, long, lat) => {
        setCurrentPlaceId(id); 
        setViewState({
            ...viewState, 
            longitude: long, 
            latitude: lat, 
        }); 
    }; 

    // handleAddClick 
    const handleAddClick = (e) => {
        const latitude = e.lngLat.lat; 
        const longitude = e.lngLat.lng; 
        setNewPlace({
            lat: latitude,
            lng: longitude, 
        }); 
    }; 

    // handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const newPin = {
            username: currentUser, 
            title, 
            description, 
            rating, 
            cost, 
            location: {
                coordinates: [newPlace.lng, newPlace.lat] 
            }
        };
        try {
            const response = await axios.post("/pins", newPin); 
            setPins([...pins, response.data]); 
            setNewPlace(null); 
        } catch(error) {
            console.log(error); 
        };
    }; 
    
    return (
        <div className="hero">
            <Map
                // controlled map (state)
                {...viewState} 
                onMove={evt => setViewState(evt.viewState)}
                style={{width: "100%", height: "100%"}}
                // mapStyle="mapbox://styles/mapbox/streets-v9"
                // custom map style
                mapStyle="mapbox://styles/danvebb/cl6frln64000414mrhya0xc3k"
                // mapbox token
                mapboxAccessToken={process.env.REACT_APP_MAPBOX}
                // double click to create a pin 
                onDblClick={handleAddClick}
                transition="300"
            >
                {pins.map((pin) => (
                    <div key={pin._id}>
                        <Marker 
                            longitude={pin.location.coordinates[0]} 
                            latitude={pin.location.coordinates[1]} 
                            anchor="bottom" 
                            offsetLeft={-viewState.zoom * 3.5}
                            offsetTop={-viewState.zoom * 7}
                            key={pin._id} 
                        >
                            <RoomIcon 
                                style={{ color: currentUser === pin.username ? "crimson" : "purple", fontSize: viewState.zoom * 4, cursor: "pointer" }}
                                onClick={() => handleMarkerClick(pin._id, pin.location.coordinates[0], pin.location.coordinates[1])}
                            />
                        </Marker>
                        {showPopup && pin._id === currentPlaceId && (
                            <Popup 
                                longitude={pin.location.coordinates[0]} 
                                latitude={pin.location.coordinates[1]}
                                anchor="top"
                                closeOnClick={false}
                                onClose={() => setCurrentPlaceId(null)}
                            >
                                <div className="card">
                                    <label>Place</label>
                                    <h4 className="place">{pin.title}</h4>
                                    <label>Description</label>
                                    <p className="description">{pin.description}</p>
                                    <label>Rating</label>
                                    <div className="icons">
                                        {Array(pin.rating).fill(<StarRateIcon className="star" />)}
                                    </div>
                                    <label>Cost</label>
                                    <div className="icons">
                                        {Array(pin.cost).fill(<AttachMoneyIcon className="dollar" />)}
                                    </div>
                                    <label>Info</label>
                                    <span className="username">Created by <b>{pin.username}</b></span>
                                </div>
                            </Popup> 
                        )}
                    </div>
                ))}
                {showPopup && newPlace && (
                    <Popup 
                        longitude={newPlace.lng} 
                        latitude={newPlace.lat}
                        anchor="top"
                        closeOnClick={false}
                        onClose={() => setNewPlace(null)}
                    >
                        <div>
                            <form onSubmit={handleSubmit}>
                                <label>Title</label>
                                <input 
                                    placeholder="Enter Title" 
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                                <label>Description</label>
                                <textarea 
                                    placeholder="Want To Share About This Steakhouse?"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <label>Rating</label>
                                <select onChange={(e) => setRating(e.target.value)}>
                                    <option default value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                <label>Cost</label>
                                <select onChange={(e) => setCost(e.target.value)}>
                                    <option default value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                <button className="submit-btn" type="submit">Add Pin</button>
                            </form>
                        </div>
                    </Popup>
                )}
            </Map>
        </div>
    )
}

export default Hero