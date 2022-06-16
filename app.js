const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = ["Buy food", "Cook food", "Eat food"];
let workItems = [];

app.get("/", function (req, res) {
  var today = new Date();
  var day = "";
  
  // switch (today.getDay()) {
  //   case 0: day = "Sunday";
  //     break;
  //   case 1: day = "Monday";
  //     break;
  //   case 2: day = "Tuesday";
  //     break;
  //   case 3: day = "Wednesday";
  //     break;
  //   case 4: day = "Thursday";
  //     break;
  //   case 5: day = "Friday";
  //     break;
  //   case 6: day = "Saturday";
  //     break;
  // }
  // we can write the above code as 
  // var option = { weekday: "long" };
  // day = today.toLocaleDateString("en-US", option);
  
  let option = { weekday: "long", day: "numeric", month: "long" };
  day = today.toLocaleDateString("en-US", option);
  res.render("list", { listTitle: day, listItem: items });
});

app.get("/work", function (req, res) { 
  res.render("list", { listTitle: "Work List", listItem: workItems });
});

app.get("/about", function (req, res) { 
  res.render("about");
});

app.post("/", function (req, res) {
  if (req.body.list === "Work List") {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
    console.log(req.body);
  } else { 
    let item = req.body.newItem;
    items.push(item);
    console.log(items);
    res.redirect("/");
  }
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});