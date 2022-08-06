import { useEffect, useState } from "react"; 
import Spinner from "../Spinner/Spinner";
import Map, { Marker, Popup } from "react-map-gl";
import RoomIcon from '@mui/icons-material/Room';
import StarRateIcon from '@mui/icons-material/StarRate';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useSelector, useDispatch } from "react-redux"; 
import { createPin, getPins, reset } from "../../redux/pins/pinSlice"; 
import "./Hero.scss"; 
import { toast } from "react-toastify";

const Hero = () => {
    const { user } = useSelector((state) => state.auth); 
    const { pins, isLoading, isError, message } = useSelector((state) => state.pins); 

    // useDispatch
    const dispatch = useDispatch(); 

    // useState
    const [viewState, setViewState] = useState({
        // main coordinates for center view
        longitude: -58.403578,
        latitude: -34.608056,
        zoom: 11.5
    });
    const [showPopup] = useState(true); 
    const [currentPlaceId, setCurrentPlaceId] = useState(null); 
    const [newPlace, setNewPlace] = useState(null); 
    const [formData, setFormData] = useState({
        title: "", 
        description: "", 
        rating: "", 
        cost: "", 
    });

    const { title, description, rating, cost } = formData; 

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState, 
            [e.target.name]: e.target.value
        })); 
    }; 

    // useEffect
    useEffect(() => {
        if(isError) {
            console.log(message); 
        }
        dispatch(getPins()); 
    }, [dispatch, isError, message]); 

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
        if(user) {
            const latitude = e.lngLat.lat; 
            const longitude = e.lngLat.lng; 
            setNewPlace({
                lat: latitude,
                lng: longitude, 
            }); 
        } else {
            toast("Please consider creating an account to add a new place."); 
        }; 
    }; 

    // handleSubmit (REDUX) 
    const handleSubmit = (e) => {
        e.preventDefault(); 
        const pinData = {
            username: user.username, 
            title,
            description, 
            rating, 
            cost, 
            location: {
                coordinates: [newPlace.lng, newPlace.lat] 
            }, 
        }; 
        console.log(pinData); 
        dispatch(createPin(pinData)); 
        dispatch(reset()); 
    }; 

    if(isLoading) {
        return <Spinner />
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
                {pins.map((pin, idx) => (
                    <div key={idx}>
                        <Marker 
                            longitude={pin.location.coordinates[0]} 
                            latitude={pin.location.coordinates[1]} 
                            anchor="bottom" 
                            offsetLeft={-viewState.zoom * 3.5}
                            offsetTop={-viewState.zoom * 7}
                        >
                            <RoomIcon 
                                style={{ color: "crimson", fontSize: viewState.zoom * 4, cursor: "pointer" }}
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
                                <label 
                                    htmlFor="title"
                                >Title</label>
                                <input 
                                    id="title"
                                    name="title"
                                    value={title}
                                    placeholder="Enter Title" 
                                    onChange={handleChange}
                                    required
                                />
                                <label 
                                    htmlFor="description"
                                >Description</label>
                                <textarea 
                                    id="description"
                                    name="description"
                                    value={description}
                                    placeholder="Want To Share About This Steakhouse?"
                                    onChange={handleChange}
                                />
                                <label 
                                    htmlFor="rating"
                                >Rating</label>
                                <select 
                                    id="rating"
                                    name="rating"
                                    value={rating}
                                    onChange={handleChange}
                                >
                                    <option defaultValue={"default"}>Choose an option</option>
                                    <option value={"1"}>1</option>
                                    <option value={"2"}>2</option>
                                    <option value={"3"}>3</option>
                                    <option value={"4"}>4</option>
                                    <option value={"5"}>5</option>
                                </select>
                                <label 
                                    htmlFor="cost"
                                >Cost</label>
                                <select 
                                    id="cost"
                                    name="cost"
                                    value={cost}
                                    onChange={handleChange}
                                >
                                    <option defaultValue={"default"}>Choose an option</option>
                                    <option value={"1"}>1</option>
                                    <option value={"2"}>2</option>
                                    <option value={"3"}>3</option>
                                    <option value={"4"}>4</option>
                                    <option value={"5"}>5</option>
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