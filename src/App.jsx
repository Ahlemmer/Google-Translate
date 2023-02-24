
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Arrows,Models,Button,TextBox} from './components'

const App = () => {
  const [showModal, setShowModal] = useState(false)
  const [languages, setLanguages] = useState(null)
  const [inputLanguage, setInputLanguage] = useState('en')
  const [outputLanguage, setOutputLanguage] = useState('ar')
  const [textToTranslate, setTextToTranslate] = useState('')
  const [translatedText, setTranslatedText] = useState('')


  const getLanguages = async () => {
    const response = await axios.get('http://localhost:8000/languages')
    setLanguages(response.data)
  }
  useEffect(() => {
    getLanguages()
   
  }, [])

  const translate = async () => {
    const encodedParams = new URLSearchParams();
    encodedParams.append("q", textToTranslate);
    encodedParams.append("target", outputLanguage);
    encodedParams.append("source", inputLanguage);
    
    const options = {
      method: 'POST',
      url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': '2e6836369cmsh5a02442e1465359p1ac652jsn20ac17202da8',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
      },
      data: encodedParams
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data.data.translations[0].translatedText)
      setTranslatedText(response.data.data.translations[0].translatedText)
    }).catch(function (error) {
      console.error(error);
    });
   
  }

  const detect=()=>{
    const encodedParams = new URLSearchParams();
encodedParams.append("q", "English is hard, but detectably so");

const options = {
  method: 'POST',
  url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/detect',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'Accept-Encoding': 'application/gzip',
    'X-RapidAPI-Key': '2e6836369cmsh5a02442e1465359p1ac652jsn20ac17202da8',
    'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
  },
  data: encodedParams
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
  }

  const handleClick = () => {
    setInputLanguage(outputLanguage)
    setOutputLanguage(inputLanguage)
  }
  return (
    <div className="app">
      {!showModal && (
       <>
       <TextBox
         style="input"
         setShowModal={setShowModal}
         selectedLanguage={inputLanguage}
         setTextToTranslate={setTextToTranslate}
         textToTranslate={textToTranslate}
         setTranslatedText={setTranslatedText}
       />
       <div className="arrow-container" onClick={handleClick}>
         <Arrows />
       </div>
       <TextBox
         style="output"
         setShowModal={setShowModal}
         selectedLanguage={outputLanguage}
         translatedText={translatedText}
       />
       <div className="button-container" onClick={translate}>
         <Button />
       </div>
     </>
      )}
      {showModal && (
        <Models
          showModal={showModal}
          setShowModal={setShowModal}
          languages={languages}
          chosenLanguage={
            showModal === 'input' ? inputLanguage : outputLanguage
          }
          setChosenLanguage={
            showModal === 'input' ? setInputLanguage : setOutputLanguage
          }
         
          
        />
      )}
    </div>
  )
}

export default App