import styled from 'styled-components'
import { ListItem } from '@material-ui/core'

export const Wrapper = styled.div`
  margin-left: 45px;
`

export const TitleContainer = styled.div`
  margin-left: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 350px;
  p {
    font-weight: 500;
    text-transform: uppercase;
    font-size: 18px;
  }
`
export const Button = styled.button`
  outline: none;
  cursor: pointer;
  border: none;
  background: none;
`

export const FormContainer = styled.div`
  margin-left: 15px;
  max-width: 350px;
`

export const StyledListItem = styled(ListItem)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
export const Box = styled.div`
  display: flex;
  justify-content: space-between;
  width: 350px;
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  p {
    font-size: 12px;
    color: gray;
    margin-top: -1px;
  }
  strong {
    font-size: 14px;
  }
`
export const Review = styled.p`
  margin-top: -5px;
`