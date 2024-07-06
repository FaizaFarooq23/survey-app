import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

function replaceErrors(key, value) {
  if (value instanceof Error) {
    return Object.getOwnPropertyNames(value).reduce((error, key) => {
      error[key] = value[key];
      return error;
    }, {});
  }
  return value;
}

function errorHandler(error) {
  if (error.properties && error.properties.errors instanceof Array) {
    const errorMessages = error.properties.errors
      .map((error) => error.properties.explanation)
      .join("\n");
    console.log("errorMessages", errorMessages);
  }
  throw error;
}

function parseFloatIfPossible(value) {
  if (typeof value === "string") {
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      return parsedValue;
    }
  } else if (typeof value === "number") {
    return value;
  }
  return "NAN";
}

export default async (req, res) => {
  // path is public/docs/template.docx
  //console.log(req.body);
  const content = fs.readFileSync(
    path.resolve("public/docs/template_5.docx"),
    "binary"
  );
  const zip = new PizZip(content);
  let doc;

  try {
    doc = new Docxtemplater(zip);
  } catch (error) {
    errorHandler(error);
  }
  

  const findAnswerById = (id) => {
    const question = Object.values(req.body).find((item) => item.id === id);
    return question ? parseFloatIfPossible(question.answer) : null;
  };
  //   acc to id of object we get
  const avg_weight_per_trip = parseFloatIfPossible(findAnswerById(4));

  const avg_duration_per_shift = parseFloatIfPossible(findAnswerById(7));

  const nb_shift_per_day = parseFloatIfPossible(findAnswerById(8));
  const avg_distance_per_tracktor_in_shift = parseFloatIfPossible(
    findAnswerById(5)
  );
  const current_fleet_of_diesel_tractors = parseFloatIfPossible(
    findAnswerById(0)
  );

  const port_or_logistic = Object.values(req.body).find((item) => item.id === 1).answer;
    console.log(port_or_logistic)
  const consommationTruck = parseFloatIfPossible(findAnswerById(23));

  const DieselPurchasedPrice = parseFloatIfPossible(findAnswerById(14));

  const energyCost = parseFloatIfPossible(findAnswerById(24));

  const maintenance_cost_per_year_per_diesel_truck = parseFloatIfPossible(
    findAnswerById(16)
  );
  const maintenence_downtime_per_year_per_diesel_truck = parseFloatIfPossible(
    findAnswerById(15)
  ); //maint downtime per year per truck * trucks - (0.5*maintenence time per year per truck*trucks) for last question

  const Targeted_hours_of_operation_per_day = parseFloatIfPossible(
    findAnswerById(10)
  );

  const avg_distance_per_truck_per_day = parseFloatIfPossible(
    findAnswerById(9)
  );

  const total_tons_moved_per_year = parseFloatIfPossible(findAnswerById(13));

  const avg_nb_trips_per_shift = parseFloatIfPossible(findAnswerById(6));
  // total_hours_reduction_of_maintenance_downtime = parseFloatIfPossible(
  //   findAnswerById(17)
  // const useCase = findAnswerById(2)
  doc.setData({
    Current_fleet_of_diesel_tractors:
      current_fleet_of_diesel_tractors !== "NAN"
        ? current_fleet_of_diesel_tractors.toLocaleString()
        : "NAN",
    Use_case: req.body["2"].answer,
    total_number_of_trips_year:
      avg_nb_trips_per_shift !== "NAN" && nb_shift_per_day !== "NAN"
        ? (avg_nb_trips_per_shift * nb_shift_per_day * 365).toLocaleString()
        : "NAN",
    total_fleet_distance_per_year:
      current_fleet_of_diesel_tractors !== "NAN" &&
      avg_distance_per_tracktor_in_shift !== "NAN" &&
      nb_shift_per_day !== "NAN"
        ? (
            current_fleet_of_diesel_tractors *
            avg_distance_per_tracktor_in_shift *
            nb_shift_per_day *
            365
          ).toLocaleString()
        : "NAN",
    total_number_of_containers_move_per_year:
      current_fleet_of_diesel_tractors !== "NAN" &&
      avg_nb_trips_per_shift !== "NAN" &&
      nb_shift_per_day !== "NAN"
        ? (
            current_fleet_of_diesel_tractors *
            avg_nb_trips_per_shift *
            nb_shift_per_day *
            365
          ).toLocaleString()
        : "NAN",
    total_consumption_of_diesel_per_year_for_the_entire_fleet:
      current_fleet_of_diesel_tractors !== "NAN" &&
      consommationTruck !== "NAN" &&
      nb_shift_per_day !== "NAN" &&
      avg_duration_per_shift !== "NAN"
        ? (
            current_fleet_of_diesel_tractors *
            consommationTruck *
            nb_shift_per_day *
            avg_duration_per_shift *
            365
          ).toLocaleString()
        : "NAN",
    total_emission_of_CO2_per_year_for_the_entire_fleet:
      current_fleet_of_diesel_tractors !== "NAN" &&
      consommationTruck !== "NAN" &&
      nb_shift_per_day !== "NAN" &&
      avg_duration_per_shift !== "NAN"
        ? (
            0.027 *
            current_fleet_of_diesel_tractors *
            consommationTruck *
            nb_shift_per_day *
            avg_duration_per_shift *
            365
          ).toLocaleString()
        : "NAN",
    total_emission_Nox_per_year_for_the_entire_fleet:
      current_fleet_of_diesel_tractors !== "NAN" &&
      consommationTruck !== "NAN" &&
      nb_shift_per_day !== "NAN" &&
      avg_duration_per_shift !== "NAN"
        ? (
            0.0002 *
            current_fleet_of_diesel_tractors *
            consommationTruck *
            nb_shift_per_day *
            avg_duration_per_shift *
            365
          ).toLocaleString()
        : "NAN",
    total_emission_CO_per_year_for_the_entire_fleet:
      current_fleet_of_diesel_tractors !== "NAN" &&
      consommationTruck !== "NAN" &&
      nb_shift_per_day !== "NAN" &&
      avg_duration_per_shift !== "NAN"
        ? (
            0.000015 *
            current_fleet_of_diesel_tractors *
            consommationTruck *
            nb_shift_per_day *
            avg_duration_per_shift *
            365
          ).toLocaleString()
        : "NAN",
    total_emission_PM2_per_year_for_the_entire_fleet:
      current_fleet_of_diesel_tractors !== "NAN" &&
      consommationTruck !== "NAN" &&
      nb_shift_per_day !== "NAN" &&
      avg_duration_per_shift !== "NAN"
        ? (
            0.000001 *
            current_fleet_of_diesel_tractors *
            consommationTruck *
            nb_shift_per_day *
            avg_duration_per_shift *
            365
          ).toLocaleString()
        : "NAN",
    total_diesel_cost_per_year_for_the_entire_fleet:
      current_fleet_of_diesel_tractors !== "NAN" &&
      consommationTruck !== "NAN" &&
      nb_shift_per_day !== "NAN" &&
      avg_duration_per_shift !== "NAN"
        ? (
            DieselPurchasedPrice
          ).toLocaleString() + " $"
        : "NAN",
    total_maintenance_cost_per_year_for_the_entire_fleet:
      current_fleet_of_diesel_tractors !== "NAN" &&
      maintenance_cost_per_year_per_diesel_truck !== "NAN"
        ? (
            maintenance_cost_per_year_per_diesel_truck *
            current_fleet_of_diesel_tractors
          ).toLocaleString() + " $"
        : "NAN",
    total_downtime_per_year_for_the_entire_fleet:
      current_fleet_of_diesel_tractors !== "NAN" &&
      maintenence_downtime_per_year_per_diesel_truck !== "NAN"
        ? (
            maintenence_downtime_per_year_per_diesel_truck *
            current_fleet_of_diesel_tractors
          ).toLocaleString()
        : "NAN",
    total_carbon_tax_per_year_for_the_entire_fleet:
      current_fleet_of_diesel_tractors !== "NAN" &&
      consommationTruck !== "NAN" &&
      nb_shift_per_day !== "NAN" &&
      avg_duration_per_shift !== "NAN"
        ? (
            0.027 *
            current_fleet_of_diesel_tractors *
            consommationTruck *
            nb_shift_per_day *
            avg_duration_per_shift *
            365 *
            100
          ).toLocaleString() + " $"
        : "NAN",
    total_CO2_emissions_saved_by_the_fleet:
      current_fleet_of_diesel_tractors !== "NAN" &&
      consommationTruck !== "NAN" &&
      nb_shift_per_day !== "NAN" &&
      avg_duration_per_shift !== "NAN"
        ? (
            0.027 *
            current_fleet_of_diesel_tractors *
            consommationTruck *
            nb_shift_per_day *
            avg_duration_per_shift *
            365
          ).toLocaleString()
        : "NAN",
    no_of_trees:
      current_fleet_of_diesel_tractors !== "NAN" &&
      consommationTruck !== "NAN" &&
      nb_shift_per_day !== "NAN" &&
      avg_duration_per_shift !== "NAN"
        ? (
            0.027 *
            current_fleet_of_diesel_tractors *
            consommationTruck *
            nb_shift_per_day *
            avg_duration_per_shift *
            365 *
            6
          ).toLocaleString()
        : "NAN",
    number_of_electric_truck_recommended:
      current_fleet_of_diesel_tractors !== "NAN"
        ? current_fleet_of_diesel_tractors.toLocaleString()
        : "NAN",
    battery_capacity:
      current_fleet_of_diesel_tractors !== "NAN" &&
      port_or_logistic === "Port" ?
      (current_fleet_of_diesel_tractors < 10
        ? "126"
        : "252")
      :
      (current_fleet_of_diesel_tractors < 10
        ? "55"
        : "110"),
    recharge_mode:
      current_fleet_of_diesel_tractors !== "NAN" &&
      current_fleet_of_diesel_tractors < 10
        ? "Manual Swapping"
        : "Fast Charge",
    fast_number_of_charges:
      current_fleet_of_diesel_tractors !== "NAN" &&
      current_fleet_of_diesel_tractors < 10
        ? "is not required"
        : "has " +
          current_fleet_of_diesel_tractors.toLocaleString() +
          " chargers",
    manual_number_of_powerpack:
      current_fleet_of_diesel_tractors !== "NAN" &&
      current_fleet_of_diesel_tractors < 10
        ? "requires " +
          current_fleet_of_diesel_tractors.toLocaleString() +
          " additional powerpacks"
        : "is not required",
    manual_number_of_charges:
      current_fleet_of_diesel_tractors !== "NAN" &&
      current_fleet_of_diesel_tractors < 10
        ? "and " +
          current_fleet_of_diesel_tractors.toLocaleString() +
          " chargers"
        : " ",
    auto_number_of_swapping:
      current_fleet_of_diesel_tractors !== "NAN" &&
      current_fleet_of_diesel_tractors < 10
        ? current_fleet_of_diesel_tractors.toLocaleString()
        : "Not required",
    electricity_cost_pervehicle:
      Targeted_hours_of_operation_per_day !== "NAN" && energyCost !== "NAN"
        ? (
            10 *
            Targeted_hours_of_operation_per_day *
            energyCost
          ).toLocaleString()
        : "NAN",
    electricity_cost_per_year_fleet:
      Targeted_hours_of_operation_per_day !== "NAN"
        ? (
            10 *
            Targeted_hours_of_operation_per_day *
            energyCost *
            current_fleet_of_diesel_tractors *
            365
          ).toLocaleString()
        : "NAN",
    total_reduction_of_CO2:
      current_fleet_of_diesel_tractors !== "NAN" &&
      consommationTruck !== "NAN" &&
      nb_shift_per_day !== "NAN" &&
      avg_duration_per_shift !== "NAN"
        ? (
            0.027 *
            current_fleet_of_diesel_tractors *
            consommationTruck *
            nb_shift_per_day *
            avg_duration_per_shift *
            365
          ).toLocaleString()
        : "NAN",
    total_reduction_Nox:
      current_fleet_of_diesel_tractors !== "NAN" &&
      consommationTruck !== "NAN" &&
      nb_shift_per_day !== "NAN" &&
      avg_duration_per_shift !== "NAN"
        ? (
            0.0002 *
            current_fleet_of_diesel_tractors *
            consommationTruck *
            nb_shift_per_day *
            avg_duration_per_shift *
            365
          ).toLocaleString()
        : "NAN",
    total_reduction_CO:
      current_fleet_of_diesel_tractors !== "NAN" &&
      consommationTruck !== "NAN" &&
      nb_shift_per_day !== "NAN" &&
      avg_duration_per_shift !== "NAN"
        ? (
            0.000015 *
            current_fleet_of_diesel_tractors *
            consommationTruck *
            nb_shift_per_day *
            avg_duration_per_shift *
            365
          ).toLocaleString()
        : "NAN",
    total_reduction_PM2:
      current_fleet_of_diesel_tractors !== "NAN" &&
      consommationTruck !== "NAN" &&
      nb_shift_per_day !== "NAN" &&
      avg_duration_per_shift !== "NAN"
        ? (
            0.000001 *
            current_fleet_of_diesel_tractors *
            consommationTruck *
            nb_shift_per_day *
            avg_duration_per_shift *
            365
          ).toLocaleString()
        : "NAN",
    total_carbon_credit_per_year:
      current_fleet_of_diesel_tractors !== "NAN" &&
      consommationTruck !== "NAN" &&
      nb_shift_per_day !== "NAN" &&
      avg_duration_per_shift !== "NAN"
        ? (
            0.027 *
            current_fleet_of_diesel_tractors *
            consommationTruck *
            nb_shift_per_day *
            avg_duration_per_shift *
            365 *
            100
          ).toLocaleString()
        : "NAN",
    maintenance_cost_per_vehicle_per_year:
      maintenance_cost_per_year_per_diesel_truck !== "NAN"
        ? (maintenance_cost_per_year_per_diesel_truck * 0.4).toLocaleString()
        : "NAN",
    maintenance_cost_per_fleet_per_year:
      maintenance_cost_per_year_per_diesel_truck !== "NAN"
        ? (
            maintenance_cost_per_year_per_diesel_truck *
            0.4 *
            current_fleet_of_diesel_tractors
          ).toLocaleString()
        : "NAN",
    consumption_electricity_kWh: "10",
    consumption_kWkm:
      Targeted_hours_of_operation_per_day !== "NAN" &&
      avg_distance_per_truck_per_day !== "NAN"
        ? (
            (10 * Targeted_hours_of_operation_per_day) /
            avg_distance_per_truck_per_day
          ).toLocaleString()
        : "NAN",
    consumption_kWcontainer:
      Targeted_hours_of_operation_per_day !== "NAN" &&
      current_fleet_of_diesel_tractors !== "NAN" &&
      avg_duration_per_shift !== "NAN" &&
      nb_shift_per_day !== "NAN"
        ? (
            (10 * Targeted_hours_of_operation_per_day) /
            (current_fleet_of_diesel_tractors *
              avg_nb_trips_per_shift *
              nb_shift_per_day)
          ).toLocaleString()
        : "NAN",
    consumption_kWh_per_ton:
      Targeted_hours_of_operation_per_day !== "NAN" &&
      avg_weight_per_trip !== "NAN" &&
      avg_duration_per_shift !== "NAN" &&
      nb_shift_per_day !== "NAN"
        ? (
            (10 * Targeted_hours_of_operation_per_day) /
            (avg_weight_per_trip * avg_nb_trips_per_shift * nb_shift_per_day)
          ).toLocaleString()
        : "NAN",
    //maint downtime per year per truck * trucks - (0.5*maintenence time per year per truck*trucks) for last question
    total_hours_reduction_of_maintenance_downtime:
      current_fleet_of_diesel_tractors !== "NAN" &&
      maintenence_downtime_per_year_per_diesel_truck !== "NAN"
        ? (
            maintenence_downtime_per_year_per_diesel_truck *
              current_fleet_of_diesel_tractors -
            (0.5 *
              maintenence_downtime_per_year_per_diesel_truck *
              current_fleet_of_diesel_tractors)
          ).toLocaleString()
        : "NAN",
  });

  try {
    doc.render();
  } catch (error) {
    errorHandler(error);
  }

  const buf = doc.getZip().generate({ type: "nodebuffer" });

  fs.writeFileSync(path.join("/tmp", "output.docx"), buf);

  // send email

  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.gmail_email,
      pass: process.env.gmail_app_pw,
    },
  });
  //   send the file as attachment
  const mailOptions = {
    from: process.env.gmail_email,
    to: req.body.email,
    subject: "Report generated for " + req.body.name,
    text: "Your Report",
    attachments: [
      {
        filename: "output.docx",
        path: path.join("/tmp", "output.docx"),
      },
    ],
  };
  const resultMail  = await transporter.sendMail(mailOptions);

  console.log(resultMail);
  if (resultMail.response.includes("250")) {
  res.status(200).json({ message: resultMail.messageId });
  }
  else {
    res.status(400).json({ message: "Error in sending mail" });
  }
};
