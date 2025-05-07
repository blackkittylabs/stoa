<script lang="ts">
import NavLinks from "./NavLinks.svelte";
</script>

<nav class="mobile-nav">
  <div class="h-12 text-sm font-semibold pt-2">
    <NavLinks isMiniApp={true} />
  </div>
</nav>

<style>
  .mobile-nav {
    width: 100%;
  }
</style>
