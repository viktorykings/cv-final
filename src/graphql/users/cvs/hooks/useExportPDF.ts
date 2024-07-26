import { useMutation } from '@apollo/client'
import { EXPORT_PDF_CV } from '../exportPDF'

export const useExportPDF = () => {
  return useMutation(EXPORT_PDF_CV)
}
