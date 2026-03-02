import fs from "fs/promises";

async function copy(filename) {
  try {
    await fs.access(filename);
  } catch {
    console.error(`Instructions file "${filename}" does not exist.`);
    return;
  }

  try {
    const instructionsText = await fs.readFile(filename, "utf8");
    const parts = instructionsText.trim().split(/\s+/);

    if (parts.length < 2) {
      console.error("instructions.txt gotta have two names of fiels ");
      return;
    }

    const source = parts[0].trim();
    const target = parts[1].trim();
    const data = await fs.readFile(source);

    await fs.writeFile(target, data);

    console.log("File has been copied succesfully.");
  } catch (err) {
    console.error("Error:", err.message);
  }
}

copy("instructions.txt");