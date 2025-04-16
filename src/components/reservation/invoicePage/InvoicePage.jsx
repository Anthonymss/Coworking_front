import { Document, Page, PDFDownloadLink, StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';
import { useLocation } from 'react-router-dom';
import './InvoicePage.css';

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Helvetica',
    backgroundColor: '#F9FAFB',
    color: '#1F2937',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 20,
    borderBottom: '2px solid #2563EB',
    paddingBottom: 10,
  },
  section: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 5,
  },
  text: {
    fontSize: 11,
    color: '#374151',
    lineHeight: 1.5,
  },
  boldText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  table: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 5,
  },
  tableHeader: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
    textAlign: 'center',
  },
  tableCell: {
    fontSize: 11,
    color: '#374151',
    flex: 1,
    textAlign: 'center',
  },
  footer: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#9CA3AF',
  },
});

export default function InvoicePage() {
  const { state } = useLocation();
  const invoiceData = state?.invoiceData;

  if (!invoiceData) {
    return <div>No hay datos de la factura disponibles.</div>;
  }

  const {
    invoiceNumber,
    spaceDetails,
    userDetails,
    durationRange,
    reservationDate,
    paymentMethod,
    subtotal,
    taxAmount,
    totalCost,
    services,
  } = invoiceData;

  const [startTime, endTime] = durationRange.split(' - ');
  const formattedStartTime = new Date(startTime).toLocaleString('es-ES', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
  const formattedEndTime = new Date(endTime).toLocaleString('es-ES', {
    timeStyle: 'short',
  });
  const formattedDuration = `${formattedStartTime} - ${formattedEndTime}`;

  const SpaceNamesDetail = ['Sitio:', 'Dirección:', 'Nombre:'];
  const formattedSpaceDetails = spaceDetails
    .split(';')
    .map((detail, index) => `${SpaceNamesDetail[index]} ${detail.trim()}`);

  const InvoiceDocument = () => (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Factura</Text>

        <View style={styles.section}>
          <Text style={styles.heading}>Número de Factura:</Text>
          <Text style={styles.text}>{invoiceNumber}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Fecha de Reserva:</Text>
          <Text style={styles.text}>{new Date(reservationDate).toLocaleString('es-ES')}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Espacio Reservado:</Text>
          {formattedSpaceDetails.map((detail, index) => (
            <Text key={index} style={styles.text}>
              {detail}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Duración:</Text>
          <Text style={styles.text}>{formattedDuration}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Método de Pago:</Text>
          <Text style={styles.text}>{paymentMethod}</Text>
        </View>

        {services && services.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Desglose de Servicios:</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Servicio</Text>
                <Text style={styles.tableHeader}>Cantidad</Text>
                <Text style={styles.tableHeader}>Precio Unitario</Text>
                <Text style={styles.tableHeader}>Total</Text>
              </View>
              {services.map((service, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{service.name}</Text>
                  <Text style={styles.tableCell}>{service.quantity}</Text>
                  <Text style={styles.tableCell}>${service.unitPrice.toFixed(2)}</Text>
                  <Text style={styles.tableCell}>
                    ${service.quantity * service.unitPrice.toFixed(2)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.heading}>Subtotal:</Text>
          <Text style={styles.boldText}>${subtotal?.toFixed(2) || '0.00'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Impuesto (IGV):</Text>
          <Text style={styles.boldText}>${taxAmount?.toFixed(2) || '0.00'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Total:</Text>
          <Text style={styles.boldText}>${totalCost?.toFixed(2) || '0.00'}</Text>
        </View>

        {userDetails && (
          <View style={styles.section}>
            <Text style={styles.heading}>Detalles del Usuario:</Text>
            <Text style={styles.text}>{userDetails}</Text>
          </View>
        )}

        <Text style={styles.footer}>
          Gracias por elegir nuestros servicios. ¡Esperamos verte pronto!
        </Text>
      </Page>
    </Document>
  );

  return (
    <div className="invoice-container">
      <h1>Factura</h1>
      <div className="invoice-section">
        <p>
          <strong>Número de Factura:</strong> {invoiceNumber}
        </p>
        <p>
          <strong>Fecha de Reserva:</strong>{' '}
          {new Date(reservationDate).toLocaleString('es-ES')}
        </p>
        <p>
          <strong>Espacio Reservado:</strong>
        </p>
        {formattedSpaceDetails.map((detail, index) => (
          <p key={index}>
            <strong>{SpaceNamesDetail[index]}</strong> {detail}
          </p>
        ))}
        <p>
          <strong>Duración:</strong> {formattedDuration}
        </p>
        <p>
          <strong>Método de Pago:</strong> {paymentMethod}
        </p>
      </div>

      <div className="invoice-section">
        <p>
          <strong>Subtotal:</strong> ${subtotal?.toFixed(2) || '0.00'}
        </p>
        <p>
          <strong>Impuesto (IVA):</strong> ${taxAmount?.toFixed(2) || '0.00'}
        </p>
        <p>
          <strong>Total:</strong> ${totalCost?.toFixed(2) || '0.00'}
        </p>
      </div>
      <button className="print-button" onClick={() => window.print()}>
        Imprimir Factura
      </button>
      <PDFDownloadLink
        document={<InvoiceDocument />}
        fileName="factura.pdf"
      >
        {({ loading }) => (
          <button
            className={`pdf-download-button ${loading ? 'loading' : ''}`}
          >
            {loading ? 'Generando PDF...' : 'Descargar Factura en PDF'}
          </button>
        )}
      </PDFDownloadLink>
    </div>
  );
}
