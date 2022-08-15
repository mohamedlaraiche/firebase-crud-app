import { useState } from "react";
import { Grid, Typography, Button, Modal, Box, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import swal from "sweetalert";
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

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blueGrey[500]),
  backgroundColor: blueGrey[500],
  "&:hover": {
    backgroundColor: blueGrey[700],
  },
}));
const Header = ({ users, setUsers, id }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const databases = collection(db, "users");
  const submitHandler = (e) => {
    e.preventDefault();
    setUsers([...users, { name: name, email: email }]);
    addDoc(databases, { name, email })
      .then(swal("Good job!", "User has been added !", "success"))
      .catch((err) => swal(err.message));
    setOpen(false);
  };
  return (
    <>
      <Grid
        style={{
          height: "20vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4">Users List</Typography>
        <ColorButton onClick={handleOpen} variant="contained">
          Add user !
        </ColorButton>
      </Grid>
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
            Add new user
          </Typography>
          <form
            onSubmit={submitHandler}
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
              value="Add"
            />
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default Header;
