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

  return { buildForm, isScrollEndByBody }
}
