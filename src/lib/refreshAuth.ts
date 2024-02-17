import { AppState } from 'react-native';
import {supabase} from './supabase';

    AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh()
    } else {
      supabase.auth.stopAutoRefresh()
    }
  })
  
export default AppState;