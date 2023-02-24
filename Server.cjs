const PORT = 8000
const axios = require('axios').default
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()

app.use(cors())

app.get('/languages', async (req, res) => {
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-host': process.env.RAPID_API_HOST,
      'x-rapidapi-key': process.env.RAPID_API_KEY,
    },
  }

  try {
    const response = await axios(
        'https://google-translate1.p.rapidapi.com/language/translate/v2/languages',
      options
    )
    const arrayOfData = Object.keys(response.data.data.languages).map(
        (key) => response.data.data.languages[key].language
      )
    res.status(200).json(arrayOfData)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err })
  }
})

app.post('/translation', async (req, res) => {
  const { textToTranslate, outputLanguage, inputLanguage } = req.query
  const encodedParams = new URLSearchParams();
encodedParams.append("q", textToTranslate);
encodedParams.append("target", outputLanguage);
encodedParams.append("source", inputLanguage);

  const options = {
    method: 'POST',
    params: {
      text: textToTranslate,
      tl: outputLanguage,
      sl: inputLanguage,
    },
    headers: {
      'x-rapidapi-host': process.env.RAPID_API_HOST,
      'x-rapidapi-key': process.env.RAPID_API_KEY,
    },
    data: encodedParams
  }

  try {
    const response = await axios(
     'https://google-translate1.p.rapidapi.com/language/translate/v2',
      options
    )
    res.status(200).json(response.data.data.translation)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err })
  }
})

app.listen(PORT, () => console.log('Server running on port ' + PORT))