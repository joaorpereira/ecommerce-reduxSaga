import { createMuiTheme } from '@material-ui/core/styles'
import palette from './palette'

const theme = createMuiTheme({
  palette,
  typography: {
    fontFamily: ['Open Sans', 'Roboto', 'sans-serif'].join(','),
  },
})

export default theme
