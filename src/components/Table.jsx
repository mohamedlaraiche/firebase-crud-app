/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
  TextField,
  Modal,
  Box,
} from "@mui/material";
import swal from "sweetalert";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 700,
  width: "80%",
  height: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const TableContent = ({ users }) => {
  const [datas, setDatas] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const editHandler = () => {
    setOpen(true);
  };
  const deleteHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
        console.log("deleted");
      } else {
        console.log("save");
        swal("Your imaginary file is safe!");
      }
    });
  };
  const databases = collection(db, "users");
  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(databases);
      setDatas(data.docs.map((doc) => doc.data()));
    };
    getData();
  }, []);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datas.map((data) => (
              <TableRow
                key={data.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {data.name}
                </TableCell>
                <TableCell align="center"> {data.email} </TableCell>
                <TableCell align="center">
                  <Button onClick={editHandler} variant="contained">
                    Edit
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    onClick={deleteHandler}
                    variant="contained"
                    color="error"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="center"> {user.email} </TableCell>
                <TableCell align="center">
                  <Button onClick={editHandler} variant="contained">
                    Edit
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    onClick={deleteHandler}
                    variant="contained"
                    color="error"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        style={{ padding: "40px" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid
            style={{
              display: "flex",
              justifyContent: "flex-end  ",
            }}
            item
          >
            <Button variant="contained" onClick={handleClose}>
              X
            </Button>
          </Grid>
          <Typography
            style={{ margin: "10px 0px 10px 10px" }}
            id="modal-modal-title"
            variant="h5"
            component="h2"
          >
            Edit user
          </Typography>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              style={{ width: "80%", margin: "15px" }}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              required
            />

            <TextField
              type="email"
              style={{ width: "80%", margin: "15px" }}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              required
            />

            <input
              style={{
                margin: "10px",
                padding: "15px",
                background: "#1976d2",
                color: "#fff",
                border: "none",
                fontWeight: 600,
                width: "40%",
                borderRadius: "3px",
              }}
              type="submit"
              value="Add"
            />
          </form>
        </Box>
      </Modal>
    </>
  );
};
export default TableContent;
