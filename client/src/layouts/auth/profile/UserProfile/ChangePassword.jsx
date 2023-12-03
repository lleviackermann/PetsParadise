import React from 'react'
import { useState } from 'react'

const ChangePassword = () => {

    const [oldpass, setOldpass] = useState('')
    const [newpass, setNewpass] = useState('')

    const changeOldpass = (event) => {
        setOldpass(event.target.value)
    }

    const changeNewpass = (event) => {
        setNewpass(event.target.value)
    }

    const changePassword = (event) => {
        if(oldpass === newpass){
            event.preventDefault();
            alert("Both the passwords match")
        }
        else if(oldpass ==='' || newpass===''){
            event.preventDefault();
            alert("Please enter both the passwords")
        }
        else{
            event.preventDefault();
            alert('Should add functionality')
        }
    }

    return (
        <div className='accountsettings'>
            <h1 className='mainhead1'>Change Password</h1>

            <div className='form'>
                <div className='form-group'>
                    <label htmlFor='oldpass'>Old Password <span>*</span></label>
                    <input type="password" onChange={changeOldpass} value={oldpass}/>
                </div>

                <div className='form-group'>
                    <label htmlFor='newpass'>New Password <span>*</span></label>
                    <input type="password" onChange={changeNewpass} value={newpass}/>
                </div>
            </div>

            <button className='mainbutton1' onClick={changePassword}>Save Changes</button>
        </div>
    )
}

export default ChangePassword