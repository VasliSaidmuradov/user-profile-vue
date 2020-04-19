<template>
  <div class="profile">
    <h1 class="profile__title">Анкета</h1>
    <input-list
      :inputs="inputs"
      ref="inputList"
      @data-id="handleChecked($event), setRequire($event)"
    />
    <button class="profile__button" @click="saveData">сохранить</button>
  </div>
</template>

<script>
import inputList from "../inputs/inputList.vue";

export default {
  components: {
    inputList
  },
  data() {
    return {
      inputs: {
        inputGroup1: [
          {
            label: "",
            placeholder: "ИИН",
            type: "text",
            name: "iin",
            valid: "iin",
            isRequired: true
          },
          {
            label: "",
            placeholder: "Имя",
            type: "text",
            name: "firstName",
            valid: "name",
            isRequired: true
          },
          {
            label: "",
            placeholder: "Фамилия",
            type: "text",
            name: "lastName",
            isRequired: false
          },
          {
            label: "",
            placeholder: "Дата рождения",
            type: "date",
            name: "date",
            valid: "date",
            isRequired: true
          }
        ],
        inputGroup2: [
          {
            id: 1,
            label: "SMS",
            placeholder: "sms",
            type: "radio",
            name: "notification",
            checked: true,
            isRequired: false
          },
          {
            id: 2,
            label: "E-mail",
            placeholder: "email",
            type: "radio",
            name: "notification",
            checked: false,
            isRequired: false
          },
          {
            id: 3,
            label: "SMS и E-mail",
            placeholder: "sms_email",
            type: "radio",
            name: "notification",
            checked: false,
            isRequired: false
          }
        ],
        inputGroup3: [
          {
            id: 1,
            label: "",
            placeholder: "+7 (123) 333-33-33",
            type: "tel",
            name: "sms",
            linkWith: "sms",
            valid: "sms",
            isRequired: true
          },
          {
            id: 2,
            label: "",
            placeholder: "E-mail",
            type: "email",
            name: "mail",
            linkWith: "email",
            valid: "mail",
            isRequired: false
          },
          {
            id: 3,
            label: "",
            placeholder: "Выберите файл...",
            type: "file",
            name: "file",
            linkWith: "sms_email",
            isRequired: false
          }
        ]
      }
    };
  },
  methods: {
    saveData() {
      this.$refs.inputList.validate();
      this.$refs.inputList.setTo();
    },
    handleChecked(e) {
      const inputs = this.inputs.inputGroup2;
      const id = +e;
      inputs.forEach(el => {
        el.id === id ? (el.checked = true) : (el.checked = false);
      });
      return id;
    },
    setRequire(e) {
      const inputs = this.inputs.inputGroup3;
      const id = +e;

      if (id === 1) {
        inputs[0].isRequired = true;
        inputs[1].isRequired = false;
      } else if (id === 2) {
        inputs[0].isRequired = false;
        inputs[1].isRequired = true;
      } else {
        inputs[0].isRequired = true;
        inputs[1].isRequired = true;
      }
    }
  },
  computed: {}
};
</script>

<style lang="scss">
.profile {
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  &__title {
    font-size: 2.5rem;
    color: $main-color;
    text-transform: uppercase;
  }

  &__button {
    margin: 0.5rem auto;
    width: 25rem;
    height: 3.5rem;
    background-color: $main-color;
    border: $border;
    border-radius: $border-radius;

    font-size: 1rem;
    color: #fff;
    text-transform: uppercase;
    cursor: pointer;
  }
}
</style>