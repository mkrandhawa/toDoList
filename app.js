//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//connecting to the mongo db server
mongoose.connect("mongodb+srv://mkrandhawa25020:test123@cluster0.zqem7jz.mongodb.net/todolistDB"); // connecting to online db server
/*-------------------------------------------- Mongoose -------------------------------------------------*/
//mongo schema 
const itemsSchema = new mongoose.Schema({
  name: String
});

//mongoose model based on the schema -  it is capital
const Item = mongoose.model("Item", itemsSchema);

//creating documents
const item1 = new Item({
  name: "Welcome to your todolist!"
});


const item2 = new Item({
  name: "Hit + button to add new item"
});


const item3 = new Item({
  name: "<--- Hit this to delete an item"
});

// array of the three documents that have been created above
const defaultItems = [item1, item2, item3];


//schema for list
const listSchema ={
  name : String,
  items: [itemsSchema]
};

// list model
const List = mongoose.model("List", listSchema);




//rendering Database items into the app - Root route 
app.get("/", function(req, res) {
  Item.find().then(function(itemsFound) {
    if(itemsFound.length ===0){   
        //inserting the items in the DB using the insertMany() with the callback function 
        Item.insertMany(defaultItems).then(function(err){
          if (err){
            console.log(err);
          }else{
            console.log("Task completed successfully");
          }
        });
        //redirect back to the root route and will not follow the if block
        res.redirect("/");
    }else{
          res.render("list", { listTitle: "Today", newListItems: itemsFound });
    }
  }).catch(function(err) {
    console.log(err);
  });
});


app.get("/:customListName", function(req, res) {
  const customList = _.capitalize(req.params.customListName);
  List.findOne({ name: customList })
    .then(function(foundList) {
      if (!foundList) {
        const list = new List({
          name: customList,
          items: defaultItems
        });
        res.redirect("/"+customList);
        return list.save();
      } else {
        res.render("list", { listTitle: foundList.name, newListItems: foundList.items });
      }
    })
    .then(function(savedList) {
      // If a new list was created, you can access it here with the variable `savedList`
      // Otherwise, this block will not be executed when the list already exists.
    })
    .catch(function(err) {
      // Handle any errors that occurred during the process
      console.error(err);
      // Send an error response to the client if needed
      res.status(500).send("Internal Server Error");
    });
    
});



// adding item into the list
app.post("/", function (req, res) {
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listName }).then(function (foundList) {
      foundList.items.push(item);
      foundList.save().then(function () {
        res.redirect("/" + listName);
      }).catch(function (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      });
    }).catch(function (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
  }
});


app.post("/delete", function(req, res){

  const checkedItemID = req.body.checkbox;
  const listName = req.body.listName;
  //deleting element form the default list
  if(listName==="Today"){
    Item.findByIdAndRemove(checkedItemID).then(function(err){
      if (!err){
        console.log("Successfully deleted checked item");
      }
      res.redirect("/");
    });
  }else{//deleting elements from the custom list
    List.findOneAndUpdate({name:listName}, {$pull:{items: {_id:checkedItemID}}}).then(function(err, foundList){
      if(!err){
        console.log("Success!");
      }
      res.redirect("/"+listName);
    });


  }

});
  
  



app.get("/about", function(req, res){
  res.render("about");
});



let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port, function() {
  console.log("Server started on port 3000");
});

//live website: https://mysterious-brushlands-35768-d8696a5d6c78.herokuapp.com/