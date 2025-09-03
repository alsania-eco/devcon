# tools/vscode_controller.py (safe)

import os
import subprocess
from pathlib import Path
from typing import Optional

def open_local_code(path: str) -> bool:
    """
    Safely open a local folder in VS Code.
    """
    p = Path(path).expanduser().resolve()
    if not p.exists():
        return False
    try:
        # No shell=True; no injection. Local only.
        subprocess.Popen(["code", str(p)], close_fds=True)
        return True
    except Exception:
        return False

def open_remote_code_via_ssh(host: str, project_path: str, key_env: str = "ALSANIA_SSH_KEY") -> bool:
    """
    Optional: open remote folder IF user explicitly configured a key path via env var.
    We avoid hardcoded paths. Still not used by default.
    """
    keyfile = os.environ.get(key_env, "")
    if not keyfile:
        return False
    if not Path(keyfile).expanduser().exists():
        return False
    try:
        # We still avoid arbitrary command injection: pass args as list
        subprocess.Popen([
            "ssh", "-i", str(Path(keyfile).expanduser()),
            host, "code", project_path
        ], close_fds=True)
        return True
    except Exception:
        return False
