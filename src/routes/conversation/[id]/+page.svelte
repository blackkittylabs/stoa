<script lang="ts">
import { page } from "$app/stores";
import {
  MOCK_DISCUSSIONS,
  getRelativeTime,
  calculateConsensus,
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
import { Textarea } from "$lib/components/ui/textarea";
import { writable } from "svelte/store";
import ConsensusMeter from "$lib/components/ConsensusMeter.svelte";
import { browser } from "$app/environment";
import { onMount } from "svelte";

const conversationId = $page.params.id;
const conversation = MOCK_DISCUSSIONS.find((d) => d.id === conversationId);

// Create a store for mobile detection
const isMobile = writable(false);

// Update the store based on window size
function updateMobileStatus() {
  if (browser) {
    isMobile.set(window.innerWidth < 768);
  }
}

// Set up window resize listener
onMount(() => {
  updateMobileStatus();

  if (browser) {
    window.addEventListener("resize", updateMobileStatus);
    return () => window.removeEventListener("resize", updateMobileStatus);
  }
});

// State for voting system
let activeIndex = 0;
let reviewingPassed = false;
let passedCommentIds: string[] = [];
let allDone = false;
let newCommentText = "";

// Function to get image url based on discussion ID
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

// Function to handle user reactions
function handleReaction(
  commentId: string,
  reactionType: "agree" | "disagree" | "pass",
) {
  // In a real app, we would update the store and send to API
  console.log(`Reaction: ${reactionType} on comment ${commentId}`);

  // Handle reaction based on type
  if (reactionType === "pass") {
    // Add to passed comments for later review
    passedCommentIds = [...passedCommentIds, commentId];
  }

  // Move to next comment
  moveToNext();
}

// Function to move to next comment or handle end states
function moveToNext() {
  if (!conversation) return;

  if (!reviewingPassed) {
    // Still going through initial comments
    activeIndex++;

    // Check if we're done with initial pass
    if (activeIndex >= conversation.comments.length) {
      // If we have passed comments, start reviewing them
      if (passedCommentIds.length > 0) {
        reviewingPassed = true;
        activeIndex = 0; // Reset index for passed comments
      } else {
        // No passed comments, we're all done
        allDone = true;
      }
    }
  } else {
    // Reviewing passed comments
    activeIndex++;

    // Check if we're done with passed comments
    if (activeIndex >= passedCommentIds.length) {
      allDone = true;
    }
  }
}

// Function to get current comment
function getCurrentComment(): Comment | null {
  if (!conversation) return null;

  if (!reviewingPassed) {
    // Normal mode - show comment at activeIndex
    return activeIndex < conversation.comments.length
      ? conversation.comments[activeIndex]
      : null;
  }

  // Review mode - show passed comments
  const passedCommentId = passedCommentIds[activeIndex];
  return conversation.comments.find((c) => c.id === passedCommentId) || null;
}

// Function to reset the voting
function resetVoting() {
  activeIndex = 0;
  reviewingPassed = false;
  passedCommentIds = [];
  allDone = false;
}

// Function to submit a new comment
function submitComment() {
  if (!newCommentText.trim()) return;

  // In a real app, we would update the store and send to API
  console.log(`New comment: ${newCommentText}`);

  // Reset the input
  newCommentText = "";
}

// Navigation functions
function goToExplore() {
  goto("/explore");
}
</script>

{#if conversation}
  <div class="w-full py-6">
    <div>
      <button
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mb-4"
        on:click={goToExplore}
      >
        ← Back to Explore
      </button>
    </div>

    <div class="mb-8">
      <!-- Mobile version -->
      {#if $isMobile}
        <div class="flex flex-col mb-6">
          <div class="flex items-center mb-4">
            <div class="w-24 h-24 shrink-0 rounded overflow-hidden mr-4">
              <img
                src={getImageUrl(conversation.id)}
                alt={conversation.title}
                class="w-full h-full object-cover"
              />
            </div>
            <div class="shrink-0">
              <ConsensusMeter value={calculateConsensus(conversation)} size={90} showLabel={true} />
            </div>
          </div>
          <div>
            <h1 class="text-3xl font-bold mb-2">{conversation.title}</h1>
            <div class="mb-2 text-sm text-muted-foreground">
              By {conversation.author} · Created {getRelativeTime(conversation.createdAt)}
            </div>
            <p class="text-lg">{conversation.description}</p>
          </div>
        </div>
      <!-- Desktop version -->
      {:else}
        <div class="flex items-start mb-4">
          <div class="w-28 h-28 shrink-0 rounded overflow-hidden mr-4">
            <img
              src={getImageUrl(conversation.id)}
              alt={conversation.title}
              class="w-full h-full object-cover"
            />
          </div>
          <div class="grow">
            <div class="flex justify-between items-start">
              <div class="grow mr-6">
                <h1 class="text-3xl font-bold mb-2">{conversation.title}</h1>
                <div class="mb-2 text-sm text-muted-foreground">
                  By {conversation.author} · Created {getRelativeTime(conversation.createdAt)}
                </div>
              </div>
              <div class="shrink-0">
                <ConsensusMeter value={calculateConsensus(conversation)} size={100} showLabel={true} />
              </div>
            </div>
            <p class="text-lg pr-28">{conversation.description}</p>
          </div>
        </div>
      {/if}
    </div>

    <!-- Vote on Comments Section -->
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Vote on Comments</h2>
      <Separator class="mb-6" />

      {#if conversation.comments.length === 0}
        <p class="text-center text-muted-foreground py-8">No comments yet. Add the first comment below!</p>
      {:else if allDone}
        <!-- All Done View with fixed height to match the voting area -->
        <div class="min-h-[400px] flex flex-col items-center justify-center text-center">
          <h3 class="text-xl font-medium mb-2">All Done!</h3>
          <p class="text-muted-foreground mb-4">You've voted on all the comments in this conversation.</p>
          <button
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            on:click={resetVoting}
          >
            Vote Again
          </button>
        </div>
      {:else}
        <!-- Simple single card stack implementation with fixed height -->
        <div class="min-h-[400px] flex flex-col">
          {#if reviewingPassed}
            <div class="text-sm text-muted-foreground mb-4">
              Reviewing skipped comments ({activeIndex + 1} of {passedCommentIds.length}):
            </div>
          {:else}
            <div class="text-sm text-muted-foreground mb-4">
              Comment {activeIndex + 1} of {conversation.comments.length}:
            </div>
          {/if}

          <!-- Fixed height container for card -->
          <div class="grow flex flex-col mb-4">
            <!-- Current comment card -->
            {#if getCurrentComment()}
              {@const currentComment = getCurrentComment()}
              <Card class="shadow-lg transform transition-all duration-150 h-full flex flex-col">
                <CardHeader>
                  <div class="flex justify-between items-start">
                    <div>
                      <div class="font-medium">{currentComment?.author}</div>
                      <div class="text-sm text-muted-foreground">{getRelativeTime(currentComment?.createdAt || new Date())}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent class="grow overflow-y-auto h-[180px]">
                  <p>{currentComment?.content}</p>
                </CardContent>
                <CardFooter class="flex justify-center">
                  <div class="flex gap-2 w-full max-w-md justify-center">
                    <button
                      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-3 flex-1 bg-green-600 text-white hover:bg-green-700"
                      on:click={() => handleReaction(currentComment?.id || '', 'agree')}
                    >
                      Agree
                    </button>

                    <button
                      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-3 flex-1 bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      on:click={() => handleReaction(currentComment?.id || '', 'disagree')}
                    >
                      Disagree
                    </button>

                    <button
                      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-3 flex-1 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                      on:click={() => handleReaction(currentComment?.id || '', 'pass')}
                    >
                      Skip
                    </button>
                  </div>
                </CardFooter>
              </Card>
            {/if}
          </div>

          <!-- Progress bar -->
          <div class="w-full bg-muted rounded-full h-2.5 mb-4">
            {#if reviewingPassed}
              <div class="bg-primary h-2.5 rounded-full" style="width: {(activeIndex / passedCommentIds.length) * 100}%"></div>
            {:else}
              <div class="bg-primary h-2.5 rounded-full" style="width: {(activeIndex / conversation.comments.length) * 100}%"></div>
            {/if}
          </div>
        </div>
      {/if}
    </div>

    <!-- Add Comments Section -->
    <div class="mb-4">
      <h2 class="text-2xl font-semibold mb-4">Add Comment</h2>
      <Separator class="mb-6" />

      <Card class="shadow-xs">
        <CardContent class="pt-6">
          <div class="space-y-4">
            <Textarea
              bind:value={newCommentText}
              placeholder="Share your thoughts on this topic"
              class="min-h-[120px]"
            />
            <div class="flex justify-center">
              <button
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                on:click={submitComment}
                disabled={!newCommentText.trim()}
              >
                Post Comment
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
{:else}
  <div class="w-full py-6 text-center">
    <p class="text-xl mb-4">Conversation not found</p>
    <button
      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
      on:click={goToExplore}
    >
      Go back to Explore
    </button>
  </div>
{/if}
