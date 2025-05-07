<footer class="border-t py-3 mt-auto bg-background">
  <div class="footer-container">
    <div class="footer-links">
      <a href="https://github.com/blackkittylabs/stoa" class="footer-link">
        GitHub
      </a>
      <div class="separator"></div>
      <a href="https://warpcast.com/miniapps/18lP8FLTNojm/stoa" class="footer-link">
        Farcaster Mini App
      </a>
    </div>
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

  .footer-links {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .footer-link {
    font-size: 0.875rem;
    font-weight: 500;
    color: hsl(var(--muted-foreground));
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .footer-link:hover {
    color: hsl(var(--primary));
  }

  .separator {
    width: 1px;
    height: 1rem;
    background-color: hsl(var(--border));
  }
</style>
