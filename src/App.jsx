//import React, { useState, useEffect } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import Swal from "sweetalert2";
import TestLine from "./TestLine";

function App() {
  const [surveyData, setSurveyData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [customerGrades, setCustomerGrades] = useState([]);
  const [network, setNetwork] = useState("");
  const [token, setToken] = useState("");

  const options = [
    { value: "a", label: "A" },
    { value: "B", label: "B" },
    { value: "c", label: "C" },
    { value: "d", label: "D" },
    { value: "no_grade", label: "No Grade" },
  ];

  const optionsNetwork = [
    { value: "http://localhost:5001", label: "Local" },
    {
      value: "https://dev-api-smt.openlandscape.cloud/backend",
      label: "Network",
    },
  ];

  useEffect(() => {
    console.log(localStorage.getItem("token"));
    setToken(localStorage.getItem("token"));
  }, []);

  const handleToken = () => {
    localStorage.setItem("token", token);
  };

  const handleFormSubmit = (event) => {
    console.log(network.value);
    event.preventDefault();
    // console.log(startDate.toISOString());
    // console.log(endDate.toISOString());
    // console.log(customerGrades);
    const requestBody = {
      platform_id: "5f40a232-4f81-4d39-a2d1-bedb06768a3c",
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      customer_grade: customerGrades.map((option) => option.value),
    };

    axios
      .post(`${network.value}/dashboard/avg-point`, requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        Swal.fire({
          title: "Success!",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "Cool",
        });
        setSurveyData(response.data.data);
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error,
          icon: "error",
          confirmButtonText: "Cool",
        });
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <Select
          value={network}
          onChange={(selectedOptions) => setNetwork(selectedOptions)}
          options={optionsNetwork}
        />
        <div>
          <input
            type="text"
            defaultValue={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <button onClick={handleToken}>Set Token</button>
        </div>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />

        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />

        <Select
          value={customerGrades}
          onChange={(selectedOptions) => setCustomerGrades(selectedOptions)}
          options={options}
          isMulti
        />

        <button type="submit">search</button>
      </form>
      <h1>{ }</h1>
      {surveyData.map((data) => (
        <ul key={data.avg_point}>
          <li>
            Average Point: {data.avg_point}, Max Point: {data.max_point}
          </li>
          <li>
            Send Survey : {data.survey.send_survey}, Do Survey :
            {data.survey.do_survey}, Percent :{" "}
            {data.survey.percent_survey + " %"}
          </li>
          <li>
            Send Survey CNO : {data.survey_cno.send_survey_cno}, Do Survey :
            {data.survey_cno.do_survey_cno}, Percent :{" "}
            {data.survey_cno.percent_survey_cno + " %"}
          </li>
        </ul>
      ))}
      <div>
        <TestLine />
      </div>
    </div>
  );
}
export default App;
