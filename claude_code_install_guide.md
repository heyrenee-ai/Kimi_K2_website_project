# Claude Code Installation Guide for macOS

This guide provides complete step-by-step instructions for installing Claude Code on macOS using NVM (Node Version Manager).

## Prerequisites

- macOS computer
- Terminal access
- Internet connection
- Administrative privileges (for some steps)

## Installation Steps

### Step 1: Install Xcode Command Line Tools

The Xcode Command Line Tools are required for many development tools on macOS.

```bash
xcode-select --install
```

**Note:** This will open a dialog box. Click "Install" and wait for the installation to complete (may take several minutes).

### Step 2: Install NVM (Node Version Manager)

NVM allows you to install and manage multiple versions of Node.js without permission issues.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

### Step 3: Load NVM for Current Session

After installation, you need to load NVM in your current terminal session.

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

### Step 4: Verify NVM Installation

Check that NVM is properly installed and available.

```bash
nvm --version
```

**Expected output:** `0.40.3` (or similar version number)

### Step 5: Install Node.js via NVM

Install the latest version of Node.js using NVM.

```bash
nvm install node
nvm use node
```

### Step 6: Verify Node.js Installation

Confirm Node.js is installed and accessible.

```bash
node -v
which node
```

**Expected output:**
- Node version (e.g., `v24.6.0`)
- Path showing nvm location (e.g., `/Users/username/.nvm/versions/node/v24.6.0/bin/node`)

### Step 7: Install Claude Code

Install Claude Code globally using npm.

```bash
npm install -g @anthropic-ai/claude-code
```

### Step 8: Fix Shell Configuration Permissions

If you encounter permission issues with your `.zshrc` file, fix them with:

```bash
sudo chown $(whoami) ~/.zshrc
sudo chmod 644 ~/.zshrc
```

### Step 9: Add Configuration to Shell Profile

Add the necessary configuration to your `.zshrc` file to make NVM and Claude Code available in all terminal sessions.

```bash
echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.zshrc
echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.zshrc
echo '[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"' >> ~/.zshrc
echo 'export PATH="$(npm config get prefix)/bin:$PATH"' >> ~/.zshrc
```

### Step 10: Reload Shell Configuration

Apply the changes to your current terminal session.

```bash
source ~/.zshrc
```

### Step 11: Test Claude Code Installation

Verify that Claude Code is properly installed and accessible.

```bash
claude --version
```

**Expected output:** `1.0.93 (Claude Code)` (or similar version)

## Usage

### Basic Commands

```bash
# Show version
claude --version

# Show help and available commands
claude --help

# Get help for a specific command
claude <command> --help
```

### Project Setup

For best results, always run Claude Code from within your project directory:

```bash
# Create a new project directory
mkdir "my-project"
cd "my-project"

# Initialize project (optional)
npm init -y

# Use Claude Code
claude --help
```

## Troubleshooting

### Command Not Found Error

If you get `zsh: command not found: claude`, try:

1. **Reload your shell configuration:**
   ```bash
   source ~/.zshrc
   ```

2. **Check if the PATH is set correctly:**
   ```bash
   echo $PATH | grep nvm
   ```

3. **Manually load NVM:**
   ```bash
   export NVM_DIR="$HOME/.nvm"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
   ```

### Permission Issues

If you encounter permission errors:

1. **Fix file ownership:**
   ```bash
   sudo chown -R $(whoami) ~/.nvm
   ```

2. **Fix shell profile permissions:**
   ```bash
   sudo chown $(whoami) ~/.zshrc
   chmod 644 ~/.zshrc
   ```

### Alternative Installation Method

If NVM installation fails, you can try using the existing Node.js installation:

```bash
# Create directory for global packages
mkdir ~/.npm-global

# Configure npm to use this directory
npm config set prefix '~/.npm-global'

# Add to PATH
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zshrc
source ~/.zshrc

# Install Claude Code
npm install -g @anthropic-ai/claude-code
```

## Important Notes

- The command is `claude` (not `claude-code`)
- Always run Claude Code from within your project directory for best context
- Claude Code requires an internet connection to function
- For comprehensive usage documentation, visit: https://docs.anthropic.com/en/docs/claude-code

## Quick Test Setup

After installation, test Claude Code with a simple project:

```bash
# Create and navigate to test project
cd ~
mkdir "claude-test"
cd "claude-test"

# Create a simple file
echo "console.log('Hello, Claude!');" > app.js

# Test Claude Code
claude --version
claude --help
```

## Support

If you encounter issues not covered in this guide:
- Check the official documentation at https://docs.anthropic.com
- Visit https://support.anthropic.com for additional support

---

*This guide was created based on macOS installation experience. Commands may vary slightly for different versions of macOS or terminal configurations.*