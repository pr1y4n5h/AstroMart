import React from "react";
import "./HomePage.style.css";
import { usePageTitle } from "../../Hooks/usePageTitle";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router";

export const HomePage = () => {
  usePageTitle("AstroMart || Home");

  const {loggedUser, token} = useAuth();

  const navigate = useNavigate();

  const goToProducts = () => {
    navigate("/products")
  }

  return (
    <div className="home-page">
      <header>
        <div className="header-content">
          <h2> Unleash your Geeky side {!token && "with"} </h2>
          <div className="line"> </div>
          <h1>{token ? `Hi ${loggedUser?.username?.charAt().toUpperCase() + loggedUser?.username.slice(1)}!` : "AstroMart"}</h1>
          <button onClick={goToProducts} className="primary-btn-1"> Go to Products </button>
        </div>
      </header>

      <section>
        <div className="title">
          <h3> Today's deal </h3>
          <div className="line"> </div>
        </div>
        <div className="row">
        <div className="col">
            <img
              className="home-img2"
              src="https://images-na.ssl-images-amazon.com/images/I/71%2BpkePyKzL._AC_SX679_.jpg"
            />
            <h3> MOON LAMP, WELKEY PLUS </h3>
            <p>
              The moon lamp made of PLA material with 3D technology,
              Environmentally and energy-saving, makes it fall resistant.
            </p>
            <button onClick={goToProducts} className="secondary-btn-1"> Check this </button>
          </div>

          <div className="col">
            <img
              className="home-img1"
              src="https://images-na.ssl-images-amazon.com/images/I/61Dgw5pj3GL._AC_UX569_.jpg"
            />
            <h3> NASA GREY SWEATSHIRT </h3>
            <p>
              Get this cute and trendy 'NASA' logo sweatshirt to show how nerdy
              and cool you are!
            </p>
            <button onClick={goToProducts} className="secondary-btn-1"> Check this </button>
          </div>
          

          <div className="col">
            <img
              className="home-img2"
              src="https://i.etsystatic.com/8140833/r/il/19958b/1247610732/il_794xN.1247610732_dn1p.jpg"
            />
            <h3> SOUTHERN SKY WINE GLASS SET </h3>
            <p>
              This pair of elegant stemless wine glasses shows the southern
              hemisphere's night sky in summer and in winter.
            </p>
            <button onClick={goToProducts} className="secondary-btn-1"> Check this </button>
          </div>
        </div>
      </section>
    </div>
  );
};
