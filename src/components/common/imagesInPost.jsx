import React from "react";

const ImageInPosts = ({ images }) => {
  return (
    <div id="imagesPost" className="carousel slide mb-2 " data-ride="carousel">
      {images.length > 1 && (
        <ol className="carousel-indicators">
          {images.map((img, i) => (
            <li
              key={i}
              data-target="#imagesPost"
              className={i === 0 ? "active" : ""}
              data-slide-to={toString(i)}
            ></li>
          ))}
        </ol>
      )}
      <div className="carousel-inner">
        {images.map((img, i) => (
          <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
            <img className="d-block w-100" src={img} alt="" />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <React.Fragment>
          <a
            className="carousel-control-prev"
            href="#imagesPost"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#imagesPost"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </React.Fragment>
      )}
    </div>
  );
};

export default ImageInPosts;
