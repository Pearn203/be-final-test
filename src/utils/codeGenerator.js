export const generateRandomCode = async (prefix, length) => {
    let code;
    let isUnique = false;
  
    while (!isUnique) {
      code = `${prefix}${Math.floor(Math.random() * Math.pow(10, length))}`;
      const existingRecord = await Teacher.findOne({ code });
      if (!existingRecord) {
        isUnique = true;
      }
    }
  
    return code;
  };
  