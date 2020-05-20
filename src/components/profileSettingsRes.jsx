import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { updateProfileSettings } from "./../services/userService";
import { Multiselect } from "multiselect-react-dropdown";
import ChooseBranch from "./chooseBranch";

const ProfileSettingsRes = ({ user, types, cities, foods, setUser }) => {
  const [phone, setPhone] = useState(user.phone);
  const [branches] = useState(user.branches);
  const [cityOptions, setCityOptions] = useState(
    cities.filter((city) =>
      branches.find((b) => b.city === city.name) ? false : true
    )
  );
  const [type, setType] = useState(user.type);
  const [serves, setServes] = useState(user.serves);
  const [branchOptions, setBranchOptions] = useState({});
  const [newBranches, setNewBranches] = useState([]);
  const [count, setCount] = useState(user.branches.length);
  const [branchCount, setBranchCount] = useState(
    user.branches.map((b, i) => {
      return { id: i + 1, city: b.city, sub: b.subareas };
    })
  );
  const [disableBtn, setDisableBtn] = useState(true);

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

  const addSubareas = (id, itemId) => {
    const city = cities.find((city) => city._id === id);
    branchCount.forEach((b) => {
      if (b.id === itemId) {
        b.city = city.name;
        b.subareas = [];
      }
    });
  };

  useEffect(() => {
    const obj = {};
    cities.forEach((city) => {
      obj[city.name] = city.subareas.map((sub) => sub.name);
    });
    setBranchOptions(obj);
  }, [cities]);

  useEffect(() => {
    if (user.phone !== phone.trim()) setDisableBtn(false);
    else setDisableBtn(true);
  }, [user, phone]);

  const updateData = async (event) => {
    event.preventDefault();
    const { data: response } = await updateProfileSettings(user._id, {
      phone,
    });
    if (response) {
      setUser(response);
      toast("Settings saved");
    } else {
      toast.error("Error updating profile");
    }
  };

  return (
    <div
      id="collapseTwo"
      className="collapse"
      aria-labelledby="profile-settings"
      data-parent="#accordion"
    >
      <div className="card-body">
        <form method="post" onSubmit={updateData}>
          <div className="d-flex">
            <label className="label-1 w-10">Type</label>
            <Multiselect
              options={types}
              displayValue="name"
              selectedValues={type}
              placeholder="Max. 5"
              onSelect={(selectedList) => {
                setType(selectedList);
              }}
              onRemove={(selectedList) => {
                setType(selectedList);
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
          <br />
          {branchCount.map((item) => (
            <ChooseBranch
              key={item.id}
              cities={cityOptions}
              options={branchOptions[item.city]}
              setBranchCount={setBranchCount}
              addSubareas={addSubareas}
              branches={newBranches}
              setBranches={setNewBranches}
              setBranchOptions={setBranchOptions}
              branchCount={branchCount}
              itemId={item.id}
              values={item.sub}
              edit={true}
              defaultCity={cities.find((city) => city.name === item.city)}
              setCities={setCityOptions}
            />
          ))}
          <p
            className="foodux-link mt-2 mb-5 label-2 fit-width"
            onClick={() => {
              setBranchCount([...branchCount, { id: count + 1 }]);
              setCount(count + 1);
            }}
          >
            <i className="fa fa-plus mr-2"></i>Add another branch
          </p>
          <div className="d-flex">
            <label className="label-1 w-10">Serves</label>
            <Multiselect
              options={foods}
              displayValue="name"
              selectedValues={serves}
              avoidHighlightFirstOption="true"
              closeIcon="cancel"
              onSelect={(selectedList) => {
                setServes(selectedList);
              }}
              onRemove={(selectedList) => {
                setServes(selectedList);
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
          <br />
          <label className="label-1 w-10">Phone</label>
          <input
            type="text"
            className="form-control text-box w-50 d-inline"
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
            required
          />
          <button className="btn foodux-btn float-right" disabled={disableBtn}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettingsRes;
