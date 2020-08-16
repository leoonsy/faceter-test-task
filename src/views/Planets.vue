<template>
    <section class="planets">
        <div class="container">
            <div class="row">
                <div class="col-3">
                    <Planet class="planets__item"/>
                </div>
                <div class="col-3">
                    <Planet class="planets__item"/>
                </div>
                <div class="col-3">
                    <Planet class="planets__item"/>
                </div>
                <div class="col-3">
                    <Planet class="planets__item"/>
                </div>
                <div class="col-3">
                    <Planet class="planets__item"/>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Planet from "@/components/Planet";
    import { mapActions } from 'vuex'
    import Loader from "@/components/Loader";

    export default {
        name: "Root",
        data: () => ({
           loading: true 
        }),
        async created() {
          try {
              const planets = await this.getPlanets({
                  start: 1,
                  limit: 10
              });
              console.log(planets);
          }  
          catch {}
        },
        components: { Planet },
        methods: {
            ...mapActions([
                'getPlanets'
            ])
        }
    };
</script>
<style lang="scss">
    .planets {
        margin-top: 40px;

        &__item {
            margin: 30px 0 0 0;
        }
    }
</style>