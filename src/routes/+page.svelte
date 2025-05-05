<script>
import { sdk } from "@farcaster/frame-sdk";
import { onMount } from "svelte";
import { goto } from '$app/navigation';

onMount(async () => {
    await sdk.actions.ready();
    goto('/explore');
});
</script>
