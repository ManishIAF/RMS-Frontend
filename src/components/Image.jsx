import React from 'react'
// import avatar from '../assates/profile.png'
import styles from '../styles/Username.module.css';
import Avatar from '@mui/material/Avatar';

function Image({Image,width,height,imageRadius}) {
  return (
    <div>
      <Avatar src={Image} className={styles.profile_img} alt='avatar' style={{width:width,height:height?height:width,borderRadius:imageRadius}}/>
    </div>
  )
}

export default Image