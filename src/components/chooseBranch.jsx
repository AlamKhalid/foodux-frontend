import React, { useState } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import _ from "lodash";

const ChooseBranch = ({
  itemId,
  cities,
  options,
  setBranchCount,
  addSubareas,
  branches,
  setBranches,
  setBranchOptions,
  branchCount,
  setCities,
}) => {
  const [selectedCity, setSelectedCity] = useState({});

  const handleBranches = (list) => {
    const branch = branches.find((branch) => branch.city === selectedCity.name);
    const index = branches.indexOf(branch);
    const updatedBranches = [...branches];
    updatedBranches[index].subareas = list;
    setBranches(updatedBranches);
  };

  const addBranchSubArea = (selectedList) => {
    handleBranches(selectedList);
  };

  const RemoveBranchSubArea = (selectedList) => {
    handleBranches(selectedList);
  };

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

  return (
    <div className="d-flex justify-content-center ml-5 mb-2">
      <label htmlFor="" className="label-1 mr-5">
        Branches
      </label>
      <select
        className="form-control text-box w-25 mr-3"
        value={selectedCity.name}
        onChange={({ target }) => {
          const cityName = target.value;
          const prevCityName = !_.isEmpty(selectedCity)
            ? selectedCity.name
            : cityName;
          if (cityName.length > 0) {
            if (prevCityName !== cityName) setCities([...cities], selectedCity);
            const findCity = cities.find((city) => city.name === cityName);
            setSelectedCity(findCity);
            setBranches([...branches, { city: cityName }]);
            addSubareas(findCity._id);
            setCities(cities.filter((city) => city.name !== cityName));
          } else {
            setBranches(
              branches.filter((branch) => branch.city !== selectedCity.name)
            );
            if (!_.isEmpty(selectedCity)) setCities([...cities, selectedCity]);
            setSelectedCity({});
            setBranchOptions([]);
          }
        }}
        required
      >
        <option value="">Choose City</option>
        {!_.isEmpty(selectedCity) && (
          <option value={selectedCity.name}>{selectedCity.name}</option>
        )}
        {cities.map((city) => (
          <option key={city._id} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
      <Multiselect
        options={options}
        isObject={false}
        closeIcon="cancel"
        onSelect={addBranchSubArea}
        onRemove={RemoveBranchSubArea}
        placeholder=""
        emptyRecordMsg="Select city first"
        avoidHighlightFirstOption="true"
        style={{
          multiselectContainer: {
            width: "25%",
            height: "fit-content",
            border: "none",
            borderRadius: "7px",
            padding: "0",
            magin: "0",
          },
          ...commonStyle,
        }}
      />
      {branchCount.length > 1 && (
        <i
          className="fa fa-trash mt-2 ml-2 del-branch"
          onClick={() => {
            if (!_.isEmpty(selectedCity)) setCities([...cities, selectedCity]);
            setBranchCount(branchCount.filter((item) => item.id !== itemId));
          }}
        ></i>
      )}
    </div>
  );
};

export default ChooseBranch;
