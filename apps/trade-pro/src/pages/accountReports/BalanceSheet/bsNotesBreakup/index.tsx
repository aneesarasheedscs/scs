import { useTranslation } from 'react-i18next';
import BSNotesBreakupForm from './BSNotesBreakup';

let balanceSheetBreakUps = false;
function BSNotesBreakup() {
  const { t } = useTranslation();

  return (
    <>
      <h2 className="form-heading">{balanceSheetBreakUps == false ? t('bs_notes_breakup') : t('pl_notes_breakup')}</h2>
      <BSNotesBreakupForm balanceSheetBreakUps={balanceSheetBreakUps} />
    </>
  );
}

export default BSNotesBreakup;
