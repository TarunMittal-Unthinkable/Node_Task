const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json()); //req.body
app.set('view engine','ejs');

app.set('views',__dirname+'/views');

app.use(express.urlencoded({extended:false}));
//Routes

//get all todos
app.get("/employee", async (req, res) => {
  try {
    const allemp = await pool.query("SELECT * FROM emp");
    res.render('layout',{emp:allemp.rows});
    
    
  } catch (err) {
    console.log(err.message);
  }
});

//get all todo
app.get("/employee/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const emp = await pool.query("SELECT * FROM emp WHERE emp_id=$1", [id]);
    res.json(emp.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//create all

app.post("/employee", async (req, res) => {
  try {
    const { emp_id } = req.body;
    const { name } = req.body;
    const { address } = req.body;
    const { mob_no } = req.body;
    const postemp1=`CALL postemp($1,$2,$3,$4)`;
    
    const newemp = await pool.query(postemp1, [emp_id, name, address,mob_no]);
   
    res.json(newemp.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//update all todo
app.put("/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const { address } = req.body;
    const { mob_no } = req.body;
    const update=`call upemp($1,$2,$3,$4)`;
    const updateemp = await pool.query(
      update,
      [id,name,address,mob_no]
    );
    res.json("emp was updated");
  } catch (err) {
    console.log(err.message);
  }
});

//delete all
app.delete("/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const del=`call delemp($1)`
    const deleteemp = await pool.query(del, [
      id,
    ]);
    res.json("emp was deleted");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(3000, () => {
  console.log("Server is listening");
});
