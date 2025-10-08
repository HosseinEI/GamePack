import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import axiosClient from '../api/axiosClient';
import Loader from '../components/Loader';
import { User } from '../types';

const Profile = () => {
  const { user } = useAuthStore();
  const [profileData, setProfileData] = useState<Partial<User>>({});
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');


  useEffect(() => {
    if (user) {
      // Use the profile data from Zustand store initially
      setProfileData(user);
      setLoading(false);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedAvatar(e.target.files[0]);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    const formData = new FormData();

    if (profileData.email) formData.append('email', profileData.email);
    if (profileData.bio) formData.append('bio', profileData.bio);
    if (selectedAvatar) {
      formData.append('avatar', selectedAvatar);
    }

    try {
      const response = await axiosClient.patch('/profile/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      useAuthStore.setState({ user: response.data });
      setMessage('Profile updated successfully!');
      setIsEditing(false);
      setSelectedAvatar(null);
    } catch (error) {
      setMessage('Failed to update profile.');
      console.error(error);
    }
  };

  if (loading || !user) return <Loader />;

  return (
    <div className="max-w-xl mx-auto bg-light-gray p-8 rounded-xl shadow-2xl">
      <h1 className="text-4xl font-display mb-6 text-primary">Your Profile</h1>
      {message && <p className={`p-3 rounded mb-4 ${message.includes('success') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{message}</p>}

      <div className="text-center mb-6">
        <img src={user.avatar || 'https://via.placeholder.com/150'} alt="Avatar" className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-secondary mb-3" />
        <p className="text-xl font-bold">{user.username}</p>
        <span className="text-sm bg-accent/20 text-accent px-3 py-1 rounded-full mt-1 inline-block">{user.role}</span>
      </div>

      <button
        onClick={() => setIsEditing(!isEditing)}
        className="w-full bg-secondary text-white py-2 rounded font-bold hover:bg-blue-700 transition-colors mb-6"
      >
        {isEditing ? 'Cancel Editing' : 'Edit Profile'}
      </button>

      {isEditing ? (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-text-muted mb-1">New Avatar</label>
            <input type="file" name="avatar" accept="image/*" onChange={handleAvatarChange} className="w-full bg-dark p-2 rounded border border-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30"
            />
            {selectedAvatar && (
              <p className="text-sm text-primary mt-2">Selected: {selectedAvatar.name}</p>
            )}
          </div>
          <div>
            <label className="block text-text-muted mb-1">Email</label>
            <input type="email" name="email" value={profileData.email || ''} onChange={handleChange} className="w-full bg-dark p-2 rounded border border-gray-700" />
          </div>
          <div>
            <label className="block text-text-muted mb-1">Bio</label>
            <textarea name="bio" value={profileData.bio || ''} onChange={handleChange} className="w-full bg-dark p-2 rounded border border-gray-700" rows={4} />
          </div>
          <button type="submit" className="w-full bg-primary text-white py-2 rounded font-bold hover:bg-purple-700 transition-colors">
            Save Changes
          </button>
        </form>
      ) : (
        <div className="space-y-3">
          <p><span className="font-bold text-primary">Email:</span> {user.email}</p>
          <p><span className="font-bold text-primary">Bio:</span> {user.bio || 'No bio provided.'}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;