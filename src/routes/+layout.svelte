<script lang="ts">
import "../app.css";
import { ModeWatcher } from "mode-watcher";
import Navbar from "../components/Navbar.svelte";
import WebSidebar from "../components/WebSidebar.svelte";
import WebFooter from "../components/WebFooter.svelte";
import { onMount } from "svelte";
import { sdk } from "@farcaster/frame-sdk";
import { appContextStore } from "$stores/appContext.svelte";

const { children } = $props();
let isMobile = $state(false);

// Check if the viewport is mobile-sized
const checkMobile = () => {
  isMobile = window.innerWidth < 768; // Using the same breakpoint as IsMobile hook
};

// Set up context separately from the resize listener
const setupContext = async () => {
  const context = await sdk.context;
  if (context) {
    appContextStore.setAppContext("miniapp");
  }
};

onMount(() => {
  // Set up Farcaster context
  setupContext();

  // Initial check for mobile
  checkMobile();

  // Add resize listener
  window.addEventListener("resize", checkMobile);

  // Return cleanup function
  return () => {
    window.removeEventListener("resize", checkMobile);
  };
});

const isWeb = $derived(appContextStore.appContext === "web");
const isMiniapp = $derived(appContextStore.appContext === "miniapp");
const showDesktopLayout = $derived(isWeb && !isMobile);
</script>

<ModeWatcher />

{#if showDesktopLayout}
  <div class="web-layout-grid">
    <aside class="web-sidebar-container">
      <WebSidebar />
    </aside>
    <div class="web-content-container">
      <main class="web-main-content">
        {@render children()}
      </main>
      <WebFooter />
    </div>
  </div>
{:else}
  <div class="flex flex-col h-screen">
    <div class="flex-1 overflow-hidden">
      <main class="h-full overflow-y-auto pb-20">
        <div class="container mx-auto px-4 pt-6">
          {@render children()}
          <div class="h-10"></div>
        </div>
      </main>
    </div>
    <nav class="sticky bottom-0 left-0 right-0 border-t bg-background z-10">
      <div class="container mx-auto px-4">
        <Navbar />
      </div>
      {#if isMiniapp}
        <div class="h-6"></div> <!-- Extra space for miniapp mode -->
      {/if}
    </nav>
  </div>
{/if}

<style>
  :global(html, body) {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  .web-layout-grid {
    display: grid;
    grid-template-columns: 240px 1fr;
    height: 100vh;
    width: 100%;
    overflow: hidden;
  }

  .web-sidebar-container {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 240px;
    z-index: 10;
  }

  .web-content-container {
    grid-column: 2;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    overflow: hidden;
  }

  .web-main-content {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
  }
</style>
