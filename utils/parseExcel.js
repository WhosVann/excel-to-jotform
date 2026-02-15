const XLSX = require('xlsx');
function parseExcel(file){
    const workbook = XLSX.readFile(file);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);
    return rows.map(row => ({
        title: `Group Desc: ${row['Group Description']} || Desc: ${row['Desc']} || Qty: ${row['Qty']} || Unit: ${row['Unit']}`
    }));

}
module.exports = parseExcel;