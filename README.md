<div style="text-align: center; margin-top: 100px">
  <img src="static/android-chrome-512x512.png" alt="Svelte Directory Logo" width="200" />
</div>
<h1 style="text-align: center; font-size: 48px">Svelte Directory</h1>

<p style="text-align: center">
  <a href="https://github.com/klementine-org/svelte-directory/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/klementine-org/svelte-directory?style=for-the-badge&color=blue" alt="License" />
  </a>
  <a href="https://github.com/klementine-org/svelte-directory/stargazers">
    <img src="https://img.shields.io/github/stars/klementine-org/svelte-directory?style=for-the-badge&color=yellow" alt="Stars" />
  </a>
  <a href="https://github.com/klementine-org/svelte-directory/network/members">
    <img src="https://img.shields.io/github/forks/klementine-org/svelte-directory?style=for-the-badge&color=orange" alt="Forks" />
  </a>
  <a href="https://github.com/klementine-org/svelte-directory/issues">
    <img src="https://img.shields.io/github/issues/klementine-org/svelte-directory?style=for-the-badge&color=red" alt="Issues" />
  </a>
  <a href="https://github.com/klementine-org/svelte-directory/pulls">
    <img src="https://img.shields.io/github/issues-pr/klementine-org/svelte-directory?style=for-the-badge&color=green" alt="Pull Requests" />
  </a>
  <a href="https://github.com/klementine-org/svelte-directory/commits">
    <img src="https://img.shields.io/github/last-commit/klementine-org/svelte-directory?style=for-the-badge&color=purple" alt="Last Commit" />
  </a>
</p>

<p style="text-align: center">
  A curated directory of Svelte libraries, components, and tools to enhance your Svelte development experience.
</p>

## 📚 Add Library

The Svelte Directory is a community-driven collection of Svelte libraries and components.
We welcome contributions from the community to help grow this resource.
To add a new library or component, please follow the steps below:

1. [Create a new issue](https://github.com/klementine-org/svelte-directory/issues/new/choose) in the repository with the title "Add: [Library Name]"
2. Add the GitHub URL to your issue description
3. Our team will review the submission and add it to the directory

## 💻 Development

### Installation

1. Clone the repository:

```bash
git clone https://github.com/klementine-org/svelte-directory.git
cd svelte-directory
```

2. Install [Node.js](https://nodejs.org/) (check the `.nvmrc` file for the recommended version)
3. Install [pnpm](https://pnpm.io/):

```bash
corepack enable pnpm
```

4. Install dependencies:

```bash
# Using pnpm (recommended)
pnpm install
```

### Scripts

- Start the development server:

```bash
pnpm dev
```

- Build the project for production:

```bash
pnpm build
```

- Preview the production build:

```bash
pnpm preview
```

- Library management:

```bash
# Compile library from data/libraries to src/lib/assets/compiled-data (with search index and tags set)
pnpm lib:compile

# Add a new library to data/libraries (with GitHub URL)
pnpm lib:add <github-url>

# Update all libraries in data/libraries with the latest information from GitHub
pnpm lib:update

# Update specific libraries in data/libraries with the latest information from GitHub (separate multiple URLs with spaces)
pnpm lib:update <github-url> [<github-url>]

# Example
pnpm lib:update https://github.com/huntabyte/shadcn-svelte https://github.com/ciscoheat/sveltekit-superforms
```

## 👥 Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m ':gitmoji: Add some amazing feature'`)
   > Note: Prefix commit messages with [:gitmoji:](https://gitmoji.dev/)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
