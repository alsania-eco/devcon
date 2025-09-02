#!/bin/bash
cd "$(dirname "$0")"
source venv/bin/activate
export PYTHONPATH="$(pwd)"
python3 -m uvicorn backend.core.main:app --host 127.0.0.1 --port 8001 --reload 