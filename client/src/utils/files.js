import Ajv from 'ajv';

export function downloadFile(fileText, fileName, fileType) {
    let file = new Blob([fileText], {type: fileType});
    let a = document.createElement('a'),
    url = URL.createObjectURL(file);
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }

  export const getFileExtension = (fileName) => {
    const splitFile = fileName.split('.');
    return splitFile[splitFile.length - 1];
  }

  export const isValidJson = (schema, obj) => {
    const anotherJsonValidator = new Ajv();
    const validate = anotherJsonValidator.compile(schema);
    return validate(obj);
  };