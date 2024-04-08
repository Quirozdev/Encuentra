import React from 'react';
import EditPasswordForm from '../../../../components/users/EditPasswordForm/EditPasswordForm';
import { UserProfileProvider } from '../../../providers/UserProfileProvider';

export default function EditPassword() {
    return <UserProfileProvider><EditPasswordForm/></UserProfileProvider>;
}