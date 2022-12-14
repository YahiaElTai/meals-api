const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(json());
app.use(cors());

const generateRandomInteger = () => Math.floor(Math.random() * 10) + 1;

const prices = [
  "10.00",
  "12.45",
  "15.30",
  "20.50",
  "12.50",
  "32.00",
  "7.00",
  "40.00",
  "25.00",
  "29.00",
];

const API_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";

app.get("/", (req, res) => {
  res.send({ message: "Hi, I am the API." });
});

app.get("/api/meals", async (req, res) => {
  const breakfast = await axios.get(`${API_URL}Breakfast`);
  const vegetarian = await axios.get(`${API_URL}Vegetarian`);
  const vegan = await axios.get(`${API_URL}Vegan`);

  const allMeals = [
    ...breakfast.data.meals.map((meal) => ({ ...meal, category: "Breakfast" })),
    ...vegetarian.data.meals.map((meal) => ({
      ...meal,
      category: "Vegetarian",
    })),
    ...vegan.data.meals.map((meal) => ({ ...meal, category: "Vegan" })),
  ];

  const mealsWithPrices = allMeals.map((meal) => ({
    ...meal,
    price: prices[generateRandomInteger() - 1],
  }));

  res.send(mealsWithPrices);
});

app.get("/api/meals/:id", async (req, res) => {
  const meal = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${req.params.id}`
  );

  res.send(meal.data.meals[0]);
});

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
