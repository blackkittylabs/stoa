<script lang="ts">
import { Button } from "$lib/components/ui/button";
import { Input } from "$lib/components/ui/input";
import { Textarea } from "$lib/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "$lib/components/ui/card";

// State for the conversation
let title = "";
let description = "";
let currentSeedComment = "";
let seedComments: string[] = [];

// Add a new seed comment
function addComment(): void {
  if (currentSeedComment.trim() === "") return;
  seedComments = [...seedComments, currentSeedComment];
  currentSeedComment = "";
}

// Handle input keydown
function handleKeyDown(e: KeyboardEvent): void {
  if (e.key === "Enter") {
    addComment();
  }
}

// Remove a seed comment
function removeComment(index: number): void {
  seedComments = seedComments.filter((_, i) => i !== index);
}

// Handle form submission
function handleSubmit(): void {
  const conversation = {
    title,
    description,
    seedComments,
  };

  console.log("Creating conversation:", conversation);

  // Reset form
  title = "";
  description = "";
  seedComments = [];
  currentSeedComment = "";
}
</script>

<div class="w-full py-6">
  <h1 class="text-3xl font-bold mb-6">Start a conversation</h1>

  <form on:submit|preventDefault={handleSubmit}>
    <Card class="mb-8">
      <CardContent>
        <div class="space-y-6">
          <!-- Conversation details section -->
          <div class="space-y-4">
            <div class="space-y-2">
              <label for="title" class="text-sm font-medium">Title</label>
              <Input id="title" bind:value={title} placeholder="Enter conversation title" />
            </div>

            <div class="space-y-2">
              <label for="description" class="text-sm font-medium">Description</label>
              <Textarea
                id="description"
                bind:value={description}
                placeholder="What is this conversation about?"
                rows={3}
              />
            </div>
          </div>

          <!-- Seed comments section -->
          <div class="pt-4 border-t space-y-4">
            <h3 class="text-sm font-medium">Initial comments</h3>

            <form class="flex space-x-2" on:submit|preventDefault={addComment}>
              <div class="flex-1">
                <Input
                  bind:value={currentSeedComment}
                  placeholder="Add a comment"
                />
              </div>
              <Button type="submit" variant="secondary" size="default">
                Add
              </Button>
            </form>

            {#if seedComments.length > 0}
              <div class="border rounded-md divide-y mt-4 bg-muted/30">
                {#each seedComments as comment, index}
                  <div class="p-3 flex justify-between items-center">
                    <p class="mr-2">{comment}</p>
                    <button
                      type="button"
                      class="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-md px-3 h-9 text-sm"
                      on:click={() => removeComment(index)}
                    >
                      Remove
                    </button>
                  </div>
                {/each}
              </div>
            {/if}
          </div>

          <!-- Form submission -->
          <div class="flex justify-center pt-4">
            <Button
              type="submit"
              disabled={!title || !description || seedComments.length === 0}
            >
              Create
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </form>
</div>
