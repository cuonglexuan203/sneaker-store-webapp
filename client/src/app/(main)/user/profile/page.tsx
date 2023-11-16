import { GetServerSideProps } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { saveProfile, selectUserProfile } from '../redux/userSlice';

// Fetch user data server-side
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Replace with actual user data fetching logic
  const userData = {
    // Example user data
    name: 'John Doe',
    phone: '123-456-7890',
    email: 'john@example.com',
    address: '123 Main St',
  };

  return { props: { initialProfile: userData } };
};

type ProfileProps = {
  initialProfile: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
};

const UserProfile = ({ initialProfile }: ProfileProps) => {
  const dispatch = useDispatch();
  const userProfile = useSelector(selectUserProfile);
  const [profile, setProfile] = useState(initialProfile);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = async () => {
    dispatch(saveProfile(profile));
    // You would typically have some API call here to save the profile
  };

  // Additional methods for password change and account deletion would go here

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">User Profile</h1>
      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        {/* Repeat for other fields */}
        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
