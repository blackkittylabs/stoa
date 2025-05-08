<script lang="ts">
import { appContextStore } from "$stores/appContext.svelte";
import { MOCK_DISCUSSIONS, getRelativeTime, calculateConsensus } from "$stores/mockData";
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
import ConsensusMeter from "$lib/components/ConsensusMeter.svelte";

// Function to handle card click
function navigateToConversation(id: string) {
  goto(`/conversation/${id}`);
}

// Get image url based on discussion ID
function getImageUrl(id: string): string {
  const images = [
    "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=300&h=300&q=80", // Web3
    "https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?w=300&h=300&q=80", // AI
    "https://images.unsplash.com/photo-1501127122-f385ca6ddd9d?w=300&h=300&q=80", // Governance
    "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=300&h=300&q=80", // Memes
    "https://images.unsplash.com/photo-1566837945700-30057527ade0?w=300&h=300&q=80", // ZK
  ];

  const index = Number.parseInt(id, 10) - 1;
  return images[index % images.length];
}
</script>

<div class="w-full py-6">
  <h1 class="text-3xl font-bold mb-6">Explore conversations</h1>

  <div class="space-y-4">
    {#each MOCK_DISCUSSIONS as discussion}
      <div
        class="cursor-pointer"
        on:click={() => navigateToConversation(discussion.id)}
        on:keydown={(e) => e.key === 'Enter' && navigateToConversation(discussion.id)}
        role="button"
        tabindex="0"
      >
        <Card class="overflow-hidden hover:shadow-md transition-shadow duration-200">
          <div class="flex p-4">
            <div class="self-center w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded overflow-hidden mr-4">
              <img
                src={getImageUrl(discussion.id)}
                alt={discussion.title}
                class="w-full h-full object-cover"
              />
            </div>
            <div class="flex-1 flex flex-col justify-between">
              <div>
                <div class="flex justify-between items-start gap-3">
                  <div class="flex-1 min-w-0">
                    <h3 class="text-lg sm:text-xl font-semibold line-clamp-1">{discussion.title}</h3>
                    <p class="text-sm text-muted-foreground">By {discussion.author}</p>
                  </div>
                  <div class="flex-shrink-0">
                    <ConsensusMeter value={calculateConsensus(discussion)} size={90} showLabel={true} />
                  </div>
                </div>
                <p class="text-sm mt-2 mb-4 line-clamp-2">{discussion.description}</p>
              </div>
              <div class="flex text-xs sm:text-sm text-muted-foreground">
                <div class="flex items-center gap-2">
                  <div>{discussion.comments.length} comments</div>
                  <div>•</div>
                  <div>Updated {getRelativeTime(discussion.updatedAt)}</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    {/each}
  </div>
</div>
