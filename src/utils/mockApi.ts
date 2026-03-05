export const submitContactForm = (data: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldFail = Math.random() < 0.2;
      if (shouldFail) {
        reject("Error");
      } else {
        resolve({ success: true, data });
      }
    }, 1500);
  });
};