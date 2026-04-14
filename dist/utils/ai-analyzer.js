import "dotenv/config";
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText, Output } from "ai";
import { z } from 'zod';
const google = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_KEY
});
const model = google('gemini-2.5-flash');
export async function analyzeResume(text, jd) {
    const hasJD = jd && jd.trim().length > 0;
    const machine = `you are a strict ATS system where people submits there resume text and you analyze them
 STRICT RULES:
 -you must provide an ats score out of 100 
- strengths MUST have at least 2 points, and can surely have more than that 
- improvements MUST have at least 3 points ,and can surely have more than that  
- Do NOT leave any field empty`;
    const prompt = hasJD
        ? `
${machine}

Compare the resume with the given job description.

Job Description:
${jd}
Resume:
${text}
`
        : `
${machine}


Resume:
${text}
`;
    const result = await generateText({
        model,
        output: Output.object({
            schema: z.object({
                score: z.number().min(0).max(100),
                match_percentage: z.number().min(0).max(100),
                strengths: z.array(z.string()),
                improvements: z.array(z.string()),
            }),
        }),
        prompt,
    });
    try {
        return result.output;
    }
    catch {
        return "some error occured while passing ";
        // return { raw: response }
    }
}
