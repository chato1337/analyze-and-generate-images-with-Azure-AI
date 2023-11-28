import React, { useRef } from 'react';
import { analyzeImage, isConfigured } from './azure-image-analysis';
import { generateImage, isConfigured as isConfiguredGen } from './azure-image-generation';

function App() {
  const ref = useRef(null)
  const [results, setResults] = React.useState(null)
  const [url, setUrl] = React.useState(null)
  
  const handleAnalyzeImage = async () => {
    const inputData = ref.current.value
    //check if inputData is a valid URL
    if (inputData.startsWith('http')) {
      //analyze image
      const response = await analyzeImage(inputData)
      setResults(JSON.stringify(response, null, 2))
    }
  }

  const handleGenerateImage = async () => {
    const inputData = ref.current.value
    //check if inputData is a valid URL
    const url = await generateImage(inputData)
    // console.log(url)
    setUrl(url)
  }

  if (!isConfigured() || !isConfiguredGen()) {
    return (
      <p>not configured key/endpoint</p>
    )
  }

  return (
    <div>
      <h1>Computer Vision</h1>
      <label>Insert URL or type parameter</label>
      <input ref={ref}/>
      <button onClick={handleAnalyzeImage}>Analyze</button>
      <button onClick={handleGenerateImage}>Generate</button>
      {results && <DisplayResults results={results} />}
      <hr />
    </div>
  )
}

export default App;

function DisplayResults({results, url}) {
  return (
    <div>
      <h2>Results</h2>
      {url && (
        <div>
          <p>Generated image</p>
          <img src={url} alt="generated" />
        </div>
      )}
      <pre>{results}</pre>
    </div>
  )
}