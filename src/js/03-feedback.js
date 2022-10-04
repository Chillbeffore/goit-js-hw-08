import throttle from 'lodash.throttle';
const FEEDBACK_KEY = 'feedback-form-state';
const formData = {};
const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  email: document.querySelector('.feedback-form input'),
};
populateForm();

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(evt) {
  const savedDataStorage = {
    email: refs.form.elements.email.value,
    message: refs.form.elements.message.value,
  };

  localStorage.setItem(FEEDBACK_KEY, JSON.stringify(savedDataStorage));
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
    localStorage.removeItem(FEEDBACK_KEY);
  }
}

function populateForm() {
  try {
    const savedData = JSON.parse(localStorage.getItem(FEEDBACK_KEY));
    refs.textarea.value = savedData.message;
    refs.email.value = savedData.email;
  } catch {
    console.dir('Data has been deleted');

    refs.textarea.value = '';
    refs.email.value = '';
  }
}
