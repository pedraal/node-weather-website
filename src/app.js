const path = require("path")
const express = require("express")
const hbs = require("hbs")

const geocode = require("./utils/geocode")
const weather = require("./utils/weather")

const app = express()

//Define paths for Express config
const publicPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")

//Setup Handlebars engine and view location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicPath))

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Pierre GOLFIER"
  })
})

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "PG"
  })
})

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    message: "Just a random help paragraphe",
    name: "PG"
  })
})

app.get("/weather", (req, res) => {
  if (!req.query.address) return res.send({ error: "You must provide an address" })
  geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return res.send({ error: error })
    }
    weather(longitude, latitude, (error, data) => {
      if (error) {
        return res.send({ error: error })
      }
      res.send({
        address: req.query.address,
        location,
        forecast: data
      })
    })
  })
})

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    errorMessage: "Help article not found",
    name: "PG"
  })
})

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    errorMessage: "Page not found",
    name: "PG"
  })
})

app.listen(3000, () => {
  console.log("Server is up on port 3000.")
})
