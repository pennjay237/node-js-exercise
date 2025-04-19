export function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  export function isValidPhone(phone) {
    return /^2376\d{7}$/.test(phone);
  }
  