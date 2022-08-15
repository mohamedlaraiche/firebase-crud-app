import { useState } from "react";
import { Grid } from "@mui/material";
import Header from "./components/Header";
import Table from "./components/Table";
const App = () => {
  const [users, setUsers] = useState([]);
  return (
    <Grid className="container">
      <Header users={users} setUsers={setUsers} />
      <Table users={users} setUsers={setUsers} />
    </Grid>
  );
};

export default App;
