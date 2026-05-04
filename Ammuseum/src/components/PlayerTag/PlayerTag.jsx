import React from 'react'

function PlayerTag({player}) {
  return (
    <span 
        style={{
            backgroundColor:'#535f6753',
            color:'rgba(255,255,255,0.87)',
            display:'inline-block',
            margin:'4px',
            padding:'2px 10px',
            borderRadius:'100px',
            cursor:'default'
        }}
    >
        {player.username}
    </span>
  )
}

export default PlayerTag