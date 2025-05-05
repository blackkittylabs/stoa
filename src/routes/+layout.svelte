<script lang="ts">
import '../app.css';
import Navbar from '../components/Navbar.svelte';
const { children } = $props();
</script>

<div class="flex flex-col h-screen">
  <main class="flex-1 overflow-y-auto">
    <div class="container mx-auto pt-8">
      {@render children()}
      <div class="h-32 md:h-10"></div>
    </div>
  </main>
  <nav class="sticky bottom-0 left-0 right-0 border-t">
    <div class="container mx-auto py-4">
      <Navbar />
    </div>
  </nav>
</div>

<style>
  :global(html, body) {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
</style>
