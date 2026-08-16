import type {TestInfo} from '@playwright/test';
import { createIssue } from "./jiraAPI.js";

export async function logADefect(testinfo:TestInfo) {

    if (testinfo.status==='failed'|| testinfo.status === 'timedOut'){
        const summary = `Test ${testinfo.status}: ${testinfo.title}`;
        await createIssue (summary)

       console.log(`Jira issue created for ${testinfo.status}: ${testinfo.title}`);
console.log("Error message:", testinfo.error);

    }
    else{
        console.log('The test is passed successfully');
    }
}
