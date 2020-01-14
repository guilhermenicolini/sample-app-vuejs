<template>
  <div class="beer-list">
    <div class="beer-actions">
      <spl-button name="Create new beer" @click="create" />
    </div>
    <spl-table v-if="items">
      <template slot="header">
        <th></th>
        <th>Beer Name</th>
        <th>Brewer</th>
        <th>Hating</th>
        <th></th>
      </template>
      <template slot="rows" v-if="hasData">
        <tr v-for="item in items" :key="item.id">
          <td>
            <SplButton
              type="icon"
              color="info"
              name="fas fa-eye"
              size="fa-lg"
              title="View"
              @click="view(item.id)"
            />
          </td>
          <td class="left">{{item.beerName}}</td>
          <td class="left">{{item.brewer}}</td>
          <td class="right">
            <spl-rating :stars="item.rating" />
          </td>
          <td class="right">
            <div class="actions">
              <SplButton
                type="icon"
                color="success"
                name="fas fa-edit"
                size="fa-lg"
                title="Edit"
                @click="edit(item.id)"
              />
              <SplButton
                type="icon"
                color="danger"
                name="fas fa-trash-alt"
                size="fa-lg"
                title="Remove"
                @click="remove(item.id, item.beerName)"
              />
            </div>
          </td>
        </tr>
      </template>
      <template slot="rows" v-else>
        <tr>
          <td colspan="5" class="no-data">No data found</td>
        </tr>
      </template>
    </spl-table>
    <spl-modal :show.sync="showModal" :title="currentBeer.beerName" size="md">
      <template slot="content">
        <beer-view v-if="mode === SCREEN_MODE.VIEW" :beer="currentBeer" />
        <beer-form
          v-if="mode === SCREEN_MODE.EDIT || mode === SCREEN_MODE.CREATE"
          :beer.sync="currentBeer"
          :mode="mode"
          @onUpdated="updated"
          @onCreated="created"
        />
      </template>
    </spl-modal>
    <spl-modal :show.sync="showModalRemove" :title="currentBeer.beerName" size="sm">
      <template slot="content">
        <div class="remove-modal">
          <p>Are you sure you want to remove this beer?</p>
          <spl-button name="Remove" @click="confirmRemove" />
        </div>
      </template>
    </spl-modal>
  </div>
</template>

<script>
import { SplTable, SplRating, SplButton, SplModal } from '../../components';
import BeerView from './BeerView';
import BeerForm from './BeerForm';
import {
  SplSpinnerService,
  BeerService,
  NotificationService
} from '../../services';
import { SCREEN_MODE } from '../../constants';

export default {
  name: 'BeerList',
  components: { SplTable, SplRating, SplButton, SplModal, BeerView, BeerForm },
  data() {
    return {
      mode: SCREEN_MODE.VIEW,
      showModal: false,
      items: null,
      currentBeer: {},
      SCREEN_MODE: SCREEN_MODE,
      showModalRemove: false
    };
  },
  computed: {
    hasData() {
      return this.items || this.items.length > 0;
    }
  },
  methods: {
    list() {
      SplSpinnerService.on();
      BeerService.list()
        .then(response => (this.items = response.data))
        .finally(() => SplSpinnerService.off());
    },
    view(id) {
      this.openModal(SCREEN_MODE.VIEW, id);
    },
    edit(id) {
      this.openModal(SCREEN_MODE.EDIT, id);
    },
    remove(id, beerName) {
      this.currentBeer = { id, beerName };
      this.showModalRemove = true;
    },
    confirmRemove() {
      SplSpinnerService.on();
      BeerService.remove(this.currentBeer.id)
        .then(() => {
          this.$nextTick(() => {
            this.items = this.items.filter(
              beer => beer.id !== this.currentBeer.id
            );
            this.currentBeer = {};
            this.showModalRemove = false;
            NotificationService.success('Beer successfully removed');
          });
        })
        .finally(() => SplSpinnerService.off());
    },
    create() {
      this.mode = SCREEN_MODE.CREATE;
      this.currentBeer = { flavorWheel: { alcohol: ''} };
      this.showModal = true;
    },
    openModal(mode, id) {
      this.mode = mode;
      SplSpinnerService.on();
      BeerService.get(id)
        .then(response => {
          const data = response.data;
          this.currentBeer = {
            id: data.id,
            beerName: data.beerName,
            brewer: data.brewer,
            price: data.price,
            sampled: new Date(data.sampled).toLocaleDateString(),
            notes: data.notes,
            rating: data.rating,
            abv: data.abv,
            ibu: data.ibu,
            servingType: data.servingType,
            flavorWheel: data.flavorWheel
          };
          this.showModal = true;
        })
        .finally(() => SplSpinnerService.off());
    },
    updated(beer) {
      this.$nextTick(() => {
        this.showModal = false;
        SplSpinnerService.on();
        const index = this.items.findIndex(o => o.id === beer.id);
        if (index !== -1) {
          this.items[index].beerName = beer.beerName;
          this.items[index].brewer = beer.brewer;
          this.items[index].rating = beer.rating;
        }
        SplSpinnerService.off();
        NotificationService.success('Beer successfully updated');
      });
    },
    created(beer) {
      this.$nextTick(() => {
        this.showModal = false;
        SplSpinnerService.on();

        this.items.unshift(beer);

        SplSpinnerService.off();
        NotificationService.success('Beer successfully created');
      });
    }
  },
  created() {
    this.list();
  }
};

export { SCREEN_MODE };
</script>

<style lang="scss" scoped>
.beer-list {
  display: flex;
  flex-direction: column;

  & .beer-actions {
    text-align: center;
    margin-bottom: 15px;
  }
}

.actions {
  display: flex;
}
.no-data {
  text-align: center;
}

.remove-modal {
  & :not(p) {
    text-align: center;
  }
}
</style>