import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const endpoint = process.env.Jira_endpoint!;
const userName = process.env.Jira_userName!;
const apiToken = process.env.Jira_apiToken!;
const keyID = process.env.Jira_keyID!;

console.log("Endpoint:", endpoint);
console.log("Username:", userName);
console.log("Project:", keyID);
console.log("Token exists:", !!apiToken);

export async function createIssue(summary: string) {
    const issueRequest = {
    "fields": {
        "project":{
        "key": keyID
    },
    "issuetype": {
        "name": "Bug"
    },
       "summary":summary
    }
};
  const response = await axios.post(
    endpoint,
    issueRequest,
    {
        auth: {
            username: userName,
            password: apiToken
        },
        headers: {
            "Content-Type": "application/json"
        }
    }
); 
console.log(response.data);
return response.data
}



