const axios = require("axios");
const qs = require("qs");
require("dotenv").config();

const JOTFORM_API_KEY = process.env.JOTFORM_API_KEY;

async function createForm(questions) {
  try {
    // 1️⃣ Create form
    const formData = qs.stringify({
      "properties[title]": "House",
    });

    const createFormResp = await axios.post(
      `https://api.jotform.com/form?apiKey=${JOTFORM_API_KEY}`,
      formData,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const formId = createFormResp.data.content.id;
    console.log("Form created:", formId);

    //Update Form Settings
    await axios.put(
      `https://api.jotform.com/form/${formId}/properties?apiKey=${JOTFORM_API_KEY}`,
      { properties: { continueLater: true } }
    );

    for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        
      await axios.post(
          `https://api.jotform.com/form/${formId}/questions?apiKey=${JOTFORM_API_KEY}`,
        qs.stringify({
          "question[type]": "control_fileupload",
          "question[text]": q.title,
          "question[name]": `q${i}`,
          "question[order]": i + 1,
        }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
      );

        console.log("Added:", q.title);
    }
     // 3️⃣ Add a submit button at the end
    await axios.post(
      `https://api.jotform.com/form/${formId}/questions?apiKey=${JOTFORM_API_KEY}`,
      qs.stringify({
        "question[type]": "control_button",
        "question[text]": "Submit",
        "question[name]": "submitBtn",
        "question[order]": questions.length + 1
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );


    return createFormResp.data;

  } catch (err) {
    console.error(err.response?.data || err.message);
    throw err;
  }
}

module.exports = createForm;