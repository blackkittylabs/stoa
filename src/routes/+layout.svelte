<script lang="ts">
import "../app.css";
import { ModeWatcher } from "mode-watcher";
import Navbar from "../components/Navbar.svelte";
import WebFooter from "../components/WebFooter.svelte";
import NavLinks from "../components/NavLinks.svelte";
import { onMount } from "svelte";
import { sdk } from "@farcaster/frame-sdk";
import { appContextStore } from "$stores/appContext.svelte";
import { page } from "$app/state";

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

// Elegant and efficient page title generator
function getPageTitle(path: string): string {
  const pageName = path.split("/")[1];

  if (!pageName) return "Stoa";

  // Capitalize first letter of the page name
  const capitalizedName = pageName.charAt(0).toUpperCase() + pageName.slice(1);
  return `Stoa | ${capitalizedName}`;
}
</script>

<svelte:head>
  <title>{getPageTitle(page.url.pathname)}</title>
</svelte:head>

<ModeWatcher />

{#if !isMiniapp}
  <!-- Desktop browser and mobile browser (non-miniapp) -->
  <div class="modern-layout">
    <header class="modern-header">
      <div class="container">
        <nav class="modern-nav">
          <NavLinks isMiniApp={false} />
        </nav>
      </div>
    </header>
    <main class="modern-main">
      <div class="container content-area">
        {@render children()}
      </div>
    </main>
    <WebFooter />
  </div>
{:else}
  <!-- Miniapp layout -->
  <div class="flex flex-col h-screen">
    <div class="flex-1 overflow-hidden">
      <main class="h-full overflow-y-auto pb-20">
        <div class="container mx-auto px-4 pt-6 max-w-4xl">
          {@render children()}
          <div class="h-10"></div>
        </div>
      </main>
    </div>
    <nav class="sticky bottom-0 left-0 right-0 border-t bg-background z-10">
      <div class="container mx-auto max-w-4xl">
        <Navbar />
      </div>
      <div class="h-8"></div> <!-- Extra space for miniapp mode on iOS -->
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

  .modern-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    overflow: hidden;
  }

  .modern-header {
    padding: 0.75rem 0;
    border-bottom: 1px solid hsl(var(--border));
    background-color: hsl(var(--background));
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .container {
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .modern-nav {
    display: flex;
    justify-content: center;
  }

  .modern-main {
    flex: 1;
    overflow-y: auto;
    padding: 2rem 0;
  }

  .content-area {
    min-height: 100%;
  }

  /* Responsive adjustments for mobile browser */
  @media (max-width: 767px) {
    .modern-header {
      padding: 0.5rem 0;
    }

    .container {
      padding: 0 1rem;
    }

    .modern-main {
      padding: 1.5rem 0;
    }
  }
</style>
