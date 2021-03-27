import React from 'react'
import Ratings from '../../../components/Ratings/Ratings'
import {
  FormControl,
  InputLabel,
  List,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'
import AddCommentRoundedIcon from '@material-ui/icons/AddCommentRounded'
import AddCommentOutlinedIcon from '@material-ui/icons/AddCommentOutlined'
import Button from '../../../components/Button/Button'
import * as S from './styled'
import { format } from 'date-fns'

function Reviews({
  product,
  isLoggedIn,
  rating,
  setRating,
  comment,
  setComment,
  open,
  setOpen,
  addReviewHandler,
}) {
  const classes = useStyles()

  const formatDate = date => {
    return format(new Date(date), 'dd/MM/yyyy')
  }

  return (
    <S.Wrapper>
      <S.TitleContainer>
        <p>Reviews</p>
        {isLoggedIn && (
          <S.Button onClick={() => setOpen(!open)}>
            {!open ? <AddCommentRoundedIcon /> : <AddCommentOutlinedIcon />}
          </S.Button>
        )}
      </S.TitleContainer>
      {product.reviews.length === 0 && (
        <p style={{ marginLeft: '15px' }}>No Reviews</p>
      )}
      {!open && (
        <List>
          {product.reviews.map(review => (
            <S.StyledListItem key={review._id}>
              <S.Box>
                <S.Info>
                  <strong>{review.name}</strong>
                  <p>{formatDate(review.createdAt.substring(0, 10))}</p>
                </S.Info>
                <div>
                  <Ratings stars={review.rating} />
                </div>
              </S.Box>
              <S.Review>{review.comment}</S.Review>
            </S.StyledListItem>
          ))}
        </List>
      )}
      {open && isLoggedIn && (
        <S.FormContainer>
          <FormControl variant='outlined' margin='dense' fullWidth>
            <InputLabel id='rating'>Rating</InputLabel>
            <Select
              labelId='rating'
              value={rating}
              onChange={e => setRating(e.target.value)}
              label='Rating'
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
          <TextField
            variant='outlined'
            margin='dense'
            multiline
            rows={4}
            maxRows={6}
            fullWidth
            label='Comment'
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          <Button
            className={classes.button}
            style={{ marginTop: '10px' }}
            variant='contained'
            color='secondary'
            fullWidth
            size='medium'
            disabled={(rating && rating.length) > 0 && (comment && comment.length) > 0}
            onClick={addReviewHandler}
          >
            Add Review
          </Button>
        </S.FormContainer>
      )}
    </S.Wrapper>
  )
}

const useStyles = makeStyles({
  button: {
    marginTop: '-10px',
    boxShadow: 'none',
    color: '#fff',
    fontWeight: 900,
  },
})

export default Reviews
