import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/fetch.hook';

function PasswordReset() {
    const {token} = useParams()
    const [{apiData}] = useFetch('passwordRecovery')
  console.log('token : ',token);
    return (
    <div style={{display:'flex',justifyContent:'center'}}>{`PassworsReset compo ${token} ${apiData}`}</div>
  )
}

export default PasswordReset