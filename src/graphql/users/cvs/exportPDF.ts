import { gql } from '@apollo/client'

export const EXPORT_PDF_CV = gql`
  mutation exportPdf($pdf: ExportPdfInput!) {
    exportPdf(pdf: $pdf)
  }
`
