import { Grid } from "@mui/material";
import Header from "./components/Header";
import Table from "./components/Table";
const App = () => {
  return (
    <Grid className="container">
      <Header />
      <Table />
    </Grid>
  );
};

export default App;
