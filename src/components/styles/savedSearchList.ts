import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  listItem: {
    border: '0.2px solid lightgrey',
    borderRadius: '0.5em',
  },
  listItemText: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    "& .MuiTypography-root": {
        fontFamily: 'Kanit',
        fontWeight: 500,
    }
  },
}));