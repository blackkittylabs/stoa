# lint the javascript code
lint-js:
  bun format-lint

# lint and fix the javascript code
lint-js-fix:
  bun format-lint:fix

# add a shadcn component
shadcn-add *args='':
  bunx shadcn-svelte@next add {{args}} && bun format-lint:fix

# update shadcn components
shadcn-update:
  bunx shadcn-svelte@next update -a -y && bun format-lint:fix
