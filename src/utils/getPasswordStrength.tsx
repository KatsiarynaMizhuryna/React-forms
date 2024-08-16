const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length > 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[@$!%*?&]/.test(password)) strength += 1;

    if (strength <= 1) return 'weak';
    if (strength === 2) return 'medium';
    return 'strong';
  };

  export default getPasswordStrength