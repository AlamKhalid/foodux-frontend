import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Multiselect } from "multiselect-react-dropdown";
import { getCities } from "../services/cityService";
import ChooseBranch from "./chooseBranch";
import { getTypes } from "../services/typeService";
import { getFoods } from "../services/foodService";
import { addDetails } from "../services/userService";

const FillDetailsRes = ({ user }) => {
  const [phone, setPhone] = useState("");
  const [type, setType] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [serves, setServes] = useState([]);
  const [serveOptions, setServeOptions] = useState([]);
  const [cities, setCities] = useState([]);
  const [branches, setBranches] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [count, setCount] = useState(1);
  const [branchCount, setBranchCount] = useState([{ id: 1 }]);

  const commonStyle = {
    inputField: {
      width: "15%",
      padding: "0",
      margin: "0",
      border: "none",
    },
    searchBox: {
      width: "100%",
      backgroundColor: "white",
    },
    chips: { color: "white", background: "black" },
  };

  useEffect(() => {
    async function getData() {
      const { data: cities } = await getCities();
      const { data: typeOptions } = await getTypes();
      const { data: food } = await getFoods();
      setServeOptions(food);
      setTypeOptions(typeOptions);
      setCities(cities);
    }
    getData();
  }, []);

  const addSubareas = (id) => {
    const city = cities.find((city) => city._id === id);
    setBranchOptions(city.subareas.map((subarea) => subarea.name));
  };

  const submitDetails = async (event) => {
    event.preventDefault();
    const response = await addDetails(user._id, {
      serves,
      type,
      phone,
      branches,
    });
    if (response) {
      toast("Details added successfully");
      localStorage.setItem("filledDetails", true);
      setTimeout(() => {
        window.location = "/newsfeed";
      }, 2000);
    } else {
      toast.error("Error adding details");
    }
  };

  return (
    <div className="container mt-5 pt-5 text-center">
      <form method="post" onSubmit={submitDetails}>
        <div className="d-flex justify-content-center mb-4">
          <div className="mr-5">
            <label htmlFor="type" className="label-1 mb-0">
              Restaurant Type
            </label>
            <br />
            <label htmlFor="type" className="text-muted label-2">
              (ex. Thai, Fast Food)
            </label>
          </div>
          <Multiselect
            options={typeOptions}
            displayValue="name"
            placeholder="Max. 5"
            id="type"
            onSelect={(selectedList, selectedItem) => {
              setType([...type, selectedItem._id]);
            }}
            onRemove={(selectedList, removedItem) => {
              setType(type.filter((tp) => tp !== removedItem._id));
            }}
            avoidHighlightFirstOption="true"
            closeIcon="cancel"
            selectionLimit="5"
            style={{
              multiselectContainer: {
                width: "50%",
                height: "fit-content",
                border: "none",
                borderRadius: "7px",
                padding: "0",
                magin: "0",
              },
              ...commonStyle,
            }}
          />
        </div>

        {branchCount.map((item) => (
          <ChooseBranch
            key={item.id}
            cities={cities}
            options={branchOptions}
            setBranchCount={setBranchCount}
            addSubareas={addSubareas}
            branches={branches}
            setBranches={setBranches}
            setBranchOptions={setBranchOptions}
            branchCount={branchCount}
            itemId={item.id}
            setCities={setCities}
          />
        ))}
        <p
          className="foodux-link mt-0 mb-5 label-2 w-50"
          onClick={() => {
            setBranchCount([...branchCount, { id: count + 1 }]);
            setCount(count + 1);
          }}
        >
          <i className="fa fa-plus mr-2"></i>Add another branch
        </p>
        <div className="d-flex justify-content-center mb-5 ml-5">
          <label htmlFor="food" className="label-1 mr-5">
            Serves
          </label>
          <Multiselect
            id="food"
            options={serveOptions}
            displayValue="name"
            avoidHighlightFirstOption="true"
            closeIcon="cancel"
            onSelect={(selectedList, selectedItem) => {
              setServes([...serves, selectedItem._id]);
            }}
            onRemove={(selectedList, removedItem) => {
              setServes(serves.filter((serve) => serve !== removedItem._id));
            }}
            style={{
              multiselectContainer: {
                width: "50%",
                height: "fit-content",
                border: "none",
                borderRadius: "7px",
                padding: "0",
                magin: "0",
              },
              ...commonStyle,
            }}
          />
        </div>
        <div className="d-flex justify-content-center ml-5">
          <label htmlFor="phone" className="label-1 mr-5 mt-1">
            UAN
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            placeholder="121-121-121"
            className="form-control w-50 text-box mb-5"
            onChange={({ target }) => setPhone(target.value)}
            required
          />
        </div>
        <button className="mx-auto form-control foodux-btn w-25">Submit</button>
      </form>
    </div>
  );
};

export default FillDetailsRes;
