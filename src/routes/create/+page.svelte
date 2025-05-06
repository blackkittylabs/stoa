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

// Define a type-safe action for handling events
function useAction(node: HTMLElement, handler: () => void) {
  const handleClick = () => handler();
  node.addEventListener("click", handleClick);

  return {
    destroy() {
      node.removeEventListener("click", handleClick);
    },
  };
}

// Define a type-safe action for handling keyboard events
function useKeyAction(node: HTMLElement, handler: (e: KeyboardEvent) => void) {
  const handleKeydown = (e: KeyboardEvent) => handler(e);
  node.addEventListener("keydown", handleKeydown);

  return {
    destroy() {
      node.removeEventListener("keydown", handleKeydown);
    },
  };
}

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

<div class="container mx-auto py-10 px-4 max-w-3xl">
  <h1 class="text-3xl font-bold mb-6">Create</h1>
  
  <Card class="mb-8">
    <CardHeader>
      <CardTitle>Basic Info</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="space-y-4">
        <div class="space-y-2">
          <label for="title" class="text-sm font-medium">Title</label>
          <Input id="title" bind:value={title} placeholder="Title" />
        </div>
        
        <div class="space-y-2">
          <label for="description" class="text-sm font-medium">Description</label>
          <Textarea 
            id="description" 
            bind:value={description} 
            placeholder="Description" 
            rows={3}
          />
        </div>
      </div>
    </CardContent>
  </Card>
  
  <Card class="mb-8">
    <CardHeader>
      <CardTitle>Seed Comments</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="space-y-4">
        <div class="flex space-x-2">
          <div class="flex-1">
            <span use:useKeyAction={handleKeyDown}>
              <Input 
                bind:value={currentSeedComment} 
                placeholder="New comment" 
              />
            </span>
          </div>
          <span use:useAction={addComment}>
            <Button>Add</Button>
          </span>
        </div>
        
        {#if seedComments.length > 0}
          <div class="border rounded-md divide-y mt-4">
            {#each seedComments as comment, index}
              <div class="p-3 flex justify-between items-center">
                <p class="mr-2">{comment}</p>
                <span use:useAction={() => removeComment(index)}>
                  <Button variant="destructive" size="sm">
                    Remove
                  </Button>
                </span>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </CardContent>
  </Card>
  
  <div class="flex justify-end">
    <span use:useAction={handleSubmit}>
      <Button disabled={!title || !description || seedComments.length === 0}>
        Create
      </Button>
    </span>
  </div>
</div>