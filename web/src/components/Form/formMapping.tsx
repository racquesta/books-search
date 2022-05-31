import React, { ReactNode } from 'react';
import { Checkbox, Input, InputProps } from 'antd';
import { CheckboxGroupProps } from 'antd/lib/checkbox';

export default {
  input: (props: InputProps) => <Input {...props} />,
  checkboxGroup: (props: CheckboxGroupProps) => <Checkbox.Group {...props} />,
};
