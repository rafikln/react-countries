import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import countries from "../page/countries";
import "./region1.css";
import { Routes, Route, Link } from "react-router-dom";

const Flech = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-arrow-left"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
};
const Border = (props) => {
  const [pays,setpays]=useState({})
useEffect(()=>
{
  const reponsePromise=fetch("https://restcountries.com/v3.1/alpha/"+props.pays)
  reponsePromise.then((response)=>
  {
  const jsonpromise=response.json();
  jsonpromise.then((array)=>
  {
    setpays(array[0]);
  })
  });
},[]);

 
  return (
    <>
      <Link className="border" to={"/" + props.pays}>
        <img src={pays.flags?.png} alt="" />
        <p>{props.pays}</p>
      </Link>
    </>
  );
};
function Region() {
  const [region, setregion] = useState({});
  const params = useParams();

  useEffect(() => {
    const promiseURL = fetch(
      "https://restcountries.com/v3.1/alpha/" + params.cca3
    );
    promiseURL.then((response) => {
      const jsonprops = response.json();
      jsonprops.then((objet) => {
        setregion(objet[0]);
      });
    });
  }, [params.cca3]);

  return (
    <>
      <nav>
        <p>CountryPedia</p>
      </nav>
      <header>
        {region.name && (
          <>
            <Link className="back" to="/">
              <Flech />
              <p>Back</p>
            </Link>
            <div className="main">
              <div className="top">
                <p>{region.name.common}</p>
                <img src={region.flags.svg} alt="" />
              </div>
              <div className="centre">
                <p>Offcial Name :</p>
                <span>{region.name.official}</span>
              </div>
              <div className="centre">
                <p>Region :</p>
                <span>{region.region}</span>
              </div>
              <div className="centre">
                <p>Subregion :</p>
                <span>{region.subregion}</span>
              </div>
              <div className="centre">
                <p>Capital :</p>
                <span>{region.capital[0]}</span>
              </div>
              <div className="centre">
                <p>Population :</p>
                <span>{region.population}</span>
              </div>
              <div className="centre">
                <p>Area :</p>
                <span>{region.area} km²</span>
              </div>
              <div className="centre">
                <p>Timezones :</p>
                <span>{region.timezones[0]}</span>
              </div>
              <div className="centre ">
                <p>maps :</p>
                <a
                  href={region.maps.googleMaps}
                  target="_blank"
                  className="maps"
                >
                  View on Google Maps
                </a>
                <a
                  href={region.maps.openStreetMaps}
                  target="_blank"
                  className="maps"
                >
                  View on Open Street Mapss
                </a>
              </div>
              <div className="logo">
                <img src={region.coatOfArms.svg} alt="" />
              </div>
            </div>
            <p className="p">Neighbors</p>
            <div className="bo">
              {region.borders.map((eleme) => {
                return <Border pays={eleme} />;
              })}
            </div>
          </>
        )}
      </header>
    </>
  );
}

export default Region;
