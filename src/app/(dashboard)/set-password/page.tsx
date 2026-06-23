
'use client';

import { Suspense } from 'react';
import SetPasswordContent from './SetPassword';

export default function SetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SetPasswordContent />
    </Suspense>
  );
}