const generateOrderId = () => {
<<<<<<< HEAD
  const timestamp = Date.now().toString(36);
  const randomNum = Math.random().toString(36).substr(2, 5);
  return `${timestamp}${randomNum}`;
};
export { generateOrderId };
=======
    const timestamp = Date.now().toString(36);
    const randomNum = Math.random().toString(36).substr(2, 5);
    return `${timestamp}${randomNum}`;

}
export { generateOrderId }
>>>>>>> 8c1ebf8b73ad8290fee41aac5e0141c4c28ffe1f
