<!--
    DevCon Documentation

    This repository contains Echo DevCon, a unified VS Code IDE extension powered by Echo Registry.
    It provides seamless integration for AlsaniaMCP, Nyx, and Echo Registry tools, enabling efficient development workflows.
    Key features include a shared registry, on-demand tool activation, auto-shutdown for resource management, and manual persistence options.
    Designed for lightweight operation on constrained machines.

    For setup and usage instructions, refer to the sections below.
-->

# DevCon

**DevCon — powered by Echo Registry**

A unified VS Code IDE extension for AlsaniaMCP, Nyx, and Echo Registry tools.

## Features

- One shared registry for all tools (port 8060).
- Tools only spin up when needed, then auto-shutdown after 10 minutes.
- Manual-only persistence for AlsaniaMCP (8050) and Nyx (3006).
- Lightweight, resource-friendly, perfect for constrained machines.

## Usage

1. Start Echo Registry:

   ```bash
   cd ~/Desktop/echo-lab/tools/echo-registry
   uvicorn registry:app --host 0.0.0.0 --port 8060
   ```

2. Launch VS Code with DevCon enabled.

3. DevCon queries Echo Registry for tools automatically.
