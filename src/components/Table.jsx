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
import CircularProgress from "@mui/material/CircularProgress";
import swal from "sweetalert";
import {
  collection,
  doc,
  deleteDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
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
function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const TableContent = ({ users, setUsers, id }) => {
  const [datas, setDatas] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ids, setIds] = useState("");
  const [progress, setProgress] = useState(10);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const databases = collection(db, "users");

  const deleteHandler = (ids) => {
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
        const docRef = doc(databases, ids);
        deleteDoc(docRef);
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  useEffect(() => {
    const snap = onSnapshot(databases, (snapshot) => {
      setDatas(
        snapshot.docs.map((data) => ({
          id: data.id,
          data: data.data(),
        }))
      );
    });
    return () => {
      snap();
    };
  }, []);

  const editBtnHandler = (id) => {
    setOpen(true);
    setIds(id);
  };
  const updateData = (id) => {
    const editRef = doc(db, "users", id);
    updateDoc(editRef, { name, email });
    setOpen(false);
    swal("Poof! Your imaginary file has been Updated!", {
      icon: "success",
    });
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress === 100 ? 100 : prevProgress + 5
      );
    }, 200);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      {progress === 100 ? (
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
                    {" "}
                    {data.data.name}
                  </TableCell>
                  <TableCell align="center"> {data.data.email} </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => {
                        editBtnHandler(data.id);
                      }}
                      variant="contained"
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => {
                        deleteHandler(data.id);
                      }}
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
      ) : (
        <Grid
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "60vh",
          }}
        >
          <CircularProgressWithLabel value={progress} />
        </Grid>
      )}

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
            onSubmit={(e) => {
              e.preventDefault();
              updateData(ids);
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input type="text" value={ids} readOnly hidden />
            <TextField
              style={{ width: "80%", margin: "15px" }}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              required
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              type="email"
              style={{ width: "80%", margin: "15px" }}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              required
              onChange={(e) => setEmail(e.target.value)}
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
              value="Edit"
            />
          </form>
        </Box>
      </Modal>
    </>
  );
};
export default TableContent;
