import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    container: {
      marginTop: '30%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      "& .MuiTypography-h5" : {
        fontFamily: 'Kanit',
        fontWeight: 700,
        marginBottom: 10
      }
    },
    form: {
      gap: 10,
      "& .MuiButton-root": {
      marginTop: 10,
      marginBottom: 2,
      color: 'white',
      textTransform: 'none',
      fontWeight: 700,
      fontFamily: 'Kanit',
      fontSize: '1.3em',
      height: '3em',
    },
    },
    textField: {
      fontFamily: 'Kanit',
      '& .MuiOutlinedInput-root': {
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'lightgrey',
      },
    },
    },
    
    progress: {
      color: 'white',
      fontSize: '0.4em',
    },
  });