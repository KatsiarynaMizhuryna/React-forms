const convertToBase64 = (file: File | null): Promise<string | null> => {
  if (!file) {
    return Promise.resolve(null);
  }

  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result as string);
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file.'));
    };

    reader.readAsDataURL(file);
  });
}

export default convertToBase64;