import React from 'react';
import EditProfileForm from '../../../../components/users/EditProfileForm/EditProfileForm';
import { UserProfileProvider } from '../../../providers/UserProfileProvider';
import ActivityPage from '../../../../components/events/Activity/ActivityPage';
import { ActivityFilterProvider } from '../../../providers/ActivityFilterProvider';
import { PortalProvider } from '@gorhom/portal';

export default function MyAcitvity() {
    return <ActivityFilterProvider><PortalProvider><ActivityPage />
    </PortalProvider>
    </ActivityFilterProvider>
}