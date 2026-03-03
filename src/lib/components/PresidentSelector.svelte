<script lang="ts">
  import { partyColors, type President } from '$lib/data/presidents';

  export let presidents: President[];
  export let selectedId: string | null = null;

  function handleSelect(id: string) {
    selectedId = selectedId === id ? null : id;
  }

  function handleKeydown(event: KeyboardEvent, id: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSelect(id);
    }
  }

  function getPartyColor(president: President) {
    return partyColors[president.party].fill;
  }
</script>

<div class="selector-container">
  <h2>Selecciona un presidente</h2>
  <div class="presidents-grid">
    {#each presidents as president}
      {@const color = getPartyColor(president)}
      {@const isSelected = selectedId === president.id}
      <button
        class="president-card"
        class:selected={isSelected}
        style={isSelected ? `border-color: ${color}; --party-color: ${color}` : ''}
        on:click={() => handleSelect(president.id)}
        on:keydown={(e) => handleKeydown(e, president.id)}
        aria-pressed={isSelected}
      >
        <div class="image-wrapper">
          <img src={president.image} alt={president.name} loading="lazy" />
        </div>
        <div class="president-info">
          <span class="name">{president.name}</span>
          <span class="period">{president.period}</span>
        </div>
      </button>
    {/each}
  </div>
</div>

<style>
  .selector-container {
    width: 100%;
    max-width: 960px;
    margin: 0 auto 2rem;
  }

  h2 {
    text-align: center;
    color: #1f2937;
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
    font-weight: 600;
  }

  .presidents-grid {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .president-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.75rem;
    border: 3px solid transparent;
    border-radius: 12px;
    background: white;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    min-width: 120px;
  }

  .president-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .president-card.selected {
    background: #f8fafc;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .image-wrapper {
    width: 80px;
    height: 80px;
    overflow: hidden;
    margin-bottom: -0.5rem;
  }

  img {
    width: 80%;
    height: 80%;
    object-fit: cover;
  }

  .president-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .name {
    font-size: 0.875rem;
    font-weight: 600;
    color: #1f2937;
  }

  .period {
    font-size: 0.75rem;
    color: #6b7280;
    margin-top: 2px;
  }

  @media (max-width: 640px) {
    .presidents-grid {
      gap: 0.5rem;
    }

    .president-card {
      min-width: 100px;
      padding: 0.5rem;
    }

    .image-wrapper {
      width: 60px;
      height: 60px;
    }

    .name {
      font-size: 0.75rem;
    }

    .period {
      font-size: 0.65rem;
    }
  }
</style>
