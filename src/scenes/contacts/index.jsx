import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Contacts = () => {
  const theme = useTheme();
  const [userData, setUserData] = useState([]);
  const [editUser, setEditUser] = useState({
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    contact: '',
    address1: '',
    address2: ''
  });

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "firstname", headerName: "First Name", flex: 1 },
    { field: "lastname", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "contact", headerName: "Contact", flex: 1 },
    { field: "address1", headerName: "Address 1", flex: 1 },
    { field: "address2", headerName: "Address 2", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <span onClick={() => handleEdit(params.row)} style={{ cursor: 'pointer' }}><EditIcon /></span>
          <span onClick={() => handleDelete(params.row.id)} style={{ marginLeft: 10, cursor: 'pointer' }}><DeleteIcon /></span>
        </>
      )
    }
  ];

  // Fetch Users
  const fetchUsers = () => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const formattedData = data.data.map((user) => ({
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            contact: user.contact,
            address1: user.address1,
            address2: user.address2,
          }));
          setUserData(formattedData);
        }
      })
      .catch((err) => console.error("Error fetching users:", err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this user?")) {
      await fetch(`http://localhost:5000/api/users/${id}`, { method: "DELETE" });
      fetchUsers();
    }
  };

  // Handle Edit
  const handleEdit = (user) => {
    setEditUser({ ...user });
  };

  const handleEditSubmit = async () => {
    const { id, firstname, lastname, email, contact, address1, address2 } = editUser;
    await fetch(`http://localhost:5000/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstname, lastname, email, contact, address1, address2 })
    });
    setEditUser({
      id: '',
      firstname: '',
      lastname: '',
      email: '',
      contact: '',
      address1: '',
      address2: ''
    });
    fetchUsers();
  };

  return (
    <Box m="20px">
      <Header title="CONTACTS" subtitle="List of Contacts with Edit & Delete" />
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid rows={userData} columns={columns} components={{ Toolbar: GridToolbar }} />
      </Box>

      <Dialog open={editUser.id !== ''} onClose={() => setEditUser({
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        contact: '',
        address1: '',
        address2: ''
      })}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField label="First Name" fullWidth margin="dense"
            value={editUser.firstname}
            onChange={(e) => setEditUser(prev => ({ ...prev, firstname: e.target.value }))} />
          <TextField label="Last Name" fullWidth margin="dense"
            value={editUser.lastname}
            onChange={(e) => setEditUser(prev => ({ ...prev, lastname: e.target.value }))} />
          <TextField label="Email" fullWidth margin="dense"
            value={editUser.email}
            onChange={(e) => setEditUser(prev => ({ ...prev, email: e.target.value }))} />
          <TextField label="Contact" fullWidth margin="dense"
            value={editUser.contact}
            onChange={(e) => setEditUser(prev => ({ ...prev, contact: e.target.value }))} />
          <TextField label="Address 1" fullWidth margin="dense"
            value={editUser.address1}
            onChange={(e) => setEditUser(prev => ({ ...prev, address1: e.target.value }))} />
          <TextField label="Address 2" fullWidth margin="dense"
            value={editUser.address2}
            onChange={(e) => setEditUser(prev => ({ ...prev, address2: e.target.value }))} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditUser({
            id: '',
            firstname: '',
            lastname: '',
            email: '',
            contact: '',
            address1: '',
            address2: ''
          })}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Contacts;
