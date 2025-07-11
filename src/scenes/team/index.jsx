import { Box, Typography, useTheme, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const Team = () => {
  const theme = useTheme();
  const [teamData, setTeamData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [newData, setNewData] = useState(null);  // <-- For Add new member dialog

  const fetchTeam = () => {
    fetch("http://localhost:5000/api/team")
      .then(res => res.json())
      .then(data => setTeamData(data.data));
  };

  useEffect(() => { fetchTeam(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this member?")) {
      await fetch(`http://localhost:5000/api/team/${id}`, { method: "DELETE" });
      fetchTeam();
    }
  };

  const handleEdit = (row) => {
    setEditData(row);
  };

  const handleEditSubmit = async () => {
    await fetch(`http://localhost:5000/api/team/${editData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData)
    });
    setEditData(null);
    fetchTeam();
  };

  const handleAddSubmit = async () => {
    await fetch(`http://localhost:5000/api/team`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData)
    });
    setNewData(null);
    fetchTeam();
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "age", headerName: "Age", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "access", headerName: "Access Level", flex: 1 },
    {
      field: "actions", headerName: "Actions", flex: 1,
      renderCell: (params) => (
        <>
          <span style={{ cursor: 'pointer' }} onClick={() => handleEdit(params.row)}><EditIcon /></span>
          <span style={{ marginLeft: 10, cursor: 'pointer' }} onClick={() => handleDelete(params.row.id)}><DeleteIcon /></span>
        </>
      )
    }
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      
      <Button 
        variant="contained" 
        color="primary" 
        startIcon={<AddIcon />} 
        onClick={() => setNewData({ name: '', age: '', phone: '', email: '', access: '' })}
        style={{ marginBottom: '10px' }}
      >
        Add New Member
      </Button>

      <Box m="40px 0 0 0" height="75vh">
        <DataGrid rows={teamData} columns={columns} />
      </Box>

      {/* Edit Dialog */}
      <Dialog open={!!editData} onClose={() => setEditData(null)}>
        <DialogTitle>Edit Team Member</DialogTitle>
        <DialogContent>
          <TextField label="Name" fullWidth margin="dense" value={editData?.name || ""} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
          <TextField label="Age" fullWidth margin="dense" value={editData?.age || ""} onChange={(e) => setEditData({ ...editData, age: e.target.value })} />
          <TextField label="Phone" fullWidth margin="dense" value={editData?.phone || ""} onChange={(e) => setEditData({ ...editData, phone: e.target.value })} />
          <TextField label="Email" fullWidth margin="dense" value={editData?.email || ""} onChange={(e) => setEditData({ ...editData, email: e.target.value })} />
          <TextField label="Access" fullWidth margin="dense" value={editData?.access || ""} onChange={(e) => setEditData({ ...editData, access: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditData(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSubmit}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Add New Member Dialog */}
      <Dialog open={!!newData} onClose={() => setNewData(null)}>
        <DialogTitle>Add New Team Member</DialogTitle>
        <DialogContent>
          <TextField label="Name" fullWidth margin="dense" value={newData?.name || ""} onChange={(e) => setNewData({ ...newData, name: e.target.value })} />
          <TextField label="Age" fullWidth margin="dense" value={newData?.age || ""} onChange={(e) => setNewData({ ...newData, age: e.target.value })} />
          <TextField label="Phone" fullWidth margin="dense" value={newData?.phone || ""} onChange={(e) => setNewData({ ...newData, phone: e.target.value })} />
          <TextField label="Email" fullWidth margin="dense" value={newData?.email || ""} onChange={(e) => setNewData({ ...newData, email: e.target.value })} />
          <TextField label="Access" fullWidth margin="dense" value={newData?.access || ""} onChange={(e) => setNewData({ ...newData, access: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewData(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddSubmit}>Add</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default Team;
