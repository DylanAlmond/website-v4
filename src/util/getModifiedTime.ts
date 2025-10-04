import { execSync } from 'child_process';
import { statSync } from 'fs';

export default function getModifiedTime(filepath: string) {
  // Get the last modified date (most recent commit)
  let lastModified = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`)
    .toString()
    .trim();

  // Use FS as backup
  lastModified === '' &&
    (lastModified = statSync(filepath).mtime.toISOString());

  // Get the created date (first commit that introduced the file)
  let dateCreated = execSync(
    `git log --diff-filter=A --follow --format=%aI -- "${filepath}"`,
  )
    .toString()
    .trim();

  // Use FS as backup
  dateCreated === '' && (dateCreated = statSync(filepath).ctime.toISOString());

  return { lastModified, dateCreated };
}
