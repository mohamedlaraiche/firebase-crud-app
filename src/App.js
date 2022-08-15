import { useState } from "react";
import { Grid } from "@mui/material";
import Header from "./components/Header";
import { v4 as uuidv4 } from "uuid";
import Table from "./components/Table";
const App = () => {
  const [users, setUsers] = useState([]);
  const [id] = useState();

  return (
    <Grid className="container">
      <Header id={id} users={users} setUsers={setUsers} />
      <Table id={id} users={users} setUsers={setUsers} />
    </Grid>
  );
};

export default App;
