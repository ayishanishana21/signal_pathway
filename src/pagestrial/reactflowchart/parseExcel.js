// src/utils/parseExcel.js
// import * as XLSX from 'xlsx';

// const parseExcel = (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const data = e.target.result;
//       const workbook = XLSX.read(data, { type: 'binary' });
//       const sheet_name_list = workbook.SheetNames;
//       const dataJson = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
//       resolve(dataJson);
//     };
//     reader.onerror = (error) => {
//       reject(error);
//     };
//     reader.readAsBinaryString(file);
//   });
// };

// export default parseExcel;

import * as XLSX from 'xlsx';

const parseExcel = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheet_name_list = workbook.SheetNames;
      const dataJson = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
      resolve(dataJson);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsBinaryString(file);
  });
};

export default parseExcel;