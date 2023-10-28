import { useState, useEffect } from "react";
import "./about.css";
import countries from "./countries";
import { Routes, Route, Link } from "react-router-dom";
const Loading = () => {
  return (
    <>
      <div className="loading"></div>
    </>
  );
};
const Pays = (props) => {
  return (
    <>
      <div className="pays">
        <div
          className="img"
          style={{
            background: `url(${props.img})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: " 0 -3px",
          }}
        ></div>
        <h1>{props.official}</h1>
        <div className="text">
          <p>Capital</p>
          <span>{props.capital && props.capital[0]}</span>
        </div>
        <div className="text">
          <p>Population</p>
          <span>{props.population}</span>
        </div>
        <div className="text">
          <p>Region</p>
          <span>{props.region}</span>
        </div>
        <div className="text">
          <p>Subregion</p>
          <span>Central Asia</span>
        </div>
        <div className="text">
          <p>area</p>
          <span>{props.area}</span>
        </div>
        <div className="text">
          <p>Languages</p>
          <span>{props.languages && Object.values(props.languages)[0]}</span>
        </div>
        <div className="button">
          <Link to={"/" + props.cca3} className="button1">
            <button>DETAILS</button>
          </Link>
          <Link to={props.maps} target="_blank">
            <button className="button2">SEE ON MAPS</button>
          </Link>
        </div>
      </div>
    </>
  );
};

function About() {
  const [pay, setpay] = useState([]);
  const [filterALL, setfilterALL] = useState("");
  const [region, setRegion] = useState("All");
  const [isLoaded, setisLoaded] = useState(false);
  useEffect(() => {
    const responsePromise = fetch("https://restcountries.com/v3.1/all");
    console.log(responsePromise);
    responsePromise.then((response) => {
      const arrayOfAllCountriesPromise = response.json();
      arrayOfAllCountriesPromise.then((array) => {
        setpay(array);
        setisLoaded(true);
      });
    });
  }, []);

  return (
    <>
      <nav>
        <p>CountryPedia</p>
        <input
          type="text"
          placeholder="Search"
          onChange={(Event) => {
            setfilterALL(Event.target.value);
          }}
        />
      </nav>
      <section>
        <p
          onClick={() => {
            setRegion("All");
          }}
          className={region == "All" ? "one add" : "one"}
        >
          All
        </p>
        <p
          onClick={() => setRegion("Africa")}
          className={region == "Africa" ? "add" : ""}
        >
          Africa
        </p>
        <p
          onClick={() => setRegion("Americas")}
          className={region == "Americas" ? "add" : ""}
        >
          Americas
        </p>
        <p
          onClick={() => setRegion("Asia")}
          className={region == "Asia" ? "add" : ""}
        >
          Asia
        </p>
        <p
          onClick={() => setRegion("Europe")}
          className={region == "Europe" ? "add" : ""}
        >
          Europe
        </p>
        <p
          onClick={() => setRegion("Oceania")}
          className={region == "Oceania" ? "six add" : "six"}
        >
          Oceania
        </p>
      </section>
      <main>
        {!isLoaded && <Loading />}
        {pay.map((element, index) => {
          if (
            element.name.official.includes("Israel") ||
            !element.name.official
              .toLocaleLowerCase()
              .includes(filterALL.toLocaleLowerCase())
          )
            return;
          if (region == "All" || region == element.region)
            return (
              <Pays
                key={index}
                img={element.flags.svg}
                official={element.name.official}
                capital={element.capital}
                population={element.population}
                region={element.region}
                subregion={element.subregion}
                area={element.area}
                languages={element.languages}
                cca3={element.cca3}
                maps={element.maps.googleMaps}
              />
            );
        })}
      </main>
    </>
  );
}

export default About;
