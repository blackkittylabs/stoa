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
  <main class="flex-1 overflow-y-auto">
    <div class="container mx-auto pt-8">
      {@render children()}
      <div class="h-32 md:h-10"></div>
    </div>
  </main>
  <nav class="sticky left-0 right-0 border-t {appContextStore.appContext === 'miniapp' ? 'bottom-6' : 'bottom-0'}">
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
