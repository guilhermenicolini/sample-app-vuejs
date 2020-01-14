<template>
    <div class="spl-avatar">
        {{initials}}
    </div>
</template>

<script>
export default {
    name: 'SplAvatar',
    props: {
        name: { type: String, required: true }
    },
    computed: {
        initials() {
            if (!this.name) return;
            
            const names = this.name.split(' ');
            const fisrtName = names[0].toUpperCase();
            const lastName = names[names.length - 1].toUpperCase();

            if (!lastName || fisrtName === lastName) {
                return fisrtName.length > 1 ? fisrtName.substring(0, 2) : fisrtName.substring(0,1);
            } else {
                return fisrtName.substring(0,1) + lastName.substring(0,1);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .spl-avatar {
        width: 40px;
        height: 40px;
        min-width: 40px;
        min-height: 40px;
        border: 1px solid $avatar-border-color;
        background-color: $avatar-background-color;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 700;
    }
</style>