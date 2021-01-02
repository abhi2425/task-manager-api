// const mongodb = require("mongodb")
// const MongoClient = mongodb.MongoClient;
// const ObjectId= mongodb.ObjectID;
const { MongoClient, ObjectId } = require("mongodb");

const id = new ObjectId();
// console.log(id);
// console.log(id.getTimestamp())
// console.log(id.id);
// console.log(id.id.length)
// console.log(id.toHexString().length)

const connectionURL = "mongodb://127.0.0.1/27017";
const databaseName = "task-manager";
MongoClient.connect(
  connectionURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error, client) => {
    if (error) {
      return console.log("Unable to Connect to Database");
    }
    console.log("Connected!");
    const db = client.db(databaseName);

    /* ---CREATING */
    db.collection("users")
      .insertOne({
        name: "Rohit",
        u_id: 24,
        age: 19,
        _id: id,
      })
      .then((result) => {
        console.log(result.ops);
      });

    // db.collection("users").insertMany([{
    //         name: "Abhinav",
    //         u_id: 05,
    //         age: 20
    //     }, {
    //         name: "Rajesh",
    //         u_id: 33,
    //         age: 26
    //     }],
    //     (error, result) => {
    //         if (error) {
    //             return console.log("Unable to Insert User");
    //         }
    //         console.log(result.ops);
    //     })
    // db.collection("school").insertMany([{
    //         name: "MOSSS",
    //         rank: 3,
    //         total_Students: 3060
    //     },
    //     {
    //         name: "Apex",
    //         rank: 3,
    //         total_students: 2067
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log("Unable to Insert Document")
    //     }
    //     console.log(result.ops)
    // })

    /*    //---READING---//
    db.collection("users").findOne({ _id: new ObjectId("5ef089a63b43551488127d70") }, (error, name) => {
        if (error) {
            return console.log("Name Is Not Found")
        }
        console.log(name)
    })
    db.collection("school").find({ rank: 3 }).toArray((error, data) => {
        if (error) {
            return console.log("Data Not Found")
        }
        console.log(data)
    })
    db.collection("school").find({ rank: 3 }).count((error, data) => {
        if (error) {
            return console.log("Not Counted")
        }
        console.log(data)
    })*/

    //---UPDATING
    /*
    const updatePromise = db.collection("users").updateOne({
        _id: new ObjectId("5ef089a63b43551488127d70")
    }, {
        $set: {
            name: "mike"
        }
    })
    updatePromise.then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
*/

    /* ---ANOTHER SYNTAX __FOR UPDATING ----*/
    // db.collection("users").updateOne({
    //     _id: new ObjectId("5ef089a63b43551488127d70")
    // }, {
    //     $set: {
    //         name: "mike"
    //     },
    //     $inc: {
    //         age: 6
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection("users").updateMany({
    //     age: 19
    // }, {
    //     $set: {
    //         u_id: 07
    //     }
    // }).then((result) => {
    //     console.log(result.matchedCount);
    // }).catch((error) => {
    //     console.log("Not Updated!!!")
    // })

    //------DELETE--------//

    // db.collection("users").deleteMany({
    //     u_id: 7
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
  }
);
