<script>
import { sdk } from "@farcaster/frame-sdk";
import { onMount } from "svelte";

onMount(async () => {
    await sdk.actions.ready();
});
</script>

<h1>Welcome to Stoa</h1>
