import React from 'react'
import Loader from 'react-loader-spinner'

function Spinner({data}) {
    return (
        <div style={{
            position:"fixed",
            top:'0px',
            left:"0px",
            zIndex:100,
            width:'100%',
            height:'100%',
            textAlign:"center",
            backgroundColor:"rgba(0,0,0,0.4)",
            display:data===true?'block':'none',
            justifyContent:"center"
          }}>
          <Loader
             type="Puff"
             color="#00BFFF"
             height={100}
             width={100}
             style={{
                width:'100px',
                margin:"auto",marginTop:"20%"
              }}
          />
          </div>
    )
}

export default Spinner
