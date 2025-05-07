<script lang="ts">
import { Github } from "@lucide/svelte";
</script>

<footer class="border-t py-3 mt-auto bg-background">
  <div class="footer-container">
    <a href="https://github.com/blackkittylabs/stoa" class="github-link">
      <Github size={14} />
      <span>View on GitHub</span>
    </a>
  </div>
</footer>

<style>
  footer {
    padding: 0.75rem 0;
  }
  
  .footer-container {
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    justify-content: center;
  }
  
  .github-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: hsl(var(--muted-foreground));
    text-decoration: none;
    transition: color 0.2s ease;
  }
  
  .github-link:hover {
    color: hsl(var(--primary));
  }
</style>
