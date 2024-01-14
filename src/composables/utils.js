export default function useUtils () {
  const buildForm = (data) => {
    const keys = Object.keys(data);
    const formData = new FormData();
    keys.forEach((key) => {
      if (data[key] != undefined && !Array.isArray(data[key]))
        formData.append(key, data[key]);
      else if (Array.isArray(data[key])) {
        data[key].forEach((e, index) => {
          formData.append(`${key}[${index}]`, e);
        });
      }
    });
    return formData;
  };

  const isScrollEndByBody = (position) => {
    const scrollHeight = document.body.scrollHeight;
    const isScrollEnd = position + window.innerHeight + 100 >= scrollHeight
    return isScrollEnd
  }

  const trimObject = (obj) => {
    const newObj = {};
    for (const key in obj) {
      if (
        obj.hasOwnProperty(key) &&
        obj[key] !== '' &&
        obj[key] !== undefined &&
        obj[key] !== null) {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  }

  return { buildForm, isScrollEndByBody, trimObject }
}
