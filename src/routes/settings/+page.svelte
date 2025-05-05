<script lang="ts">
import { setMode, userPrefersMode } from "mode-watcher";
import * as Select from "$lib/components/ui/select";

let currentTheme = $state<"light" | "dark" | "system">(userPrefersMode.current);
</script>

<ul class="settings-list">
  <li>
    <span>Select theme</span>
    <Select.Root
      type="single"
      bind:value={currentTheme}
      onValueChange={(value) => setMode(value as "light" | "dark" | "system")}
    >
      <Select.Trigger class="w-[180px] capitalize">
        {currentTheme || "Select theme"}
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="light">Light</Select.Item>
        <Select.Item value="dark">Dark</Select.Item>
        <Select.Item value="system">System</Select.Item>
      </Select.Content>
    </Select.Root>
  </li>
</ul>

<style>
  .settings-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
