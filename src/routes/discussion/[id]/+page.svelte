<script lang="ts">
import { page } from "$app/stores";
import {
  MOCK_DISCUSSIONS,
  getRelativeTime,
  type Comment,
} from "$stores/mockData";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "$lib/components/ui/card";
import { Button } from "$lib/components/ui/button";
import { goto } from "$app/navigation";
import { Separator } from "$lib/components/ui/separator";

const discussionId = $page.params.id;
const discussion = MOCK_DISCUSSIONS.find((d) => d.id === discussionId);

// Function to handle user reactions
function handleReaction(
  commentId: string,
  reactionType: "agree" | "disagree" | "pass",
) {
  // In a real app, we would update the store and send to API
  // For this demo, we'll just log the reaction
  console.log(`Reaction: ${reactionType} on comment ${commentId}`);
}

// Navigation functions
function goToExplore() {
  goto("/explore");
}
</script>

{#if discussion}
  <div class="container mx-auto px-4 py-6">
    <div>
      <button
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mb-4"
        on:click={goToExplore}
      >
        ← Back to Explore
      </button>
    </div>
    
    <div class="bg-card rounded-lg shadow-sm p-6 mb-8">
      <h1 class="text-3xl font-bold mb-2">{discussion.title}</h1>
      <div class="mb-2 text-sm text-muted-foreground">
        By {discussion.author} · Created {getRelativeTime(discussion.createdAt)}
      </div>
      <p class="text-lg mb-4">{discussion.description}</p>
    </div>
    
    <div class="mb-4">
      <h2 class="text-2xl font-semibold mb-4">Comments ({discussion.comments.length})</h2>
      <Separator class="mb-6" />
      
      {#if discussion.comments.length === 0}
        <p class="text-center text-muted-foreground py-8">No comments yet. Be the first to comment!</p>
      {:else}
        <div class="space-y-4">
          {#each discussion.comments as comment}
            <Card class="shadow-sm">
              <CardHeader>
                <div class="flex justify-between items-start">
                  <div>
                    <div class="font-medium">{comment.author}</div>
                    <div class="text-sm text-muted-foreground">{getRelativeTime(comment.createdAt)}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p>{comment.content}</p>
              </CardContent>
              <CardFooter class="flex flex-col sm:flex-row gap-2">
                <div class="flex gap-2 w-full sm:w-auto">
                  <button 
                    class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3 flex-1 sm:flex-none bg-green-600 text-white hover:bg-green-700"
                    on:click={() => handleReaction(comment.id, 'agree')}
                  >
                    Agree
                  </button>
                  
                  <button 
                    class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3 flex-1 sm:flex-none bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    on:click={() => handleReaction(comment.id, 'disagree')}
                  >
                    Disagree
                  </button>
                  
                  <button 
                    class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3 flex-1 sm:flex-none border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                    on:click={() => handleReaction(comment.id, 'pass')}
                  >
                    Pass
                  </button>
                </div>
              </CardFooter>
            </Card>
          {/each}
        </div>
      {/if}
    </div>
  </div>
{:else}
  <div class="container mx-auto px-4 py-6 text-center">
    <p class="text-xl mb-4">Discussion not found</p>
    <button 
      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
      on:click={goToExplore}
    >
      Go back to Explore
    </button>
  </div>
{/if}