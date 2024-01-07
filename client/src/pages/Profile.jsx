import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';

function Profile() {
  const filereF = useRef(null)
  const {currentUser} = useSelector(state=> state.user)
  const [file, setFile] = useState(undefined) //to save file we have used file, setFile
  const [filePer, setFilePer] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData]= useState({})

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
    }
    )
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7"> Profile </h1>
      <form className="flex flex-col gap-4">
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
        <input type="text" placeholder='username' id='username' className='border rounded-lg p-3' />
        <input type="email" placeholder='email' id='email' className='border rounded-lg p-3' />
        <input type="text" placeholder='password' id='password' className='border rounded-lg p-3' />
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>Update</button>
      </form>
      <div className="flex justify-between mt-4">
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  );
}

export default Profile