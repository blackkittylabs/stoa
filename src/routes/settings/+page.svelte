<script lang="ts">
import { setMode, userPrefersMode } from "mode-watcher";
import * as Select from "$lib/components/ui/select";
import * as Card from "$lib/components/ui/card";
import * as Switch from "$lib/components/ui/switch";

let currentTheme = $state<"light" | "dark" | "system">(userPrefersMode.current);
let anonymousMode = $state<boolean>(false);
</script>

<div class="container py-8 max-w-3xl mx-auto">
  <h1 class="text-3xl font-bold mb-6">Settings</h1>

  <Card.Root class="mb-6">
    <Card.Header>
      <Card.Title>Appearance</Card.Title>
    </Card.Header>
    <Card.Content>
      <div class="settings-item">
        <div class="settings-label">
          <span class="font-medium">Theme</span>
          <span class="text-sm text-muted-foreground">Choose your preferred theme</span>
        </div>
        <Select.Root
          type="single"
          bind:value={currentTheme}
          onValueChange={(value) => setMode(value as "light" | "dark" | "system")}
        >
          <Select.Trigger class="w-[140px] capitalize">
            {currentTheme || "Select theme"}
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="light">Light</Select.Item>
            <Select.Item value="dark">Dark</Select.Item>
            <Select.Item value="system">System</Select.Item>
          </Select.Content>
        </Select.Root>
      </div>
    </Card.Content>
  </Card.Root>

  <Card.Root>
    <Card.Header>
      <Card.Title>Privacy</Card.Title>
    </Card.Header>
    <Card.Content>
      <div class="settings-item">
        <div class="settings-label">
          <span class="font-medium">Anonymous Mode</span>
          <span class="text-sm text-muted-foreground">Hide your identity from other users</span>
        </div>
        <Switch.Root bind:checked={anonymousMode} />
      </div>
    </Card.Content>
  </Card.Root>
</div>

<style>
  .settings-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
  }

  .settings-label {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
</style>