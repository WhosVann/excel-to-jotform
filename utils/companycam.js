const axios = require("axios");

async function companyCamUpload(){
    try{
        const response = await axios.get(
                'https://api.companycam.com/v2/projects',
            {
            name: "New Roof - 123 Main St",
            address: "123 Main St, Columbus, OH"
        },
        {
            headers: {
                Authorization: `Bearer ${COMPANYCAM_API_KEY}`,
                "Content-Type": "Application/json"
            }
        });
    
    console.log(response.data);

    }catch(err){
        console.error(err.response?.data || err.message);
        throw err;
    }
}