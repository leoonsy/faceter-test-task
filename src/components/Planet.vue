<template>
    <div class="planet">
        <h2 class="planet__header">
            Имя планеты
        </h2>
        <div class="planet__characters characters">
            <h3 class="characters__header">Характеристики</h3>
            <ul class="characters__list">
                <li class="characters__item"><strong>Имя: </strong><span>имя тут короч</span></li>
                <li class="characters__item"><strong>Диаметр: </strong><span>1923</span></li>
                <li class="characters__item"><strong>Климат: </strong><span>холодно</span></li>
                <li class="characters__item"><strong>Популяция: </strong><span>не оч</span></li>
            </ul>
        </div>
        <button class="btn-reset planet__detail">Подробнее</button>
    </div>
</template>

<script>
    export default {
        name: "Planet"
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
            
        }
    }

</style>