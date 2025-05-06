# check code for errors
check:
    pnpm full-check

# format and lint
lint:
    pnpm format-lint:fix

# update toolchain and dependencies
update:
    pnpm self-update
    pnpm up
    pnpm dlx shadcn-svelte@next update -a -y && just check
