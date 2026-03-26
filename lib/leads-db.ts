import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import path from "node:path";

type LeadInput = {
  name: string;
  email: string;
  whatsapp: string;
  profession: string;
  salaryRange: string;
};

const dataDir = path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "leads.sqlite");

mkdirSync(dataDir, { recursive: true });

const globalForDb = globalThis as typeof globalThis & {
  leadsDb?: Database.Database;
};

if (!globalForDb.leadsDb) {
  globalForDb.leadsDb = new Database(dbPath);
  globalForDb.leadsDb.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      whatsapp TEXT NOT NULL,
      profession TEXT NOT NULL,
      salary_range TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

const database = globalForDb.leadsDb!;

export function insertLead(input: LeadInput) {
  const statement = database.prepare(`
    INSERT INTO leads (name, email, whatsapp, profession, salary_range)
    VALUES (@name, @email, @whatsapp, @profession, @salaryRange)
  `);

  return statement.run(input);
}
