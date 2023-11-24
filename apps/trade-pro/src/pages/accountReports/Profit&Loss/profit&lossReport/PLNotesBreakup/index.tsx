import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import PLNotesBreakupForm from './PLNotesBreakup';

const { useForm, useWatch } = Form;

function PLNotesBreakup() {
  const { t } = useTranslation();

  return (
    <>
      <h2 className="form-heading"> {t('pl_notes_breakup')} </h2>
      <PLNotesBreakupForm />
    </>
  );
}

export default PLNotesBreakup;
