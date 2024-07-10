'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useProfileStore from '@/store/profileStore';

const useCheckFirstLogin = () => {
  const router = useRouter();
  const profile = useProfileStore((state) => state.Profile);

  useEffect(() => {
    if (profile && profile.is_first_login) {
      router.push('/setup-profile');
    }
  }, [profile, router]);
};

export default useCheckFirstLogin;
