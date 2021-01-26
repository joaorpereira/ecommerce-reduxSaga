import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import CardContent from '@material-ui/core/CardContent'

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 0px 20px 20px;
`

export const OrderContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0px 10px 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #d3d3d3;
  width: 100%;
`

export const StyledTypography = styled(Typography)`
  letter-spacing: 3px;
  text-transform: uppercase;
  padding: 20px 15px 0px 15px;
`

export const StyledDivider = styled(Divider)`
  margin: 10px -20px;
  width: 400px;
`
export const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  margin-top: -10px;
  span {
    float: right;
  }
`
