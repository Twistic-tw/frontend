declare module 'jspdf-autotable' {
  import { jsPDF } from 'jspdf';
  const autoTable: (doc: jsPDF, options: unknown) => void;
  export default autoTable;
}
