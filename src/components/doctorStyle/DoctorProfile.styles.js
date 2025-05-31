export const styles = {
  container: {
    backgroundColor: '#f5f7fa',
    minHeight: '100vh',
    p: 3
  },
  title: {
    fontWeight: 'bold',
    color: '#2e3b4a',
    mb: 3
  },
  paper: {
    p: 4,
    borderRadius: '16px',
    maxWidth: '800px',
    mx: 'auto',
    backgroundColor: 'white'
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    mb: 3
  },
  avatar: {
    width: 120,
    height: 120,
    border: '3px solid #4a90e2'
  },
  textField: {
    mb: 2
  },
  bioField: {
    mb: 3
  },
  divider: {
    my: 2
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  saveButton: {
    px: 4,
    py: 1.5,
    borderRadius: '8px',
    backgroundColor: '#4a90e2',
    '&:hover': {
      backgroundColor: '#3a80d2'
    }
  },
  modalContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
    textAlign: 'center'
  },
  successIcon: {
    color: '#4CAF50',
    fontSize: '60px',
    mb: 2
  },
  modalButton: {
    backgroundColor: '#4a90e2',
    '&:hover': {
      backgroundColor: '#3a80d2'
    }
  }
}; 