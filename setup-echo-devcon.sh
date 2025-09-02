#!/bin/bash

<<<<<<< HEAD
<<<<<<< HEAD
# EchoMCP + Echo-DevCon Setup Script
# This script sets up the echo-devcon extension with the echomcp backend

set -e

echo "🚀 Setting up EchoMCP + Echo-DevCon..."
=======
=======
>>>>>>> 55d4df0da (big push)
# AlsaniaMCP + DevCon Setup Script
# This script sets up the devcon extension with the alsaniamcp backend

set -e

echo "🚀 Setting up AlsaniaMCP + DevCon..."
<<<<<<< HEAD
>>>>>>> 28516c7fabf170e523ba3466dde6fb413f3b0d92
=======
>>>>>>> 55d4df0da (big push)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
<<<<<<< HEAD
<<<<<<< HEAD
    print_error "Please run this script from the echo-devcon root directory"
    exit 1
fi

print_status "Building Echo-DevCon extension..."
=======
=======
>>>>>>> 55d4df0da (big push)
    print_error "Please run this script from the devcon root directory"
    exit 1
fi

print_status "Building DevCon extension..."
<<<<<<< HEAD
>>>>>>> 28516c7fabf170e523ba3466dde6fb413f3b0d92
=======
>>>>>>> 55d4df0da (big push)

# Build the extension
cd extensions/vscode
npm install
npm run esbuild

print_status "Building GUI..."
cd ../../gui
npm install
npm run build

print_status "Packaging extension..."
cd ../extensions/vscode
npm run package

print_success "Extension built successfully!"

# Create configuration directory
print_status "Setting up configuration..."
mkdir -p ~/.continue

# Create the configuration file
cat > ~/.continue/config.json << 'EOF'
{
  "models": [
    {
<<<<<<< HEAD
<<<<<<< HEAD
      "title": "EchoMCP",
      "provider": "openai",
      "model": "echo-mcp",
=======
      "title": "AlsaniaMCP",
      "provider": "openai",
      "model": "alsaniamcp",
>>>>>>> 28516c7fabf170e523ba3466dde6fb413f3b0d92
=======
      "title": "AlsaniaMCP",
      "provider": "openai",
      "model": "alsaniamcp",
>>>>>>> 55d4df0da (big push)
      "apiBase": "http://localhost:8000/v1",
      "requestOptions": {
        "headers": {
          "Content-Type": "application/json"
        },
        "timeout": 7200
      }
    }
  ],
<<<<<<< HEAD
<<<<<<< HEAD
  "defaultModel": "EchoMCP",
=======
  "defaultModel": "AlsaniaMCP",
>>>>>>> 28516c7fabf170e523ba3466dde6fb413f3b0d92
=======
  "defaultModel": "AlsaniaMCP",
>>>>>>> 55d4df0da (big push)
  "contextProviders": [
    {
      "name": "http",
      "params": {
        "url": "http://localhost:8000/chat",
<<<<<<< HEAD
<<<<<<< HEAD
        "title": "EchoMCP Context",
        "description": "Get context from EchoMCP backend",
        "displayTitle": "EchoMCP"
=======
        "title": "AlsaniaMCP Context",
        "description": "Get context from AlsaniaMCP backend",
        "displayTitle": "AlsaniaMCP"
>>>>>>> 28516c7fabf170e523ba3466dde6fb413f3b0d92
=======
        "title": "AlsaniaMCP Context",
        "description": "Get context from AlsaniaMCP backend",
        "displayTitle": "AlsaniaMCP"
>>>>>>> 55d4df0da (big push)
      }
    },
    {
      "name": "file"
    },
    {
      "name": "codebase"
    },
    {
      "name": "diff"
    }
  ],
  "rules": [
<<<<<<< HEAD
<<<<<<< HEAD
    "You are EchoMCP, a helpful AI assistant connected to the EchoMCP backend.",
    "Always provide clear and concise responses.",
    "When asked about your capabilities, mention that you're connected to the EchoMCP backend running on localhost:8000.",
    "Use the EchoMCP backend for all chat interactions and context retrieval."
=======
=======
>>>>>>> 55d4df0da (big push)
    "You are AlsaniaMCP, a helpful AI assistant connected to the AlsaniaMCP backend.",
    "Always provide clear and concise responses.",
    "When asked about your capabilities, mention that you're connected to the AlsaniaMCP backend running on localhost:8000.",
    "Use the AlsaniaMCP backend for all chat interactions and context retrieval."
<<<<<<< HEAD
>>>>>>> 28516c7fabf170e523ba3466dde6fb413f3b0d92
=======
>>>>>>> 55d4df0da (big push)
  ],
  "ui": {
    "displayRawMarkdown": false
  }
}
EOF

print_success "Configuration created at ~/.continue/config.json"

<<<<<<< HEAD
<<<<<<< HEAD
# Setup EchoMCP backend
print_status "Setting up EchoMCP backend..."

cd ../../../echomcp
=======
=======
>>>>>>> 55d4df0da (big push)
# Setup AlsaniaMCP backend
print_status "Setting up AlsaniaMCP backend..."

cd ../../../alsaniamcp
<<<<<<< HEAD
>>>>>>> 28516c7fabf170e523ba3466dde6fb413f3b0d92
=======
>>>>>>> 55d4df0da (big push)

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    print_status "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment and install dependencies
print_status "Installing Python dependencies..."
source venv/bin/activate
pip install fastapi uvicorn

<<<<<<< HEAD
<<<<<<< HEAD
print_success "EchoMCP backend dependencies installed!"

# Create startup script for the backend
cat > start-echomcp.sh << 'EOF'
=======
=======
>>>>>>> 55d4df0da (big push)
print_success "AlsaniaMCP backend dependencies installed!"

# Create startup script for the backend
cat > start-alsaniamcp.sh << 'EOF'
<<<<<<< HEAD
>>>>>>> 28516c7fabf170e523ba3466dde6fb413f3b0d92
=======
>>>>>>> 55d4df0da (big push)
#!/bin/bash
cd "$(dirname "$0")"
source venv/bin/activate
export PYTHONPATH="$(pwd)"
python3 -m uvicorn backend.core.main:app --host 0.0.0.0 --port 8000 --reload
EOF

<<<<<<< HEAD
<<<<<<< HEAD
chmod +x start-echomcp.sh

print_success "EchoMCP startup script created!"
=======
chmod +x start-alsaniamcp.sh

print_success "AlsaniaMCP startup script created!"
>>>>>>> 28516c7fabf170e523ba3466dde6fb413f3b0d92
=======
chmod +x start-alsaniamcp.sh

print_success "AlsaniaMCP startup script created!"
>>>>>>> 55d4df0da (big push)

# Create installation script for the extension
cat > install-extension.sh << 'EOF'
#!/bin/bash
<<<<<<< HEAD
<<<<<<< HEAD
cd "$(dirname "$0")/../echo-devcon/extensions/vscode"
=======
cd "$(dirname "$0")/../devcon/extensions/vscode"
>>>>>>> 28516c7fabf170e523ba3466dde6fb413f3b0d92
=======
cd "$(dirname "$0")/../devcon/extensions/vscode"
>>>>>>> 55d4df0da (big push)
code --install-extension build/continue-1.1.72.vsix
EOF

chmod +x install-extension.sh

print_success "Extension installation script created!"

# Create a comprehensive README
<<<<<<< HEAD
<<<<<<< HEAD
cat > README-ECHO-DEVCON.md << 'EOF'
# EchoMCP + Echo-DevCon Setup

This setup provides a seamless integration between the Echo-DevCon VSCode extension and the EchoMCP backend.

## Components

1. **Echo-DevCon Extension**: A fork of Continue.dev that connects to the EchoMCP backend
2. **EchoMCP Backend**: A FastAPI-based backend that provides OpenAI-compatible endpoints

## Quick Start

### 1. Start the EchoMCP Backend

```bash
cd echomcp
./start-echomcp.sh
=======
=======
>>>>>>> 55d4df0da (big push)
cat > README-DEVCON.md << 'EOF'
# AlsaniaMCP + DevCon Setup

This setup provides a seamless integration between the DevCon VSCode extension and the AlsaniaMCP backend.

## Components

1. **DevCon Extension**: A fork of Continue.dev that connects to the AlsaniaMCP backend
2. **AlsaniaMCP Backend**: A FastAPI-based backend that provides OpenAI-compatible endpoints

## Quick Start

### 1. Start the AlsaniaMCP Backend

```bash
cd alsaniamcp
./start-alsaniamcp.sh
<<<<<<< HEAD
>>>>>>> 28516c7fabf170e523ba3466dde6fb413f3b0d92
=======
>>>>>>> 55d4df0da (big push)
```

The backend will be available at `http://localhost:8000`

### 2. Install the Extension

```bash
<<<<<<< HEAD
<<<<<<< HEAD
cd echomcp
=======
cd alsaniamcp
>>>>>>> 28516c7fabf170e523ba3466dde6fb413f3b0d92
=======
cd alsaniamcp
>>>>>>> 55d4df0da (big push)
./install-extension.sh
```

Or manually install the VSIX file:
```bash
<<<<<<< HEAD
<<<<<<< HEAD
code --install-extension echo-devcon/extensions/vscode/build/continue-1.1.72.vsix
=======
code --install-extension devcon/extensions/vscode/build/continue-1.1.72.vsix
>>>>>>> 28516c7fabf170e523ba3466dde6fb413f3b0d92
=======
code --install-extension devcon/extensions/vscode/build/continue-1.1.72.vsix
>>>>>>> 55d4df0da (big push)
```

### 3. Configure VSCode

<<<<<<< HEAD
<<<<<<< HEAD
The extension is configured to connect to the EchoMCP backend automatically. The configuration is stored in `~/.continue/config.json`.

## Features

- **OpenAI-Compatible API**: The EchoMCP backend provides OpenAI-compatible endpoints
=======
=======
>>>>>>> 55d4df0da (big push)
The extension is configured to connect to the AlsaniaMCP backend automatically. The configuration is stored in `~/.continue/config.json`.

## Features

- **OpenAI-Compatible API**: The AlsaniaMCP backend provides OpenAI-compatible endpoints
<<<<<<< HEAD
>>>>>>> 28516c7fabf170e523ba3466dde6fb413f3b0d92
=======
>>>>>>> 55d4df0da (big push)
- **Real-time Chat**: Connect to the backend for chat interactions
- **Context Providers**: Access file, codebase, and diff context
- **Streaming Responses**: Real-time streaming of responses from the backend

## API Endpoints

- `GET /health` - Health check
- `GET /v1/models` - List available models
- `POST /v1/chat/completions` - Chat completions (OpenAI-compatible)
- `POST /chat` - Legacy chat endpoint
- `GET /agent/status` - Agent status
- `POST /agent/invoke` - Invoke agent tasks

## Configuration

The extension is configured to use:
<<<<<<< HEAD
<<<<<<< HEAD
- **Model**: EchoMCP (echo-mcp)
=======
- **Model**: AlsaniaMCP (alsaniamcp)
>>>>>>> 28516c7fabf170e523ba3466dde6fb413f3b0d92
=======
- **Model**: AlsaniaMCP (alsaniamcp)
>>>>>>> 55d4df0da (big push)
- **API Base**: http://localhost:8000/v1
- **Context Providers**: HTTP, File, Codebase, Diff

## Troubleshooting

1. **Backend not starting**: Check if port 8000 is available
2. **Extension not connecting**: Verify the backend is running and accessible
3. **Configuration issues**: Check `~/.continue/config.json`

## Development

To modify the backend:
<<<<<<< HEAD
<<<<<<< HEAD
1. Edit files in `echomcp/backend/`
2. Restart the backend with `./start-echomcp.sh`

To modify the extension:
1. Edit files in `echo-devcon/extensions/vscode/src/`
=======
=======
>>>>>>> 55d4df0da (big push)
1. Edit files in `alsaniamcp/backend/`
2. Restart the backend with `./start-alsaniamcp.sh`

To modify the extension:
1. Edit files in `devcon/extensions/vscode/src/`
<<<<<<< HEAD
>>>>>>> 28516c7fabf170e523ba3466dde6fb413f3b0d92
=======
>>>>>>> 55d4df0da (big push)
2. Run `npm run esbuild` to rebuild
3. Run `npm run package` to create a new VSIX

## License

<<<<<<< HEAD
<<<<<<< HEAD
This is a fork of Continue.dev with custom EchoMCP integration.
=======
This is a fork of Continue.dev with custom AlsaniaMCP integration.
>>>>>>> 28516c7fabf170e523ba3466dde6fb413f3b0d92
=======
This is a fork of Continue.dev with custom AlsaniaMCP integration.
>>>>>>> 55d4df0da (big push)
EOF

print_success "Documentation created!"

print_success "🎉 Setup complete!"
echo ""
echo "Next steps:"
<<<<<<< HEAD
<<<<<<< HEAD
echo "1. Start the EchoMCP backend: cd echomcp && ./start-echomcp.sh"
echo "2. Install the extension: cd echomcp && ./install-extension.sh"
echo "3. Open VSCode and start using Echo-DevCon!"
echo ""
echo "For more information, see README-ECHO-DEVCON.md" 
=======
=======
>>>>>>> 55d4df0da (big push)
echo "1. Start the AlsaniaMCP backend: cd alsaniamcp && ./start-alsaniamcp.sh"
echo "2. Install the extension: cd alsaniamcp && ./install-extension.sh"
echo "3. Open VSCode and start using DevCon!"
echo ""
<<<<<<< HEAD
echo "For more information, see README-DEVCON.md" 
>>>>>>> 28516c7fabf170e523ba3466dde6fb413f3b0d92
=======
echo "For more information, see README-DEVCON.md" 
>>>>>>> 55d4df0da (big push)
