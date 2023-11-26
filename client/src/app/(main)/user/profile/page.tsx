'use client';
import React, { useState } from 'react';

const UserProfile: React.FC = () => {
const [isEditing, setIsEditing] = useState(false);
const [phoneNumber, setPhoneNumber] = useState('0335032697'); 
const [birthday, setBirthday] = useState("");
const [editMode, setEditMode] = useState(false);
const countries = ["United States", "Canada", "France", "Germany"];
const [country, setCountry] = useState("");
const [city, setCity] = useState("");
const [district, setDistrict] = useState("");
const [isEditingEmail, setIsEditingEmail] = useState(false);
const [email, setEmail] = useState('trangiahuy@gmail.com'); 
const [emailError, setEmailError] = useState('');
const [avatar, setAvatar] = useState<string | null>(null);
const [showChangePassword, setShowChangePassword] = useState(false);
const [newPassword, setNewPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [isButtonActive, setIsButtonActive] = useState(false);

 // Handler to toggle password change form
const handleToggleChangePassword = () => {
  setShowChangePassword(!showChangePassword);
};
const checkButtonActive = (newPass: string, confirmPass: string) => {
  setIsButtonActive(newPass.length > 0 && confirmPass.length > 0 && newPass === confirmPass);
};
const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    checkButtonActive(e.target.value, confirmPassword);
};
const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setConfirmPassword(e.target.value);
  checkButtonActive(newPassword, e.target.value);
};
const handleSubmit = () => {
  if (isButtonActive) {
    console.log('New password is set.');
  }
};
const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
const [isPasswordVisible, setIsPasswordVisible] = useState(false);
const handleEdit = () => {
    setIsEditing(true); // Enable editing
  };
const handleSave = () => {
  setIsEditing(false); // Disable editing
  // Here you would also handle the saving of the data to the server or state management
};
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value); // Update phone number
};
// Handlers for email
const handleEditEmail = () => {
  setIsEditingEmail(true);
};
const handleSaveEmail = () => {
  if (validateEmail(email)) {
    // Replace with your save logic
    setIsEditingEmail(false);
    setEmailError("");
  } else {
    setEmailError("Please enter a valid email address to save.");
  }
};
const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
  const emailInput = e.target.value;
  setEmail(emailInput);

  if (validateEmail(emailInput) || emailInput === "") {
    setEmailError("");
  } else {
    setEmailError("Please enter a valid email address.");
  }
};
const triggerFileInput = () => {
const fileInput = document.getElementById('avatarInput') as HTMLInputElement;
  fileInput?.click();
};
const [showDeleteModal, setShowDeleteModal] = useState(false);
const handleDeleteAccount = () => {
  console.log('Account deletion confirmed.');
  setShowDeleteModal(false); 
};
const handleCancelDelete = () => {
  setShowDeleteModal(false); 
};
const handleOpenDeleteModal = () => {
  setShowDeleteModal(true); 
};
const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  // Check if files is not null and has at least one file
  if (e.target.files && e.target.files.length > 0) {
    setAvatar(URL.createObjectURL(e.target.files[0]));
  } else {
    // Handle the case where no file is selected
    setAvatar(null);
  }
};
const handleEditt = () => {
    setEditMode(true);
  };

const handleSavee = () => {
    setEditMode(false);
    // Here, you would handle saving the data to a server or elsewhere
};
const countryCities: { [country: string]: string[] } = {
      "United States": ["New York", "Los Angeles", "Chicago"],
      Canada: ["Toronto", "Vancouver", "Montreal"],
      France: ["Paris", "Lyon", "Marseille"],
      Germany: ["Berlin", "Munich", "Frankfurt"],
};
const cities = countryCities[country] || [];
const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    setCountry(selectedOption);
};
const buttonClass = isButtonActive
  ? "bg-blue-600 hover:bg-red-700 cursor-pointer"
  : "bg-red-500 cursor-not-allowed";

  if (showChangePassword) {
    return (
    <div className="bg-white p-6 rounded-xl shadow-xl mx-auto my-10 max-w-2xl">
    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Changing The Password</h2>
    <div className="form-group mb-4">
      <label className="text-md text-gray-700 font-semibold">New Password</label>
      <div className="relative w-full">
        <input
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder="New Password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          className="mt-1 block w-full pl-3 pr-12 py-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-red-300"
        />
          <small className="block mt-1 text-sm text-gray-600">
            Your password is required including 32 digits, words and numbers.
          </small>
      </div>
    </div>
        <div className="form-group mb-6">
          <label className="text-md text-gray-700 font-semibold">Reinput Your Password</label>
          <input
            type="password"
            placeholder="Reinput New password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="mt-1 block w-full pl-3 pr-12 py-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-red-300"/>
          </div>
          <div>
            <button 
            onClick={handleSubmit}
className={`w-full text-lg font-medium px-4 py-3 rounded-md text-white ${buttonClass}`}
            disabled={!isButtonActive}>
            Save changes
            </button>
          </div>
      </div>
    );
  }

  if (showDeleteModal) {
    return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg z-50">
        <h3 className="text-lg font-semibold mb-4">Do you want to delete the account?</h3>
        <div className="flex justify-around">
          <button 
            onClick={handleDeleteAccount}
            className="bg-red-500 text-white px-4 py-2 hover:bg-red-600 rounded-md">
            Yes
          </button>
          <button 
            onClick={handleCancelDelete}
            className="bg-gray-500 text-white px-4 py-2 hover:bg-gray-600 rounded-md">
            No
          </button>
        </div>
      </div>
    </div>
    )
  };

return (
    <div className="bg-white p-6 rounded-xl shadow-xl mx-auto my-10 max-w-6xl">
      <div className="flex flex-wrap md:flex-nowrap">
        {/* Personal Information Section */}
        <div className="w-full md:w-4/5 p-4 space-y-4">
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
          <div className="w-full">
          <input
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
type="date"
                        disabled={!editMode}
                        className="block w-full px-5 py-3 mt-2 bg-white border border-gray-200 rounded-md"
                    />
          </div>
      </div>
          <br/> 
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
             <label className="block mb-2 md:mb-0">Gender:</label>
             <div className="flex-grow flex flex-col lg:flex-row md:gap-4">
              <label className="flex items-center mb-2 lg:mb-0">
              <input type="radio" name="gender" className="text-blue-600 mr-1" disabled={!editMode} /> Male </label>
              <label className="flex items-center mb-2 lg:mb-0">
                <input type="radio" name="gender" className="text-blue-600 mr-1" disabled={!editMode} /> Female </label>
              <label className="flex items-center mb-2 lg:mb-0">
                <input type="radio" name="gender" className="text-blue-600 mr-1" disabled={!editMode} /> Other </label>
            </div>
          </div>
          <br />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" >
                {/* Address Fields */}
                <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Country
                    </label>
                    <select
                        disabled={!editMode}
                        value={country}
                        onChange={handleCountryChange}
                        required
                        className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    >
                        <option value="" disabled selected>
                            Select a country
                        </option>
                        {countries.map((countryName, index) => (
                            <option key={index} value={countryName}>
                                {countryName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* City select dropdown */}
                <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        City
                    </label>
                    <select
                        value={city}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setCity(e.target.value)
                        }
                        required
                       
                        disabled={!editMode}
className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    >
                        <option value="">
                            {country.length > 0
                                ? "Select a city"
                                : "Select countries first"}
                        </option>
                        {cities.map((city, index) => (
                            <option key={index} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        District
                    </label>
                    <input
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        required
                        type="text"
                        placeholder="7597 Jessica Mountains "
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        disabled={!editMode}
                    />
                </div>
            </div>
        
        <div>
          {editMode ? (
            <button onClick={handleSavee} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Save changes</button>
          ) : (
            <button onClick={handleEditt} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Edit</button>
          )}
        </div>
        </div>

        {/* Divider */}
        <div className="w-full md:w-px bg-gray-200 my-4 lg:my-0 md:mx-4"></div>
        
        {/* Phone and Email */}
        <div className="w-full md:w-2/5 p-4 space-y-4">
        <div className="mb-4">
            <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">Phone Number:</label>
          <div className="mt-1 flex rounded-md shadow-sm">
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
        {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
    </div>

           {/* Security Section */}
    <div className="flex-grow">
         <h3 className="text-lg font-semibold mb-4">Security Section</h3>
            <button 
              onClick={handleToggleChangePassword} 
              className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600  rounded-md w-full mb-2">
              Change password
            </button>                 {/* w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 */}
            <button 
              onClick={handleOpenDeleteModal}
              className="bg-red-500 text-white px-4 py-2 hover:bg-red-600  rounded-md w-full mb-2">
              Delete Account
            </button>
          </div>
        </div>
    </div>
  </div>
);
}
export default UserProfile;