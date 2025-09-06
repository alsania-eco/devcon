#!/bin/bash

# Build and install the Echo DevCon extension for VS Code
echo "Building Echo DevCon extension..."
cd extensions/vscode

# Run the build process
echo "Running prepackage..."
npm run prepackage

echo "Running esbuild..."
npm run esbuild

echo "Packaging extension..."
npm run package

# Go back to root directory
cd ../..

# Install the extension
echo "Installing Echo DevCon extension..."
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 28a5064bef6f33a4ac2c88832b9d39094322dc2b
code --install-extension extensions/vscode/build/echo-devcon-1.1.72.vsix --force

echo "Extension installed successfully!"
echo "You can now open VS Code and use the Echo DevCon extension with your EchoMCP backend."
=======
=======
>>>>>>> 55d4df0da (big push)
<<<<<<< HEAD
=======
>>>>>>> 55d4df0da (big push)
=======
>>>>>>> 28a5064bef6f33a4ac2c88832b9d39094322dc2b
code --install-extension extensions/vscode/build/devcon-1.1.72.vsix --force

echo "Extension installed successfully!"
echo "You can now open VS Code and use the Echo DevCon extension with your AlsaniaMCP backend."
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 28516c7fabf170e523ba3466dde6fb413f3b0d92
=======
>>>>>>> 55d4df0da (big push)
=======
>>>>>>> 55d4df0da (big push)
=======
>>>>>>> 28516c7fabf170e523ba3466dde6fb413f3b0d92
=======
>>>>>>> 55d4df0da (big push)
>>>>>>> 28a5064bef6f33a4ac2c88832b9d39094322dc2b
echo ""
echo "Configuration is located at: ~/.continue/config.json"
echo "MCP Server should be running on: http://localhost:8000"