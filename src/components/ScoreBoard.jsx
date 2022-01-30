import React from 'react'

const ScoreBoard = ({score, width}) => {
  const customStyle = {
    width: score+'%'
  }
  return (
    <div className='score-board' style={{width: width+'px'}}>
        <span className='score'>Score: {score}</span>
        <div className='bar' style={customStyle}></div>
    </div>
  )
}

export default ScoreBoard
