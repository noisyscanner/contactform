import React from 'react'
import ThemeContext from './ThemeContext'
import classes from './sass/loader.scss'

const Loader = () =>
  <ThemeContext.Consumer>
    { theme =>
      <div className={`${classes.spinner} ${theme.loaderClass}`}>
        <div />
        <div />
        <div />
      </div>
    }
  </ThemeContext.Consumer>

export default Loader
