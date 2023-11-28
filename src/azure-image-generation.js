import axios from "axios";


export function isConfigured() {
    return process.env.REACT_APP_OPEN_AI_KEY.length > 0;
}

export async function generateImage(prompt = "a white siamese cat") {
	try {
        const reqData = {
            prompt: prompt,
            n: 1,
            size: "256x256", // Set the desired image size here
        };
    
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_KEY}`,
        };
    
        const response = await axios.post(
            "https://api.openai.com/v1/images/generations",
            reqData,
            {
                headers: headers,
            }
        );
    
        return response.data.data[0].url;
    } catch (error) {
        console.log(error)
    }
}
