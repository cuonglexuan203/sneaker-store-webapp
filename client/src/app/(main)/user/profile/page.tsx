'use client';
import React, { useState } from 'react';

const UserProfile: React.FC = () => {
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
// State for phone number
const [isEditing, setIsEditing] = useState(false);
const [phoneNumber, setPhoneNumber] = useState('0335032697'); 
// State for email
const [isEditingEmail, setIsEditingEmail] = useState(false);
const [email, setEmail] = useState('trangiahuy@gmail.com'); 
//Handlers for phone number
const handleEdit = () => {
    setIsEditing(true); // Enable editing
  };

const handleSave = () => {
    setIsEditing(false); // Disable editing
    // Here you would also handle the saving of the data to the server or state management
  };

const handleChange = (e) => {
    setPhoneNumber(e.target.value); // Update phone number
  };
// Handlers for email
const handleEditEmail = () => {
  setIsEditingEmail(true);
};

const handleSaveEmail = () => {
  setIsEditingEmail(false);
  // Save email to server or state
};

const handleChangeEmail = (e) => {
  setEmail(e.target.value);
};

// // State for nationality
// const [nationality, setNationality] = useState('');
// List of nationalities (can be expanded)

const nationalities = ['American', 'British', 'Canadian', 'French', 'German', 'Indian', 'Japanese'];

// Handler for nationality change
const handleChangeNationality = (e) => {
  setNationality(e.target.value);
};

// State to store the selected avatar file
const [avatar, setAvatar] = useState(null);

// Handler to trigger the file input when avatar is clicked
const triggerFileInput = () => {
  document.getElementById('avatarInput').click();
};

// Handler to update the avatar when a file is selected
const handleAvatarChange = (e) => {
  if (e.target.files[0]) {
    setAvatar(URL.createObjectURL(e.target.files[0]));
  }
};

const [editMode, setEditMode] = useState(false);
const [fullName, setFullName] = useState('');
const [nickname, setNickname] = useState('');
const [dateOfBirth, setDateOfBirth] = useState({ day: '', month: '', year: '' });
const [gender, setGender] = useState('');
const [nationality, setNationality] = useState('');
const handleEditt = () => {
    setEditMode(true);
  };

  const handleSavee = () => {
    setEditMode(false);
    // Here, you would handle saving the data to a server or elsewhere
  };
  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };
  const handleChangeNickName = (e) => {
    setNickname(e.target.value); 
  };
  const handleChangeDateofBirth = (e) => {
    setDateOfBirth(e.target.value); 
  };
  const handleChangeGender = (e) => {
    setGender(e.target.value); 
  };

  const toggleEditMode = () => {
    setEditMode(prev => !prev);
  };

return (
    <div className="bg-white p-6 rounded-xl shadow-xl mx-auto my-10 max-w-5xl">
<div className="flex flex-wrap md:flex-nowrap">
        {/* Personal Information Section */}
        <div className="w-full md:w-3/5 p-4 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">Personal Information</h2>
          <br/>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                {/* Avatar section */}
                <div className="flex justify-center md:justify-start mb-4 md:mb-0">
                 <div
                  className="w-24 h-24 rounded-full overflow-hidden bg-blue-100 flex justify-center items-center cursor-pointer"
                  onClick={triggerFileInput} >
                  {avatar ? (
                  <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                  <span className="text-blue-300 font-bold">Avatar</span>
                  )}
          </div>
          <input
          type="file"
          id="avatarInput"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleAvatarChange}
          disabled={!editMode}
          />
        </div>
                <div className="flex-grow">
                    <input type="text" placeholder="Full Name " className="w-full p-2 border border-gray-300 rounded-md" disabled={!editMode} />
                    
                    <input type="text" placeholder="Nickname" className="w-full p-2 border border-gray-300 rounded-md mt-3" disabled={!editMode} />
                </div>
      </div>
          <br/>
      <div className="flex flex-col md:flex-row gap-3 md:items-center">
          <label className="md:min-w-max">Date of birth:</label>
            <div className="flex-grow flex flex-col md:flex-row md:gap-3">
              <select className="p-2 border border-gray-300 rounded-md flex-grow mb-3 md:mb-0" disabled={!editMode} >
                <option value="" ></option>
                  {days.map(day => (
                    <option key={day} value={day}>
                      {day}
                </option>
                
                  ))}
              </select>
              <select className="p-2 border border-gray-300 rounded-md flex-grow mb-3 md:mb-0" disabled={!editMode} >
                <option value=""></option>
                  {months.map((month, index) => (
                <option key={month} value={month}>
                  {month}
                </option>
                   ))}
              </select>
              <select className="p-2 border border-gray-300 rounded-md flex-grow" disabled={!editMode} >
                <option value=""></option>
                  {years.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
                    ))}            
              </select>
            </div>
          </div>
          <br/> 
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <label className="block mb-2 md:mb-0">Gender:</label>
            <div className="flex-grow flex flex-col md:flex-row md:gap-4">
              <label className="flex items-center mb-2 md:mb-0">
              <input type="radio" name="gender" className="text-blue-600 mr-1" disabled={!editMode} /> Male </label>
              <label className="flex items-center mb-2 md:mb-0">
                <input type="radio" name="gender" className="text-blue-600 mr-1" disabled={!editMode} /> Femal </label>
              <label className="flex items-center mb-2 md:mb-0">
                <input type="radio" name="gender" className="text-blue-600 mr-1" disabled={!editMode} /> Other </label>
            </div>
          </div>
          <br />
          <label htmlFor="nationality" className="block text-md font-medium text-gray-700">Choose Your Nationality:</label>
          <select
          id="nationality"
          value={nationality}
          onChange={handleChangeNationality}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          disabled={!editMode}
          >
          <option value="">Select a nationality</option>
          {nationalities.map((nat) => (
            <option key={nat} value={nat}>
              {nat}
            </option>
          ))}
        </select>
        <div>
          {editMode ? (
            <button onClick={handleSavee} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Save changes</button>
          ) : (
            <button onClick={handleEditt} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Edit</button>
          )}
        </div>
        </div>

        {/* Divider */}
        <div className="w-full md:w-px bg-gray-200 my-4 md:my-0 md:mx-4"></div>
        
        {/* Phone and Email */}
        <div className="w-full md:w-2/5 p-4 space-y-4">
        <div className="mb-4">
            <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">Phone Number:</label>
          <div className="mt-1 flex items-center rounded-md shadow-sm">
            <input type="tel" id="phone-number" className="flex-1 block w-full rounded-none rounded-l-md border-gray-300"
              placeholder="Your phone number"
              value={phoneNumber}
              onChange={handleChange}
              disabled={!isEditing} 
            />
          <button
          onClick={isEditing ? handleSave : handleEdit}
          className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-blue-500 text-white text-sm hover:bg-blue-600 font-medium"
          >
          {isEditing ? 'Save' : 'Update'} 
        </button>
      </div>
    </div>
          
          {/* Email Input */}
          <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email:
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="email"
            id="email"
            className="flex-1 block w-full rounded-none rounded-l-md border-gray-300"
            placeholder="Your email"
            value={email}
            onChange={handleChangeEmail}
            disabled={!isEditingEmail}
          />
          <button
            onClick={isEditingEmail ? handleSaveEmail : handleEditEmail}
            className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-blue-500 text-white text-sm hover:bg-blue-600 font-medium"
          >
            {isEditingEmail ? 'Save' : 'Update'}
          </button>
        </div>
        </div>
          
           {/* Security Section */}
           <div className="flex-grow">
            <h3 className="text-lg font-semibold mb-4">Security Section</h3>
            <button className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600  rounded w-full mb-2">
              Change password
             </button>                 {/* w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 */}
            <button className="bg-red-500 text-white px-4 py-2 hover:bg-red-600  rounded w-full">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;