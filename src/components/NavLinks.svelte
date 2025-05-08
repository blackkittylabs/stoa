<script lang="ts">
import { page } from "$app/state";
import { Telescope, Settings } from "@lucide/svelte";

// Export props with default values
const { isMiniApp = false } = $props();
</script>

<div class="nav-container {isMiniApp ? 'miniapp' : ''}">
  <a
    href="/explore"
    class="nav-link {page.url.pathname === '/explore' ? 'active' : ''}"
  >
    <Telescope size={18} />
    <span>Explore</span>
  </a>
  <a
    href="/settings"
    class="nav-link {page.url.pathname === '/settings' ? 'active' : ''}"
  >
    <Settings size={18} />
    <span>Settings</span>
  </a>
</div>

<style>
  .nav-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    width: 100%;
  }
  
  .nav-container.miniapp {
    justify-content: center;
    gap: 4rem;
    padding: 0 1rem;
  }
  
  .nav-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: hsl(var(--muted-foreground));
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    transition: all 0.2s ease;
  }

  .nav-link:hover {
    color: hsl(var(--foreground));
    background-color: hsl(var(--muted) / 0.3);
  }

  .nav-link.active {
    color: hsl(var(--primary));
    background-color: hsl(var(--primary) / 0.1);
  }

  /* Responsive adjustments for mobile */
  @media (max-width: 767px) {
    .nav-container {
      gap: 0.75rem;
    }

    .nav-link {
      padding: 0.6rem 0.7rem;
      font-size: 0.9rem;
    }
  }
  
  /* Additional height for miniapp mode */
  .nav-container.miniapp .nav-link {
    padding: 0.7rem 0.7rem;
  }
</style>