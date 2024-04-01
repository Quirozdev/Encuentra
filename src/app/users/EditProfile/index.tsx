import React from 'react';
import EditProfileForm from '../../../../components/users/EditProfileForm/EditProfileForm';
import { UserProfileProvider } from '../../../providers/UserProfileProvider';

export default function EditProfile() {
    return <UserProfileProvider><EditProfileForm/></UserProfileProvider>;
}