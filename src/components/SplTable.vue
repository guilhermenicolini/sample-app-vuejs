<template>
    <table :class="classObject">
        <thead>
            <tr>
                <slot name="header"></slot>
            </tr>
        </thead>
        <tbody>
            <slot name="rows"></slot>
        </tbody>
    </table>
</template>

<script>
import colors from './utils/ComponentColors';

export default {
    name: 'SplTable',
    props: {
        color: { type: String, default: "primary" }
    },
    computed: {
        classObject() {
        const clazz = {
            
        };

        return { ...colors(this.color), ...clazz }
        }
    }
}
</script>

<style lang="scss" scoped>

  table {
    border-collapse: collapse;
    margin: 0 auto;
    min-width: 300px;
    border-radius: $box-radius $box-radius 0 0;
    overflow: hidden;
    box-shadow: $box-shadow;

    & thead tr {
      text-align: center;
      font-weight: bold;
    }
  }

  table th,
  table td {
    padding: 8px 15px;
  }

  table tbody tr {
    border-bottom: 1px solid $table-border-color;
    color: $black;
  }

  table tbody tr:nth-of-type(even) {
    background: $table-background-color-even;
  }

  table.primary {
    thead tr {
        color: $brand-primary-accent;
        background: $brand-primary;
    }
  } 

  table.success {
    & thead tr {
        color: $brand-success-accent;
        background: $brand-success;
    }

    & tbody tr:last-of-type {
        border-bottom: 2px solid $brand-success;
    }
  } 

  table.danger {
    & thead tr {
        color: $brand-danger-accent;
        background: $brand-danger;
    }

    & tbody tr:last-of-type {
        border-bottom: 2px solid $brand-danger;
    }
  } 

  table.warning {
    & thead tr {
        color: $brand-warning-accent;
        background: $brand-warning;
    }

    & tbody tr:last-of-type {
        border-bottom: 2px solid $brand-warning;
    }
  } 

  table.info {
    & thead tr {
        color: $brand-info-accent;
        background: $brand-info;
    }

    & tbody tr:last-of-type {
        border-bottom: 2px solid $brand-info;
    }
  } 

  table.rose {
    & thead tr {
        color: $brand-rose-accent;
        background: $brand-rose;
    }

    & tbody tr:last-of-type {
        border-bottom: 2px solid $brand-rose;
    }
  } 
</style>