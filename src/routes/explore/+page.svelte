<script lang="ts">
import { appContextStore } from "$stores/appContext.svelte";
import { MOCK_DISCUSSIONS, getRelativeTime } from "$stores/mockData";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "$lib/components/ui/card";
import { Button } from "$lib/components/ui/button";
import { goto } from "$app/navigation";

// Function to handle card click
function navigateToConversation(id: string) {
  goto(`/conversation/${id}`);
}
</script>

<div class="container mx-auto px-4 py-6">
  <h1 class="text-3xl font-bold mb-6">Explore Conversations</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each MOCK_DISCUSSIONS as discussion}
      <div
        class="cursor-pointer"
        on:click={() => navigateToConversation(discussion.id)}
        on:keydown={(e) => e.key === 'Enter' && navigateToConversation(discussion.id)}
        role="button"
        tabindex="0"
      >
        <Card class="h-full hover:shadow-md transition-shadow duration-200">
          <CardHeader>
            <CardTitle class="text-xl">{discussion.title}</CardTitle>
            <CardDescription>By {discussion.author}</CardDescription>
          </CardHeader>
          <CardContent>
            <p class="line-clamp-3">{discussion.description}</p>
          </CardContent>
          <CardFooter class="flex justify-between text-sm text-muted-foreground">
            <div>{discussion.comments.length} comments</div>
            <div>Updated {getRelativeTime(discussion.updatedAt)}</div>
          </CardFooter>
        </Card>
      </div>
    {/each}
  </div>
</div>
