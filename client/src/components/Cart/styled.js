import styled from 'styled-components'

export const Button = styled.button`
  border: none;
  outline: none;
  background-color: transparent;  
  cursor: pointer;
  height: 50px;
  display: flex;
  align-items: center;
  p {
    text-align: left;
    font-size: 16px;
  }
  :hover {
    text-decoration: underline;
  }
`
export const Price = styled.p`
  text-align: left;
  font-size: 20px;
  font-weight: 900;
  margin: 0;
  padding: 8px 8px 0px 8px;
`
export const AddButon = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 80px;
  height: 40px;
  border-top-left-radius: 25px;
  outline: none;
  cursor: pointer;
  color: #4ecca3;
  background-color: #393e46;
  border: none;
  font-weight: 900;
  transition: 0.3s ease-out;
  :hover{
    color: #393e46;
    background-color: #4ecca3;
    border-bottom-right-radius: 15px;
  }
`