const { Configuration, OpenAIApi } = require('openai'); 
const cors = require('cors'); 
const express = require('express'); 
const app = express();

require('dotenv').config(); 

const PORT = 4000; 

app.use(express.json()); 
app.use(cors()); 

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

//Handling POST Requests (posting new messages)
app.post('/', async (req, res) => {
    const { prompt } = req.body; 

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.7,
        max_tokens: 500,
    });

    //Response Message Sent Back to Client-Side
    const answer = response.data.choices[0]; 
    res.status(200).json({answer}); 
  }
); 

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`); 
}); 
