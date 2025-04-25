import fs from "fs";
import path from "path";

/**
 * Initialize a JSON file with an empty array if it doesn't exist or is invalid
 * @param filePath Path to the JSON file
 * @returns void
 */

export const initializeJsonFile = (filePath: string): void => {
  try {
    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "[]", "utf8");
      console.log(`Initialized ${path.basename(filePath)} file with empty array`);
    } else {
      try {
        const content = fs.readFileSync(filePath, "utf8");
        // Check if empty or invlaid
        if (!content || content.trim() === "") {
          fs.writeFileSync(filePath, "[]", "utf8");
          console.log(`Reset ${path.basename(filePath)} file with empty array`);
        } else {
          // Verify the file contains valid JSON
          JSON.parse(content);
        }
      } catch (error) {
        console.error(`Invalid JSON in ${path.basename(filePath)}. Resetting file...`, error);
        fs.writeFileSync(filePath, "[]", "utf8");
      }
    }
  } catch (error) {
    console.error(`Error initializing ${path.basename(filePath)} file:`, error);
    throw error; // Let the caller decide how to handle the error
  }
};
