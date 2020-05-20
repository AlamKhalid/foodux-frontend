import React from "react";

const RestaurantsVisitedAbout = ({ id, items }) => {
  const outerWrapper =
    items.length / 4 !== 1 ? Math.ceil(items.length / 4) : items.length / 4;
  const array = [];
  const subitems = [];
  for (let i = 0; i < outerWrapper; i++) {
    array.push(i);
  }
  for (let i = 0; i < items.length; i += 4) {
    subitems.push(items.slice(i, i + 4));
  }
  return items.length > 0 ? (
    <div
      id={id}
      className="carousel slide carousel-multi-item mt-3"
      data-ride="carousel"
    >
      <div className="carousel-inner" role="listbox">
        {array.map((i) => (
          <div className={`carousel-item${i === 0 ? " active" : ""}`} key={i}>
            {subitems[i].map((item) => (
              <div
                className="col-md-3"
                key={item._id}
                style={{ float: "left" }}
              >
                <div className="card mb-2">
                  <img
                    className="card-img-top"
                    src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
                    alt=""
                  />
                  <div className="card-body">
                    <h4 className="card-title mb-0 text-center">
                      {item.restaurantId.name}
                    </h4>
                    <p className="card-text mt-2 ">Times: {item.times}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {items.length > 4 && (
        <div className="mt-3 text-center controls-top">
          <a className="mr-4" href={`#${id}`} data-slide="prev">
            <i className="fa fa-chevron-left"></i>
          </a>
          <a className="" href={`#${id}`} data-slide="next">
            <i className="fa fa-chevron-right"></i>
          </a>
        </div>
      )}
    </div>
  ) : (
    <p className="text-muted mt-3">No restaurants to show</p>
  );
};

export default RestaurantsVisitedAbout;
