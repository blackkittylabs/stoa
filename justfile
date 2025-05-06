# lint the javascript code
lint-js:
  pnpm format-lint

# lint and fix the javascript code
lint-js-fix:
  pnpm format-lint:fix

# add a shadcn component
shadcn-add *args='':
  pnpm dlx shadcn-svelte@next add {{args}} -y && pnpm format-lint:fix

# update shadcn components
shadcn-update:
  pnpm dlx shadcn-svelte@next update -a -y && pnpm format-lint:fix
