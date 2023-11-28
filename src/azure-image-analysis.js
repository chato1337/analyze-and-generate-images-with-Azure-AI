import axios from 'axios';

export function isConfigured() {
    return process.env.REACT_APP_VISION_KEY.length > 0 && process.env.REACT_APP_VISION_ENDPOINT.length > 0;
}

export async function analyzeImage (imageUrl) {
    // analize image using Azure Computer Vision API
    const api_key = process.env.REACT_APP_VISION_KEY || '';
    const api_endpoint = process.env.REACT_APP_VISION_ENDPOINT || '';

    // const URL = `${api_endpoint}computervision/imageanalysis:analyze&api-version=2023-02-01-preview`;
    const URL = `${api_endpoint}vision/v3.1/analyze?visualFeatures=Categories,Description,Color&details=Landmarks&language=en`;

    // add Ocp-Apim-Subscription-Key to the header
    const options = {
        headers: {
            'Ocp-Apim-Subscription-Key': api_key
        }
    };

    // return request post to Azure Computer Vision API with axios
    return await axios.post(URL, { url: imageUrl }, options)
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.log(error);
            return error;
        });
}