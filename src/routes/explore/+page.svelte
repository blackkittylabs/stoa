<script lang="ts">
import { appContextStore } from "$stores/appContext.svelte";
import {
  MOCK_DISCUSSIONS,
  getRelativeTime,
  calculateConsensus,
} from "$stores/mockData";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "$lib/components/ui/card";
import { Button } from "$lib/components/ui/button";
import { Input } from "$lib/components/ui/input";
import { Textarea } from "$lib/components/ui/textarea";
import { goto } from "$app/navigation";
import ConsensusMeter from "$lib/components/ConsensusMeter.svelte";
import { browser } from "$app/environment";
import { onMount } from "svelte";
import { writable } from "svelte/store";
import { Plus } from "@lucide/svelte";
import * as Dialog from "$lib/components/ui/dialog";
import {
  createPublicClient,
  createWalletClient,
  custom,
  http,
  parseEther,
} from "viem";
import { mainnet } from "viem/chains";
import { sdk } from "@farcaster/frame-sdk";

// Create a store for mobile detection
const isMobile = writable(false);

// State for dialog
let dialogOpen = $state(false);

// State for viem block number and address
let blockNumber = $state<number>(0);
// Use 0x-prefixed string type for Ethereum addresses with null for no address
let address = $state<`0x${string}` | null>(null);
let transactionInProgress = $state(false);
let transactionHash = $state<string | null>(null);
let transactionError = $state<string | null>(null);
let ethAmount = $state("0.001");

// State for the conversation form
let title = $state("");
let description = $state("");
let currentSeedComment = $state("");
let seedComments = $state<string[]>([]);

// Check if we're in miniapp mode
const isMiniapp = $derived($appContextStore === "miniapp");

// Create a custom Button event handler function
function createButtonHandler(fn: () => void) {
  return {
    handleButtonClick: () => fn(),
  };
}

// Create dialog handlers with button handlers
const openDialogHandler = createButtonHandler(() => {
  dialogOpen = true;
});

const closeDialogHandler = createButtonHandler(() => {
  dialogOpen = false;
});

// Add a new seed comment
function addComment(): void {
  if (currentSeedComment.trim() === "") return;
  seedComments = [...seedComments, currentSeedComment];
  currentSeedComment = "";
}

const addCommentHandler = createButtonHandler(addComment);

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

  // Close dialog
  dialogOpen = false;
}

// Update the store based on window size
function updateMobileStatus() {
  if (browser) {
    isMobile.set(window.innerWidth < 768);
  }
}

// Set up window resize listener
onMount(() => {
  // Update mobile status
  updateMobileStatus();

  // Set up event listener
  if (browser) {
    window.addEventListener("resize", updateMobileStatus);
  }

  // Return cleanup function
  return () => {
    if (browser) {
      window.removeEventListener("resize", updateMobileStatus);
    }
  };
});

// Separate async initialization
onMount(async () => {
  if (browser) {
    // Set up Viem public client
    const publicClient = createPublicClient({
      chain: mainnet,
      transport: http(),
    });

    // Set up Viem wallet client
    const walletClient = createWalletClient({
      chain: mainnet,
      // @ts-ignore
      transport: custom(window.ethereum!),
    });

    // Get current block number directly with await
    blockNumber = Number(await publicClient.getBlockNumber());

    // Get addresses
    const addresses = await walletClient.getAddresses();
    if (addresses.length > 0) {
      // Addresses from walletClient.getAddresses() are already properly typed
      address = addresses[0];
    }
    console.log("addresses:", address);

    // Log the Ethereum provider from Farcaster SDK
    console.log("Farcaster SDK Ethereum Provider:", sdk.wallet.ethProvider);
  }
});

// Function to send transaction
async function sendTransaction(): Promise<void> {
  if (!address || transactionInProgress) return;

  try {
    transactionInProgress = true;
    transactionError = null;
    transactionHash = null;

    // Set up wallet client
    const walletClient = createWalletClient({
      chain: mainnet,
      // @ts-ignore
      transport: custom(window.ethereum!),
    });

    // Send transaction - address is guaranteed to be non-null here based on the check above
    const hash = await walletClient.sendTransaction({
      account: address,
      to: "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
      value: parseEther(ethAmount),
    });

    transactionHash = hash;
  } catch (error) {
    console.error("Transaction error:", error);
    transactionError = error instanceof Error ? error.message : String(error);
  } finally {
    transactionInProgress = false;
  }
}

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

<div class="w-full pt-2 pb-6 relative">
  <!-- Viem Quick Start Example -->
  <div class="bg-muted/30 rounded-md p-4 mb-4">
    <h2 class="text-xl font-bold">Viem Quick Start Example</h2>
    <p>Current Ethereum Block Number: {blockNumber}</p>
    <p>Your ETH Address: {address || "Not connected"}</p>
    
    {#if address}
      <div class="mt-4 border-t pt-4">
        <h3 class="text-lg font-semibold mb-2">Send ETH Transaction</h3>
        <div class="flex gap-2 items-center mb-3">
          <Input 
            type="text"
            bind:value={ethAmount}
            placeholder="ETH Amount"
            class="w-32"
          />
          <span>ETH</span>
          <Button 
            onclick={sendTransaction}
            disabled={transactionInProgress || !address}
            class="ml-2"
          >
            {transactionInProgress ? 'Sending...' : 'Send ETH'}
          </Button>
        </div>
        
        {#if transactionHash}
          <div class="bg-green-100 dark:bg-green-900/30 p-3 rounded text-green-800 dark:text-green-200 text-sm mt-2">
            <p>Transaction sent! Hash: {transactionHash}</p>
            <a 
              href={`https://etherscan.io/tx/${transactionHash}`} 
              target="_blank" 
              rel="noopener noreferrer"
              class="underline text-blue-600 dark:text-blue-400"
            >
              View on Etherscan
            </a>
          </div>
        {/if}
        
        {#if transactionError}
          <div class="bg-red-100 dark:bg-red-900/30 p-3 rounded text-red-800 dark:text-red-200 text-sm mt-2">
            <p>Transaction failed: {transactionError}</p>
          </div>
        {/if}
      </div>
    {/if}
  </div>

  <div class="flex justify-center mb-5">
    <!-- Top create button (for desktop and mobile web, but not miniapp) -->
    {#if !isMiniapp}
      <Button
        onclick={() => dialogOpen = true}
      >
        <Plus />
        Start a conversation
      </Button>
    {/if}
  </div>

  <div class="space-y-4">
    {#each MOCK_DISCUSSIONS as discussion}
      <div
        class="cursor-pointer"
        onclick={() => navigateToConversation(discussion.id)}
        onkeydown={(e) => e.key === 'Enter' && navigateToConversation(discussion.id)}
        role="button"
        tabindex="0"
      >
        <Card class="overflow-hidden hover:shadow-md transition-shadow duration-200">
          <div class="flex p-4">
            <!-- Mobile version - left side with image and consensus meter at bottom -->
            {#if $isMobile}
              <div class="flex flex-col mr-4 w-24 sm:w-28">
                <div class="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded overflow-hidden mb-3">
                  <img
                    src={getImageUrl(discussion.id)}
                    alt={discussion.title}
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="mt-auto">
                  <ConsensusMeter value={calculateConsensus(discussion)} size={90} showLabel={true} />
                </div>
              </div>
            <!-- Desktop version - left side with just the image -->
            {:else}
              <div class="flex-shrink-0 mr-4">
                <div class="w-24 h-24 sm:w-28 sm:h-28 rounded overflow-hidden">
                  <img
                    src={getImageUrl(discussion.id)}
                    alt={discussion.title}
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>
            {/if}

            <div class="flex-1 flex flex-col justify-between">
              <div>
                <!-- Desktop version - title with consensus meter on right -->
                {#if !$isMobile}
                  <div class="flex justify-between items-start mb-1">
                    <div class="flex-1 min-w-0 mr-4">
                      <h3 class="text-lg sm:text-xl font-semibold line-clamp-1">{discussion.title}</h3>
                      <p class="text-sm text-muted-foreground">By {discussion.author}</p>
                    </div>
                    <div class="flex-shrink-0">
                      <ConsensusMeter value={calculateConsensus(discussion)} size={90} showLabel={true} />
                    </div>
                  </div>
                <!-- Mobile version - just the title -->
                {:else}
                  <div>
                    <div class="flex-1 min-w-0">
                      <h3 class="text-lg sm:text-xl font-semibold">{discussion.title}</h3>
                      <p class="text-sm text-muted-foreground">By {discussion.author}</p>
                    </div>
                  </div>
                {/if}
                <p class="text-sm mt-2 mb-4 line-clamp-4">{discussion.description}</p>
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

  <!-- Floating action button (only for miniapp) -->
  {#if isMiniapp}
    <button
      class="fixed bottom-24 right-4 shadow-lg rounded-full w-14 h-14 z-50 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      onclick={() => dialogOpen = true}
    >
      <Plus size={24} />
    </button>
  {/if}
</div>

<!-- Create conversation dialog -->
<Dialog.Root bind:open={dialogOpen}>
  <Dialog.Content class="sm:max-w-[600px]">
    <Dialog.Header>
      <Dialog.Title>Start a conversation</Dialog.Title>
      <Dialog.Description>
        Create a new conversation to discuss with the community.
      </Dialog.Description>
    </Dialog.Header>

    <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <div class="space-y-6 py-4">
        <!-- Conversation details section -->
        <div class="space-y-4">
          <div class="space-y-2">
            <label for="title" class="text-sm font-medium">Title</label>
            <input
              id="title"
              class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              bind:value={title}
              placeholder="Enter conversation title"
            />
          </div>

          <div class="space-y-2">
            <label for="description" class="text-sm font-medium">Description</label>
            <textarea
              id="description"
              class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              bind:value={description}
              placeholder="What is this conversation about?"
              rows={3}
            ></textarea>
          </div>
        </div>

        <!-- Seed comments section -->
        <div class="pt-4 border-t space-y-4">
          <h3 class="text-sm font-medium">Initial comments</h3>

          <div class="flex space-x-2">
            <input
              class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              bind:value={currentSeedComment}
              placeholder="Add a comment"
              onkeydown={handleKeyDown}
            />
            <button
              type="button"
              class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2"
              onclick={addComment}
            >
              Add
            </button>
          </div>

          {#if seedComments.length > 0}
            <div class="border rounded-md divide-y mt-4 bg-muted/30">
              {#each seedComments as comment, index}
                <div class="p-3 flex justify-between items-center">
                  <p class="mr-2">{comment}</p>
                  <button
                    type="button"
                    class="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-md px-3 h-9 text-sm"
                    onclick={() => removeComment(index)}
                  >
                    Remove
                  </button>
                </div>
              {/each}
            </div>
          {/if}
        </div>
      </div>

      <Dialog.Footer class={$isMobile ? "flex-col space-y-2" : ""}>
        <button
          type="button"
          class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-input bg-background hover:bg-accent hover:text-accent-foreground border h-10 px-4 py-2"
          onclick={() => dialogOpen = false}
        >
          Cancel
        </button>
        <button
          type="submit"
          class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          disabled={!title || !description || seedComments.length === 0}
        >
          Create
        </button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
