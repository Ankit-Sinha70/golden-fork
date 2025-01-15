import React from "react";
import "./totalCountCard.scss";


const Card = (props) => {

  return (
    <div className="whiteCard">
        <div className="whiteCard__detail">
          <h4 className="whiteCard__heading">{props.name}</h4>
          <h2 className="whiteCard__count">
            {props.count} <span className="gray-span">{props.month}</span>{" "}
          </h2>
        </div>
        <div className="whiteCard__img">
         {props.Icons ? <img src={props.Icons} alt="Customer Icon" /> : React.createElement(props.icon)}
        </div>
    </div>
  );
};

export default Card;
