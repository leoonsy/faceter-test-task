<template>
    <div class="planet">
        <h2 class="planet__header">
            {{ planet.name }}
        </h2>
        <div class="planet__characters characters">
            <h3 class="characters__header">Characters</h3>
            <ul class="characters__list">
                <li class="characters__item"><strong>Population: </strong><span>{{ planet.population }}</span></li>
                <li class="characters__item"><strong>Climate: </strong><span>{{ planet.climate }}</span></li>
                <li class="characters__item"><strong>Diameter: </strong><span>{{ planet.diameter }}</span></li>
            </ul>
            <span class="characters__more">...</span>
        </div>
        <button class="btn-reset planet__detail">Read more</button>
    </div>
</template>

<script>
    export default {
        name: "Planet",
        props: {
            planet: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>

    .planet {
        background: #e2e2e2;
        padding-bottom: 20px;
        
        &__header {
            text-align: center;
            font-size: 1.6rem;
            background: #008fff;
            color: #fff;
            padding: 20px;
        }
        
        &__detail {
            margin: 0 auto;
            display: block;
            width: 120px;
            border: 2px solid #525252;
            color: #525252;
            padding: 6px 0;
            
            &:hover {
                color: #000000;
                border-color: #000000;
            }
        }
    }
    
    .characters {
        padding: 20px;
        
        &__header {
            text-align: center;
            font-size: 1.3rem;
            margin: 0 0 20px 0;
            padding: 0 0 15px 0;
            border-bottom: 1px solid #a3a3a3;
        }
        
        &__list {
            list-style: none;
        }
        
        &__item {
            margin: 6px 0;
            font-size: 1rem;
            display: flex;
            justify-content: space-between;
            span {
                text-align: right;
            }
        }
        
        &__more {
            text-align: center;
            display: block;
        }
    }

</style>