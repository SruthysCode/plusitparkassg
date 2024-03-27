const express = require("express");

const app = express();

const axios = require("axios");
const PORT = 3000;
const jwt = require("jsonwebtoken");

const URL = "https://dccbackend.plusitpark.com/api/admin/districtV4?";
app.listen(PORT, () => {
  console.log(`Server on port : http://localhost:${PORT}`);
});


app.get("/api/admin/districtV4", (req, res) => {
  console.log("hiii");
  const constituency = req.query?.constituency;
  const district = req.query?.district;
  const assembly = req.query?.assembly;
  const local = req.query?.local;

  console.log(constituency, district, assembly, local, "hjkl;");

  getdetails(district,constituency,assembly,local)




  if (district) {
    let URLS = URL + `district=` + district;
    console.log(URLS);

    console.log(district, "dist");

    axios
      .get(URLS)
      .then((response) => {
        // Log the fetched data
        console.log("from axi", response.data);
        res.send({
          data: response.data,
        });
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error fetching data:");
      });

    if (constituency) {
      URLS = URLS + `&constituency=` + constituency;
      console.log(URLS);

      axios
        .get(URLS)
        .then((response) => {
          // Log the fetched data
          console.log(response.data);
          res.send({
            data: response.data,
          });
        })
        .catch((error) => {
          // Handle any errors
          console.error("Error fetching data:");
        });
    }
   }

  //   axios
  //     .get(URL)
  //     .then((response) => {
  //       // Log the fetched data
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       // Handle any errors
  //       console.error("Error fetching data:", error);
  //     });
});

app.get("/api/admin/districtV4", (req, res) => {
  console.log("hmmm");

  const constituency = req.query?.constituency;
  const district = req.query?.district;
  const assembly = req.query?.assembly;
  const local = req.query?.local;

  console.log(constituency, district, assembly, local, "hjkl;");

  axios
    .get(URL)
    .then((response) => {
      // Log the fetched data
      console.log(response.data);
    })
    .catch((error) => {
      // Handle any errors
      console.error("Error fetching data:", error);
    });
});

app.get("/api/admin/districtV4", (req, res) => {
  try {
    const dist = req.query.district;

    if (dist == "THRISSUR") {
      datas = ["Thrissur"];
      res.send({
        data: datas,
      });
    }
  } catch (error) {
    res.send({
      status: 500,
      message: error.message,
    });
  }
});

app.get("/api/admin/districtV4/constituency", (req, res) => {
  const constituency = req.query.constituency;
  const district = req.query.district;
  let datas = [];
  if (district == "THRISSUR")
    datas = [
      "nattika",
      "ollur",
      "chelakkara",
      "kunnamkulam",
      "wadakkanchery",
      "guruvayur",
      "manalur",
      "thrissur",
      "puthukkad",
      "kaipamangalam",
      "chalakudy",
      "kodungallur",
      "irinjalakuda",
    ];
  if (district == "THRISSUR" && constituency == "OLLUR") {
    datas = ["Nadathara, Ollur, Mannuthy"];
  }
  res.send({
    data: datas,
  });
});

app.get("/api/admin/districtV4/assembly", (req, res) => {
  const constituency = req.query.constituency;
  const district = req.query.district;
  const assembly = req.query.assembly;

  if (
    district == "THRISSUR" &&
    constituency == "THRISSUR" &&
    assembly == "OLLUR"
  ) {
    errormsg = "Invalid parameters provided";
  }

  res.send({
    error: errormsg,
  });
});

app.get("/api/admin/districtV4/local", (req, res) => {
  const constituency = req.query.constituency;
  const district = req.query.district;
  const assembly = req.query.assembly;
  const local = req.query.local;

  if (
    district == "THRISSUR" &&
    constituency == "THRISSUR" &&
    assembly == "OLLUR" &&
    local == "NADATHARA"
  ) {
    errormsg = "Invalid parameters provided";
  }

  res.send({
    error: errormsg,
  });
});

app.post("/api/user/register", (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phoneNumber,
      date_of_birth,
      assembly,
      constituency,
      district,
      panchayath,
      municipality,
      corporation,
    } = req.body;

    // save to file/api
    const data = user.update();

    if (!data) {
      res.send({
        status: 500,
        message: "Data not updated",
      });
    } else {
      // token
      const token = jwt.sign({ name, email }, secret);

      res.send({
        status: 200,
        message: "User Registered",
        data: {
          token,
          user: {
            id: data.id,
            name: data.name,
          },
        },
      });
    }
  } catch (error) {
    res.send({
      status: 500,
      message: error.message,
    });
  }
});
