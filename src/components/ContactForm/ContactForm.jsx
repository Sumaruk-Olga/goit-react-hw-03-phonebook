import PropTypes from 'prop-types';
import { Component } from "react";
import { nanoid } from 'nanoid';
import { Formik, ErrorMessage  } from 'formik';
import * as Yup from 'yup';
import "yup-phone-lite";
import { StyledForm, Button, StyledField } from "./ContactForm.styled";



const initialValues = {
  name: '',
  number:''
}

const schema = Yup.object().shape({
  name: Yup.string().required(),
  number: Yup.string().phone().required(),
});

export class ContactForm extends Component {    


    getId = () => {
        return nanoid();
    }
  
  handleFormikSubmit = (values, { resetForm }) => {  
    const {isNamePresent, onSubmit} = this.props;
    
    const newName = isNamePresent(values.name);

    if (!newName) {
        onSubmit({ ...values, id: nanoid() });   
        resetForm();
      } else {
        alert(`${values.name} is already in contacts`);
      }
  }

  render() {
    return <Formik initialValues={initialValues}
        validationSchema={schema}
        onSubmit={this.handleFormikSubmit}>
      <StyledForm autoComplete="off">
          <label>Name
            <StyledField
              type="text"
              name="name"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          />
          <ErrorMessage name="name" render={msg=> alert("Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan")}/>
          </label>
          <label>Number
            <StyledField
              type="tel"
            name="number"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          />
          <ErrorMessage name="number" render={msg => alert("Phone number must be digits and can contain spaces, dashes, parentheses and can start with +")}/>
          </label>
          <Button type='submit' title='add contact' aria-label='add contact'>add</Button>
        </StyledForm>   
      </Formik>  
    }
    
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isNamePresent:PropTypes.func.isRequired,
}