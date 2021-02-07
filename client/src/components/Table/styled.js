import styled from 'styled-components'

export const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border-bottom: 1px solid #393e4640;
    border-right: 1px solid #393e4640;
    border-left: 1px solid #393e4640;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;  
      border-bottom: 1px solid #393e4620;
      padding: 10px 20px;
    }
  }
`

export const Body = styled.tbody`
  width: 100%;
`

export const Head = styled.thead`
  width: 100%;
  background-color: #393e46;
  text-align: left;
  height: 100px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 900;
  letter-spacing: 1.1px;
`