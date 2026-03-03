<script lang="ts">
  import PresidentSelector from '$lib/components/PresidentSelector.svelte';
  import WorldMap from '$lib/components/WorldMap.svelte';
  import BarChart from '$lib/components/BarChart.svelte';
  import { presidents, partyColors } from '$lib/data/presidents';

  let selectedId: string | null = null;

  $: selectedPresident = presidents.find(p => p.id === selectedId);
  $: highlightedCountries = selectedPresident?.countries || [];
  $: partyColor = selectedPresident ? partyColors[selectedPresident.party].fill : '#6b7280';
</script>

<svelte:head>
  <title>Intervenciones militares de EE.UU.</title>
</svelte:head>

<main>
  <header>
    <h1>Qué países han sufrido ataques por parte de cada gobierno de EEUU en el siglo XXI</h1>
  </header>

  <PresidentSelector {presidents} bind:selectedId />

  {#if selectedPresident}
    <div class="president-header">
      <h2>{selectedPresident.name} <span>({selectedPresident.period})</span></h2>
      <p class="countries-list">
        {#each selectedPresident.countries as country, i}
          <span class="country-tag" style="background: {partyColor}">{country}</span>
        {/each}
      </p>
    </div>
  {:else}
    <div class="placeholder">
      <p>Haz clic en un presidente para ver los países en los que hubo intervenciones militares</p>
    </div>
  {/if}

  <WorldMap
    {highlightedCountries}
    presidentName={selectedPresident?.name || ''}
  />

  <BarChart />
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    background: #f1f5f9;
  }

  main {
    min-height: 100vh;
    padding: 2rem 1rem;
  }

  header {
    text-align: center;
    margin-bottom: 2rem;
  }

  h1 {
    color: #1e293b;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
    max-width: 960px;
    margin-left: auto;
    margin-right: auto;
  }

  .president-header {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .president-header h2 {
    color: #1e293b;
    font-size: 1.25rem;
    margin: 0 0 0.75rem;
  }

  .president-header h2 span {
    color: #64748b;
    font-weight: 400;
  }

  .countries-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    margin: 0;
  }

  .country-tag {
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .placeholder {
    text-align: center;
    padding: 1rem;
    margin-bottom: 1.5rem;
  }

  .placeholder p {
    color: #64748b;
    font-size: 1rem;
    margin: 0;
  }

  @media (max-width: 640px) {
    h1 {
      font-size: 1.1rem;
    }

    main {
      padding: 1rem 0.5rem;
    }
  }
</style>
