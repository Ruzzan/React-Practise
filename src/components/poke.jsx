import React, {useState, useEffect} from 'react'
import Navbar from './snippets/navbar'
import image from '../assets/img.png';
import axios from 'axios';

document.title = "API";

let sectionStyle = {
    backgroundImage:`url(${image})`,
    backgroundSize:"cover",
    backgroundPosition:"0,100%",
    backgroundRepeat:"no-repeat"
}

// greet combonent 
const Greet = (props) => {
    return (
        <h3 className="text-center text-white bg-secondary p-1 mt-5">{props.message}</h3>
    )
}

// card component to be displayed
const Card = (props) => {
    const moves = props.moves;
    return <div className="card mx-auto mt-5" style={{width:"15em"}}>
        <img className="card-img" src={props.image} alt={props.name} style={{width:"100%",height:"12em"}} />
        <div className="card-body">
         <p className="lead text-capitalize my-1"> {props.name} 
         {moves > 69 ? <span id="lit">🔥</span> : ''}
         </p>
         <span className="badge bg-primary badge-pill"> {props.height} ft </span>
         <span className="badge bg-success badge-pill mx-2"> {props.weight} lbs </span>
         <br />
         <span className="badge bg-danger badge-pill mt-2"> {props.moves} Moves </span>
        </div>
    </div>
}

const Poke = () => {
    // state declaration
    const [id, setId] = useState(0);
    const [pokedata, setPokeData] = useState({});
    const [loading, setLoading] = useState(false);
    
    // fetch api
    async function fetchPoke() {
        try {
            if(id !== 0) {
             setLoading(true);
             let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
             // update pokeData state
             setPokeData({
                 "name":response.data.name,
                 "image":response.data.sprites['front_default'],
                 "moves":response.data.moves.length,
                 "height":response.data.height,
                 "weight":response.data.weight,
             })
             // set loading to false
             setLoading(false);
             }
            }
        catch(err) {
            <Greet message="Error Occoured" />
        }
    } 

    // useEffect (call api when pokemon id is changed.)
    useEffect(()=>{
        fetchPoke()
    }, [id]);

    // function to make custom options
    const makeOptions = number => {
        let options = [];
        for(let i=1;i<=number;i++) {
            options.push(<option value={i} key={i}>{i}</option>);
        }
        return options;
    }

    // set pokemon id to random number
    const getRandomId = () => {
        setId(Math.floor(Math.random() * 100));
    }

    // set pokemon id to previous state + 1
    const getNext = () => {
        setId(previous => parseInt(previous)+1);
    }

    // set pokemon id to previous state - 1
    const getPrevious = () => {
        setId((previous) => {
            if(previous !== 1 || previous > 1) {
                return parseInt(previous)-1;
            }
            return 1;
        });
    }

    return (
        <section style={sectionStyle}>
        <Navbar />
        <div className="container mt-5">
        <div className="row">
        <div className="col-md-6 mx-auto">
    {/*value = id state onchange = set id state to current selected value */}
        <select value={id} className="form-select shadow-none"
        onChange={(event)=>{setId(event.target.value)}}>
        {makeOptions(100)} 
        </select>
         {/*if loading greet else show card and buttons*/}
        {
            loading ?
            <Greet message="Loading" /> :
            Object.keys(pokedata).length === 0 ?
            <Greet message="Select To Fetch Pokemons" />
            :
            <div>
             {/*assign props with state values of pokeData */}
            <Card name={pokedata['name']} image={pokedata['image']}
            moves={pokedata['moves']} weight={pokedata['weight']} height={pokedata['height']}/>
            <div className="col-md-6 mx-auto" style={{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"1em 0"}}>
            <button className="btn btn-sm btn-outline-primary" 
            onClick={getPrevious}>Previous</button>
            <button className="btn btn-sm btn-outline-danger" 
            onClick={getRandomId}>Random</button>
            <button className="btn btn-sm btn-outline-success" 
            onClick={getNext}>Next</button>
            </div>
            </div>

        }
        </div>
        </div>
        </div>
        </section>
    )
}

export default Poke;