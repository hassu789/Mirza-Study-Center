// Validation utility functions

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Validate name - no numbers allowed
export function validateName(name: string): ValidationResult {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: 'Name is required' };
  }

  if (name.trim().length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters' };
  }

  // Check if name contains numbers
  if (/\d/.test(name)) {
    return { isValid: false, error: 'Name cannot contain numbers' };
  }

  // Check if name contains only letters, spaces, hyphens, and apostrophes
  if (!/^[a-zA-Z\s'-]+$/.test(name.trim())) {
    return { isValid: false, error: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
  }

  return { isValid: true };
}

// Validate email
export function validateEmail(email: string): ValidationResult {
  if (!email || email.trim().length === 0) {
    return { isValid: false, error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  return { isValid: true };
}

// Validate phone number (10 digits)
export function validatePhone(phone: string): ValidationResult {
  if (!phone || phone.trim().length === 0) {
    return { isValid: false, error: 'Phone number is required' };
  }

  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');

  if (digitsOnly.length !== 10) {
    return { isValid: false, error: 'Phone number must be exactly 10 digits' };
  }

  // Check if it starts with valid Indian mobile prefix (optional enhancement)
  const firstDigit = digitsOnly[0];
  if (!['6', '7', '8', '9'].includes(firstDigit)) {
    return { isValid: false, error: 'Phone number must start with 6, 7, 8, or 9' };
  }

  return { isValid: true };
}

// Validate password
export function validatePassword(password: string): ValidationResult {
  if (!password || password.length === 0) {
    return { isValid: false, error: 'Password is required' };
  }

  if (password.length < 6) {
    return { isValid: false, error: 'Password must be at least 6 characters long' };
  }

  if (password.length > 50) {
    return { isValid: false, error: 'Password must be less than 50 characters' };
  }

  return { isValid: true };
}

// Validate username
export function validateUsername(username: string): ValidationResult {
  if (!username || username.trim().length === 0) {
    return { isValid: false, error: 'Username is required' };
  }

  if (username.trim().length < 3) {
    return { isValid: false, error: 'Username must be at least 3 characters' };
  }

  // Username can contain letters, numbers, underscores, and hyphens
  if (!/^[a-zA-Z0-9_-]+$/.test(username.trim())) {
    return { isValid: false, error: 'Username can only contain letters, numbers, underscores, and hyphens' };
  }

  return { isValid: true };
}

// Validate confirm password
export function validateConfirmPassword(password: string, confirmPassword: string): ValidationResult {
  if (!confirmPassword || confirmPassword.length === 0) {
    return { isValid: false, error: 'Please confirm your password' };
  }

  if (password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match' };
  }

  return { isValid: true };
}

// Format phone number for display
export function formatPhoneNumber(phone: string): string {
  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.length === 10) {
    return `${digitsOnly.slice(0, 5)} ${digitsOnly.slice(5)}`;
  }
  return phone;
}
