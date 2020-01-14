export default {
  data() {
    return {
      errors: {
        user: {
          name: [{ key: 'required', value: 'Field is required' }],
          email: [
            { key: 'required', value: 'Field is required' },
            { key: 'email', value: 'Email is invalid' }
          ],
          password: [
            { key: 'required', value: 'Field is required' },
            {
              key: 'lowerCase',
              value:
                'Password must contain a minimum of 1 lower case letter [a-z]'
            },
            {
              key: 'upperCase',
              value:
                'Password must contain a minimum of 1 upper case letter [A-Z]'
            },
            {
              key: 'number',
              value: 'Password must contain a minimum of 1 number [0-9]'
            },
            {
              key: 'minLength',
              value: 'Password must have at least 8 characters'
            }
          ],
          confirmPassword: [
            { key: 'sameAsPassword', value: 'Passwords must be identical' }
          ]
        },
        beer: {
          beerName: [{ key: 'required', value: 'Field is required' }],
          brewer: [{ key: 'required', value: 'Field is required' }],
          price: [
            { key: 'required', value: 'Field is required' },
            { key: 'minValue', value: 'Price must be positive' }
          ],
          sampled: [{ key: 'required', value: 'Field is required' },{ key: 'date', value: 'Sampled must be a date' }],
          rating: [{ key: 'required', value: 'Field is required'}],
          abv: [{ key: 'required', value: 'Field is required' }],
          ibu: [{ key: 'required', value: 'Field is required' }],
          servingType: [{ key: 'required', value: 'Field is required' }]
        }
      }
    };
  },
  methods: {
    getError(path) {
      const errors = this._findByPath(path, this.errors);
      const validation = this._findByPath(path, this.$v);

      return this._getErrorMessage(validation, errors);
    },
    _findByPath(path, object) {
      const paths = path.split('.');
      let current = object;

      for (let i = 0; i < paths.length; i++) {
        if (current[paths[i]] == undefined) {
          return undefined;
        } else {
          current = current[paths[i]];
        }
      }
      return current;
    },
    _getErrorMessage(validation, errors) {
      if (!validation || !errors) return null;

      const err = errors.find(error => {
        return validation[error.key] != undefined && !validation[error.key];
      });

      return err ? err.value : null;
    }
  }
};
