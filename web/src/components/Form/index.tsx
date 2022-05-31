import { Button, Card, Form } from 'antd';
import React from 'react';
import formMapping from './formMapping';

type FormConfigQuestions = {
  name: string;
  label: string;
  ui: { inputType: 'input' | 'checkboxGroup'; options?: { label: string; value: string }[] };
}[];

export type FormConfig = {
  formQuestions: FormConfigQuestions;
};

type CustomFormProps = {
  formName: string;
  submitBtn?: boolean;
  resetBtn?: boolean;
  formConfig: FormConfig;
  onFinish?: (values: any) => void | Promise<void>; //fix typing
  onValuesChange?: (values: any, allValues: any) => void | Promise<void>; //fix typing
};

const CustomForm: React.FC<CustomFormProps> = ({
  onFinish,
  onValuesChange,
  formConfig,
  formName,
  submitBtn,
  resetBtn,
}: CustomFormProps) => {
  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { xs: { span: 20 }, sm: { span: 16, offset: 4 } },
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Card style={{ marginBottom: '32px' }}>
      <Form {...layout} form={form} name={formName} {...{ onFinish, onValuesChange }} labelWrap>
        {formConfig.formQuestions.map((question, i) => {
          const InputComponent = formMapping[question.ui.inputType];
          return (
            <Form.Item key={i} name={question.name} label={question.label}>
              <InputComponent {...(question.ui.options ? { options: question.ui.options } : {})} />
            </Form.Item>
          );
        })}
        {(submitBtn || resetBtn) && (
          <Form.Item {...tailLayout}>
            {submitBtn && (
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            )}
            {resetBtn && (
              <Button htmlType='button' onClick={onReset}>
                Reset
              </Button>
            )}
          </Form.Item>
        )}
      </Form>
    </Card>
  );
};

export default CustomForm;
