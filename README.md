# Stoa
Welcome to the Stoa codebase. Stoa is an app that encourages meaningful discussion and offers accurate insight into community sentiment.

## Development guide
This guide is for both humans and AI agents. Thank you for contributing to the project.

### Tech docs
Here is the tech we use and their docs:
- Svelte 5: https://svelte.dev/llms-small.txt
- Farcaster mini app SDK: https://miniapps.farcaster.xyz/llms-full.txt
- shadcn-svelte: https://next.shadcn-svelte.com/docs

### Coding practices
- Write minimal and elegant code using best practices
- Check your code with `just check`
- Ensure the UI is responsive, looking good on both mobile and desktop views

### UI components
We use shadcn-svelte, and all components are already installed:
- View list of components: `ls ./src/lib/components/ui`
- View docs for a components: navigate to `https://next.shadcn-svelte.com/docs/components/{componentName}`, for example, `https://next.shadcn-svelte.com/docs/components/accordion`

## Checklist
- [x] miniapp
- [ ] wallet
  - [ ] connect button (for web/mobile)
  - [ ] siwf for Farcaster
- [ ] tauri
- [ ] database
