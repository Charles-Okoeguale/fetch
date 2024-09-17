import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  "& .MuiTypography-h6": {
    flexGrow: 1,
    fontFamily: 'Kanit',
    fontWeight: 900,
  },
  button: {
    textTransform: 'none',
    fontFamily: 'Kanit',
    fontWeight: 500,
    fontSize: '1.2em',
  },
  activeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
  },
  drawer: {
    width: 240,
  },
  drawerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 3,
    alignItems: 'center',
  },
}));