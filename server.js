const express = require("express");
var axios = require("axios");
const app = express();
const cors = require("cors");

let counter = 0; // -------> test html
app.use(express.static("client")); // -------> test html

app.use(express.json());
let corsOptions = {
  //origin: "http://localhost:8081",
  origin: true, // เปิดหมด
  //origin: process.env.FRONTEND,
};
app.use(cors());
app.use(cors(corsOptions));

// mock data
const products = [
  {
    group: "1",
    id: "1001",
    name: "Node.js for Beginners",
    category: "Node",
    price: 990,
  },
  {
    group: "2",
    id: "1002",
    name: "React 101",
    category: "React",
    price: 3990,
  },
  {
    group: "3",
    id: "1003",
    name: "Getting started with MongoDB",
    category: "MongoDB",
    price: 199999,
  },
  {
    group: "3",
    id: "1004",
    name: "Getting started with MongoDB-abc",
    category: "MongoDB",
    price: 1990,
  },
];

app.get("/", (req, res) => {
  console.log("root page");
  res.json("root page");
});

app.get("/products", (req, res) => {
  res.json(products.price);
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const result = products.find((product) => product.id === id);
  console.log("result--> ", result.price);
  res.json(result.price);
});

app.get("/product_filter/:group", (req, res) => {
  const { group } = req.params;
  //const result = products.find((product) => product.group === group);
  const result = products.filter((products) => products.group === group);

  res.json(result);
});

app.post("/products", (req, res) => {
  const payload = req.body;
  console.log("payload===> ", payload);
  console.log("payload data===> ", payload.name);

  if (payload.name === "Taweesak Youthip") {
    res.json("Hi TAWEESAK");
  } else {
    res.json(payload);
  }
});

app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  res.json({ id });
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  res.json({ id });
});

//------------------------Test send to line
//Mock data
// test send msg line
// const data = JSON.stringify({
//   "to": "Uf89b7d96be96df69cffd2c58055e27a2",
//   "messages": [
//     {
//       id :001,
//       "type": "text",
//       "text" : "AAA",

//     },
//     {
//       id :002,
//       "type": "text",
//       "text" : "BBB"
//     },
//     {
//       id :003,
//       "type": "text",
//       "text" : "CCC"
//     }
//   ]
// });

app.get("/line", (req, res) => {
  res.send('"Hello World!" has been called ' + counter + " time(s).");
  console.log("time-> " + counter);
  ++counter;

  const data = JSON.stringify({
    to: "Uf89b7d96be96df69cffd2c58055e27a2",
    messages: [
      {
        type: "text",
        text: "ABCDE",
      },
    ],
  });

  var config = {
    method: "post",
    url: "https://api.line.me/v2/bot/message/push",
    headers: {
      Authorization:
        "Bearer xsgUbei16KZk5blnZblGamQmti1SBKFgLdl0+JGbYYaelm+w5gOaK4e2wUOsAgxULxw+uzttONSzUPtmgC5RFgyNTIRS3mjDpOe4sH0uHXxuC3n9HH9/f5v5S08WMEQgO5Y6LIHs8FVv8uFwu7LSYgdB04t89/1O/w1cDnyilFU=",
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
});
//---------------------
app.get("/line/:id", (req, res) => {
  res.send('"Hello World!" has been called ' + counter + " time(s).");
  console.log("time-> " + counter);
  ++counter;

  const { id } = req.params;
  //const result = products.find((data) => data.id === id);
  //console.log("req-> "+ req);
  console.log("id-> " + id);

  const data = JSON.stringify({
    to: "Uf89b7d96be96df69cffd2c58055e27a2",
    messages: [
      {
        type: "text",
        text: id,
      },
    ],
  });

  var config = {
    method: "post",
    url: "https://api.line.me/v2/bot/message/push",
    headers: {
      Authorization:
        "Bearer xsgUbei16KZk5blnZblGamQmti1SBKFgLdl0+JGbYYaelm+w5gOaK4e2wUOsAgxULxw+uzttONSzUPtmgC5RFgyNTIRS3mjDpOe4sH0uHXxuC3n9HH9/f5v5S08WMEQgO5Y6LIHs8FVv8uFwu7LSYgdB04t89/1O/w1cDnyilFU=",
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
});
//-------------------------END

//-------------------------END

// test get data from html
app.get("/text", (req, res) => {
  res.send('"Hello World!" has been called ' + counter + " time(s).");
  console.log("time-> " + counter);
  ++counter;
});

//-------------------------END
app.listen(9000, () => {
  console.log("Application is running on port 9000");
});
