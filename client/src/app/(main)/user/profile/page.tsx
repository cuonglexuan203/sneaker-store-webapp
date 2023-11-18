  import React from 'react';

  const UserProfile: React.FC = () => {
    return (
      <div className="bg-white p-6 rounded-xl shadow-xl mx-auto my-10 max-w-5xl">
        <div className="flex flex-wrap md:flex-nowrap">
          {/* Personal Information Section */}
          <div className="w-full md:w-3/5 p-4 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-700">Thông tin cá nhân</h2>
            <br/>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                  <div className="flex justify-center md:justify-start mb-4 md:mb-0">
                      <div className="w-24 h-24 rounded-full overflow-hidden bg-blue-100 flex justify-center items-center">
                          <span className="text-blue-300 font-bold">Avatar</span>
                      </div>
                  </div>
                  <div className="flex-grow">
                      <input type="text" placeholder="Họ & Tên" className="w-full p-2 border border-gray-300 rounded-md" />
                      
                      <input type="text" placeholder="Nickname" className="w-full p-2 border border-gray-300 rounded-md mt-3" />
                  </div>
            </div>
            <br/>
            <div className="flex flex-col md:flex-row gap-3 md:items-center">
              <label className="md:min-w-max">Date of birth:</label>
              <div className="flex-grow flex flex-col md:flex-row md:gap-3">
                <select className="p-2 border border-gray-300 rounded-md flex-grow mb-3 md:mb-0">
                  <option>Ngày</option>
                  {/* Add options for days */}
                </select>
                <select className="p-2 border border-gray-300 rounded-md flex-grow mb-3 md:mb-0">
                  <option>Tháng</option>
                  {/* Add options for months */}
                </select>
                <select className="p-2 border border-gray-300 rounded-md flex-grow">
                  <option>Năm</option>
                  {/* Add options for years */}
                </select>
              </div>
            </div>
            <br/> 
            <div className="flex flex-col md:flex-row gap-4 md:items-center">
              <label className="block mb-2 md:mb-0">Gender:</label>
              <div className="flex-grow flex flex-col md:flex-row md:gap-4">
                <label className="flex items-center mb-2 md:mb-0">
                  <input type="radio" name="gender" className="text-blue-600" />
                  Nam
                </label>
                <label className="flex items-center mb-2 md:mb-0">
                  <input type="radio" name="gender" className="text-blue-600" />
                  Nữ
                </label>
                <label className="flex items-center">
                  <input type="radio" name="gender" className="text-blue-600" />
                  Khác
                </label>
              </div>
            </div>
            <br />
            <select className="p-2 border border-gray-300 rounded-md w-full mb-3 md:mb-0">
              <option>Chọn quốc tịch</option>
            </select>
            <br />
            <div>
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Lưu thay đổi</button>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full md:w-px bg-gray-200 my-4 md:my-0 md:mx-4"></div>

          {/* Security Section */}
          <div className="w-full md:w-2/5 p-4 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-700">Security</h2>
            <button className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Delete Account</button>
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Change password</button>
          </div>
        </div>
      </div>
    );
  };

  export default UserProfile;
