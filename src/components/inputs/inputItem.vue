<template>
  <label class="field" :class="{ 'field-row': row }">
    <input
      class="field__input"
      :class="{ 'is-required': validationData[input.valid] }"
      :type="input.type"
      :placeholder="input.isRequired ? input.placeholder + '*' : input.placeholder"
      :name="input.name"
      :required="input.isRequired"
      :checked="input.checked"
      :data-id="input.id"
      @change="inputEvantHandler($event.target)"
      @onfocus="(this.type='date')"
      v-model="fieldValue[input.name]"
      v-mask="addMasked[input.name]"
    />
    {{ input.label }}
    <span
      v-if="input.type === 'radio'"
      class="custom-radio-button"
      :class="{'custom-radio-button__checked': input.checked}"
    ></span>
    <span v-if="input.type === 'file'" class="custom-file-input">{{ input.placeholder }}</span>
    <span
      v-if="input.type === 'date'"
      class="custom-date-placeholder"
      :class="{ 'd-none': hide, 'is-required': validationData.date }"
    >{{ input.placeholder }}*</span>
  </label>
</template>



<script>
export default {
  props: {
    input: {
      type: Object,
      default: () => {}
    },
    row: Boolean
  },
  data() {
    return {
      hide: false,
      validationData: {
        iin: false,
        name: false,
        date: false,
        sms: false,
        mail: false
      },
      fieldValue: {
        iin: "",
        firstName: "",
        lastName: "",
        date: "",
        notification: "",
        sms: "",
        mail: ""
      },
      mask: "",
      addMasked: {
        iin: "### ### ### ###",
        sms: "+7(###) ###-##-##",
        firstName:
          "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        lastName:
          "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        date: "XXXXXXXXXX",
        mail:
          "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        file:
          "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        notification: "X"
      }
    };
  },
  methods: {
    showFileName() {
      const fileInput = document.querySelector('.field__input[type="file"]');
      const customInput = document.querySelector(".custom-file-input");
      customInput.innerText = fileInput.files[0].name;
    },
    hidePlaceholder() {
      this.hide = true;
    },
    makeRequire(e) {
      this.$emit("data-id", e.dataset.id);
    },
    inputEvantHandler(e) {
      switch (this.input.type) {
        case "file":
          this.showFileName();
          break;
        case "date":
          this.hidePlaceholder();
          break;
        case "radio":
          this.makeRequire(e);
          break;
        default:
          null;
      }
    },
    addWhitespacesToNumber(num) {
      num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    validate() {
      const { isRequired, valid, name } = { ...this.input };
      const regExpIIN = /^\d{3} \d{3} \d{3} \d{3}$/g;
      const regExpName = /\w+/gi;
      const regExpDate = /^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/g;
      const regExpSMS = /\w/g;
      const regExpMale = /\w/g;
      const check = (reg, data) => {
        if (reg.test(this.fieldValue[name]) || !isRequired) {
          this.validationData[data] = false;
        } else {
          this.validationData[data] = true;
        }
      };

      if (valid === "iin" && isRequired) {
        check(regExpIIN, valid);
      }
      if (valid === "name" && isRequired) {
        check(regExpName, valid);
      }
      if (valid === "date" && isRequired) {
        check(regExpDate, valid);
      }
      if (valid === "sms") {
        check(regExpSMS, valid);
      }
      if (valid === "mail") {
        check(regExpMale, valid);
      }
    }
  },
  computed: {}
};
</script>

<style lang="scss">
.field {
  padding: 0.5rem;
  width: fit-content;
  display: flex;
  align-items: center;
  position: relative;
  color: $secondary-text-color;

  &__input {
    border: $border;
    width: 25rem;
    height: 3.5rem;
    padding: 0.5rem;
    border-radius: $border-radius;

    font-size: 1rem;
    color: $main-text-color;
    outline: none;

    &::placeholder {
      color: $secondary-text-color;
    }
  }
  &__input[type="date"] {
    align-items: center;
    display: -webkit-inline-flex;
    font-family: inherit;
    color: $secondary-text-color;
    cursor: inherit;
    overflow: hidden;
  }
  ::-webkit-calendar-picker-indicator {
    color: transparent;
    opacity: 1;
    background-color: $main-color;
    clip-path: polygon(15% 0, 85% 0, 50% 80%);
    cursor: pointer;
  }
  ::-webkit-inner-spin-button {
    display: none;
  }

  .custom-date-placeholder {
    position: absolute;
    top: 50%;
    left: 7rem;
    height: 2rem;
    transform: translateY(-50%);
    background-color: #fff;
    line-height: 2rem;
    text-align: start;
  }

  &__input[type="radio"] {
    width: fit-content;
    height: auto;
    position: absolute;
    opacity: 0;
    z-index: -1;
  }
  &-row {
    padding-left: 1.5rem;
    margin-right: 0.5rem;
    cursor: pointer;
  }

  .custom-radio-button {
    position: absolute;
    top: 48%;
    left: 0;
    transform: translateY(-50%);
    height: 1rem;
    width: 1rem;
    border: 1px solid $secondary-text-color;

    &__checked {
      background-color: $main-color;
      border-color: $main-color;
    }
  }

  &:hover input ~ .custom-radio-button {
    background-color: rgba($secondary-text-color, 0.25);
  }

  input:checked ~ .custom-radio-button {
    background-color: $main-color;
    border-color: $main-color;
  }

  &__input[type="file"] {
    color: red;
    opacity: 0;
    z-index: -1;
    position: absolute;
  }
  .custom-file-input {
    border: 1px dashed blue;
    border: $border;
    width: 25rem;
    height: 3.5rem;
    padding: 0.5rem;
    border-radius: $border-radius;
    background-color: #fff;

    font-size: 1rem;
    text-align: start;
    line-height: 2.5rem;
    outline: none;
    cursor: pointer;
  }
}
</style>