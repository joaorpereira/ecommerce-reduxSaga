import React from 'react'
import { Box, makeStyles } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import PropTypes from 'prop-types'

const useStyles = makeStyles(() => ({
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '0px',
    marginTop: '-5px',
    padding: '0px 5px',
    width: '100%',
  },
}))

const Ratings = ({ stars, reviews }) => {
  const classes = useStyles()
  return (
    <Box className={classes.box}>
      <Rating name='read-only' value={stars} precision={0.5} readOnly size='small'/>
      <p style={{ color: '#c1c0b9', textAlign: 'left' }}>
        {reviews}
      </p>
    </Box>
  )
}

Ratings.propTypes = {
  stars: PropTypes.number.isRequired,
  reviews: PropTypes.string.isRequired,
}

export default Ratings
