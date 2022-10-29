import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'src/config/theme';

export default makeStyles(() =>
  createStyles({
    root: {
      height: 36,
      padding: '0 16px',
      textTransform: 'none',
      '& .MuiButton-label': {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 700,
      },
      background: '#005665',
      boxShadow: '0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)',
      '&:hover': {
        background: '#005665',
      },
    },
    disabled: {
      '& .MuiButton-label': {
        fontSize: 18,
        color: '#000',
        fontWeight: 700,
      },
      opacity: '1 !important',
      border: '1px solid transparent',
      textDecoration: 'none',
      backgroundColor: 'hsla(0, 0%, 100%, .8)',
      boxShadow: 'unset',
    },
    btnNoColor: {
      fontSize: 14,
      color: '#3C4250',
      background: '#fff',
      boxShadow: 'none',
      '&:hover': {
        background: '#f6f7f7',
      },
      '& .MuiButton-label': {
        fontSize: 14,
        color: '#3C4250',
      },
    },
    btnLarge: {
      backgroundColor: theme.mainColor,
      minWidth: 208,
      padding: '14px 25px',
    },
    btnMedium: {
      backgroundColor: theme.mainColor,
      minWidth: 173,
      padding: '14px 25px',
    },
    btnSmall: {
      backgroundColor: theme.mainColor,
      //minWidth: 148,
      padding: '8px 25px',
    },
    btnForgot: {
      fontSize: 14,
      backgroundColor: '#7d7f80',
      width: 220,
      '& .MuiButton-label': {
        fontSize: 14,
      },
      '&.Mui-disabled': {
        backgroundColor: 'rgba(0, 0, 0, .12)',
        '& .MuiButton-label': {
          fontSize: 14,
          color: 'rgba(0, 0, 0, .26)',
        },
      },
    },
    btnIcon: {
      backgroundColor: theme.mainColor,
      minWidth: 100,
      padding: '12px 21px',
      fontSize: 14,
      fontWeight: 700,
      whiteSpace: 'nowrap',
    },
    btnIconSmall: {
      backgroundColor: theme.mainColor,
      fontSize: 14,
      fontWeight: 700,
      width: '48px',
      height: '48px',
      margin: 0,
      borderRadius: 26,
    },
  }),
);

// // export default useStyles;
