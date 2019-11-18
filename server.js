const express = require("express");
const app = express();
const mongoose = require("mongoose");
const flash = require("express-flash");
const path = require("path");

app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost/meanexam", { useNewUrlParser: true });
app.use(express.static(__dirname + "/public/dist/public"));

const ReviewSchema = new mongoose.Schema({
    customer: { type: String, required: [true, "You need atleast 3 characters for customer"], minlength: [3, "You need atleast 3 characters for customer"] },
    star: { type: Number, required: [true, "Rating cannot be empty."], min: 1, max: 5 },
    desc: { type: String, required: [true, "You need atleast 3 characters for description"], minlength: [3, "You need atleast 3 characters for description"] }
}, {
    timestamps: true
});


const RestaurantSchema = new mongoose.Schema({
    name: { type: String, required: [true, "You need atleast 3 characters for NAME"], minlength: [3, "You need atleast 3 characters for NAME"], unique: true },
    cuisine: { type: String, required: [true, "You need atleast 3 characters for cuisine"], minlength: [3, "You need atleast 3 characters for cuisine"] },
    review: [ReviewSchema]
}, {
    timestamps: true
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
const Review = mongoose.model("Review", ReviewSchema);


app.get("/api", (req, res) => {
    Restaurant.find()
        .then(data => res.json({ msg: "Success", result: data }))
        .catch(err => res.json({ msg: "Error", err: err }));
});

app.get("/api/:id", (req, res) => {
    Restaurant.findOne({ _id: req.params.id }, null, { sort: { date_register: -1 } })
        .then(data => res.json({ msg: "Success", result: data }))
        .catch(err => res.json({ msg: "Error", err: err }));

});

app.post("/api", (req, res) => {
    Restaurant.create(req.body)
        .then(data => res.json({ msg: "Success", result: data }))
        .catch(err => res.json({ msg: "Error", err: err }))
});
// Edit Name
app.put("/api/:id", (req, res) => {
    Restaurant.update({ _id: req.params.id }, req.body, { runValidators: true })
        .then(data => res.json({ msg: "Success", result: data }))
        .catch(err => res.json({ msg: "Error", err: err }))
});

app.delete("/api/:id", (req, res) => {
    Restaurant.findOneAndRemove({ _id: req.params.id })
        .then(data => res.json({ msg: "Success", result: data }))
        .catch(err => res.json({ msg: "Error", err: err }));
});

//------------------------------------------
// Edit - Add Vote and Content
app.put("/api/:id/new", (req, res) => {
    console.log("***********", req.params.id)
    console.log(req.body.review)
    Restaurant.update({ _id: req.params.id }, { $push: { review: { customer: req.body.customer, star: req.body.star, desc: req.body.desc } } }, { runValidators: true })
        .then(data => res.json({ msg: "Success", result: data }))
        .catch(err => res.json({ msg: "Error", err: err }))
});
//---------------------------------------

app.all("*", (req, res) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
})

app.listen(8000, () => ("Listening on port 8000!!!"));