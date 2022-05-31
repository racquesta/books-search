import { FormConfig } from '../../components/Form';

export const searchFormConfig: FormConfig = {
  formQuestions: [
    {
      name: 'title',
      label: 'Title',
      ui: {
        inputType: 'input',
      },
    },
    {
      name: 'author',
      label: 'Author',
      ui: {
        inputType: 'input',
      },
    },
    {
      name: 'subject',
      label: 'Subject',
      ui: {
        inputType: 'input',
      },
    },
  ],
};

export const filterConfig: FormConfig = {
  formQuestions: [
    {
      name: 'download-availability',
      label: 'Download Availability',
      ui: {
        inputType: 'checkboxGroup',
        options: [
          {
            label: 'ePub',
            value: 'epub',
          },
          {
            label: 'PDF',
            value: 'pdf',
          },
        ],
      },
    },
    {
      name: 'format',
      label: 'Format',
      ui: {
        inputType: 'checkboxGroup',
        options: [
          {
            label: 'eBooks Only',
            value: 'isEbook',
          },
        ],
      },
    },
  ],
};
