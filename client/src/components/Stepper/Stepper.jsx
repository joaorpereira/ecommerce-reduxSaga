import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
}))

function getSteps() {
  return ['Sign In', 'Shipping', 'Payment', 'Place Order']
}

const StepperComponent = ({ activeStep }) => {
  const classes = useStyles()
  const steps = getSteps()

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}

export default StepperComponent
