<script>
    import formatDistanceStrict from "date-fns/formatDistanceStrict";

    const data = $$props.data;

    const votesCount = data.options.reduce(
        (count, option) => count + option.votes,
        0
    );
    const endsAt = new Date(data.endsAt);
    const now = new Date();

    $: optionWidth = (option) =>
        Math.round((option.votes / votesCount) * 100) || 1;
    $: optionWidthLabel = (option) =>
        Math.round((option.votes / votesCount) * 100) || 0;
</script>

<style>
    .poll {
        margin: var(--poll-margin);
    }
    .options {
        display: grid;
        grid-template-columns: max-content 14rem max-content;
        align-items: center;
        grid-gap: 1rem;
        overflow: auto;
    }
    .label {
        overflow: auto;
        text-align: right;
        white-space: pre-wrap;
        word-wrap: break-word;
    }
    .chart {
        height: 100%;
        background: var(--poll-bar-color);
    }
    hr {
        border: 0;
        border-top: 1px solid var(--accents-2);
        margin: 1rem 0 0.5rem 0;
    }
    .footer {
        display: flex;
        font-size: 0.875rem;
        color: var(--accents-4);
    }
    .votes-count {
        flex-grow: 1;
    }
    @media screen and (max-width: 450px) {
        .options {
            grid-template-columns: max-content 7rem max-content;
        }
    }
</style>

<div class="poll">
    <div class="options">
        {#each data.options as option}
            <span class="label">{option.label}</span>
            <span class="chart" style="width: {optionWidth(option)}" />
            <span>{optionWidthLabel(option)}%</span>
        {/each}
    </div>
    <hr />
    <div class="footer">
        <span class="votes-count">{votesCount} votes</span>
        <span
            >{now > endsAt
                ? "Final results"
                : `${formatDistanceStrict(endsAt, now)} left`}</span
        >
    </div>
</div>
