import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
import { updateStart, updateFailure, updateSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, signOutUserFailure, signOutUserSuccess } from '../Redux/user/userSlice';
import { useDispatch } from 'react-redux';

function Profile() {
  const filereF = useRef(null)
  const {currentUser, loading, error} = useSelector(state=> state.user)
  const [file, setFile] = useState(undefined) //to save file we have used file, setFile
  const [filePer, setFilePer] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData]= useState({})
  const dispatch = useDispatch()
  const [updatedSuccess, setUpdatedSuccess] = useState(false)

  useEffect(()=>{
    if(file) {
      handleFileUpload(file)
    }
  }, [file]);

  const handleFileUpload =  (file)=>{
    const storage = getStorage(app);
    const fileNAme = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileNAme);
    const uploadTask = uploadBytesResumable(storageRef, file); // uploadBytesResumable shows the uploading percentage

    uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
     setFilePer(Math.round(progress))
    },
    (error)=>{
      setFileUploadError(true)
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then(
        (downloadUrl)=>{
          setFormData({...formData, avatar: downloadUrl})
        }
      )
    },
    );
  };

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      dispatch(updateStart());
      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json()
      if (data.success === false){
        dispatch(updateFailure(data.message));
        return
      }

      dispatch(updateSuccess(data))
      setUpdatedSuccess(true)
    } catch (error) {
      dispatch(updateFailure(error.message))
    }
  };

  const handleDeleteUser = async ()=>{
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`api/user/delete/${currentUser._id}`,{
        method: 'DELETE'
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(deleteUserFailure(data.message));
        return
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  };

  const handleSignOut = async (e)=>{
    e.preventDefault()
    dispatch(signOutUserStart())

    try {
      const res = await fetch('api/auth/signout')
      const data = await res.json();
      if(data.success === false){
        dispatch(signOutUserFailure(data));
        return
      }
      dispatch(signOutUserSuccess(data))
    } catch (error) {
      dispatch(signOutUserFailure(error.message))
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7"> Profile </h1>
      <form className="flex flex-col gap-4"
      onSubmit={handleSubmit}>
        <input
        onChange={(e)=> setFile(e.target.files[0])}
        type="file" 
        ref={filereF} 
        hidden 
        accept='image/*'
        />
        <img
        onClick={()=> filereF.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="self-center h-24 w-24 rounded-full object-cover mt-2 cursor-pointer "
        />
        <p className='text-sm self-center'>
        {
        fileUploadError ? (<span className='text-red-700'>Error Image Upload. Please Try again....</span>) : filePer> 0 && filePer<100 ? (<span className='text-orange-700'>{`Uploading ${filePer}%`}</span>)
        : filePer===100 ? (<span className='text-green-700'> Image Successfully Uploaded!</span>) :
      ""}
        </p>
        <input type="text" placeholder='username' id='username' className='border rounded-lg p-3' defaultValue={currentUser.username} onChange={handleChange}/>
        <input type="email" placeholder='email' id='email' className='border rounded-lg p-3' defaultValue={currentUser.email} onChange={handleChange}/>
        <input type="password" placeholder='password' id='password' className='border rounded-lg p-3'onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>{
          loading ? 'Loading...' : 'Update'
        }
        </button>
      </form>
      <div className="flex justify-between mt-4">
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut}className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
      <p className='text-red-700 mt-5'>
        {error ? error : ''}
      </p>
      <p className='text-green-700 mt-5'>
        {updatedSuccess ? "User updated successfully" : ''}
      </p>
    </div>
  );
}

export default Profile