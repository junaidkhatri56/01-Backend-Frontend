import express from "express";
import cors from "cors"
const app = express();
const port = 3000;

app.use(cors())
app.use(express.json());

const arr = [];

app.get("/", (req, res) => {
  res.send("<h1>Hellow world</h1>");
});

// add todo
app.post("/todo", (req, res) => {
  const { title } = req.body;
  if (!title)
    return res.status(404).json({
      massage: "title is not found",
    });

  const obj = {
    title,
    id: Date.now(),
  };
  arr.push(obj);
  res.json({
    massage: "Add todo successfuly",
    todo: obj,
  });
});

// get todo

app.get("/todo", (req, res) => {
  res.json({
    todo: arr,
  });
});

// delete todo

app.delete("/todo/:id", (req, res) => {
  const { id } = req.params;

  const index = arr.findIndex((item) => item.id === +id);
  if (index === -1)
    return res.status(404).json({
      massage: "id not found",
    });

  arr.splice(index, 1);

  res.json({
    message: "todo deleted successfully",
  });
});


app.put("/todo/:id" , (req , res) => {
    const {title} = req.body;
     const { id } = req.params;
    const index = arr.findIndex((item) => item.id === +id);

    if(!title) return res.status(404).json({
        massage: "todo not found"
    })


    if (index === -1) return res.status(404).json({
        massage: "id not found"
    })

    arr[index].title = title

    res.json({
        massage: "eddited todo auccessfuly"
    })


})












app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
