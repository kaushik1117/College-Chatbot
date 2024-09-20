const router = require('express').Router();
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');

router.use(bodyParser.json());
require('dotenv').config();


// API Route for handling chatbot responses
router.post('/api/chatbot/response', async (req, res) => {
    const { text, url } = req.body;

    // Check if both text and url are provided
    if (!text || !url) {
        return res.status(400).send('Text and URL are required');
    }

    try {
        // Initialize the Google Generative AI with your API key
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

        // Fetch the generative model for Gemini Pro
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Define the prompt to include both the text and URL for context
        const prompt = `Using the information available about the college ${url}, the answer provided should only be facts. Do not create any answers on own. Please provide a short and crisp response to the following query: "${text}"`;

        // Generate the response from the Gemini model
        const resp = await model.generateContent(prompt);

        // Extract the text from the response object
        const generatedText = resp.response.text();

        console.log('Generated Response:', generatedText);
        res.send({ response: generatedText });
    } catch (error) {
        console.error('Error generating response:', error);
        res.status(500).send('Error generating response');
    }
});

module.exports = router;
