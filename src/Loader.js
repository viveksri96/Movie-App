import React from 'react';
import loadingImage from './utils/loading.svg';


export const Loader = ({loading}) =>{
  console.log(loading);
  return(
    <div style={{width: '100%'}}>
      {!loading &&
        <div style={{ height:'500px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <img style={{width: '40px', height: '40px'}} src={loadingImage} />
        </div>
      }
    </div>
  );
}
