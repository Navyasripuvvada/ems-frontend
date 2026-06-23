'use client';

import { Suspense } from 'react';
import Reset from './ResetPassword';

export default function SetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Reset />
    </Suspense>
  );
}