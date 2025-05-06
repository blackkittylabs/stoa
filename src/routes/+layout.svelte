<script lang="ts">
import "../app.css";
import { ModeWatcher } from "mode-watcher";
import Navbar from "../components/Navbar.svelte";
import { onMount } from "svelte";
import { sdk } from "@farcaster/frame-sdk";
import { appContextStore } from "$stores/appContext.svelte";

const { children } = $props();

onMount(async () => {
  let context = await sdk.context;
  if (context) {
    appContextStore.setAppContext("miniapp");
  }
});
</script>

<ModeWatcher />
<div class="flex flex-col h-screen">
  <div class="flex-1 overflow-hidden">
    <main class="h-full overflow-y-auto pb-20">
      <div class="container mx-auto pt-8">
        {@render children()}
        <div class="h-10"></div>
      </div>
    </main>
  </div>
  <nav class="sticky bottom-0 left-0 right-0 border-t bg-background z-10">
    <div class="container mx-auto">
      <Navbar />
    </div>
    {#if appContextStore.appContext === 'miniapp'}
      <div class="h-6"></div> <!-- Extra space for miniapp mode -->
    {/if}
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
