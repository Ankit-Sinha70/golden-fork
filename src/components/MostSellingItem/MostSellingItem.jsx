import React from "react";
import MostSellingFood from "../../../src/assets/images/icon/jpeg/mostSelling-item/mostSelling-Img.jpg";
import "./mostSellingItem.scss";

const MostSellingItem = () => {
  return (
    <div className="mostSellingMenuItem">
      <div className="mostSellingMenuItem__img">
        <img src={MostSellingFood} alt="Customer Icon" />
      </div>
      <div className="mostSellingMenuItem__content">
        <h5 className="mostSellingMenuItem__title">
          Medium Spicy Spagethi{" "}
          <span className="mostSellingMenuItem__subTitle">- (Italian)</span>
        </h5>
        <div className="mostSellingMenuItem__info">
          <h5 className="mostSellingMenuItem__price">$5.6</h5>
          <p className="mostSellingMenuItem__order">orderNo.88</p>
        </div>
      </div>
    </div>
  );
};

export default MostSellingItem;
