const xlsx = require('xlsx');

const readExcelFile = (filePath) => {
    const workbook = xlsx.readFile(filePath);
    const sheet_name_list = workbook.SheetNames;
    return xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
};

module.exports = { readExcelFile }