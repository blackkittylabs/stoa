<script lang="ts">
export let value = 50; // Default to middle (0-100 scale)
export let size = 120; // Default size in pixels
export let showLabel = true; // Show "Consensus" label

// Calculate color based on consensus value
$: color = getColorFromValue(value);

// Calculate the sweep angle for the arc (0-180 degrees)
// For proper filling left-to-right as value increases from left endpoint
$: startAngle = 180; // Start from the left side (180 degrees)
$: endAngle = 180 - (value / 100) * 180; // Move counterclockwise as value increases

function getColorFromValue(val: number): string {
  if (val < 33) return "#ef4444"; // Red for low consensus (<33%)
  if (val < 66) return "#f97316"; // Orange for medium consensus (33-66%)
  return "#22c55e"; // Green for high consensus (>66%)
}

// Calculate viewBox dimensions
$: halfSize = size / 2;
$: radius = halfSize * 0.7; // Arc radius as percentage of half size
$: arcWidth = radius * 0.15; // Width of the arc

// Properly sized viewBox to ensure everything fits
// Make it more compact since we're nesting the text closer to the arc
$: viewBoxHeight = size * 0.75;
</script>

<div class="consensus-meter" style:width="{size}px" style:height="{viewBoxHeight}px">
  <svg width="100%" height="100%" viewBox="0 0 {size} {viewBoxHeight}">
    <!-- Semicircular meter background (light gray) -->
    <path 
      d="M {halfSize - radius}, {halfSize} 
         A {radius},{radius} 0 0,1 {halfSize + radius},{halfSize}"
      fill="none" 
      stroke="#e4e4e7" 
      stroke-width="{arcWidth}" 
      stroke-linecap="round"
    />
    
    <!-- Filled arc based on value - colored according to the value -->
    {#if value > 0}
      <path 
        d="M {halfSize - radius}, {halfSize} 
           A {radius},{radius} 0 0,1 
           {halfSize + radius * Math.cos(endAngle * Math.PI / 180)},
           {halfSize - radius * Math.sin(endAngle * Math.PI / 180)}"
        fill="none" 
        stroke="{color}" 
        stroke-width="{arcWidth}" 
        stroke-linecap="round"
        class="progress-arc"
      />
    {/if}
    
    <!-- Percentage text - deeply nestled under the arc -->
    <text 
      x="{halfSize}" 
      y="{halfSize - radius * 0.05}" 
      text-anchor="middle" 
      font-size="{radius * 0.45}" 
      font-weight="bold"
      class="percentage"
    >
      {value}%
    </text>
    
    <!-- Consensus label -->
    {#if showLabel}
      <text 
        x="{halfSize}" 
        y="{halfSize + radius * 0.5}" 
        text-anchor="middle" 
        font-size="{radius * 0.35}" 
        class="label"
      >
        consensus
      </text>
    {/if}
  </svg>
</div>

<style>
  .consensus-meter {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  
  .progress-arc {
    transition: stroke-dasharray 0.6s ease, stroke 0.3s ease;
  }
  
  .percentage {
    transition: fill 0.3s ease;
    fill: currentColor;
  }
  
  .label {
    font-weight: 500;
    text-transform: lowercase;
    letter-spacing: 0.02em;
    fill: currentColor;
    opacity: 0.7;
  }
</style>