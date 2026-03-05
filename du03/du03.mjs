import { readFile, writeFile } from "fs/promises";

async function makeFiles(){
 try {
        const data = await readFile("instructions.txt", "utf-8");
        const n = parseInt(data.trim());

        const promises = [];

        for (let i = 0; i <= n; i++) {
            const filename = `${i}.txt`;
            const content = `Soubor ${i}`;
            promises.push(writeFile(filename, content));
        }

        await Promise.all(promises);
        console.log(`Bylo úspěšně vytvořeno ${n + 1} souborů.`);
    } catch (err) {
        console.error("Chyba:", err);
    }
}

makeFiles();