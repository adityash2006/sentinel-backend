import { PDFParse } from "pdf-parse"
import mammoth from "mammoth"

export async function extractText(file:Express.Multer.File ): Promise<string | undefined>  {
   try {
  if (file.mimetype === "application/pdf") {
  
    const parser = new PDFParse({ data:file.buffer });

    const result = await parser.getText();
    return result.text
  }

  if (file.mimetype.includes("word")) {
    const result = await mammoth.extractRawText({ buffer: file.buffer })
    return result.value
  }
}
  catch (error) {
    console.log(error);
   }
return undefined ;
} 