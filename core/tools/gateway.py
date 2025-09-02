# core/tools/gateway.py (safe router)

from pathlib import Path
import json
from typing import Optional

CONFIG_PATH = Path.home() / "devcon" / "config" / "queenconfig.json"

class VSCodeProxy:
    internal_url = "http://127.0.0.1:8001"  # adapter base

def load_owner_config():
    if CONFIG_PATH.exists():
        with open(CONFIG_PATH, "r") as f:
            return json.load(f)
    return {}

def _owner_is_valid(cfg: dict) -> bool:
    # Minimal checks; expand with signature verification in MCP later
    auth = cfg.get("auth", {})
    if auth.get("mode") != "owner_local":
        return False
    allowed_hosts = set(auth.get("allowed_hosts", []))
    return "127.0.0.1" in allowed_hosts or "localhost" in allowed_hosts

def route_for_model(model: str, tool_name: str, *, actor_uuid: Optional[str]) -> Optional[str]:
    """
    Returns internal URL for tool if allowed; None otherwise.
    """
    cfg = load_owner_config()
    if not _owner_is_valid(cfg):
        return None

    # identity check (basic). Do stronger verification upstream (signed claims).
    identity = cfg.get("identity", {})
    expected = identity.get("uuid")
    if expected and actor_uuid and actor_uuid != expected:
        return None

    # tools allowlist
    allow = set(cfg.get("permissions", {}).get("tools_allowlist", []))
    if tool_name not in allow:
        return None

    # route
    if tool_name in {"vscode_proxy", "code_edit"}:
        return VSCodeProxy.internal_url
    if tool_name == "multi_agent_bridge":
        return "http://127.0.0.1:8050"  # your MCP hub

    return None
