import React from "react";

const DealsAbout = ({ id, items, label }) => {
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
                    {label === "deal" ? (
                      <p className="card-text mt-2 text-left">
                        Deal on:{" "}
                        <span className="font-weight-bold">
                          {item.dealItems.toString()}
                        </span>{" "}
                        <br />
                        <i className="fa fa-times mr-2"></i>
                        <span
                          className="font-weight-bold"
                          style={{ textDecoration: "line-through" }}
                        >
                          Rs.{item.oldPrice}
                        </span>{" "}
                        <br />
                        <i className="fa fa-check mr-2"></i>
                        <span className="font-weight-bold">
                          Rs.{item.dealPrice}
                        </span>{" "}
                        <br />
                        <span className="font-weight-bold label-2 text-danger">
                          <em>Expires: {item.validTill}</em>
                        </span>
                      </p>
                    ) : (
                      <p className="card-text">
                        Flat{" "}
                        <span className="font-weight-bold">
                          {item.discount}%
                        </span>{" "}
                        off on{" "}
                        <span className="font-weight-bold">
                          {item.dealItems.toString()}
                        </span>{" "}
                        <br />
                        <span className="font-weight-bold label-2 text-danger">
                          <em>Expires: {item.validTill}</em>
                        </span>
                      </p>
                    )}
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
    <p className="text-muted mt-3">No {label} to show</p>
  );
};

export default DealsAbout;
