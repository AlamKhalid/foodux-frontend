import React from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import $ from "jquery";

const HorizontalMenu = () => {
  const Arrow = ({ text, className }) => {
    return (
      <div className={className}>
        <i className={`fa fa-chevron-${text}`}></i>
      </div>
    );
  };

  const ArrowLeft = Arrow({ text: "left", className: "arrow-next" });
  const ArrowRight = Arrow({ text: "right", className: "arrow-prev" });
  const list = [
    { name: "item1" },
    { name: "item2" },
    { name: "item3" },
    { name: "item4" },
    { name: "item5" },
    { name: "item6" },
    { name: "item7" },
    { name: "item8" },
    { name: "item9" },
  ];

  const MenuItem = ({ text }) => {
    return (
      <div
        className="menu-item"
        style={{ border: "1px solid black" }}
        onClick={() => console.log($(".menu-item").width())}
      >
        <div className="d-flex">
          <img
            className="displayPostPicture"
            src="https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg?w=1200"
            alt=""
          />
          <div className="d-flex flex-column">
            <span>Alam Khalid</span>
            <span className="text-muted" style={{ fontSize: "13px" }}>
              <i className="fa fa-user mr-1"></i>Review Post
            </span>
          </div>
        </div>
        <hr />
        <p>Post body to some extent...</p>
      </div>
    );
  };

  const Menu = (list) =>
    list.map((el) => {
      const { name } = el;
      return <MenuItem text={name} key={name} />;
    });
  const menu = Menu(list);
  return (
    <ScrollMenu data={menu} arrowRight={ArrowRight} arrowLeft={ArrowLeft} />
  );
};

export default HorizontalMenu;
