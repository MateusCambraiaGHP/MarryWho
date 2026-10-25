import { execFileSync } from 'node:child_process';
import { cpSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const run = (args, options = {}) => execFileSync('git', args, { stdio: 'inherit', ...options });

execFileSync('npm', ['run', 'build'], { stdio: 'inherit', shell: true });

const worktree = mkdtempSync(join(tmpdir(), 'marrywho-pages-'));

try {
  run(['worktree', 'add', '--detach', worktree]);
  run(['checkout', '--orphan', 'gh-pages'], { cwd: worktree });
  run(['rm', '-rf', '.'], { cwd: worktree });
  cpSync('dist', worktree, { recursive: true });
  run(['add', '-A'], { cwd: worktree });
  run(['commit', '-m', 'Publish site build'], { cwd: worktree });
  run(['push', 'origin', 'gh-pages', '--force'], { cwd: worktree });
} finally {
  run(['worktree', 'remove', '--force', worktree]);
  rmSync(worktree, { recursive: true, force: true });
}
