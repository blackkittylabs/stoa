<script lang="ts">
export let value = 50; // Default to middle (0-100 scale)
export let size = 120; // Default size in pixels
export let showLabel = true; // Show "Consensus" label

// Calculate color based on consensus value
$: color = getColorFromValue(value);

function getColorFromValue(val: number): string {
  if (val < 33) return "#ef4444"; // Red for low consensus (<33%)
  if (val < 66) return "#f97316"; // Orange for medium consensus (33-66%)
  return "#22c55e"; // Green for high consensus (>66%)
}

// Calculate dimensions
$: halfSize = Math.floor(size / 2);
$: outerRadius = Math.floor(halfSize * 0.7); // Keep outer radius the same
$: innerRadius = Math.floor(outerRadius * 0.85); // Increased from 0.75 to make arc even thinner
$: viewBoxHeight = Math.floor(size * 0.75);

// Calculate the angles for the meter segment (in radians)
// Flipped to go clockwise from left to right
$: startAngle = Math.PI; // Start from left (180 degrees)
$: endAngle = Math.PI + (value / 100) * Math.PI; // Clockwise movement based on value

// Create SVG arc path for filled segments
function describeArc(
  x: number,
  y: number,
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number,
): string {
  // Convert to Cartesian coordinates (precise to 2 decimal places for crispness)
  const startOuterX =
    Math.round((x + outerRadius * Math.cos(startAngle)) * 100) / 100;
  const startOuterY =
    Math.round((y + outerRadius * Math.sin(startAngle)) * 100) / 100;
  const endOuterX =
    Math.round((x + outerRadius * Math.cos(endAngle)) * 100) / 100;
  const endOuterY =
    Math.round((y + outerRadius * Math.sin(endAngle)) * 100) / 100;

  const startInnerX =
    Math.round((x + innerRadius * Math.cos(endAngle)) * 100) / 100;
  const startInnerY =
    Math.round((y + innerRadius * Math.sin(endAngle)) * 100) / 100;
  const endInnerX =
    Math.round((x + innerRadius * Math.cos(startAngle)) * 100) / 100;
  const endInnerY =
    Math.round((y + innerRadius * Math.sin(startAngle)) * 100) / 100;

  // Create the arc path - outer arc, line to inner radius, inner arc, close path
  const largeArcFlag = Math.abs(startAngle - endAngle) > Math.PI ? 1 : 0;
  const sweepFlag = endAngle > startAngle ? 1 : 0; // 1 for clockwise

  return [
    // Start at outer start point
    `M ${startOuterX},${startOuterY}`,
    // Draw outer arc to end point (clockwise sweep for progress)
    `A ${outerRadius},${outerRadius} 0 ${largeArcFlag} ${sweepFlag} ${endOuterX},${endOuterY}`,
    // Line to inner arc end point
    `L ${startInnerX},${startInnerY}`,
    // Draw inner arc back to start (counterclockwise sweep)
    `A ${innerRadius},${innerRadius} 0 ${largeArcFlag} ${1 - sweepFlag} ${endInnerX},${endInnerY}`,
    // Close the path
    "Z",
  ].join(" ");
}

// Generate SVG paths
$: bgPath = describeArc(
  halfSize,
  halfSize,
  innerRadius,
  outerRadius,
  startAngle,
  startAngle + Math.PI,
);
$: valuePath =
  value > 0
    ? describeArc(
        halfSize,
        halfSize,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
      )
    : "";
</script>

<div class="consensus-meter" style:width="{size}px" style:height="{viewBoxHeight}px">
  <svg width="100%" height="100%" viewBox="0 0 {size} {viewBoxHeight}" shape-rendering="geometricPrecision">
    <!-- Background meter (light gray) -->
    <path 
      d="{bgPath}"
      fill="#e4e4e7"
      class="meter-bg"
    />
    
    <!-- Value segment with appropriate color -->
    {#if value > 0}
      <path 
        d="{valuePath}"
        fill="{color}"
        class="meter-value"
      />
    {/if}
    
    <!-- Percentage text -->
    <text 
      x="{halfSize}" 
      y="{halfSize - innerRadius * 0.1}" 
      text-anchor="middle" 
      font-size="{innerRadius * 0.5}" 
      font-weight="bold"
      class="percentage"
    >
      {value}%
    </text>
    
    <!-- Consensus label -->
    {#if showLabel}
      <text 
        x="{halfSize}" 
        y="{halfSize + innerRadius * 0.6}" 
        text-anchor="middle" 
        font-size="{innerRadius * 0.4}" 
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
  
  .meter-bg {
    opacity: 0.4;
  }
  
  .meter-value {
    transition: all 0.3s ease;
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