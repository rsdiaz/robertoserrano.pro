import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { SITE_URL } from "./constants";


export function getSlugsFromCollection(collectionName: string, collectionSlug: string): string[] {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const directoryPath = path.join(__dirname, 'content', collectionName);
    const files = fs.readdirSync(directoryPath);
    const siteUrl = SITE_URL + collectionSlug;
    
    const blogUrls = files.map((file) => {
      const fileName = file.split('.')[0];
      return `${siteUrl}/${fileName}`;
    });

    return blogUrls
}
