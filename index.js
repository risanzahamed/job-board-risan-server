require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.h3zxwhp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const run = async () => {
  try {
    const db = client.db("job-board-risan");
    const jobCollection = db.collection("jobsList");
    const fresherjobCollection = db.collection("fresherJobs");
    const expertjobCollection = db.collection("expertJobs");
    const companiesz = db.collection("companies");
    const jobCategoriez = db.collection("jobCategories");
    const allJobsByCategory = db.collection("allJobsByCategory");


    app.get("/jobs", async (req, res) => {
      const cursor = jobCollection.find({});
      const result = await cursor.toArray();
      res.send({ status: true, data: result });
    });

    app.get("/fresher-jobs", async (req, res) => {
      const cursor = fresherjobCollection.find({});
      const result = await cursor.toArray();
      res.send({ status: true, data: result });
    });

    app.get("/expert-jobs", async (req, res) => {
      const cursor = expertjobCollection.find({});
      const result = await cursor.toArray();
      res.send({ status: true, data: result });
    });

    app.get("/companies", async (req, res) => {
      const cursor = companiesz.find({});
      const result = await cursor.toArray();
      res.send({ status: true, data: result });
    });

    app.get("/job-categorioes", async (req, res) => {
      const cursor = jobCategoriez.find({});
      const result = await cursor.toArray();
      res.send({ status: true, data: result });
    });

    app.get("/alljobs", async (req, res) => {
      const cursor = allJobsByCategory.find({});
      const result = await cursor.toArray();
      res.send({ status: true, data: result });
    });

    app.get('/alljobs/:id', async (req, res) => {
      const id = req.params.id
      const query = { category: id }
      const jobs = await allJobsByCategory.find(query).toArray()
      res.send(jobs)
    })
  } finally {
  }
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
