import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ProfilePage = () => {

   const { authUser, updateProfile } = useContext(AuthContext);

   const navigate = useNavigate();
   const [selectedImg, setSelectedImg] = useState(null);
   const [name, setName] = useState(authUser.fullName);
   const [bio, setBio] = useState(authUser.bio);


   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!selectedImg) {
         await updateProfile({ fullName: name, bio });
         navigate('/');
         return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(selectedImg);
      reader.onload = async () => {
         const base64Image = reader.result;
         await updateProfile({ profilePic: base64Image, fullName: name, bio });
         navigate('/');
      }
   }



   return (
      <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
         <div className='profile-container'>

            <form className='flex flex-col gap-5 p-10 flex-1' onSubmit={handleSubmit}>
               <h3 className='text-lg'>Profile Details</h3>
               <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
                  <input onChange={(e) => setSelectedImg(e.target.files[0])} type="file" id="avatar" accept='.png,.jpg,.jpeg' hidden />
                  <img src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon} alt="" className={`w-12 h-12 ${selectedImg && 'rounded-full'}`} />
                  Upload Profile Image
               </label>

               <input type="text" required placeholder='Your Name' className='i-p'
                  onChange={(e) => setName(e.target.value)} value={name} />

               <textarea onChange={(e) => setBio(e.target.value)} value={bio} placeholder='Write Profile Bio' required className='i-p' rows={4}></textarea>

               <button className='btn-sub' type='submit'>Save</button>
            </form>

            <img src={authUser?.profilePic || assets.logo_icon} alt=""
               className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 
                  ${selectedImg && 'rounded - full'}`} />

         </div>
      </div>
   )
}

export default ProfilePage
