/**
 * Project health / security checks. Writes security-report.txt at repo root.
 * Optional tools (gitleaks, snyk, clamscan) are skipped gracefully if missing or unauthenticated.
 */
import { spawnSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const reportPath = path.join(root, 'security-report.txt')

/** @param {string} line */
function run(line) {
  const r = spawnSync(line, {
    shell: true,
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  })
  const code = r.status ?? 1
  const out = `${r.stdout ?? ''}${r.stderr ?? ''}`
  return { code, out }
}

const lines = []
let failed = false

function section(title) {
  lines.push(`\n${'='.repeat(72)}\n${title}\n${'='.repeat(72)}\n`)
}

function record(title, line, okCodes = [0]) {
  section(title)
  const { code, out } = run(line)
  lines.push(out.trimEnd() || '(no output)\n')
  if (!okCodes.includes(code)) {
    failed = true
    lines.push(`\n[exit code ${code}]\n`)
  }
  return okCodes.includes(code)
}

function tryOptional(title, line) {
  section(`${title} (optional)`)
  const { code, out } = run(line)
  lines.push(out.trimEnd() || '(no output)\n')
  if (code !== 0) {
    lines.push(
      `\n[optional: exit ${code} — install tool or fix auth; not treated as pipeline failure]\n`,
    )
  }
}

lines.push(`MB_Jewellery health check\n${new Date().toISOString()}\n`)

tryOptional('gitleaks detect --redact', 'gitleaks detect --redact 2>&1')
tryOptional('snyk test', 'npx snyk test 2>&1')
tryOptional(
  'clamscan (excludes node_modules)',
  'clamscan -r . --infected --no-summary --exclude-dir=node_modules --exclude-dir=dist 2>&1',
)

if (!record('npm audit --audit-level=low', 'npm audit --audit-level=low 2>&1')) {
  lines.push('\nTip: run npm audit fix\n')
}

record('npm run typecheck', 'npm run typecheck 2>&1')
record('npm run lint', 'npm run lint 2>&1')
record('npm run build', 'npm run build 2>&1')

section('npm outdated')
lines.push(run('npm outdated 2>&1').out.trimEnd() || '(no output)')

section('npm dedupe --dry-run')
lines.push(run('npm dedupe --dry-run 2>&1').out.trimEnd() || '(no output)')

section('Summary')
lines.push(
  failed
    ? 'FAILED: one or more required steps (audit / typecheck / lint / build) reported an error.\n'
    : 'OK: required steps completed successfully.\n',
)
lines.push(
  'Note: gitleaks / snyk / clamscan are informational unless you install and configure them.\n',
)

writeFileSync(reportPath, lines.join('\n'), 'utf8')
console.log(`Wrote ${reportPath}`)
process.exit(failed ? 1 : 0)
