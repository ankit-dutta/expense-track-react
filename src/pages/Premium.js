import React from "react";
import './Premium.css';
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { themesActions } from "../store/themeReducer";

const Premium = () => {
  const data = useSelector((state) => state.expense.expense);

  const csvData = data.map((d) => {
    return {
      money: d.amount,
      description: d.description,
      category: d.category,
    };
  });
  console.log(csvData);

  const dispatch = useDispatch();

  const changeThemeHandler = () => {
    console.log("click");
    dispatch(themesActions.theme());
  };

  const csvReport = {
    filename: "Report.csv",
    data: csvData,
  };
  console.log(csvReport, "csvReport");
  return (
    <div>
      <div>
        <button className="theme-change-btn" onClick={changeThemeHandler}>Change Theme</button>
      </div>
      <div>
        <CSVLink className="csvlink" {...csvReport}>Click Here to Download Expense</CSVLink>
      </div>
    </div>
  );
};

export default Premium;