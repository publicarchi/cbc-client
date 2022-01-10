<script lang="ts">
    import {
        Grid, Row, Column
    } from 'carbon-components-svelte'

    export let deliberation
</script>

<Grid>
    <Row>
        <Column>
            <span>Identifiant :</span>
            <p>{deliberation.id}</p>
        </Column>
        <Column>
            <span>Côte :</span>
            <p>{deliberation.cote}</p>
        </Column>
        <Column>
            <span>Identifiant:</span>
        </Column>
    </Row>
    <Row>
        <Column>
            <span>Côte :</span>
            <p>{deliberation.cote}</p>
        </Column>
        <Column>
            <span>Identifiant:</span>
        </Column>
        <Column>
            <span>Identifiant:</span>
        </Column>
    </Row>
</Grid>

