<script lang="ts">
import { page } from "$app/state";
import { Sparkles, Telescope, Settings } from "@lucide/svelte";
import * as Sidebar from "$lib/components/ui/sidebar";
import type { Snippet } from "svelte";

// Define tooltips as Snippets for collapsed state
const createTooltip = $derived.by(() => {
  return {
    render: () => "Create",
  } as unknown as Snippet;
});

const exploreTooltip = $derived.by(() => {
  return {
    render: () => "Explore",
  } as unknown as Snippet;
});

const settingsTooltip = $derived.by(() => {
  return {
    render: () => "Settings",
  } as unknown as Snippet;
});
</script>

<Sidebar.Provider>
  <Sidebar.Sidebar variant="floating" collapsible="none" side="left" class="web-sidebar">
    <Sidebar.Header>
      <div class="px-6 py-4">
        <!-- Logo removed as requested -->
      </div>
    </Sidebar.Header>
    <Sidebar.Content class="px-2">
      <Sidebar.Menu>
        <Sidebar.MenuItem>
          <a href="/create" class:active={page.url.pathname === "/create"}>
            <Sidebar.MenuButton 
              isActive={page.url.pathname === "/create"}
              tooltipContent={createTooltip}
              size="lg"
              class={page.url.pathname === "/create" ? "active-menu-item" : ""}
            >
              <Sparkles class="mr-3 size-[18px]" /> <span>Create</span>
            </Sidebar.MenuButton>
          </a>
        </Sidebar.MenuItem>
        <Sidebar.MenuItem>
          <a href="/explore" class:active={page.url.pathname === "/explore"}>
            <Sidebar.MenuButton 
              isActive={page.url.pathname === "/explore"}
              tooltipContent={exploreTooltip}
              size="lg"
              class={page.url.pathname === "/explore" ? "active-menu-item" : ""}
            >
              <Telescope class="mr-3 size-[18px]" /> <span>Explore</span>
            </Sidebar.MenuButton>
          </a>
        </Sidebar.MenuItem>
        <Sidebar.MenuItem>
          <a href="/settings" class:active={page.url.pathname === "/settings"}>
            <Sidebar.MenuButton 
              isActive={page.url.pathname === "/settings"}
              tooltipContent={settingsTooltip}
              size="lg"
              class={page.url.pathname === "/settings" ? "active-menu-item" : ""}
            >
              <Settings class="mr-3 size-[18px]" /> <span>Settings</span>
            </Sidebar.MenuButton>
          </a>
        </Sidebar.MenuItem>
      </Sidebar.Menu>
    </Sidebar.Content>
  </Sidebar.Sidebar>
</Sidebar.Provider>

<style>
  a {
    text-decoration: none;
    color: inherit;
    display: block;
  }
  
  :global(.group-data-\[variant\=floating\]\:border-sidebar-border) {
    /* Remove double border */
    border: none !important;
  }

  :global(.active-menu-item) {
    background-color: hsl(var(--primary) / 0.1) !important;
    color: hsl(var(--primary)) !important;
    font-weight: 600 !important;
    /* Fix for consistent positioning - no indentation */
    border-left: none !important;
    transform: none !important;
  }
  
  /* Ensure all menu buttons have the same positioning regardless of state */
  :global([data-sidebar="menu-button"]) {
    display: flex !important;
    align-items: center !important;
    width: 100% !important;
    border-left: none !important;
    position: relative !important;
    left: 0 !important;
    right: 0 !important;
    margin: 0 !important;
  }
  
  /* Fix for icon alignment regardless of button state */
  :global([data-sidebar="menu-button"] svg) {
    flex-shrink: 0 !important;
    width: 18px !important;
    height: 18px !important;
  }
  
  /* Prevent text shifting when font weight changes */
  :global([data-sidebar="menu-button"] span) {
    display: inline-block !important;
    width: auto !important;
    box-sizing: border-box !important;
  }

  :global(.web-sidebar) {
    min-width: 260px;
    width: 260px;
    max-width: 260px;
  }
</style>