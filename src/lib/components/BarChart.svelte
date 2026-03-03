<script lang="ts">
  import { presidents, partyColors } from '$lib/data/presidents';

  const data = presidents
    .filter(p => p.id !== 'trump1')
    .map(p => ({
      name: p.name,
      period: p.period,
      count: p.countries.length,
      color: partyColors[p.party].fill
    }))
    .sort((a, b) => b.count - a.count);

  const maxCount = Math.max(...data.map(d => d.count));
</script>

<div class="chart-container">
  <h3>Países con intervenciones por presidente</h3>
  <div class="chart">
    {#each data as item}
      <div class="bar-row">
        <div class="label">
          <span class="name">{item.name}</span>
          <span class="period">{item.period}</span>
        </div>
        <div class="bar-container">
          <div
            class="bar"
            style="width: {(item.count / maxCount) * 100}%; background: {item.color}"
          >
            <span class="count">{item.count}</span>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .chart-container {
    width: 100%;
    max-width: 960px;
    margin: 2rem auto 0;
    padding: 1.5rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
  }

  h3 {
    text-align: center;
    color: #1e293b;
    font-size: 1.1rem;
    margin: 0 0 1.5rem;
    font-weight: 600;
  }

  .chart {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .bar-row {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .label {
    width: 140px;
    flex-shrink: 0;
    text-align: right;
  }

  .name {
    display: block;
    font-size: 0.875rem;
    font-weight: 600;
    color: #1e293b;
  }

  .period {
    display: block;
    font-size: 0.7rem;
    color: #64748b;
  }

  .bar-container {
    flex: 1;
    height: 32px;
    background: #f1f5f9;
    border-radius: 4px;
    overflow: hidden;
  }

  .bar {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 8px;
    border-radius: 4px;
    min-width: 30px;
    transition: width 0.3s ease;
  }

  .count {
    color: white;
    font-size: 0.875rem;
    font-weight: 700;
  }

  @media (max-width: 640px) {
    .chart-container {
      padding: 1rem;
    }

    .label {
      width: 100px;
    }

    .name {
      font-size: 0.75rem;
    }

    .period {
      font-size: 0.6rem;
    }

    .bar-container {
      height: 26px;
    }

    .count {
      font-size: 0.75rem;
    }
  }
</style>
