import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';
const formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  email: document.querySelector('.feedback-form input'),
};
refs.form.addEventListener('input', throttle(onFormInput, 500));
populateForm();
refs.form.addEventListener('submit', onFormSubmit);
function onFormInput(evt) {
  const formDataStorage = {
    email: refs.form.elements.email.value,
    message: refs.form.elements.message.value,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formDataStorage));
}

function populateForm() {
  try {
    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    refs.textarea.value = savedData.message;
    refs.email.value = savedData.email;
  } catch {
    console.dir('Data has been deleted');
    refs.textarea.value = '';
    refs.email.value = '';
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();

  if (!evt.target.elements.email.value) {
    alert('Please fill email field!');
  } else if (!evt.target.elements.message.value) {
    alert('Please fill message field!');
  } else {
    formData.email = evt.target.elements.email.value;
    formData.message = evt.target.elements.message.value;
    console.log(formData);
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
  }
}
