const parseExcel = require('./utils/parseExcel.js');
const createForm = require('./utils/jotform.js');

const file = process.argv[2];
if(!file){
    console.error("Usage: node index.js path_to_sheet.xlsx");
    process.exit(1);
}

async function main(){
    const questions = parseExcel(file);
    const formData = await createForm(questions);
    console.log(formData);
    console.log("Form created:", formData.content.url);
}

main();