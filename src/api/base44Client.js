import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "67e4e233a2dc0f5d0d1694c0", 
  requiresAuth: true // Ensure authentication is required for all operations
});
