<template>
    <div class="wrapper">
        <header>
            <NavBar :links="links"></NavBar>
        </header>
        <main>
            <slot/>
        </main>
        <footer>
            <Footer />
        </footer>
    </div>
</template>
<script>
    import NavBar from '@/components/Navbar';
    import Footer from "@/components/Footer";

    export default {
        name: 'MainLayout',
        data: () => ({
            links: [
                {
                    name: 'planets',
                    title: 'Планеты'
                },
                {
                    name: 'statistics',
                    title: 'Статистика'
                }
            ]
        }),
        components: {
            NavBar,
            Footer
        }
    };
</script>
<style lang="scss">
    .wrapper {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
    
    header {
        flex: 0 1 auto;
    }
    
    main {
        flex: 1 1 auto;
    }
    
    footer {
        flex: 0 0 auto;
    }
</style>