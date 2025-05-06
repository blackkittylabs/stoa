<script lang="ts">
import { page } from "$app/state";
import { Sparkles, Telescope, Settings } from "@lucide/svelte";
</script>

<nav>
  <div class="flex h-12 items-center justify-between text-sm font-semibold">
    <a
      class="p-4 ps-4"
      href="/create"
      aria-current={page.url.pathname === "/create"}
    >
      <Sparkles strokeWidth={page.url.pathname === "/create" ? 2.25 : 2} />
    </a>
    <a
      class="p-4"
      href="/explore"
      aria-current={page.url.pathname === "/explore"}
    >
      <Telescope strokeWidth={page.url.pathname === "/explore" ? 2.25 : 2} />
    </a>
    <a
      class="p-4 pe-4"
      href="/settings"
      aria-current={page.url.pathname === "/settings"}
    >
      <Settings strokeWidth={page.url.pathname === "/settings" ? 2.25 : 2} />
    </a>
  </div>
</nav>

<style>
  a[aria-current="true"] {
    color: hsl(var(--primary));
  }
</style>
