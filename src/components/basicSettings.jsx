import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { updateBasicSettings } from "../services/userService";

const BasicSettings = ({ user, setUser }) => {
  const [name, setName] = useState(user.name);
  const [date, setDate] = useState(user.birthday.slice(0, 2));
  const [month, setMonth] = useState(user.birthday.slice(3, 5));
  const [year, setYear] = useState(user.birthday.slice(6));
  const [gender, setGender] = useState(user.gender);
  const [disableBtn, setDisableBtn] = useState(true);

  const generateArray = (name) => {
    let arr = [];
    const { year, month } = { year: 2020, month: 1 };

    if (name === "date") {
      const days = new Date(year, month, 0).getDate();
      for (let i = 1; i <= days; i++) {
        arr.push(i);
      }
    } else if (name === "month") for (let i = 1; i <= 12; i++) arr.push(i);
    else if (name === "year") {
      for (let i = new Date().getFullYear(); i > 1950; i--) arr.push(i);
    }
    return arr;
  };

  const dates = generateArray("date");
  const months = generateArray("month");
  const years = generateArray("year");

  useEffect(() => {
    if (
      user.name !== name.trim() ||
      user.birthday.slice(0, 2) !== date ||
      user.birthday.slice(3, 5) !== month ||
      user.birthday.slice(6) !== year ||
      user.gender !== gender
    )
      setDisableBtn(false);
    else setDisableBtn(true);
  }, [user, name, gender, date, month, year]);

  const updateData = async (event) => {
    event.preventDefault();
    const { data: response } = await updateBasicSettings(user._id, {
      name: name,
      date: date,
      month: month,
      year: year,
      gender: gender,
    });
    if (response) {
      setUser(response);
      toast("Settings saved");
    } else toast.error("Error updating profile");
  };

  return (
    <div
      id="collapseOne"
      className="collapse show"
      aria-labelledby="basic-settings"
      data-parent="#accordion"
    >
      <div className="card-body">
        <form method="post" onSubmit={updateData}>
          <label htmlFor="id" className="label-1 w-10">
            User ID
          </label>
          <input
            type="text"
            className="form-control text-box w-50 d-inline"
            value={user._id}
            disabled
          />
          <br /> <br />
          <label htmlFor="name" className="label-1 w-10">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
            className="form-control text-box w-50 d-inline"
            required
          />
          <br /> <br />
          <label htmlFor="email" className="label-1 w-10">
            Email
          </label>
          <input
            type="email"
            className="form-control text-box w-50 d-inline"
            value={user.email}
            disabled
          />
          <br /> <br />
          <label className="label-1 w-10">Birthday</label>
          <select
            className="form-control text-box w-10 d-inline mr-3"
            value={date}
            onChange={({ target }) => setDate(target.value)}
            required
          >
            <option value="">Date</option>
            {dates.map((date) => (
              <option key={date}>{date}</option>
            ))}
          </select>
          <select
            className="form-control text-box w-10 d-inline mr-3"
            value={month}
            onChange={({ target }) => setMonth(target.value)}
            required
          >
            <option value="">Month</option>
            {months.map((month) => (
              <option key={month}>{month}</option>
            ))}
          </select>
          <select
            className="form-control text-box w-10 d-inline mr-3"
            value={year}
            onChange={({ target }) => setYear(target.value)}
            required
          >
            <option value="">Year</option>
            {years.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
          <label className="label-2 text-muted">Minimum Age: 13 years</label>
          <br /> <br />
          <label className="label-1 w-10">Gender</label>
          <div
            className="btn-group btn-group-toggle w-25"
            data-toggle="buttons"
          >
            <label className="btn btn-secondary active">
              <input
                type="radio"
                name="options"
                id="option1"
                autoComplete="off"
                checked={gender === "female"}
                onChange={() => 1}
                onClick={() => setGender("female")}
                required
              />
              Female
            </label>
            <label className="btn btn-secondary">
              <input
                type="radio"
                name="options"
                id="option2"
                autoComplete="off"
                checked={gender === "male"}
                onClick={() => setGender("male")}
                onChange={() => 1}
                required
              />
              Male
            </label>
          </div>
          <button className="btn foodux-btn float-right" disabled={disableBtn}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default BasicSettings;
