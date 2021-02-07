import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 0px 20px 20px;
`

export const OrderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0px 10px 0px;
  padding-bottom: 10px;
  border-bottom: 1px solid #d3d3d3;
  width: 100%;
`

export const StyledTypography = styled(Typography)`
  letter-spacing: 3px;
  text-transform: uppercase;
  font-weight: bold;
`
export const OrderTypography = styled(Typography)`
  text-transform: uppercase;
  margin: -15px 0px 15px 20px;
  font-weight: bold;
`

export const StyledDivider = styled(Divider)`
  margin-bottom: 10px;
`

export const Image = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 2px;
  margin: 0px 10px 0px 10px;
`
export const Button = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 14px;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`

export const ItemAddress = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 0px 10px 20px;
`
